import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronLeft, Send, MapPin, CheckCheck, Info, Smile, Paperclip } from 'lucide-react';

// ─── Static data ─────────────────────────────────────────────────────────────
const CHATS = [
  {
    id: 1,
    user: 'Andrea G.',
    avatar: 'https://i.pravatar.cc/100?u=rodrigo',
    property: 'Edificio Titanium',
    unread: true,
    time: '10:24 AM',
    messages: [
      { id: 1, from: 'them', text: '¡Hola! Vi tu publicación del garaje en Sopocachi. ¿Sigue disponible?', time: '10:18 AM' },
      { id: 2, from: 'them', text: '¿Cuáles son los horarios de acceso?', time: '10:20 AM' },
      { id: 3, from: 'me', text: 'Hola Andrea! Sí, sigue disponible 😊 El acceso es las 24 horas, tenés entrada con control remoto.', time: '10:22 AM' },
      { id: 4, from: 'them', text: '¿Sigue disponible el garaje en Sopocachi?', time: '10:24 AM' },
    ],
  },
  {
    id: 2,
    user: 'Rodrigo M.',
    avatar: 'https://i.pravatar.cc/100?u=andrea',
    property: 'Baulera Ventura',
    unread: false,
    time: 'Ayer',
    messages: [
      { id: 1, from: 'me', text: 'Rodrigo, ya procesé tu reserva de la baulera. Perfecto para el lunes.', time: 'Ayer 9:00 AM' },
      { id: 2, from: 'them', text: 'Excelente, te envío el comprobante del QR en un momento.', time: 'Ayer 9:15 AM' },
      { id: 3, from: 'me', text: 'Confirmado, quedamos listo 👌', time: 'Ayer 9:17 AM' },
    ],
  },
  {
    id: 3,
    user: 'Marta P.',
    avatar: 'https://i.pravatar.cc/100?u=marta',
    property: 'Garaje Zona Sur',
    unread: false,
    time: 'Lun',
    messages: [
      { id: 1, from: 'them', text: '¿Es posible visitarlo hoy mismo? Me queda muy cerca de casa.', time: 'Lun 14:00' },
      { id: 2, from: 'me', text: 'Claro Marta, a las 17:00 estoy disponible para mostrarte el garaje 🏠', time: 'Lun 14:05' },
    ],
  },
];

// ─── Chat Thread ─────────────────────────────────────────────────────────────
const ChatThread = ({ chat, onBack }) => {
  const [messages, setMessages] = useState(chat.messages);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: Date.now(), from: 'me', text, time }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, from: 'them', text: '¡Entendido! Te respondo a la brevedad 👍', time },
      ]);
    }, 1200);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    // Full-screen flex column — occupies all available space with no nav interference
    <div className="flex flex-col font-manrope bg-[#fdfbf7]" style={{ height: '100dvh' }}>

      {/* Header — sits at very top, safe padding for status bar on mobile */}
      <header className="flex items-center gap-3 px-4 pt-14 pb-3 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center active:scale-95 transition-all shrink-0"
        >
          <ChevronLeft className="w-5 h-5 text-brand-on-surface" />
        </button>

        <img
          src={chat.avatar}
          alt={chat.user}
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0"
        />

        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-black text-brand-on-surface leading-tight truncate">{chat.user}</h2>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-primary shrink-0" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{chat.property}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-gray-400 hidden sm:block">En línea</span>
        </div>
      </header>

      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.from === 'them' && (
              <img
                src={chat.avatar}
                alt=""
                className="w-7 h-7 rounded-full border border-white shadow-sm shrink-0 mb-1"
              />
            )}
            <div className={`max-w-[78%] flex flex-col gap-1 ${msg.from === 'me' ? 'items-end' : 'items-start'}`}>
              <div
                className={`px-4 py-3 rounded-[1.2rem] text-sm leading-relaxed font-medium shadow-sm
                  ${msg.from === 'me'
                    ? 'bg-brand-on-surface text-white rounded-br-md'
                    : 'bg-white border border-gray-100 text-brand-on-surface rounded-bl-md'
                  }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 px-1">
                <span className="text-[9px] font-bold text-gray-300 uppercase tracking-wider">{msg.time}</span>
                {msg.from === 'me' && <CheckCheck className="w-3 h-3 text-primary" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar — sticks to bottom, above system UI */}
      <div className="shrink-0 px-4 pb-6 pt-3 border-t border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="flex items-center gap-2 bg-gray-50 rounded-[1.5rem] px-4 py-2 border border-gray-100 focus-within:border-primary/20 transition-all">
          <button className="text-gray-300 hover:text-primary transition-colors">
            <Smile className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Escribe un mensaje…"
            className="flex-1 bg-transparent text-sm font-semibold text-brand-on-surface outline-none placeholder:text-gray-300 py-2"
          />

          <button className="text-gray-300 hover:text-primary transition-colors mr-1 hidden sm:block">
            <Paperclip className="w-4 h-4" />
          </button>

          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-9 h-9 bg-primary rounded-[1rem] flex items-center justify-center shadow-lg shadow-primary/25 transition-all active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary-hover shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Chat List ────────────────────────────────────────────────────────────────
const Messages = ({ activeChat, setActiveChat }) => {
  if (activeChat) {
    return <ChatThread chat={activeChat} onBack={() => setActiveChat(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] pt-24 pb-32 font-manrope">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-brand-on-surface tracking-tight mb-2">Mensajes</h1>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
              {CHATS.filter(c => c.unread).length} sin leer · {CHATS.length} conversaciones
            </p>
          </div>
          <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm hover:shadow-md transition-all active:scale-95">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </header>

        <div className="space-y-4">
          {CHATS.map(chat => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`group bg-white rounded-3xl p-5 border border-gray-100 flex items-center gap-4 transition-all cursor-pointer hover:shadow-premium hover:border-primary/10 hover:-translate-y-0.5 active:scale-[0.99] ${chat.unread ? 'border-l-4 border-l-primary' : ''}`}
            >
              <div className="relative shrink-0">
                <img src={chat.avatar} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" alt={chat.user} />
                {chat.unread && (
                  <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className={`text-sm md:text-base ${chat.unread ? 'font-black' : 'font-extrabold'} text-brand-on-surface`}>
                    {chat.user}
                  </h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0 ml-2">{chat.time}</span>
                </div>
                <p className={`text-[11px] md:text-sm truncate mb-1.5 ${chat.unread ? 'text-brand-on-surface font-bold' : 'text-gray-400 font-medium'}`}>
                  {chat.messages[chat.messages.length - 1].text}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-primary shrink-0" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{chat.property}</span>
                  </div>
                  {!chat.unread && <CheckCheck className="w-3.5 h-3.5 text-primary" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 rounded-3xl p-6 border border-primary/10 text-center">
          <Info className="w-8 h-8 text-primary mx-auto mb-3" />
          <p className="text-[11px] text-gray-500 font-bold leading-relaxed px-4">
            Recuerda nunca realizar pagos fuera de la plataforma para mantener tu protección activa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
