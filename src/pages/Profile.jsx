import React from 'react';
import { User, Shield, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, CheckCircle2 } from 'lucide-react';

const Profile = () => {
    return (
        <div className="min-h-screen bg-[#fdfbf7] pb-32 pt-[calc(env(safe-area-inset-top)+6rem)] font-manrope">
            <div className="max-w-3xl mx-auto px-6">

                {/* Profile Header */}
                <section className="mb-12 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-brand-on-surface to-gray-600 flex items-center justify-center border-4 border-white shadow-xl">
                            <User className="w-14 h-14 text-white/80" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-2xl shadow-lg border border-gray-50">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-black text-brand-on-surface tracking-tight mb-1">Gonzalo Farfán</h1>
                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full mb-6">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase text-primary tracking-widest">Identidad Verificada</span>
                    </div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Usuario desde 2024</p>
                </section>

                {/* Action List */}
                <div className="bg-white rounded-[2.5rem] p-4 shadow-ambient border border-gray-50 overflow-hidden">
                    <ProfileLink
                        icon={<User className="w-5 h-5" />}
                        title="Información Personal"
                        desc="Edita tu nombre, teléfono y documentos."
                    />
                    <ProfileLink
                        icon={<CreditCard className="w-5 h-5" />}
                        title="Métodos de Pago"
                        desc="Gestiona tu cuenta bancaria vinculada."
                    />
                    <ProfileLink
                        icon={<Bell className="w-5 h-5" />}
                        title="Notificaciones"
                        desc="Configura alertas de chat y pagos."
                    />
                    <ProfileLink
                        icon={<Shield className="w-5 h-5" />}
                        title="Seguridad"
                        desc="Cambia tu contraseña y autenticación."
                    />
                    <ProfileLink
                        icon={<HelpCircle className="w-5 h-5" />}
                        title="Centro de Ayuda"
                        desc="Preguntas frecuentes y soporte técnico."
                    />
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <button className="w-full flex items-center justify-between p-4 rounded-3xl hover:bg-red-50 transition-all text-red-500 group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/10 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-black uppercase tracking-tight">Cerrar Sesión</h4>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* App Version Info */}
                <p className="mt-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] opacity-40">
                    Mi Garaje v2.4.0 • Hecho en Bolivia
                </p>
            </div>
        </div>
    );
 };

const ProfileLink = ({ icon, title, desc }) => (
    <button className="w-full flex items-center justify-between p-4 rounded-3xl hover:bg-gray-50 transition-all group">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-active:scale-95">
                {icon}
            </div>
            <div className="text-left">
                <h4 className="text-sm font-black text-brand-on-surface uppercase tracking-tight">{title}</h4>
                <p className="text-[11px] text-gray-400 font-bold leading-tight">{desc}</p>
            </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
    </button>
);

export default Profile;
