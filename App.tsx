import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ChatAssistant from './components/ChatAssistant';
import DesignConsultation from './components/DesignConsultation';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'design'>('home');

  // Scroll to top on page change, or to hash if present
  useEffect(() => {
    if (currentPage === 'home') {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(id);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensure DOM is rendered
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const navigateTo = (page: 'home' | 'design') => setCurrentPage(page);

  return (
    <div className="min-h-screen">
      <Header onNavigate={navigateTo} />

      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onStartDesign={() => navigateTo('design')} />

            {/* Services Overview */}
            <section id="services" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-12">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-jrj-teal/10 rounded-2xl flex items-center justify-center text-jrj-teal">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Luxury Bathrooms</h3>
                    <p className="text-slate-600">Full design and installation service using the finest brassware, ceramics, and tiling techniques.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-jrj-teal/10 rounded-2xl flex items-center justify-center text-jrj-teal">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Efficient Heating</h3>
                    <p className="text-slate-600">Smart boiler installations and underfloor heating systems designed for maximum energy efficiency.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-jrj-teal/10 rounded-2xl flex items-center justify-center text-jrj-teal">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">24/7 Support</h3>
                    <p className="text-slate-600">Reliable maintenance and emergency repairs to keep your home running smoothly year-round.</p>
                  </div>
                </div>
              </div>
            </section>

            <Gallery />

            {/* CTA Section */}
            <section id="contact" className="py-24 bg-jrj-teal">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform your space?</h2>
                <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                  Get in touch today for a free estimate or to discuss your next luxury project. Our AI assistant is also available 24/7 for instant help.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="bg-white text-jrj-teal px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all">
                    Call Us Now
                  </button>
                  <button className="bg-jrj-teal border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-jrj-teal transition-all">
                    Send an Email
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <DesignConsultation />
        )}
      </main>

      <footer className="bg-slate-50 py-12 text-slate-500 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <img src="/logo.png" alt="JRJ Plumbing & Heating" className="h-10 w-auto object-contain" />
          </div>
          <p className="mb-4">© {new Date().getFullYear()} JRJ Plumbing & Heating Ltd. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-jrj-teal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-jrj-teal transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-jrj-teal transition-colors">Cookies</a>
          </div>
        </div>
      </footer>

      {/* Only show global chat assistant on home page OR if we decide it should be everywhere (but hidden on design page since it has an inline one). 
          Let's hide it on the design page to avoid confusion with the inline one. */}
      {currentPage === 'home' && <ChatAssistant />}
    </div>
  );
};

export default App;
