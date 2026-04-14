import React from 'react';
import { Camera, MapPin, LayoutGrid, Info, ArrowRight, ShieldCheck, Box, Car } from 'lucide-react';
import StyledSelect from '../components/ui/StyledSelect';

const Publish = () => {
  const [spaceType, setSpaceType] = React.useState('');

  const typeOptions = [
    { value: 'garaje', label: 'Garaje Techado' },
    { value: 'baulera', label: 'Baulera / Depósito' },
    { value: 'descubierto', label: 'Espacio Descubierto' },
    { value: 'comercial', label: 'Local Comercial' }
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] pt-24 pb-32 font-manrope">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-3xl font-black text-brand-on-surface tracking-tight mb-2">Publica tu espacio</h1>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            Convierte tu garaje o baulera vacía en una fuente de ingresos constante. Miles de conductores buscan seguridad hoy mismo.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Form Column */}
            <div className="md:col-span-3 space-y-8">
                <section className="space-y-4">
                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Información Básica</h2>
                    <div className="space-y-4">
                        <StyledSelect 
                            label="¿Qué tipo de espacio es?"
                            placeholder="Selecciona el tipo..."
                            options={typeOptions}
                            value={spaceType}
                            onChange={setSpaceType}
                            icon={LayoutGrid}
                        />
                        <InputGroup label="Ubicación exacta" placeholder="Calle 12, Calacoto, Edificio..." />
                        <div className="grid grid-cols-2 gap-4">
                            <InputGroup label="Precio mensual (Bs.)" placeholder="450" type="number" />
                            <InputGroup label="Tamaño (m²)" placeholder="20" type="number" />
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Fotos del espacio</h2>
                    <div className="aspect-[16/9] w-full rounded-3xl border-2 border-dashed border-gray-100 bg-white flex flex-col items-center justify-center gap-3 transition-colors hover:border-primary/20 hover:bg-primary/5 cursor-pointer group">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                            <Camera className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subir fotos reales</p>
                    </div>
                </section>

                <button className="w-full bg-primary hover:bg-primary-hover text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-[0.98]">
                    <span>Siguiente paso</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Hint Column */}
            <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-premium border border-gray-50">
                    <h3 className="text-sm font-black text-brand-on-surface mb-4">¿Por qué publicar aquí?</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                            <p className="text-[11px] text-gray-500 font-semibold leading-snug">Garantizamos cobros puntuales cada mes.</p>
                        </li>
                        <li className="flex gap-3">
                            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                            <p className="text-[11px] text-gray-500 font-semibold leading-snug">Filtramos a los inquilinos para tu seguridad.</p>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                    <div className="flex gap-3 items-center mb-3">
                        <Info className="w-5 h-5 text-primary" />
                        <h4 className="text-[10px] font-black uppercase text-primary">Un buen precio</h4>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                        Los garajes en esta zona se alquilan por un promedio de <span className="font-black text-brand-on-surface">420 Bs.</span> mensual.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
        type={type} 
        placeholder={placeholder}
        className="w-full bg-white rounded-2xl px-5 py-4 border border-gray-100 text-sm font-semibold text-brand-on-surface placeholder:text-gray-300 outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
    />
  </div>
);

export default Publish;
