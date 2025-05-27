import React from 'react';

const InicioAnimado = ({ setCurrentPage }) => {
  return (
    <div className="relative min-h-screen bg-green-500 flex flex-col items-center justify-center overflow-hidden">
      {/* Estilos embebidos */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-left {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float-spin-left {
          animation: float 6s ease-in-out infinite, spin-left 60s linear infinite;
        }
        .animate-bounce-in {
          animation: bounceIn 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s ease-out forwards;
        }
      `}</style>

      {/* Planeta Tierra animado de fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg
          className="w-64 h-64 text-white animate-float-spin-left"
          viewBox="0 0 46.002 46.002"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Aquí se insertaría el contenido del SVG detallado de la Tierra */}
          {/* Por razones de espacio, se omite el contenido completo del SVG */}
          {/* Puedes copiar y pegar el contenido del SVG desde el enlace proporcionado */}
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center">
        <h1 className="text-7xl font-extrabold text-white mb-10 animate-fade-in-up">EcoRide</h1>
        <button
          onClick={() => setCurrentPage('registro')}
          className="bg-white text-green-700 px-10 py-4 rounded-full text-xl font-bold shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-green-600 hover:text-white animate-bounce-in"
        >
          ¡Empieza a Reciclar!
        </button>
      </div>
    </div>
  );
};

export default InicioAnimado;
