
import React from 'react';
import { GalleryItem } from '../types';

const GALLERY_DATA: GalleryItem[] = [
  { id: 1, url: 'https://picsum.photos/seed/bath1/800/800', title: 'Modern Brass Suite', category: 'Bathroom' },
  { id: 2, url: 'https://picsum.photos/seed/bath2/800/800', title: 'Herringbone Masterpiece', category: 'Tiling' },
  { id: 3, url: 'https://picsum.photos/seed/bath3/800/800', title: 'Minimalist Wet Room', category: 'Bathroom' },
  { id: 4, url: 'https://picsum.photos/seed/heat1/800/800', title: 'Eco-Boiler Installation', category: 'Heating' },
  { id: 5, url: 'https://picsum.photos/seed/bath4/800/800', title: 'Luxury Double Vanity', category: 'Bathroom' },
];

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-jrj-teal font-bold tracking-widest uppercase text-sm mb-2">Portfolio</h2>
          <h3 className="text-4xl font-bold text-slate-900">Latest Designs</h3>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Explore our recently completed projects, ranging from full luxury bathroom renovations to modern heating solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {GALLERY_DATA.map((item, idx) => (
            <div 
              key={item.id} 
              className={`group relative overflow-hidden rounded-2xl shadow-sm ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <span className="text-jrj-teal text-xs font-bold uppercase tracking-widest mb-1">{item.category}</span>
                <h4 className="text-white font-bold text-xl">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
