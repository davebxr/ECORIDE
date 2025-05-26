import React from 'react';

const UsuarioProfile = ({ userData }) => {
  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 text-center">
        <p className="text-red-600">No se encontraron datos de usuario.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Perfil de Usuario</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h3>
          <div className="space-y-3 text-gray-700">
            <p><span className="font-medium">Nombre:</span> {userData.nombre}</p>
            <p><span className="font-medium">Correo:</span> {userData.email}</p>
            <p><span className="font-medium">Dirección:</span> {userData.direccion}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Puntos de Reciclaje</h3>
          <p className="text-green-600 text-3xl font-bold text-center">{userData.puntosReciclaje}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Historial de Solicitudes</h3>
          {userData.solicitudesAnteriores && userData.solicitudesAnteriores.length > 0 ? (
            <ul className="space-y-3">
              {userData.solicitudesAnteriores.map((solicitud, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium text-gray-700">{solicitud.tipo} ({solicitud.peso} kg)</p>
                    <p className="text-gray-600 text-sm">Fecha: {solicitud.fecha}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${solicitud.estado === 'Completada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {solicitud.estado}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">Aún no tienes solicitudes de recolección.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsuarioProfile;