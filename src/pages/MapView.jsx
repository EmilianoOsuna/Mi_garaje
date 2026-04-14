import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ChevronLeft, Star } from 'lucide-react';

// Fix default marker icons broken by Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom terracotta price-tag icon
const createBrandIcon = (price) =>
  L.divIcon({
    className: '',
    html: `
      <div style="
        background: #d34027;
        color: white;
        font-family: Manrope, sans-serif;
        font-weight: 900;
        font-size: 11px;
        padding: 5px 10px;
        border-radius: 20px;
        border: 2px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        white-space: nowrap;
        transform: translateX(-50%);
        display: inline-block;
      ">
        ${price} Bs.
      </div>
      <div style="
        width: 8px; height: 8px;
        background: #d34027;
        border: 2px solid white;
        border-radius: 50%;
        margin: 2px auto 0;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      "></div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

// Auto-fit map to all markers after mount
const AutoFit = ({ properties }) => {
  const map = useMap();

  useEffect(() => {
    if (!properties?.length) return;
    const bounds = L.latLngBounds(properties.map((p) => p.coords));
    // Small delay ensures container is fully painted before fitting
    const t = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    }, 100);
    return () => clearTimeout(t);
  }, [map, properties]);

  return null;
};

// Branded zoom controls
const ZoomControls = () => {
  const map = useMap();
  return (
    <div className="absolute bottom-10 right-4 z-[1000] flex flex-col gap-2">
      <button
        onClick={() => map.zoomIn()}
        className="w-11 h-11 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center font-black text-base text-brand-on-surface active:scale-95 transition-all"
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="w-11 h-11 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center font-black text-base text-brand-on-surface active:scale-95 transition-all"
      >
        −
      </button>
    </div>
  );
};

const MapView = ({ properties, onBack, onSelectProperty }) => {
  const center = useMemo(() => [-17.3935, -66.157], []);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', fontFamily: 'Manrope, sans-serif' }}>
      {/* Floating Header */}
      <header
        style={{ position: 'absolute', top: 24, left: 20, right: 20, zIndex: 1000 }}
        className="flex items-center justify-between pointer-events-none"
      >
        <button
          onClick={onBack}
          className="pointer-events-auto w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-100 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-brand-on-surface" />
        </button>

        <div className="pointer-events-auto bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse block" />
          <span className="text-[10px] font-black text-brand-on-surface uppercase tracking-widest">
            Explorando Espacios
          </span>
        </div>

        <div className="w-12" />
      </header>

      {/* Map */}
      <MapContainer
        center={center}
        zoom={6}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {properties?.map((prop) => (
          <Marker key={prop.id} position={prop.coords} icon={createBrandIcon(prop.price)}>
            <Popup closeButton={false} className="custom-popup">
              <div style={{ width: 192, overflow: 'hidden', borderRadius: 16, background: 'white' }}>
                <img
                  src={prop.image}
                  alt={prop.location}
                  style={{ height: 112, width: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ maxWidth: '65%' }}>
                      <p style={{ fontSize: 10, fontWeight: 900, color: '#1a202c', textTransform: 'uppercase', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {prop.location}
                      </p>
                      <p style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {prop.city}
                      </p>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 9, fontWeight: 700, color: '#6b7280', background: '#f9fafb', padding: '3px 6px', borderRadius: 20 }}>
                      ★ {prop.rating}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, borderTop: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: '#d34027' }}>{prop.price} <span style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af' }}>Bs/mes</span></span>
                    <button
                      onClick={() => onSelectProperty(prop)}
                      style={{ background: '#1a202c', color: 'white', border: 'none', padding: '5px 12px', borderRadius: 8, fontSize: 9, fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '0.05em' }}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <AutoFit properties={properties} />
        <ZoomControls />
      </MapContainer>

      {/* Popup style overrides */}
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 16px !important;
          overflow: hidden !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15) !important;
          border: none !important;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0 !important;
          width: 192px !important;
        }
        .custom-popup .leaflet-popup-tip-container {
          display: none !important;
        }
        .leaflet-popup-close-button {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default MapView;
