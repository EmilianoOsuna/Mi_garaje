import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, User, Search, Calendar, PlusSquare, MessageSquare,
  ChevronDown, Settings, LogOut, CreditCard, Shield, HelpCircle,
  CheckCircle2, Clock, MapPin, X
} from 'lucide-react';

// ─── Hook: close dropdown on outside click ────────────────────────────────────
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) callback();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, callback]);
};

// ─── Dropdown animation variants ─────────────────────────────────────────────
const dropdownVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.12, ease: [0.4, 0, 0.2, 1] } },
};

// ─── Notifications data ───────────────────────────────────────────────────────
const NOTIFICATIONS = [
  {
    id: 1,
    icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    title: 'Reserva confirmada',
    body: 'Tu garaje en Sopocachi está activo desde hoy.',
    time: 'Hace 10 min',
    unread: true,
  },
  {
    id: 2,
    icon: <MessageSquare className="w-4 h-4 text-primary" />,
    title: 'Nuevo mensaje de Andrea G.',
    body: '¿Sigue disponible el garaje en Sopocachi?',
    time: 'Hace 22 min',
    unread: true,
  },
  {
    id: 3,
    icon: <Clock className="w-4 h-4 text-amber-500" />,
    title: 'Renovación próxima',
    body: 'Tu baulera en Ventura vence en 5 días.',
    time: 'Hace 2 horas',
    unread: false,
  },
  {
    id: 4,
    icon: <MapPin className="w-4 h-4 text-blue-500" />,
    title: 'Nuevo espacio cerca tuyo',
    body: 'Garaje en Calacoto disponible desde 600 Bs/mes.',
    time: 'Hace 3 horas',
    unread: false,
  },
];

// ─── Notifications Dropdown ───────────────────────────────────────────────────
const NotificationsDropdown = ({ onNavigate }) => {
  const [open, setOpen]   = useState(false);
  const [items, setItems] = useState(NOTIFICATIONS);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));

  const unreadCount = items.filter(n => n.unread).length;
  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        className="relative hover:text-primary transition-colors p-2 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
      >
        <Bell className="w-5 h-5" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              key="dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-white"
            />
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="notif-dropdown"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[200] origin-top-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div>
                <h3 className="text-sm font-black text-brand-on-surface">Notificaciones</h3>
                {unreadCount > 0 && (
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider mt-0.5">
                    {unreadCount} sin leer
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[9px] font-black text-primary uppercase tracking-widest hover:opacity-70 transition-opacity"
                  >
                    Marcar leídas
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-gray-500 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Items */}
            <ul className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
              {items.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setItems(prev => prev.map(x => x.id === n.id ? { ...x, unread: false } : x))}
                  className={`flex gap-3 px-5 py-4 cursor-pointer transition-colors hover:bg-gray-50 ${n.unread ? 'bg-primary/[0.03]' : ''}`}
                >
                  <div className="w-8 h-8 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-xs leading-tight ${n.unread ? 'font-black text-brand-on-surface' : 'font-bold text-gray-600'}`}>
                        {n.title}
                      </p>
                      {n.unread && <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1" />}
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-relaxed">{n.body}</p>
                    <p className="text-[9px] text-gray-300 font-bold uppercase tracking-wider mt-1.5">{n.time}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50">
              <button
                onClick={() => { onNavigate('reservations'); setOpen(false); }}
                className="text-[10px] font-black text-primary uppercase tracking-widest w-full text-center hover:opacity-70 transition-opacity"
              >
                Ver todas las reservas →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Profile Dropdown ─────────────────────────────────────────────────────────
const MENU_ITEMS = [
  {
    icon: <User className="w-4 h-4" />,
    label: 'Mi perfil',
    sub: 'Gonzalo Farfán',
    view: 'profile',
  },
  {
    icon: <CreditCard className="w-4 h-4" />,
    label: 'Mis reservas',
    sub: '1 activa',
    view: 'reservations',
  },
  {
    icon: <Shield className="w-4 h-4" />,
    label: 'Verificación de identidad',
    sub: 'Cuenta verificada ✓',
    divider: true,
  },
  {
    icon: <Settings className="w-4 h-4" />,
    label: 'Configuración',
  },
  {
    icon: <HelpCircle className="w-4 h-4" />,
    label: 'Ayuda y soporte',
    divider: true,
  },
  {
    icon: <LogOut className="w-4 h-4 text-red-400" />,
    label: 'Cerrar sesión',
    danger: true,
  },
];

const ProfileDropdown = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-all border border-gray-100 active:scale-95"
      >
        {/* Plain icon avatar — no photo */}
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
          <User className="w-3.5 h-3.5 text-primary" />
        </div>
        <span className="hidden lg:block text-xs font-bold text-brand-on-surface">Gonzalo Farfán</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="hidden lg:block"
        >
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </motion.div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="profile-dropdown"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[200] origin-top-right"
          >
            {/* User info header */}
            <div className="px-5 py-4 bg-gradient-to-br from-brand-on-surface to-gray-700">
              <div className="flex items-center gap-3">
                {/* Plain icon in header too — no photo */}
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-white leading-tight">Gonzalo Farfán</p>
                  <p className="text-[10px] text-white/60 font-bold">gonzalo@migaraje.bo</p>
                </div>
              </div>
            </div>

            {/* Menu items — staggered entrance */}
            <ul className="py-2">
              {MENU_ITEMS.map((item, idx) => (
                <React.Fragment key={idx}>
                  {item.divider && <div className="my-1 border-t border-gray-50 mx-4" />}
                  <motion.li
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <button
                      onClick={() => {
                        if (item.view) onNavigate(item.view);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-gray-50 ${item.danger ? 'hover:bg-red-50' : ''}`}
                    >
                      <span className={item.danger ? 'text-red-400' : 'text-gray-400'}>{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold leading-tight ${item.danger ? 'text-red-400' : 'text-brand-on-surface'}`}>
                          {item.label}
                        </p>
                        {item.sub && (
                          <p className="text-[9px] text-gray-400 font-medium mt-0.5">{item.sub}</p>
                        )}
                      </div>
                    </button>
                  </motion.li>
                </React.Fragment>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = ({ onNavigate }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
        <img src="/logo.webp" alt="Mi Garaje Logo" className="h-9 w-auto object-contain md:h-10" />
        <span className="font-extrabold text-lg tracking-tight text-brand-on-surface md:text-xl">Mi Garaje</span>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8 ml-10">
        <NavLink icon={<Search className="w-4 h-4" />}       label="Explorar"  onClick={() => onNavigate('home')} />
        <NavLink icon={<Calendar className="w-4 h-4" />}     label="Reservas"  onClick={() => onNavigate('reservations')} />
        <NavLink icon={<MessageSquare className="w-4 h-4" />} label="Mensajes" onClick={() => onNavigate('messages')} />
        <NavLink icon={<PlusSquare className="w-4 h-4" />}   label="Publicar"  onClick={() => onNavigate('publish')} />
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-2 md:gap-4 text-gray-500">
        <NotificationsDropdown onNavigate={onNavigate} />
        <ProfileDropdown onNavigate={onNavigate} />
      </div>
    </div>
  </nav>
);

const NavLink = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 cursor-pointer transition-all duration-200 relative ${active ? 'text-primary' : 'text-gray-600 hover:text-brand-on-surface'}`}
  >
    {icon}
    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    {active && <div className="h-0.5 bg-primary w-full absolute -bottom-[1.15rem]" />}
  </div>
);

export default Navbar;
