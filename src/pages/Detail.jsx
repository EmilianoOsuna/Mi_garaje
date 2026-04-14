import React from 'react';
import { ChevronLeft, Share2, Heart, ShieldCheck, Star, Calendar, Clock, Lock, Shield, MapPin } from 'lucide-react';

const Detail = ({ onBack, onReserve, property }) => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] pb-32 font-manrope">
      {/* Floating Header (Always visible) */}
      <div className="fixed top-6 left-5 right-5 flex justify-between items-center z-50 max-w-7xl mx-auto lg:px-5">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all text-brand-on-surface border border-gray-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-3">
            <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg transition-all text-brand-on-surface border border-gray-100 hover:text-primary">
                <Share2 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg transition-all text-brand-on-surface border border-gray-100 hover:text-primary active:scale-95">
                <Heart className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Main Responsive Layout */}
      <div className="lg:flex lg:gap-12 lg:max-w-7xl lg:mx-auto lg:pt-24 lg:px-5">
        
        {/* Gallery / Image Section (Left Column on Desktop) */}
        <div className="lg:flex-1">
            <div className="relative h-[350px] md:h-[450px] lg:h-[550px] w-full overflow-hidden lg:rounded-[2.5rem] shadow-premium">
                <img src={property.image} alt={property.location} className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
        </div>

        {/* Information Section (Right Column on Desktop) */}
        <main className="px-5 -mt-8 relative z-20 lg:flex-1 lg:mt-0 lg:px-0">
            {/* Main Info Card */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-ambient border border-gray-50 mb-8 lg:shadow-none lg:border-none lg:bg-transparent lg:px-0 lg:pt-0">
                <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Espacio Verificado</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300 mx-1"></div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
                        <Star className="w-4 h-4 fill-primary text-primary border-none" />
                        <span>{property.rating} (24 reseñas)</span>
                    </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-black text-brand-on-surface leading-tight mb-4 tracking-tight">
                    {property.location}
                </h1>
                <p className="text-sm text-gray-500 font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {property.city}
                </p>

                <div className="mt-8 flex items-center gap-4 pt-8 border-t border-gray-100">
                    <div className="flex -space-x-2.5">
                        {[1,2,3,4].map(i => (
                        <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                        </div>
                        ))}
                    </div>
                    <p className="text-[11px] text-gray-600 leading-tight">
                        <span className="font-bold text-brand-on-surface">Muy popular.</span> Alquilado 6 veces este mes en Calacoto.
                    </p>
                </div>
            </div>

            {/* Features list */}
            <div className="space-y-8 px-1 lg:bg-white lg:p-8 lg:rounded-3xl lg:border lg:border-gray-50 lg:shadow-ambient">
                <h3 className="font-black text-lg md:text-xl text-brand-on-surface tracking-tight">Comodidades gratuitas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FeatureItem 
                        icon={<Lock className="w-6 h-6 text-primary" />}
                        title="Acceso Independiente"
                        desc="Control remoto personal para entrada 24/7."
                    />
                    <FeatureItem 
                        icon={<Shield className="w-6 h-6 text-primary" />}
                        title="Seguridad Nivel C"
                        desc="Cámaras 4K y vigilante físico en el sitio."
                    />
                    <FeatureItem 
                        icon={<Calendar className="w-6 h-6 text-primary" />}
                        title="Flexibilidad Total"
                        desc="Cancela tu alquiler hasta 48h antes."
                    />
                    <FeatureItem 
                        icon={<Clock className="w-6 h-6 text-primary" />}
                        title="Horario Libre"
                        desc="Sin restricciones de entrada o salida."
                    />
                </div>
                
                {/* Description */}
                <div className="pt-8 border-t border-gray-100">
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed font-semibold">
                        Espacio de primer nivel ubicado en el corazón financiero. El garaje cuenta con el tamaño ideal para camionetas de gran tamaño y ofrece una de las mejores iluminaciones de la zona con tecnología LED automatizada.
                    </p>
                    <button className="text-sm font-bold text-primary underline mt-4 hover:opacity-80 transition-opacity">Ver todos los detalles</button>
                </div>
            </div>
        </main>
      </div>

      {/* Persistent Bottom / Sidebar Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-auto lg:right-10 lg:bottom-10 lg:w-[400px] bg-white/80 backdrop-blur-2xl border-t border-gray-100 px-6 py-6 flex items-center justify-between z-50 shadow-2xl lg:rounded-3xl lg:border lg:border-gray-50 lg:flex-col lg:items-stretch lg:gap-6 animate-in slide-in-from-bottom duration-500">
         <div className="lg:flex lg:justify-between lg:items-center">
            <div className="flex items-baseline gap-1">
               <span className="text-2xl font-black text-brand-on-surface tracking-tight">{property.price} Bs.</span>
               <span className="text-xs font-black text-gray-500 uppercase tracking-widest">/ mes</span>
            </div>
            <p className="hidden lg:block text-xs font-bold text-primary underline cursor-pointer">Revisar calendario</p>
         </div>
         <button 
           onClick={onReserve}
           className="bg-primary hover:bg-primary-hover text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 text-sm md:text-base"
         >
           Alquilar ahora
         </button>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold text-brand-on-surface">{title}</h4>
      <p className="text-[11px] text-gray-500 font-bold leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Detail;
