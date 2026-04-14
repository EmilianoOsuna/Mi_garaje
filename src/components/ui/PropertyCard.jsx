import React from 'react';
import { Star, Bookmark, ShieldCheck } from 'lucide-react';

const PropertyCard = ({ image, location, city, price, rating, verified }) => {
  return (
    <div className="group bg-white rounded-[1.5rem] shadow-ambient border border-gray-50 overflow-hidden transition-[box-shadow,transform] duration-300 ease-out hover:shadow-xl hover:-translate-y-1 active:scale-[0.99] active:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img 
          src={image} 
          alt={location}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Verified Badge */}
        {verified && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-secondary/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-[8px] font-bold uppercase tracking-widest shadow-lg">
            <ShieldCheck className="w-2.5 h-2.5" />
            <span>Verificado</span>
          </div>
        )}

        {/* Rating chip */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-extrabold shadow-sm">
          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-xs font-bold text-brand-on-surface leading-tight line-clamp-1 w-full">
            {location}
          </h4>
          <Bookmark className="w-3.5 h-3.5 shrink-0 text-gray-400 transition-colors group-hover:text-primary active:text-primary" aria-hidden />
        </div>
        
        <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-4 font-bold">
          <MapPinMini className="w-3 h-3" />
          <span>{city}</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-black text-gray-500 uppercase tracking-tighter">Mensualidad</span>
            <div className="flex items-baseline gap-0.5 ml-2">
              <span className="text-lg font-extrabold text-brand-on-surface leading-none">{price}</span>
              <span className="text-[10px] font-bold text-brand-on-surface">Bs.</span>
            </div>
          </div>
          
          <button
            type="button"
            className="min-h-9 min-w-[4.5rem] bg-gray-50 text-secondary font-bold text-[10px] px-4 py-2 rounded-lg border border-gray-100 transition-colors duration-200 hover:bg-primary/5 hover:text-primary hover:border-primary/15 active:bg-primary/10 active:scale-[0.98]"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

const MapPinMini = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default PropertyCard;
