'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { CallStatus } from '@/components/LiveCallStatus';
import { inferRegionFromPhone } from '@/utils/areaCodeMapping';

interface BusinessData {
    name: string;
    ownerName: string;
    ownerPhone: string;
}

export function useRealCallWorkflow(businessData: BusinessData) {
    const [callStatus, setCallStatus] = useState<CallStatus>('idle');
    const [transcript, setTranscript] = useState<string[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [callId, setCallId] = useState<string | null>(null);

    // Initialize session when business is configured
    const initializeSession = useCallback(async () => {
        // Infer region from phone number area code
        const { region } = inferRegionFromPhone(businessData.ownerPhone);

        const { data, error } = await supabase
            .from('demo_sessions')
            .insert([{
                business_name: businessData.name,
                region: region,
                owner_name: businessData.ownerName,
                owner_phone: businessData.ownerPhone,
                is_active: true
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating session:', error);
            return null;
        }

        setSessionId(data.id);
        return data.id;
    }, [businessData]);

    // Start monitoring for calls
    const startCallMonitoring = useCallback(async () => {
        if (!sessionId) {
            const newSessionId = await initializeSession();
            if (!newSessionId) return;
        }

        setCallStatus('connecting');
        setTranscript([]);
    }, [sessionId, initializeSession]);

    // Subscribe to call updates
    useEffect(() => {
        if (callStatus === 'idle') return;

        const channel = supabase
            .channel('demo_calls_realtime')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'demo_calls',
                    filter: sessionId ? `session_id=eq.${sessionId}` : undefined
                },
                (payload) => {
                    const call = payload.new as any;

                    if (payload.eventType === 'INSERT') {
                        setCallId(call.id);
                        setCallStatus('connected');
                        setTranscript([`AI: ${businessData.name}, how may I help you?`]);
                    }

                    if (payload.eventType === 'UPDATE' && call.id === callId) {
                        // Update transcript
                        if (call.transcript) {
                            const lines = call.transcript.split('\n').filter(Boolean);
                            setTranscript(lines);
                        }

                        // Update status based on call metadata
                        if (call.metadata?.detecting_emergency) {
                            setCallStatus('processing');
                        } else if (call.metadata?.listening) {
                            setCallStatus('listening');
                        }

                        // Handle completion
                        if (call.status === 'completed') {
                            setCallStatus('completed');
                        }
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [callStatus, sessionId, callId, businessData.name]);

    return {
        callStatus,
        transcript,
        startCallMonitoring,
        sessionId
    };
}
