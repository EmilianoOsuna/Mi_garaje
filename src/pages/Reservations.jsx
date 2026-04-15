import React from 'react';
import { Calendar, MapPin, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import lpzImg from '../assets/lpz.webp';
import sczImg from '../assets/scz.webp';

const Reservations = () => {
  const currentReservations = [
    {
      id: 1,
      name: "Garaje Amplio Edificio Titanium",
      city: "Sopocachi, La Paz",
      date: "Inicia: 15 Abr - 15 May",
      status: "En curso",
      price: "450 Bs.",
      image: lpzImg
    }
  ];

  const pastReservations = [
    {
      id: 2,
      name: "Baulera Residencial Ventura",
      city: "Equipetrol, Santa Cruz",
      date: "Finalizó: 12 Mar",
      status: "Finalizado",
      price: "320 Bs.",
      image: sczImg
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] pb-32 pt-[calc(env(safe-area-inset-top)+6rem)] font-manrope">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-brand-on-surface tracking-tight mb-2">Mis Reservas</h1>
          <p className="text-sm text-gray-500 font-medium">Gestiona tus espacios y pagos activos.</p>
        </header>

        {/* Current Reservations */}
        <section className="mb-12">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Reservas Activas</h2>
          <div className="space-y-4">
            {currentReservations.map(res => (
              <ReservationCard key={res.id} {...res} accent />
            ))}
          </div>
        </section>

        {/* Past Reservations */}
        <section>
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Historial Pasado</h2>
          <div className="space-y-4">
            {pastReservations.map(res => (
              <ReservationCard key={res.id} {...res} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const ReservationCard = ({ name, city, date, status, price, image, accent }) => (
  <div className={`group bg-white rounded-3xl p-5 border border-gray-100 flex gap-5 items-center transition-all ${accent ? 'shadow-premium border-primary/10' : 'hover:bg-gray-50'}`}>
    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-sm shrink-0">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-sm md:text-base font-extrabold text-brand-on-surface truncate">{name}</h3>
        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${accent ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'}`}>
            {status}
        </span>
      </div>
      <div className="flex items-center gap-3 text-[10px] md:text-xs text-gray-500 font-bold mb-3">
        <p className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> {city}</p>
        <p className="flex items-center gap-1"><Calendar className="w-3 h-3 text-primary" /> {date}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-black text-brand-on-surface">{price}</span>
        <button className="text-[10px] font-black text-primary flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
          Ver detalle <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
);

export default Reservations;
