import React, { useEffect, useState } from 'react';

const InicioAnimado = ({ setCurrentPage }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / innerWidth) * 20;
      const y = ((e.clientY - innerHeight / 2) / innerHeight) * 20;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-green-500 flex flex-col items-center justify-center overflow-hidden text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes fall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }

        .animate-tree {
          animation: float 6s ease-in-out infinite;
          opacity: 0.1;
        }

        .leaf {
          position: absolute;
          width: 20px;
          height: 20px;
          background-color: white;
          border-radius: 50%;
          opacity: 0.7;
          animation: fall linear infinite;
        }

        .leaf1 { left: 10%; animation-duration: 7s; animation-delay: 0s; }
        .leaf2 { left: 25%; animation-duration: 9s; animation-delay: 1s; }
        .leaf3 { left: 40%; animation-duration: 6s; animation-delay: 2s; }
        .leaf4 { left: 60%; animation-duration: 8s; animation-delay: 0.5s; }
        .leaf5 { left: 75%; animation-duration: 10s; animation-delay: 1.5s; }

        .button-anim:hover {
          transform: scale(1.1);
          background-color: #15803d;
          color: white;
        }
      `}</style>

      {/* Árbol animado en el fondo */}
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
        <svg
          className="w-[400px] h-[400px] animate-tree"
          viewBox="0 0 64 64"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M32 2C25 6 20 13 20 20c0 4 2 7 4 10-3 1-6 4-6 8 0 4 3 7 6 8-4 3-6 8-6 12h28c0-4-2-9-6-12 3-1 6-4 6-8 0-4-3-7-6-8 2-3 4-6 4-10 0-7-5-14-12-18zM30 60h4V48h-4v12z" />
        </svg>
      </div>

      {/* Hojas cayendo */}
      <div className="leaf leaf1" />
      <div className="leaf leaf2" />
      <div className="leaf leaf3" />
      <div className="leaf leaf4" />
      <div className="leaf leaf5" />

      {/* Contenido principal con efecto parallax */}
      <div
        className="relative z-10 text-center transition-transform duration-200 ease-out"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        <h1 className="text-7xl font-extrabold text-white mb-10 animate-[fadeInUp_1s_ease-out_forwards]">
          EcoRide
        </h1>
        <button
          onClick={() => setCurrentPage('registro')}
          className="bg-white text-green-700 px-10 py-4 rounded-full text-xl font-bold shadow-xl transition-all duration-300 transform animate-[bounceIn_1s_ease-out] button-anim"
        >
          ¡Empieza a Reciclar!
        </button>
      </div>
    </div>
  );
};

export default InicioAnimado;
