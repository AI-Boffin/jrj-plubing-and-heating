
import React from 'react';

interface HeroProps {
  onStartDesign?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartDesign }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ... (keep background elements) ... */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-200/50 skew-x-[-12deg] translate-x-32 hidden lg:block"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-jrj-teal/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-16 items-center min-h-[inherit]">
        <div className="text-slate-900 relative z-10 py-12 lg:py-0">
          <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-jrj-teal animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-jrj-teal">Award Winning Engineering</span>
          </div>

          <h2 className="font-serif text-6xl md:text-8xl leading-[1.05] mb-8 relative">
            The Art of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-jrj-teal to-cyan-500 relative z-10">Modern Comfort.</span>
          </h2>

          <p className="text-lg text-slate-700 lg:text-slate-600 mb-10 max-w-lg leading-relaxed font-light relative z-10 font-medium lg:font-normal">
            Luxury bathroom transformations and precision heating solutions tailored for the sophisticated home. Experience design without compromise.
          </p>

          <div className="flex flex-wrap gap-5">
            <button
              onClick={onStartDesign}
              className="bg-jrj-teal text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-[0_20px_40px_-10px_rgba(70,178,192,0.5)] hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Design
            </button>
            <button className="bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm">
              Our Portfolio
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-200/60 pt-8 max-w-md">
            <div>
              <p className="text-2xl font-serif text-slate-900">15+</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Years Experience</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-slate-900">400+</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Luxury Projects</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-slate-900">24h</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Expert Support</p>
            </div>
          </div>
        </div>

        {/* Hero Image Section - Absolute Background on Mobile, Block on Desktop */}
        <div className="absolute inset-0 lg:relative lg:block z-0 lg:z-auto h-full w-full lg:h-auto">
          {/* Mobile Background Fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/40 via-slate-50/20 to-slate-100/40 lg:hidden z-10"></div>

          <div className="relative h-full w-full lg:z-20 lg:rounded-[3rem] overflow-hidden lg:shadow-[0_48px_100px_-24px_rgba(0,0,0,0.5)] lg:animate-float">
            <img
              src="/hero-image.png"
              alt="Luxury Bathroom Design"
              className="absolute lg:relative inset-0 w-full h-full lg:h-auto object-cover lg:scale-105 opacity-70 lg:opacity-100"
            />
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          {/* Accent Image/Card - Hidden on mobile */}
          <div className="hidden lg:block absolute -bottom-10 -left-10 z-30 bg-white p-6 rounded-[2rem] shadow-2xl max-w-[240px] border border-slate-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-jrj-teal/10 rounded-xl flex items-center justify-center text-jrj-teal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">Eco-Efficiency</p>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">Smart heating systems that save up to 40% on annual energy costs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
