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
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
        .animate-float-spin {
          animation: float 6s ease-in-out infinite, spin 60s linear infinite;
        }
        .animate-bounce-in {
          animation: bounceIn 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s ease-out forwards;
        }
      `}</style>

      {/* Planeta animado de fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg
          className="w-64 h-64 text-white animate-float-spin"
          viewBox="0 0 64 64"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="30" fill="currentColor" />
          <path d="M2 32C2 34 14 40 32 40C50 40 62 34 62 32C62 30 50 24 32 24C14 24 2 30 2 32Z" fill="lightblue"/>
          <path d="M16 20C18 16 28 14 34 18C40 22 42 30 46 34C50 38 54 40 54 40C54 40 52 42 50 42C44 42 40 36 36 32C30 26 22 28 18 24C16 22 16 20 16 20Z" fill="#4ade80"/>
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
