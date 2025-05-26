import React, { useState } from 'react';

const Juegos = ({ userData, setUserData }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, win, lose
  const [selectedItems, setSelectedItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  // Materiales para clasificación
  const materiales = [
    { id: 1, name: 'Botella de plástico', type: 'plastico', image: '🧴' },
    { id: 2, name: 'Periódico', type: 'papel', image: '📰' },
    { id: 3, name: 'Lata de aluminio', type: 'metal', image: '🥫' },
    { id: 4, name: 'Vaso de vidrio', type: 'vidrio', image: '🥛' },
    { id: 5, name: 'Cáscara de banana', type: 'organico', image: '🍌' },
    { id: 6, name: 'Celular viejo', type: 'electronico', image: '📱' }
  ];

  // Cartas para memorama
  const cartasMemorama = [
    { id: 1, emoji: '🌱', matched: false },
    { id: 2, emoji: '🌍', matched: false },
    { id: 3, emoji: '♻️', matched: false },
    { id: 4, emoji: '🍃', matched: false },
    { id: 5, emoji: '🌱', matched: false },
    { id: 6, emoji: '🌍', matched: false },
    { id: 7, emoji: '♻️', matched: false },
    { id: 8, emoji: '🍃', matched: false }
  ].sort(() => Math.random() - 0.5);

  // Clasificación Rápida
  const handleClasificar = (id) => {
    const material = materiales.find(m => m.id === id);
    if (material.type === 'organico') {
      setGameStatus('lose');
    } else {
      setGameStatus('win');
      addPoints(150);
    }
  };

  // Memorama Ecológico
  const handleSelectCard = (id) => {
    if (selectedItems.length < 2 && !selectedItems.includes(id)) {
      setSelectedItems([...selectedItems, id]);
      
      if (selectedItems.length === 1) {
        const card1 = cartasMemorama.find(c => c.id === selectedItems[0]);
        const card2 = cartasMemorama.find(c => c.id === id);
        
        if (card1.emoji === card2.emoji) {
          // Pareja encontrada
          setTimeout(() => {
            addPoints(120);
            setGameStatus('win');
          }, 500);
        } else {
          // No es pareja
          setTimeout(() => {
            setSelectedItems([]);
          }, 1000);
        }
      }
    }
  };

  const addPoints = (points) => {
    const newPoints = (userData.puntosReciclaje || 0) + points;
    const updatedUser = {
      ...userData,
      puntosReciclaje: newPoints,
      mascotaDesbloqueada: newPoints >= 1000
    };
    localStorage.setItem('ecorideUser', JSON.stringify(updatedUser));
    setUserData(updatedUser);
  };

  const resetGame = () => {
    setGameStatus('playing');
    setSelectedItems([]);
    setTimeLeft(30);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Juegos Ecológicos</h2>
        
        {!currentGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Clasificación Rápida</h3>
              <p className="mb-4">Clasifica los residuos correctamente antes de que se acabe el tiempo.</p>
              <button 
                onClick={() => setCurrentGame('clasificacion')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Jugar (150 puntos)
              </button>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Memorama Ecológico</h3>
              <p className="mb-4">Encuentra las parejas de elementos reciclables.</p>
              <button 
                onClick={() => setCurrentGame('memorama')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Jugar (120 puntos)
              </button>
            </div>
          </div>
        ) : currentGame === 'clasificacion' ? (
          <div>
            <button 
              onClick={() => setCurrentGame(null)} 
              className="mb-4 text-gray-600 hover:text-green-600"
            >
              ← Volver a los juegos
            </button>
            
            {gameStatus === 'playing' ? (
              <div>
                <h3 className="text-xl font-semibold mb-4">Clasificación Rápida</h3>
                <p className="mb-4">Selecciona todos los materiales reciclables:</p>
                <div className="grid grid-cols-2 gap-4">
                  {materiales.map(material => (
                    <button
                      key={material.id}
                      onClick={() => handleClasificar(material.id)}
                      className="bg-white border-2 border-gray-200 p-4 rounded-lg flex items-center justify-center text-4xl hover:shadow-md"
                    >
                      {material.image} {material.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`p-6 rounded-lg ${gameStatus === 'win' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {gameStatus === 'win' ? (
                  <>
                    <p className="text-2xl mb-4">¡Correcto! +150 puntos</p>
                    <p>Has clasificado bien los materiales reciclables.</p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl mb-4">¡Oops!</p>
                    <p>Algunos materiales no eran reciclables. Intenta de nuevo.</p>
                  </>
                )}
                <button
                  onClick={resetGame}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Jugar otra vez
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <button 
              onClick={() => setCurrentGame(null)} 
              className="mb-4 text-gray-600 hover:text-green-600"
            >
              ← Volver a los juegos
            </button>
            
            <h3 className="text-xl font-semibold mb-4">Memorama Ecológico</h3>
            <div className="grid grid-cols-4 gap-4">
              {cartasMemorama.map(carta => (
                <button
                  key={carta.id}
                  onClick={() => handleSelectCard(carta.id)}
                  disabled={selectedItems.includes(carta.id) || gameStatus === 'win'}
                  className={`aspect-square flex items-center justify-center text-4xl rounded-lg ${selectedItems.includes(carta.id) ? 'bg-green-200' : 'bg-blue-200'}`}
                >
                  {selectedItems.includes(carta.id) ? carta.emoji : '❓'}
                </button>
              ))}
            </div>
            
            {gameStatus === 'win' && (
              <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-lg">
                <p className="text-xl">¡Encontraste una pareja! +120 puntos</p>
                <button
                  onClick={resetGame}
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg"
                >
                  Continuar jugando
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Juegos;