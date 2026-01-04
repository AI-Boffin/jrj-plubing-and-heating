import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onNavigate?: (page: 'home' | 'design') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#', action: () => onNavigate?.('home') },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`relative flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-900/5 px-8 py-3 rounded-full border border-slate-100' : ''}`}>

          <div
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => onNavigate?.('home')}
          >
            <img src="/logo.png" alt="RJR Plumbing & Heating" className="h-14 w-14 object-cover rounded-full" />
          </div>

          <nav className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  // If it's a hash link (starts with #) and we are provided navigation
                  if (link.href.startsWith('#') && onNavigate) {
                    // If we are not already on home (or just to be safe), navigate home.
                    // We use setTimeout to allow state update if needed, but primarily 
                    // we want the URL hash to update AND the page view to reset to home.
                    onNavigate('home');

                    // If we are already on home, the default anchor behavior works.
                    // If we are on 'design', onNavigate('home') switches the view.
                    // The browser's default behavior for href="#..." will try to scroll.
                    // However, the DOM might not differ immediately.
                    // A safer bet is to let App handling scrolling or use a small timeout.
                  } else if (link.action) {
                    e.preventDefault();
                    link.action();
                  }
                }}
                className={`text-xs uppercase tracking-widest font-black transition-all hover:text-jrj-teal text-slate-600`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-jrj-teal transition-colors shadow-lg shadow-slate-900/20">
              Get Quote
            </button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-slate-800 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-slate-800 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-slate-800 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-8 px-6 lg:hidden animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('#') && onNavigate) {
                    onNavigate('home');
                  } else if (link.action) {
                    e.preventDefault();
                    link.action();
                  }
                  setIsMenuOpen(false);
                }}
                className="text-lg font-bold text-slate-900"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-jrj-teal text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest w-full">
              Get Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
