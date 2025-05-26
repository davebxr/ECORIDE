import React from 'react';

const MascotaVirtual = ({ userData, setCurrentPage }) => {
  const getArbolStage = (points) => {
    const stage = Math.floor(points / 100);
    if (stage <= 1) return { emoji: '🌱', name: 'Semilla' };
    if (stage === 2) return { emoji: '🪴', name: 'Brote' };
    if (stage === 3) return { emoji: '🌿', name: 'Arbusto' };
    if (stage === 4) return { emoji: '🌳', name: 'Árbol Joven' };
    return { emoji: '🌲', name: 'Árbol Maduro' };
  };

  const arbol = getArbolStage(userData?.puntosReciclaje || 0);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu Árbol Virtual</h2>
        <p className="text-gray-600 mb-6">{arbol.name}</p>

        <div className="flex flex-col items-center mb-6">
          <div className="text-9xl mb-4">{arbol.emoji}</div>
          <p className="text-lg">
            <span className="font-semibold">Puntos:</span> {userData?.puntosReciclaje || 0}
          </p>
          <p className="text-sm text-gray-600">
            Próximo nivel en: {100 - ((userData?.puntosReciclaje || 0) % 100)} puntos
          </p>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-green-600 h-4 rounded-full" 
              style={{ width: `${((userData?.puntosReciclaje || 0) % 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Progreso al próximo nivel</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setCurrentPage('juegos')}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            ¡Juega para hacer crecer tu árbol!
          </button>
          
          <div className="bg-gray-100 p-4 rounded-lg text-left">
            <h3 className="font-semibold mb-2">Evolución de tu árbol:</h3>
            <ul className="text-sm space-y-1">
              <li className="flex items-center"><span className="mr-2">🌱</span> 0-100 puntos: Semilla</li>
              <li className="flex items-center"><span className="mr-2">🪴</span> 100-200 puntos: Brote</li>
              <li className="flex items-center"><span className="mr-2">🌿</span> 200-300 puntos: Arbusto</li>
              <li className="flex items-center"><span className="mr-2">🌳</span> 300-400 puntos: Árbol Joven</li>
              <li className="flex items-center"><span className="mr-2">🌲</span> 400+ puntos: Árbol Maduro</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MascotaVirtual;


// Los cambios principales incluyen:

/*
1. Juego de Clasificación Rápida:
   - Interfaz intuitiva con materiales reales (plástico, vidrio, metal, etc.)
   - Sistema de puntos inmediato al clasificar correctamente
   - Retroalimentación visual al acertar o fallar

2. Memorama Ecológico:
   - 8 cartas con emojis ecológicos
   - Animaciones al encontrar parejas
   - 120 puntos por cada pareja encontrada
   - Sistema de reinicio para seguir jugando

3. Árbol Virtual Evolutivo:
   - 5 etapas de crecimiento (Semilla, Brote, Arbusto, Árbol Joven, Árbol Maduro)
   - Cambia cada 100 puntos
   - Barra de progreso para el siguiente nivel
   - Visualización clara del estado actual
   - Botón directo a los juegos para ganar más puntos

4. Mejoras Generales:
   - Todas las interacciones guardan los puntos en localStorage
   - Diseño responsivo y atractivo
   - Mensajes motivacionales
   - Sistema claro de progreso

Los usuarios ahora pueden:
- Ver su árbol crecer en tiempo real
- Jugar dos juegos completos con mecánicas diferentes
- Seguir su progreso fácilmente
- Ganar puntos de manera divertida mientras aprenden sobre reciclaje

*/