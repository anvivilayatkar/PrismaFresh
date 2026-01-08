import React, { useState, useEffect } from 'react';
import { Flower, CartItem, PageView } from './types';
import { FLOWERS, FLORIST_WHATSAPP_NUMBER } from './constants';
import { ASSETS } from './imageAssets';
import FlowerCard from './components/FlowerCard';
import { Menu, X, ShoppingBag, Leaf, Phone, MapPin, Instagram, Facebook, Trash2, ArrowRight, ImageOff } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Simplified Form states for order
  const [customerName, setCustomerName] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  // Image Error States
  const [heroError, setHeroError] = useState(false);
  const [philosophyError, setPhilosophyError] = useState(false);
  const [studioError, setStudioError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (flower: Flower) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === flower.id);
      if (existing) {
        return prev.map(item => 
          item.id === flower.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...flower, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppOrder = () => {
    // Basic validation, but name is optional if they just want to chat
    const intro = customerName ? `Hi, I am ${customerName}.` : "Hi,";
    
    const itemsList = cart.map(item => `• ${item.quantity}x ${item.name} (₹${item.price * item.quantity})`).join('\n');
    const requestText = specialRequest ? `\n*Note:* ${specialRequest}` : "";
    
    const message = `${intro} I would like to place an order via the Mogra website.\n\n*Order Summary:*\n${itemsList}\n\n*Total Estimate:* ₹${cartTotal}${requestText}\n\nPlease confirm availability and delivery details.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${FLORIST_WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const NavLink = ({ page, label }: { page: PageView, label: string }) => (
    <button 
      onClick={() => { setCurrentPage(page); setIsMenuOpen(false); }}
      className={`text-sm tracking-widest uppercase hover:text-moss-600 transition-colors ${currentPage === page ? 'text-moss-800 font-medium' : 'text-stone-500'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-sand-50 font-sans selection:bg-moss-200">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 group z-50">
             <span className="font-serif text-3xl text-moss-900 tracking-tight group-hover:opacity-80 transition-opacity">Mogra</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12">
            <NavLink page="home" label="Home" />
            <NavLink page="shop" label="Shop" />
            <NavLink page="contact" label="Contact" />
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setCurrentPage('order')} 
              className="relative text-moss-900 hover:text-moss-600 transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-moss-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-moss-900">
              {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-0 left-0 right-0 h-screen bg-sand-50 p-8 flex flex-col justify-center items-center gap-8 z-40 animate-fade-in">
             <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="font-serif text-3xl text-moss-900">Home</button>
             <button onClick={() => { setCurrentPage('shop'); setIsMenuOpen(false); }} className="font-serif text-3xl text-moss-900">Shop</button>
             <button onClick={() => { setCurrentPage('order'); setIsMenuOpen(false); }} className="font-serif text-3xl text-moss-900">Cart ({cartCount})</button>
             <button onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }} className="font-serif text-3xl text-moss-900">Contact</button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            {/* Minimal Hero */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-stone-900">
              <div className="absolute inset-0 z-0">
                {!heroError ? (
                  <img 
                    src={ASSETS.HERO_BANNER}
                    alt="Minimal Flower Aesthetics" 
                    className="w-full h-full object-cover opacity-90"
                    onError={() => setHeroError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-moss-900 opacity-90">
                     <ImageOff size={64} className="text-white/20 mb-4" />
                     <p className="text-white/40 uppercase tracking-widest text-sm">Banner Image Not Found</p>
                     <p className="text-white/20 text-xs font-mono mt-2">{ASSETS.HERO_BANNER}</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-stone-900/10"></div>
              </div>
              
              <div className="relative z-10 text-center px-6 max-w-2xl mx-auto mt-20">
                <p className="text-white text-sm tracking-[0.3em] uppercase mb-4 opacity-90">Mumbai</p>
                <h1 className="font-serif text-6xl md:text-8xl text-white mb-8 leading-none tracking-tight">
                  Poetry in <br/><span className="italic font-light">Blooms</span>
                </h1>
                <button 
                  onClick={() => setCurrentPage('shop')}
                  className="bg-white/90 backdrop-blur hover:bg-white text-moss-900 text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 hover:shadow-lg"
                >
                  Explore Collection
                </button>
              </div>
            </section>

            {/* Featured Section */}
            <section className="py-24 bg-sand-50 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                   <div className="max-w-md">
                      <h2 className="font-serif text-4xl text-moss-900 mb-4">Seasonal Curations</h2>
                      <p className="text-stone-500 font-light">Handpicked daily from the finest local growers. Minimal arrangements that speak volumes.</p>
                   </div>
                   <button 
                    onClick={() => setCurrentPage('shop')} 
                    className="flex items-center gap-2 text-moss-800 text-sm uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    View All <ArrowRight size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {FLOWERS.slice(0, 3).map(flower => (
                    <FlowerCard key={flower.id} flower={flower} onAddToCart={addToCart} />
                  ))}
                </div>
              </div>
            </section>

            {/* Philosophy / Minimal Info */}
            <section className="py-24 bg-moss-900 text-sand-50 px-6">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/2 relative">
                   <div className="aspect-[3/4] overflow-hidden bg-moss-800">
                     {!philosophyError ? (
                       <img 
                        src={ASSETS.PHILOSOPHY_ART} 
                        alt="Minimal Florist Art" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                        onError={() => setPhilosophyError(true)}
                      />
                     ) : (
                       <div className="w-full h-full flex flex-col items-center justify-center text-moss-700">
                          <ImageOff size={48} className="mb-2" />
                          <span className="text-xs uppercase tracking-widest">Image Missing</span>
                       </div>
                     )}
                   </div>
                </div>
                <div className="md:w-1/2">
                  <span className="text-moss-300 text-xs tracking-[0.2em] uppercase mb-6 block">Our Philosophy</span>
                  <h2 className="font-serif text-5xl mb-8 leading-tight">Simplicity is the <br/><span className="italic text-moss-200">Ultimate Sophistication</span></h2>
                  <p className="text-moss-100/80 mb-8 leading-relaxed font-light">
                    Mogra was born from a desire to strip away the unnecessary. We focus on the raw beauty of Indian flora—the texture of a Marigold petal, the intoxicating scent of Jasmine, the architectural grace of a Lotus stem.
                  </p>
                  <button onClick={() => setCurrentPage('contact')} className="border border-moss-700 text-sand-50 hover:bg-sand-50 hover:text-moss-900 px-8 py-3 text-xs uppercase tracking-widest transition-all">
                    Visit Studio
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SHOP PAGE */}
        {currentPage === 'shop' && (
          <div className="max-w-7xl mx-auto px-6 py-32 animate-fade-in">
            <h2 className="font-serif text-5xl text-center text-moss-900 mb-4">The Collection</h2>
            <p className="text-center text-stone-500 font-light mb-16 max-w-xl mx-auto">Thoughtfully curated blooms for the modern home.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {FLOWERS.map(flower => (
                <FlowerCard key={flower.id} flower={flower} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        )}

        {/* ORDER / CART PAGE */}
        {currentPage === 'order' && (
          <div className="max-w-4xl mx-auto px-6 py-32 animate-fade-in min-h-[60vh]">
             <h2 className="font-serif text-4xl text-center text-moss-900 mb-12">Your Selection</h2>
             
             {cart.length === 0 ? (
               <div className="text-center py-20">
                 <p className="text-xl text-stone-400 font-serif italic mb-8">Your bag is empty.</p>
                 <button 
                  onClick={() => setCurrentPage('shop')}
                  className="text-moss-800 border-b border-moss-800 pb-1 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
                 >
                   Continue Browsing
                 </button>
               </div>
             ) : (
               <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-100">
                 <div className="space-y-8 mb-12">
                   {cart.map(item => (
                     <div key={item.id} className="flex gap-6 items-start border-b border-stone-50 pb-6 last:border-0">
                       <img src={item.imageUrl} alt={item.name} className="w-20 h-24 object-cover bg-stone-100" />
                       <div className="flex-grow">
                         <div className="flex justify-between items-start mb-2">
                           <h3 className="font-serif text-xl text-moss-900">{item.name}</h3>
                           <span className="font-medium text-moss-900">₹{item.price * item.quantity}</span>
                         </div>
                         <div className="flex justify-between items-center mt-4">
                           <div className="flex items-center gap-4 text-sm">
                             <button onClick={() => updateQuantity(item.id, -1)} className="text-stone-400 hover:text-moss-600">-</button>
                             <span className="w-4 text-center">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, 1)} className="text-stone-400 hover:text-moss-600">+</button>
                           </div>
                           <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-400 transition-colors">
                             <Trash2 size={16} />
                           </button>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
                 
                 <div className="flex justify-between items-center mb-8 py-4 border-t border-stone-100">
                   <span className="font-serif text-2xl text-moss-900">Total</span>
                   <span className="font-serif text-2xl text-moss-900">₹{cartTotal}</span>
                 </div>

                 {/* Minimal Form */}
                 <div className="space-y-6">
                   <div>
                     <input 
                      type="text" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-sand-50 border-0 border-b border-stone-200 p-3 focus:ring-0 focus:border-moss-500 outline-none transition-all placeholder-stone-400"
                      placeholder="Your Name (Optional)"
                     />
                   </div>
                   <div>
                     <textarea 
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full bg-sand-50 border-0 border-b border-stone-200 p-3 focus:ring-0 focus:border-moss-500 outline-none transition-all h-20 resize-none placeholder-stone-400"
                      placeholder="Any special requests or delivery notes?"
                     />
                   </div>
                   
                   <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-moss-900 text-white font-medium py-4 text-sm uppercase tracking-widest hover:bg-moss-800 transition-colors flex items-center justify-center gap-3 mt-8"
                   >
                     <Phone size={18} />
                     Checkout on WhatsApp
                   </button>
                   <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest">
                     You will be redirected to confirm details
                   </p>
                 </div>
               </div>
             )}
          </div>
        )}

        {/* CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div className="max-w-7xl mx-auto px-6 py-32 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div>
                  <h2 className="font-serif text-5xl text-moss-900 mb-8">Visit Us</h2>
                  <p className="text-lg text-stone-500 mb-12 font-light leading-relaxed">
                    Our studio is a sanctuary for flower lovers. Come smell the Mogra and watch our artisans at work.
                  </p>
                  
                  <div className="space-y-8 font-light text-stone-600">
                    <div className="flex gap-4">
                      <div className="mt-1"><MapPin size={20} className="text-moss-700"/></div>
                      <div>
                        <h4 className="font-medium text-moss-900 uppercase text-xs tracking-widest mb-1">Address</h4>
                        <p>Shop 12, Linking Road, Bandra West<br/>Mumbai, 400050</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1"><Phone size={20} className="text-moss-700"/></div>
                      <div>
                        <h4 className="font-medium text-moss-900 uppercase text-xs tracking-widest mb-1">Contact</h4>
                        <p>+91 72496 11277<br/>hello@mogra.in</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1"><Leaf size={20} className="text-moss-700"/></div>
                      <div>
                        <h4 className="font-medium text-moss-900 uppercase text-xs tracking-widest mb-1">Hours</h4>
                        <p>Mon-Sun: 7am - 9pm</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 mt-16">
                    <a href="#" className="text-moss-900 hover:text-moss-600 transition-colors"><Instagram size={20}/></a>
                    <a href="#" className="text-moss-900 hover:text-moss-600 transition-colors"><Facebook size={20}/></a>
                  </div>
                </div>

                <div className="aspect-[3/4] bg-stone-200 overflow-hidden relative">
                   {!studioError ? (
                     <img 
                       src={ASSETS.STUDIO_INTERIOR} 
                       alt="Mogra Studio" 
                       className="absolute inset-0 w-full h-full object-cover" 
                       onError={() => setStudioError(true)}
                     />
                   ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center text-stone-400">
                        <ImageOff size={48} className="mb-2" />
                        <span className="text-xs uppercase tracking-widest">Studio Image Missing</span>
                     </div>
                   )}
                </div>
             </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-sand-100 text-moss-900 py-16 border-t border-moss-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
           <div className="max-w-xs">
             <h3 className="font-serif text-2xl mb-4">Mogra</h3>
             <p className="text-sm text-stone-500 font-light leading-relaxed">Minimalist Indian floristry rooted in tradition, designed for the modern soul.</p>
           </div>
           
           <div className="flex gap-12 text-sm">
             <ul className="space-y-3">
               <li className="font-bold uppercase text-xs tracking-widest text-moss-900/50 mb-2">Shop</li>
               <li><button onClick={() => setCurrentPage('shop')} className="hover:text-moss-600">All Blooms</button></li>
               <li><button onClick={() => setCurrentPage('shop')} className="hover:text-moss-600">Garlands</button></li>
               <li><button onClick={() => setCurrentPage('shop')} className="hover:text-moss-600">Gifts</button></li>
             </ul>
             <ul className="space-y-3">
               <li className="font-bold uppercase text-xs tracking-widest text-moss-900/50 mb-2">Studio</li>
               <li><button onClick={() => setCurrentPage('contact')} className="hover:text-moss-600">Visit Us</button></li>
               <li><button onClick={() => setCurrentPage('contact')} className="hover:text-moss-600">Contact</button></li>
             </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-moss-200/50 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-400 uppercase tracking-widest">
          <p>© 2024 Mogra Florist</p>
          <p>Mumbai • India</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
