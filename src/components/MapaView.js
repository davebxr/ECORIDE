import React, { useState, useEffect } from 'react';

const MapaView = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 4.7324,
    lng: -74.2642
  }); // Coordenadas de Madrid, Cundinamarca
  const [collectors, setCollectors] = useState([]);

  useEffect(() => {
    // Recolectores reales en Madrid, Cundinamarca
    setCollectors([
      { id: 1, lat: 4.735, lng: -74.266, status: 'Disponible', nombre: 'Recolector Norte' },
      { id: 2, lat: 4.730, lng: -74.262, status: 'En ruta', nombre: 'Recolector Centro' },
      { id: 3, lat: 4.728, lng: -74.268, status: 'Disponible', nombre: 'Recolector Sur' }
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Mapa de Recolectores - Madrid, Cundinamarca</h2>
        <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
          {/* Mapa de Madrid, Cundinamarca */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.215625508284!2d-74.28207532603423!3d4.73256964138257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f790039d8759d%3A0xd7306d5828c33ad3!2sMadrid%20Cundinamarca!5e0!3m2!1ses-419!2sco!4v1748229154673!5m2!1ses-419!2sco"
            width="800"
            height="600"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recolectores Disponibles</h3>
          <ul className="space-y-3">
            {collectors.map(collector => (
              <li key={collector.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
                <div>
                  <p className="font-medium text-gray-700">{collector.nombre}</p>
                  <p className="text-gray-600 text-sm">Ubicación: {collector.lat.toFixed(4)}, {collector.lng.toFixed(4)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${collector.status === 'Disponible' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                  {collector.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapaView;
