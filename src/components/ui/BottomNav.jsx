import React from 'react';
import { Search, Calendar, PlusSquare, Box, User } from 'lucide-react';

const BottomNav = ({ currentView, onNavigate }) => {
  return (
    <div className="md:hidden fixed bottom-6 left-5 right-5 z-50 flex items-center justify-between border border-gray-100 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-[2rem] shadow-2xl">
      <NavIcon
        icon={<Search className="h-5 w-5" />}
        label="Explorar"
        active={currentView === 'home'}
        onClick={() => onNavigate('home')}
      />
      <NavIcon
        icon={<Calendar className="h-5 w-5" />}
        label="Reservas"
        active={currentView === 'reservations'}
        onClick={() => onNavigate('reservations')}
      />

      {/* Center FAB button */}
      <div className="flex flex-col items-center gap-1 text-gray-500" onClick={() => onNavigate('publish')}>
        <div className={`-translate-y-6 flex h-14 w-14 items-center justify-center rounded-[1.5rem] border-4 border-[#fdfbf7] shadow-xl transition-all active:scale-90 ${currentView === 'publish' ? 'bg-brand-on-surface text-white' : 'bg-primary text-white shadow-primary/30'}`}>
          <PlusSquare className="h-6 w-6" />
        </div>
        <span className="-translate-y-5 text-[9px] font-black uppercase tracking-widest text-gray-500">Publicar</span>
      </div>

      <NavIcon
        icon={<Box className="h-5 w-5" />}
        label="Mensajes"
        active={currentView === 'messages'}
        onClick={() => onNavigate('messages')}
      />
      <NavIcon
        icon={<User className="h-5 w-5" />}
        label="Perfil"
        active={currentView === 'profile'}
        onClick={() => onNavigate('profile')}
      />
    </div>
  );
};

const NavIcon = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex min-h-12 min-w-[3.5rem] flex-col items-center justify-center gap-1 rounded-xl transition-all active:scale-90 ${active ? 'text-primary' : 'text-gray-500'}`}
  >
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    {active && <div className="w-1 h-1 bg-primary rounded-full mt-0.5"></div>}
  </div>
);

export default BottomNav;
