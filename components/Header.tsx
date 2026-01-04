
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#gallery' },
    { name: 'Sustainability', href: '#eco' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`relative flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-900/5 px-8 py-3 rounded-full border border-slate-100' : ''}`}>
          
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-12 h-12 bg-jrj-teal rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
              <span className="text-white font-serif font-extrabold text-2xl">J</span>
            </div>
            <div>
              <h1 className={`text-xl font-serif font-extrabold tracking-tight leading-none transition-colors ${isScrolled ? 'text-slate-900' : 'text-white lg:text-slate-900'}`}>JRJ</h1>
              <p className="text-[9px] uppercase tracking-[0.3em] text-jrj-teal font-black">Bespoke Design</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-black transition-all hover:text-jrj-teal ${isScrolled ? 'text-slate-600' : 'text-white lg:text-slate-600'}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl text-xs uppercase tracking-widest font-black hover:bg-jrj-teal transition-all shadow-xl active:scale-95"
            >
              Consultation
            </a>
          </nav>

          <button 
            className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0F172A] z-[60] transition-transform duration-700 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col justify-between">
          <div className="flex justify-between items-center">
             <div className="w-12 h-12 bg-jrj-teal rounded-2xl flex items-center justify-center">
              <span className="text-white font-serif font-extrabold text-2xl">J</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="text-white">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-4xl font-serif text-white hover:text-jrj-teal transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>

          <button className="w-full bg-jrj-teal text-white py-6 rounded-3xl font-black uppercase tracking-widest">
            Book Site Visit
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
