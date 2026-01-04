import React, { useState } from 'react';
import ChatAssistant from './ChatAssistant';

interface DesignType {
    id: string;
    title: string;
    description: string;
    image: string;
    prompt: string;
}

const DESIGN_TYPES: DesignType[] = [
    {
        id: 'bathroom',
        title: 'Bathroom Renovation',
        description: 'Full remodeling of your sanctuary.',
        image: '/portfolio/project-1.png',
        prompt: "I'm interested in a complete bathroom renovation. Can you help me design a layout?"
    },
    {
        id: 'heating',
        title: 'Heating Solutions',
        description: 'Efficient, modern heating systems.',
        image: '/portfolio/project-4.png',
        prompt: "I need advice on modern heating solutions and eco-efficient boilers."
    },
    {
        id: 'bespoke',
        title: 'Bespoke Design',
        description: 'Unique designs tailored to you.',
        image: '/portfolio/project-2.jpg',
        prompt: "I'm looking for a bespoke design that's unique to my home. Where should we start?"
    },
    {
        id: 'tiling',
        title: 'Luxury Tiling',
        description: 'Premium textures and finishes.',
        image: '/portfolio/project-5.png',
        prompt: "I want to explore luxury tiling options for my floors and walls."
    }
];

const DesignConsultation: React.FC = () => {
    const [selectedType, setSelectedType] = useState<DesignType | null>(null);

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {!selectedType ? (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">
                                Begin Your <span className="text-jrj-teal">Transformation</span>.
                            </h1>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Select a category below to start your personal design consultation with our AI specialist.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {DESIGN_TYPES.map((type) => (
                                <div
                                    key={type.id}
                                    onClick={() => setSelectedType(type)}
                                    className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-100 hover:-translate-y-2"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={type.image}
                                            alt={type.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-jrj-teal transition-colors">{type.title}</h3>
                                        <p className="text-sm text-slate-500 line-clamp-2">{type.description}</p>
                                        <div className="mt-4 flex items-center text-jrj-teal text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                            <span>Select</span>
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Integrated Chat Assistant for General Questions */}
                        <div className="mt-20">
                            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-jrj-teal/5 rounded-bl-full -mr-16 -mt-16"></div>
                                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <h2 className="text-3xl font-serif text-slate-900 mb-4">Unsure where to start?</h2>
                                        <p className="text-slate-600 mb-8">
                                            Our intelligent design assistant is simpler than a form and smarter than a search bar. Ask anything about styles, costs, or timelines.
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        {/* We can just show the button here or a fake chat UI - but since ChatAssistant is fixed, maybe we just prompt them to open it */}
                                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 w-full max-w-sm">
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div className="w-8 h-8 bg-jrj-teal text-white rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                                </div>
                                                <p className="text-xs font-bold uppercase text-slate-400">AI Assistant</p>
                                            </div>
                                            <p className="text-slate-800 text-sm italic">"Try asking: What's the best heating for a large open-plan bathroom?"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto">
                        <button
                            onClick={() => setSelectedType(null)}
                            className="mb-8 flex items-center text-slate-400 hover:text-jrj-teal transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to Categories
                        </button>

                        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
                            <div className="bg-jrj-teal p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <h2 className="text-3xl font-serif relative z-10">Designing your {selectedType.title}</h2>
                                <p className="text-white/80 mt-2 relative z-10">Use the assistant below to refine your vision.</p>
                            </div>

                            <div className="p-8 md:p-12 relative min-h-[600px] bg-slate-50/50">
                                <ChatAssistant
                                    inline={true}
                                    initialMessage={selectedType.prompt}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DesignConsultation;
