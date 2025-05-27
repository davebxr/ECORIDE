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
          50% { transform: translateY(-10px); }
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

        @keyframes fall {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        .animate-tree {
          animation: float 6s ease-in-out infinite;
          opacity: 0.25;
        }

        .leaf {
          position: absolute;
          width: 15px;
          height: 15px;
          background-color: #bbf7d0;
          clip-path: polygon(50% 0%, 100% 40%, 70% 100%, 30% 100%, 0% 40%);
          opacity: 0.8;
          animation: fall linear infinite;
        }

        .leaf1 { left: 10%; animation-duration: 6s; animation-delay: 0s; }
        .leaf2 { left: 25%; animation-duration: 7s; animation-delay: 1s; }
        .leaf3 { left: 40%; animation-duration: 8s; animation-delay: 0.5s; }
        .leaf4 { left: 55%; animation-duration: 9s; animation-delay: 2s; }
        .leaf5 { left: 70%; animation-duration: 6.5s; animation-delay: 1.2s; }
        .leaf6 { left: 85%; animation-duration: 8s; animation-delay: 0.8s; }

        .button-anim:hover {
          transform: scale(1.1);
          background-color: #15803d;
          color: white;
        }
      `}</style>

      {/* Árbol SVG más bonito */}
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
        <svg
          className="w-[350px] h-[350px] animate-tree"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tronco */}
          <path fill="#6B4226" d="M58 68h12v40H58z" />

          {/* Copa principal */}
          <circle cx="64" cy="40" r="24" fill="#22C55E" />
          <circle cx="48" cy="48" r="18" fill="#16A34A" />
          <circle cx="80" cy="48" r="18" fill="#16A34A" />
          <circle cx="64" cy="60" r="20" fill="#15803D" />

          {/* Hojas extra */}
          <ellipse cx="40" cy="40" rx="8" ry="6" fill="#22C55E" />
          <ellipse cx="88" cy="40" rx="8" ry="6" fill="#22C55E" />
          <ellipse cx="64" cy="24" rx="6" ry="8" fill="#22C55E" />
        </svg>
      </div>

      {/* Hojas verdes cayendo */}
      <div className="leaf leaf1" />
      <div className="leaf leaf2" />
      <div className="leaf leaf3" />
      <div className="leaf leaf4" />
      <div className="leaf leaf5" />
      <div className="leaf leaf6" />

      {/* Contenido principal con efecto de seguimiento del mouse */}
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
