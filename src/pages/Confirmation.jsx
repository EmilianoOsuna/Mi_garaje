import React, { useState, useEffect } from 'react';
import { ChevronLeft, Info, CheckCircle2, QrCode, Calendar, MapPin, Building2, ShieldCheck, Timer, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Confirmation = ({ property, onBack, onFinish }) => {
  const [paymentStep, setPaymentStep] = useState('initial'); // 'initial', 'qr'
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  
  const serviceFee = 25;
  const total = property.price + serviceFee;

  useEffect(() => {
    let timer;
    if (paymentStep === 'qr' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [paymentStep, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-manrope pb-20">
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full">
            <button 
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-all border border-gray-100 active:scale-95"
            >
                <ChevronLeft className="w-6 h-6 text-brand-on-surface" />
            </button>
            <div>
                <h1 className="font-black text-brand-on-surface tracking-tight">Confirmar Alquiler</h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{property.location}</p>
            </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            <div className="lg:col-span-3 space-y-10">
                <AnimatePresence mode="wait">
                    {paymentStep === 'initial' ? (
                        <motion.section
                            key="initial"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div>
                                <h2 className="text-2xl font-black text-brand-on-surface mb-6 tracking-tight">Tu espacio seguro te espera</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-ambient">
                                        <Calendar className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="text-sm font-bold text-brand-on-surface">Periodo de Alquiler</h3>
                                            <p className="text-xs text-gray-500 font-medium">Desde hoy - Pago mensual recurrente</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-ambient">
                                        <Building2 className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <h3 className="text-sm font-bold text-brand-on-surface">Acceso al Espacio</h3>
                                            <p className="text-xs text-gray-500 font-medium">Se proporcionará control remoto al confirmar el pago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                                <div className="flex items-start gap-4">
                                    <ShieldCheck className="w-7 h-7 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-extrabold text-brand-on-surface mb-2">Garantía Mi Garaje</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                            Protegemos tu inversión. Si el espacio no coincide con las fotos o tienes problemas de acceso, te devolvemos el 100% de tu primera mensualidad. Sin preguntas.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => setPaymentStep('qr')}
                                className="w-full bg-primary hover:bg-primary-hover text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary/30 transition-all active:scale-[0.98]"
                            >
                                <QrCode className="w-5 h-5" />
                                <span className="uppercase tracking-widest text-xs">Generar QR de Pago</span>
                            </button>
                        </motion.section>
                    ) : (
                        <motion.section
                            key="qr"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-premium text-center space-y-8"
                        >
                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-brand-on-surface">Escanea y Paga</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Válido para cualquier aplicación bancaria (Simple)</p>
                            </div>

                            <div className="relative mx-auto w-64 h-64 bg-gray-50 rounded-3xl p-4 border border-gray-100 flex items-center justify-center group overflow-hidden">
                                <img 
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=migaraje-payment-demo" 
                                    alt="QR Payment"
                                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] group-hover:backdrop-blur-0 transition-all"></div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-primary">
                                    <Timer className="w-4 h-4" />
                                    <span className="text-xs font-black">{formatTime(timeLeft)}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">El QR expirará pronto</p>
                            </div>

                            <div className="pt-8 border-t border-gray-100 space-y-4">
                                <button 
                                    onClick={onFinish}
                                    className="w-full bg-brand-on-surface text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all hover:bg-black active:scale-[0.98]"
                                >
                                    <span>Ya realicé el pago</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => setPaymentStep('initial')}
                                    className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors"
                                >
                                    Cancelar y volver
                                </button>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>

            <div className="lg:col-span-2">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-gray-50 sticky top-32">
                    <div className="flex gap-4 mb-8 pb-8 border-b border-gray-100">
                        <img 
                            src={property.image} 
                            className="w-20 h-20 rounded-2xl object-cover shadow-sm"
                            alt={property.location}
                        />
                        <div className="flex flex-col justify-center">
                            <h2 className="text-xs font-black text-brand-on-surface leading-snug mb-1 uppercase tracking-tight line-clamp-2">
                                {property.location}
                            </h2>
                            <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {property.city}
                            </p>
                        </div>
                    </div>

                    <h3 className="font-black text-brand-on-surface mb-6 uppercase tracking-widest text-[10px]">Detalle del costo</h3>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                            <span>Primera mensualidad</span>
                            <span className="text-brand-on-surface">{property.price} Bs.</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                            <div className="flex items-center gap-1">
                                <span>Seguro de plataforma</span>
                                <Info className="w-3 h-3" />
                            </div>
                            <span className="text-brand-on-surface">{serviceFee} Bs.</span>
                        </div>
                        
                        <div className="pt-6 mt-6 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-sm font-black text-brand-on-surface">Total a pagar</span>
                            <span className="text-2xl font-black text-primary tracking-tighter">{total} Bs.</span>
                        </div>
                    </div>

                    <p className="text-[9px] text-center text-gray-400 mt-8 px-4 font-bold uppercase tracking-wider leading-relaxed">
                        Pago seguro vía QR compatible con todos los bancos de Bolivia
                    </p>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Confirmation;
