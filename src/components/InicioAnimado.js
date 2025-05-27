import React from 'react';

const InicioAnimado = ({ setCurrentPage }) => {
  return (
    <div className="relative min-h-screen bg-green-500 flex flex-col items-center justify-center overflow-hidden text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
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
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-planet {
          animation: float 5s ease-in-out infinite, spin-left 100s linear infinite;
          opacity: 0.1;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounceIn 1s ease-out;
        }

        .button-anim:hover {
          transform: scale(1.1);
          background-color: #15803d; /* verde oscuro */
          color: white;
        }
      `}</style>

      {/* Planeta Tierra girando al fondo */}
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
        <svg
          className="w-[500px] h-[500px] animate-planet"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
            10-4.48 10-10S17.52 2 12 2zm4.83 15.24c-.78.55-1.85.95-2.83 1.05-.21-.47-.35-.96-.41-1.46-.13-1.11-.94-2.06-2.04-2.41-.48-.16-.91-.47-1.21-.88l-.9-1.3c-.28-.4-.39-.9-.31-1.37.16-.94.9-1.7 1.84-1.89.48-.1.98.01 1.39.3.49.33.85.82 1.07 1.38.15.36.49.61.88.67.54.09 1.05.35 1.45.74.53.5.8 1.2.75 1.91-.03.47.17.94.54 1.24.6.5.85 1.29.65 2.02z" />
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center">
        <h1 className="text-7xl font-extrabold text-white mb-10 animate-fade-in-up">
          EcoRide
        </h1>
        <button
          onClick={() => setCurrentPage('registro')}
          className="bg-white text-green-700 px-10 py-4 rounded-full text-xl font-bold shadow-xl transition-all duration-300 transform animate-bounce-in button-anim"
        >
          ¡Empieza a Reciclar!
        </button>
      </div>
    </div>
  );
};

export default InicioAnimado;
