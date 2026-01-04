import React, { useState } from 'react';
import { GalleryItem } from '../types';

const GALLERY_DATA: GalleryItem[] = [
  { id: 1, url: '/portfolio/project-1.png', title: 'Marble Sanctuary', category: 'Bathroom Renovation' },
  { id: 2, url: '/portfolio/project-2.png', title: 'Attic Skylight Suite', category: 'Bespoke Design' },
  { id: 3, url: '/portfolio/project-3.png', title: 'Contemporary Wet Room', category: 'Shower Installation' },
  { id: 4, url: '/portfolio/project-4.png', title: 'Heritage Brass & Green', category: 'Luxury Heritage' },
  { id: 5, url: '/portfolio/project-5.png', title: 'Geometric Tiled Shower', category: 'Tiling & Heating' },
];

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-jrj-teal font-bold tracking-[0.2em] uppercase text-xs mb-3">Our Work</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
              Curated <span className="italic text-slate-400">Excellence</span>
            </h3>
          </div>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed border-l-2 border-jrj-teal/30 pl-4">
            A selection of our finest bespoke bathroom and heating projects, designed for modern living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {GALLERY_DATA.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer ${idx === 0 ? 'md:col-span-2' :
                idx === 3 ? 'md:col-span-2' : ''
                }`}
            >
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors duration-500 z-10" />
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity z-20 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 duration-500">
                <div className="transform transition-all duration-500 group-hover:translate-x-2">
                  <span className="inline-block text-jrj-teal text-[10px] font-bold uppercase tracking-[0.2em] mb-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {item.category}
                  </span>
                  <h4 className="text-white font-serif text-2xl md:text-3xl">{item.title}</h4>
                  <p className="text-slate-300 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">Click to expand</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="group inline-flex items-center space-x-2 text-slate-900 font-bold uppercase tracking-widest text-xs hover:text-jrj-teal transition-colors">
            <span>View Full Portfolio</span>
            <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            onClick={() => setSelectedItem(null)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
          >
            <img
              src={selectedItem.url}
              alt={selectedItem.title}
              className="w-auto h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-serif text-white">{selectedItem.title}</h3>
              <p className="text-jrj-teal text-sm font-bold tracking-widest uppercase mt-2">{selectedItem.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
