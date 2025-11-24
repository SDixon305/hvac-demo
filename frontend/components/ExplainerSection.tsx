'use client'

import { Phone, Zap, Clock, ShieldCheck, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react'

export default function ExplainerSection() {
    return (
        <section className="relative overflow-hidden bg-slate-950 text-white py-12 lg:py-16">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-medium mb-4 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Now Live: The Future of HVAC Dispatching
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                        Your Phone is Ringing.<br />
                        <span className="text-white">Are You Making Money?</span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        The AI Dispatcher that never sleeps, never calls in sick, and turns 2 AM emergencies into booked jobs while you rest.
                    </p>
                </div>

                {/* The "Old Way" vs "New Way" Cards */}
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* The Pain (Old Way) */}
                    <div className="group relative bg-slate-900/50 rounded-2xl p-6 border border-red-900/30 hover:border-red-500/30 transition-colors duration-500">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-red-100">The "Voicemail Graveyard"</h3>
                            </div>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-slate-400 text-sm">
                                    <span className="text-red-500/50 mt-0.5">✕</span>
                                    <span>65% of callers hang up on voicemail</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-400 text-sm">
                                    <span className="text-red-500/50 mt-0.5">✕</span>
                                    <span>$16,000+ lost monthly revenue</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-400 text-sm">
                                    <span className="text-red-500/50 mt-0.5">✕</span>
                                    <span>Waking up at 3 AM for non-emergencies</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-400 text-sm">
                                    <span className="text-red-500/50 mt-0.5">✕</span>
                                    <span>Inconsistent customer experience</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* The Solution (New Way) */}
                    <div className="group relative bg-slate-900/80 rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 shadow-2xl shadow-blue-900/20">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-white">The AI Advantage</h3>
                            </div>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-blue-100 text-sm">
                                    <div className="p-0.5 rounded-full bg-blue-500/20 text-blue-400 mt-0.5">
                                        <Phone className="w-3 h-3" />
                                    </div>
                                    <span className="font-medium">Answers instantly, 24/7/365</span>
                                </li>
                                <li className="flex items-start gap-2 text-blue-100 text-sm">
                                    <div className="p-0.5 rounded-full bg-blue-500/20 text-blue-400 mt-0.5">
                                        <TrendingUp className="w-3 h-3" />
                                    </div>
                                    <span className="font-medium">95% Capture Rate (No more missed jobs)</span>
                                </li>
                                <li className="flex items-start gap-2 text-blue-100 text-sm">
                                    <div className="p-0.5 rounded-full bg-blue-500/20 text-blue-400 mt-0.5">
                                        <ShieldCheck className="w-3 h-3" />
                                    </div>
                                    <span className="font-medium">$0 Overhead Increase (Infinite scaling)</span>
                                </li>
                                <li className="flex items-start gap-2 text-blue-100 text-sm">
                                    <div className="p-0.5 rounded-full bg-blue-500/20 text-blue-400 mt-0.5">
                                        <Clock className="w-3 h-3" />
                                    </div>
                                    <span className="font-medium">Dispatches techs in under 60 seconds</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
