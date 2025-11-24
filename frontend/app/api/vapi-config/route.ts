import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getConfig() {
    try {
        console.log("Vapi Config Request Received");

        // 1. Get the latest active demo session
        const { data: session, error } = await supabase
            .from('demo_sessions')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        const businessName = session?.business_name || "Diamond Cooling";
        const ownerName = session?.owner_name || "Trevor";
        const region = session?.region || "south";

        // Climate-aware descriptions
        const climateContext = region === 'south'
            ? 'hot climate region - AC emergencies during heat waves are life-threatening'
            : 'cold climate region - furnace emergencies during freezing weather are life-threatening';

        const priorityEmergency = region === 'south' ? 'AC' : 'Furnace';
        const emergencyScenarios = region === 'south'
            ? 'heat waves, rising indoor temperatures, elderly or vulnerable people at risk of heat stroke'
            : 'freezing temperatures, cold house, risk of pipes freezing, elderly or vulnerable people at risk of hypothermia';

        console.log(`Dynamic Config for: ${businessName} (${region} region)`);

        // 2. Construct the dynamic config
        const config = {
            assistant: {
                firstMessage: `Thank you for calling ${businessName}, this is Sarah. How can I help you today?`,
                model: {
                    provider: "openai",
                    model: "gpt-4o",
                    messages: [
                        {
                            role: "system",
                            content: `You are a helpful receptionist for ${businessName}. Your name is Sarah. You are speaking with a customer.

                    Owner Name: ${ownerName}
                    Climate Region: ${region} (${climateContext})
                    Priority Emergency Type: ${priorityEmergency} failures

                    EMERGENCY DETECTION: Be highly alert for emergency scenarios including ${emergencyScenarios}.
                    When you detect an emergency, immediately acknowledge the urgency and check for technician availability.

                    If the customer mentions an emergency, you must check for technician availability immediately.

                    If the technician is available, dispatch them. If not, apologize and offer the next available slot.

                    Always be professional, calm, and reassuring. Show empathy for the customer's situation, especially in emergencies.`
                        }
                    ]
                }
            }
        };

        return NextResponse.json(config);

    } catch (error) {
        console.error('Error in vapi-config:', error);
        return NextResponse.json({});
    }
}

export async function GET(request: Request) {
    return getConfig();
}

export async function POST(request: Request) {
    return getConfig();
}
