// Each property uses a unique, locally-stored image asset
import sczImg    from '../assets/scz.png';      // Santa Cruz street garage
import lpzImg    from '../assets/lpz.png';      // La Paz Titanium building
import cbbaImg   from '../assets/cbba.png';     // Cochabamba Sirari
import cbba2Img  from '../assets/cbba2.png';    // Cochabamba Parking Privado
import storageImg  from '../assets/storage.png';   // Storage unit 1
import scz2Img   from '../assets/scz2.png';     // Santa Cruz rooftop
import lpz2Img   from '../assets/lpz2.png';     // La Paz underground
import cbba3Img  from '../assets/cbba3.png';    // Cochabamba Recoleta
import storage2Img from '../assets/storage2.png';  // Baulera Achumani
import lpz3Img   from '../assets/lpz3.png';     // La Paz Miraflores
import storage3Img from '../assets/storage3.png';  // Baulera Los Sauces
import cbba4Img  from '../assets/cbba4.png';    // Cochabamba El Prado

export const properties = [
  // ── La Paz ──────────────────────────────────────────────────────────────
  {
    id: 1,
    image: lpzImg,
    location: 'Garaje Amplio Edificio Titanium',
    city: 'Sopocachi, La Paz',
    size: 25,
    price: 450,
    rating: 4.8,
    verified: true,
    type: 'garaje',
    coords: [-16.505, -68.130],
  },
  {
    id: 4,
    image: lpz2Img,
    location: 'Estacionamiento Zona Sur',
    city: 'Calacoto, La Paz',
    size: 20,
    price: 600,
    rating: 4.9,
    verified: true,
    type: 'garaje',
    coords: [-16.538, -68.093],
  },
  {
    id: 5,
    image: lpz3Img,
    location: 'Garaje Subterráneo Torres Hansa',
    city: 'Miraflores, La Paz',
    size: 22,
    price: 520,
    rating: 4.7,
    verified: true,
    type: 'garaje',
    coords: [-16.490, -68.115],
  },
  {
    id: 6,
    image: storage2Img,
    location: 'Baulera Premium Achumani',
    city: 'Achumani, La Paz',
    size: 10,
    price: 250,
    rating: 4.6,
    verified: false,
    type: 'baulera',
    coords: [-16.562, -68.075],
  },

  // ── Santa Cruz ──────────────────────────────────────────────────────────
  {
    id: 2,
    image: sczImg,
    location: 'Baulera Residencial Ventura',
    city: 'Equipetrol, Santa Cruz',
    size: 18,
    price: 320,
    rating: 4.7,
    verified: false,
    type: 'baulera',
    coords: [-17.761, -63.195],
  },
  {
    id: 3,
    image: cbbaImg,
    location: 'Parking Privado 24/7',
    city: 'Sirari, Santa Cruz',
    size: 22,
    price: 500,
    rating: 5.0,
    verified: true,
    type: 'garaje',
    coords: [-17.765, -63.200],
  },
  {
    id: 7,
    image: scz2Img,
    location: 'Terraza Parking Edificio Ámbar',
    city: 'Urubo, Santa Cruz',
    size: 28,
    price: 480,
    rating: 4.8,
    verified: true,
    type: 'garaje',
    coords: [-17.740, -63.232],
  },
  {
    id: 8,
    image: storage3Img,
    location: 'Baulera Condominio Los Sauces',
    city: 'Plan 3000, Santa Cruz',
    size: 12,
    price: 200,
    rating: 4.5,
    verified: false,
    type: 'baulera',
    coords: [-17.800, -63.170],
  },
  {
    id: 9,
    image: storageImg,
    location: 'Garaje Cubierto Villa Olímpica',
    city: 'Villa Olímpica, Santa Cruz',
    size: 24,
    price: 410,
    rating: 4.6,
    verified: true,
    type: 'garaje',
    coords: [-17.780, -63.182],
  },

  // ── Cochabamba ──────────────────────────────────────────────────────────
  {
    id: 10,
    image: cbba4Img,
    location: 'Parking Residencial El Prado',
    city: 'El Prado, Cochabamba',
    size: 20,
    price: 380,
    rating: 4.7,
    verified: true,
    type: 'garaje',
    coords: [-17.390, -66.155],
  },
  {
    id: 11,
    image: cbba3Img,
    location: 'Garaje Cubierto Recoleta',
    city: 'Recoleta, Cochabamba',
    size: 18,
    price: 350,
    rating: 4.5,
    verified: true,
    type: 'garaje',
    coords: [-17.370, -66.147],
  },
  {
    id: 12,
    image: cbba2Img,
    location: 'Baulera Climatizada Queru Queru',
    city: 'Queru Queru, Cochabamba',
    size: 15,
    price: 290,
    rating: 4.9,
    verified: true,
    type: 'baulera',
    coords: [-17.375, -66.160],
  },
];
