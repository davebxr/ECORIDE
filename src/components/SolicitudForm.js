import React, { useState } from 'react';

const SolicitudForm = ({ userData, setUserData }) => {
  const [solicitudData, setSolicitudData] = useState({
    tipoResiduo: '',
    pesoEstimado: '',
    fechaRecoleccion: '',
    notas: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSolicitudData({ ...solicitudData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaSolicitud = {
      ...solicitudData,
      estado: 'Pendiente',
      fecha: new Date().toISOString().split('T')[0]
    };
    
    const updatedUser = {
      ...userData,
      solicitudesAnteriores: [...(userData.solicitudesAnteriores || []), nuevaSolicitud],
      puntosReciclaje: (userData.puntosReciclaje || 0) + Math.floor(solicitudData.pesoEstimado * 10) // 10 puntos por kg
    };
    
    localStorage.setItem('ecorideUser', JSON.stringify(updatedUser));
    setUserData(updatedUser);
    setSolicitudData({ tipoResiduo: '', pesoEstimado: '', fechaRecoleccion: '', notas: '' });
    alert('Solicitud de recolección enviada con éxito!');
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Solicitar Recolección</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="tipoResiduo">
              Tipo de Residuo
            </label>
            <select
              id="tipoResiduo"
              name="tipoResiduo"
              value={solicitudData.tipoResiduo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            >
              <option value="">Selecciona un tipo</option>
              <option value="papel">Papel y Cartón</option>
              <option value="plastico">Plástico</option>
              <option value="vidrio">Vidrio</option>
              <option value="metal">Metal</option>
              <option value="organico">Orgánico</option>
              <option value="electronicos">Electrónicos</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="pesoEstimado">
              Peso Estimado (kg)
            </label>
            <input
              type="number"
              id="pesoEstimado"
              name="pesoEstimado"
              value={solicitudData.pesoEstimado}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fechaRecoleccion">
              Fecha Preferida de Recolección
            </label>
            <input
              type="date"
              id="fechaRecoleccion"
              name="fechaRecoleccion"
              value={solicitudData.fechaRecoleccion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="notas">
              Notas Adicionales
            </label>
            <textarea
              id="notas"
              name="notas"
              value={solicitudData.notas}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Enviar Solicitud
          </button>
        </form>
      </div>
    </div>
  );
};

export default SolicitudForm;