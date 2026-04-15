import React, { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Check if it's iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIOSDevice);

        // Check if already in standalone mode
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
                          || window.navigator.standalone 
                          || document.referrer.includes('android-app://');

        if (isStandalone) return;

        // Chrome / Android handling
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Delay showing the prompt for better UX
            setTimeout(() => setIsVisible(true), 3000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // For iOS, show after some time if not standalone
        if (isIOSDevice && !isStandalone) {
            setTimeout(() => setIsVisible(true), 5000);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        
        setDeferredPrompt(null);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-24 left-5 right-5 z-[100] md:max-w-md md:left-auto md:right-10"
            >
                <div className="bg-brand-on-surface text-white p-5 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -mr-16 -mt-16 rounded-full" />
                    
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-2xl">
                            <Download className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 pr-6">
                            <h4 className="font-extrabold text-sm mb-1 uppercase tracking-tight">Instalar Mi Garaje</h4>
                            <p className="text-[11px] text-white/70 leading-relaxed">
                                {isIOS 
                                    ? 'Toca el botón "Compartir" y luego "Agregar a inicio" para una experiencia inmaculada.' 
                                    : 'Añade Mi Garaje a tu pantalla de inicio para acceder rápido y recibir notificaciones.'}
                            </p>
                        </div>
                    </div>

                    {!isIOS && (
                        <button 
                            onClick={handleInstallClick}
                            className="mt-4 w-full bg-white text-black font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-all active:scale-95"
                        >
                            Instalar ahora
                        </button>
                    )}
                    
                    {isIOS && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-white/50 bg-white/5 py-2 rounded-xl border border-white/5">
                            <Share className="w-4 h-4" />
                            <span>Compartir {">"} Agregar a inicio</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default InstallPrompt;
