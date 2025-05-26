import React from 'react';

const InicioAnimado = ({ setCurrentPage }) => {
  return (
    <div className="relative min-h-screen bg-green-500 flex flex-col items-center justify-center overflow-hidden">
      {/* Símbolo de reciclaje de fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg className="w-64 h-64 text-white animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.59 15.59L12 19.17L8.41 15.59C7.63 14.81 7.63 13.55 8.41 12.77L12 9.18L15.59 12.77C16.37 13.55 16.37 14.81 15.59 15.59ZM12 5.83L8.41 9.41L12 13L15.59 9.41L12 5.83Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-white mb-8 animate-fade-in-up">EcoRide</h1>
        <button
          onClick={() => setCurrentPage('registro')}
          className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors animate-bounce-in"
        >
          ¡Empieza a Reciclar!
        </button>
      </div>
    </div>
  );
};

export default InicioAnimado;