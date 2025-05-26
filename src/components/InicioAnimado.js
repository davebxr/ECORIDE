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
          animation: float 6s ease-in-out infinite, spin 20s linear infinite;
        }
        .animate-bounce-in {
          animation: bounceIn 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s ease-out forwards;
        }
      `}</style>

      {/* Símbolo de reciclaje real, animado */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg
          className="w-64 h-64 text-white animate-float-spin"
          viewBox="0 0 512 512"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M244.7 75.1c8.1-14 24-22.4 40.3-22.4s32.2 8.4 40.3 22.4l45.2 77.8-27.7 16-45.2-77.8c-2.7-4.6-7.6-7.4-13-7.4s-10.3 2.8-13 7.4l-45.2 77.8-27.7-16 45.2-77.8zm156.4 96.9l78.9 45.5c14 8.1 22.4 24 22.4 40.3s-8.4 32.2-22.4 40.3l-77.8 45.2-16-27.7 77.8-45.2c4.6-2.7 7.4-7.6 7.4-13s-2.8-10.3-7.4-13l-77.8-45.2 16-27.7zm-23.2 267.9c-8.1 14-24 22.4-40.3 22.4s-32.2-8.4-40.3-22.4l-45.2-77.8 27.7-16 45.2 77.8c2.7 4.6 7.6 7.4 13 7.4s10.3-2.8 13-7.4l45.2-77.8 27.7 16-45.2 77.8zM110.7 339.2l-78.9-45.5C17.8 285.6 9.4 269.7 9.4 253.4s8.4-32.2 22.4-40.3l77.8-45.2 16 27.7-77.8 45.2c-4.6 2.7-7.4 7.6-7.4 13s2.8 10.3 7.4 13l77.8 45.2-16 27.7zM88.6 172.1l-45.5 78.9c-8.1 14-8.1 31.1 0 45.1l45.5 78.9c8.1 14 24 22.4 40.3 22.4s32.2-8.4 40.3-22.4l45.2-77.8-27.7-16-45.2 77.8c-2.7 4.6-7.6 7.4-13 7.4s-10.3-2.8-13-7.4l-45.2-77.8c-2.7-4.6-2.7-10.3 0-14.9l45.2-77.8-27.7-16z" />
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
