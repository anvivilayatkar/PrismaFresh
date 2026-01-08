import React from 'react';
import { Flower } from '../types';
import { Plus, MessageCircle } from 'lucide-react';
import { FLORIST_WHATSAPP_NUMBER } from '../constants';

interface FlowerCardProps {
  flower: Flower;
  onAddToCart: (flower: Flower) => void;
}

const FlowerCard: React.FC<FlowerCardProps> = ({ flower, onAddToCart }) => {
  
  const handleQuickOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi Mogra, I would like to order the ${flower.name} (₹${flower.price}). Is it available?`;
    window.open(`https://wa.me/${FLORIST_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="group bg-white rounded-none md:rounded-lg overflow-hidden transition-all duration-500 hover:shadow-lg border border-transparent hover:border-moss-100 flex flex-col">
      <div className="relative overflow-hidden aspect-[4/5] bg-stone-100">
        <img 
          src={flower.imageUrl} 
          alt={flower.name} 
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button 
            onClick={handleQuickOrder}
            className="bg-white text-moss-900 p-3 rounded-full hover:bg-moss-50 transition-colors"
            title="Quick Order via WhatsApp"
          >
            <MessageCircle size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow text-center">
        <h3 className="font-serif text-2xl text-moss-900 mb-1">{flower.name}</h3>
        <p className="text-stone-500 text-xs tracking-wider uppercase mb-3">{flower.category}</p>
        <p className="text-stone-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow font-light">{flower.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
           <span className="font-serif text-lg font-medium text-moss-800">₹{flower.price}</span>
           <button 
            onClick={() => onAddToCart(flower)}
            className="text-xs uppercase tracking-widest font-bold text-moss-600 hover:text-moss-900 flex items-center gap-1 transition-colors"
          >
            Add to Bag <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowerCard;