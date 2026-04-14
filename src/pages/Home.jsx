import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/ui/PropertyCard';
import StyledSelect from '../components/ui/StyledSelect';
import { Search, MapPin, Calendar, LayoutGrid, Box, Car } from 'lucide-react';
import { properties } from '../data/mockData';

const Home = ({ onSelectProperty, onNavigate }) => {
  const [selectedPlan, setSelectedPlan] = useState('Mensual');
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [locationInput, setLocationInput] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  const planOptions = [
    { value: 'Mensual', label: 'Mensual' },
    { value: 'Diario', label: 'Diario' }
  ];

  // Initialize and handle category filter
  useEffect(() => {
    filterData(activeCategory, '');
  }, [activeCategory]);

  const filterData = (category, search) => {
    let result = properties;

    // Category Filter
    if (category !== 'Todo') {
      const typeKey = category === 'Garajes' ? 'garaje' : 'baulera';
      result = result.filter(p => p.type === typeKey);
    }

    // Keyword Filter
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(p => 
        p.location.toLowerCase().includes(query) || 
        p.city.toLowerCase().includes(query)
      );
    }

    setFilteredProperties(result);
  };

  const handleSearch = () => {
    filterData(activeCategory, locationInput);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-manrope relative">
      <main className="pt-24 px-5 max-w-7xl mx-auto pb-32">
        {/* Desktop Layout Split: Hero + Search */}
        <div className="flex flex-col lg:flex-row gap-10 mb-12 items-start">
          <section className="flex-1">
                <h2 className="text-xl md:text-3xl font-extrabold text-brand-on-surface mb-2 tracking-tight">
                    Encuentra tu próximo <span className="text-primary"><i>espacio seguro</i></span>.
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mb-8 max-w-md leading-relaxed">
                    Explora más de 200 garajes y bauleras verificadas en las mejores zonas de Bolivia. Gestiona tu alquiler desde un solo lugar.
                </p>

            {/* Categories Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-8 lg:mb-0">
              <button 
                onClick={() => setActiveCategory('Todo')}
                type="button" 
                className={`inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full px-5 py-2 text-[10px] font-bold transition-all active:scale-95 ${activeCategory === 'Todo' ? 'bg-primary text-white shadow-sm' : 'border border-gray-100 bg-white text-gray-500 hover:border-primary/20 hover:text-primary'}`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Todo</span>
              </button>
              <button 
                onClick={() => setActiveCategory('Garajes')}
                type="button" 
                className={`inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full px-5 py-2 text-[10px] font-bold transition-all active:scale-95 ${activeCategory === 'Garajes' ? 'bg-primary text-white shadow-sm' : 'border border-gray-100 bg-white text-gray-500 hover:border-primary/20 hover:text-primary'}`}
              >
                <Car className="h-4 w-4" />
                <span>Garajes</span>
              </button>
              <button 
                onClick={() => setActiveCategory('Bauleras')}
                type="button" 
                className={`inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full px-5 py-2 text-[10px] font-bold transition-all active:scale-95 ${activeCategory === 'Bauleras' ? 'bg-primary text-white shadow-sm' : 'border border-gray-100 bg-white text-gray-500 hover:border-primary/20 hover:text-primary'}`}
              >
                <Box className="h-4 w-4" />
                <span>Bauleras</span>
              </button>
            </div>
          </section>

          {/* Search Card */}
          <div className="w-full lg:max-w-md bg-white rounded-3xl p-6 shadow-premium border border-gray-50 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="relative">
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">¿Dónde buscas?</label>
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3.5 border border-transparent focus-within:border-primary/20 transition-all">
                  <MapPin className="w-5 h-5 text-primary" />
                  <input
                    type="text"
                    placeholder="Sopocachi, La Paz"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full border-none bg-transparent text-sm font-semibold text-brand-on-surface outline-none"
                  />
                </div>
              </div>

              <div className="relative">
                <StyledSelect
                  label="Plan"
                  options={planOptions}
                  value={selectedPlan}
                  onChange={setSelectedPlan}
                  icon={Calendar}
                />
              </div>
            </div>

            <button 
              onClick={handleSearch}
              type="button" 
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-hover active:scale-[0.98]"
            >
              <Search className="w-5 h-5" />
              <span>Buscar ahora</span>
            </button>
          </div>
        </div>

        {/* Property Grid */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-extrabold tracking-tight text-brand-on-surface">
              {activeCategory === 'Todo' ? 'Espacios destacados' : `Resultados: ${activeCategory}`}
            </h3>
            <button 
              onClick={() => {
                setActiveCategory('Todo');
                setLocationInput('');
              }}
              type="button" 
              className="text-sm font-bold text-primary underline transition-opacity hover:opacity-80"
            >
              Ver todos
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((prop) => (
                <div key={prop.id} onClick={() => onSelectProperty(prop)} className="cursor-pointer">
                  <PropertyCard {...prop} />
                </div>
              ))
            ) : (
                <div className="col-span-full py-20 text-center">
                    <Box className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold">No encontramos espacios con esos filtros.</p>
                </div>
            )}
          </div>
        </section>

        {/* Map Promo Card */}
        <section className="mt-20 bg-brand-on-surface rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden group">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h4 className="font-extrabold text-2xl md:text-3xl mb-4 group-hover:scale-105 transition-transform duration-500">¿Prefieres la vista de mapa?</h4>
            <p className="text-sm text-white/70 mb-8 leading-relaxed font-medium">
              Ubica instantáneamente los garajes verificados en tu zona actual. Perfecto para encontrar tu lugar sobre la marcha o en zonas residenciales densas.
            </p>
            <button 
                onClick={() => {
                    console.log('Opening Map...');
                    onNavigate('map');
                }}
                type="button" 
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-10 py-3 text-sm font-black text-black transition-all hover:bg-gray-100 hover:shadow-xl active:scale-95"
            >
              <MapPin className="h-5 h-5 text-primary transition-colors" />
              Abrir Mapa Interactivo
            </button>
          </div>
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
        </section>
      </main>

    </div>
  );
};

export default Home;
