import React, { useState, useEffect } from 'react';

const shuffleCards = () => {
  const baseEmojis = ['🌱', '🌍', '♻️', '🍃', '🌸', '🌊', '🐝', '🍀', '🌾', '🦋'];
  const pairedCards = [...baseEmojis, ...baseEmojis].map((emoji, index) => ({
    id: index,
    emoji,
    matched: false
  }));
  return pairedCards.sort(() => Math.random() - 0.5);
};

const Juegos = ({ userData, setUserData }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing');
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [cartasMemorama, setCartasMemorama] = useState(shuffleCards());
  const [disableBoard, setDisableBoard] = useState(false);

  const materiales = [
    { id: 1, name: 'Botella de plástico', type: 'plastico', image: '🧴' },
    { id: 2, name: 'Periódico', type: 'papel', image: '📰' },
    { id: 3, name: 'Lata de aluminio', type: 'metal', image: '🥫' },
    { id: 4, name: 'Vaso de vidrio', type: 'vidrio', image: '🥛' },
    { id: 5, name: 'Cáscara de banana', type: 'organico', image: '🍌' },
    { id: 6, name: 'Celular viejo', type: 'electronico', image: '📱' }
  ];

  const handleClasificar = (id) => {
    const material = materiales.find(m => m.id === id);
    if (material.type === 'organico') {
      setGameStatus('lose');
    } else {
      setGameStatus('win');
      addPoints(150);
    }
  };

  const handleSelectCard = (id) => {
    if (disableBoard || selectedItems.includes(id)) return;
    if (selectedItems.length === 0) {
      setSelectedItems([id]);
    } else if (selectedItems.length === 1) {
      setSelectedItems([selectedItems[0], id]);
      setDisableBoard(true);

      const card1 = cartasMemorama.find(c => c.id === selectedItems[0]);
      const card2 = cartasMemorama.find(c => c.id === id);

      if (card1.emoji === card2.emoji) {
        setTimeout(() => {
          setMatchedItems(prev => [...prev, card1.id, card2.id]);
          setSelectedItems([]);
          setDisableBoard(false);
          addPoints(120);
        }, 500);
      } else {
        setTimeout(() => {
          setSelectedItems([]);
          setDisableBoard(false);
        }, 1000);
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
    setMatchedItems([]);
    setCartasMemorama(shuffleCards());
  };

  useEffect(() => {
    if (matchedItems.length === cartasMemorama.length && matchedItems.length > 0) {
      setGameStatus('win');
    }
  }, [matchedItems]);

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
            <div className="grid grid-cols-5 gap-2 justify-center">
              {cartasMemorama.map(carta => {
                const isFlipped = selectedItems.includes(carta.id) || matchedItems.includes(carta.id);
                return (
                  <div
                    key={carta.id}
                    className={`relative w-20 h-20 perspective`}
                    onClick={() => handleSelectCard(carta.id)}
                  >
                    <div className={`transition-transform duration-500 transform ${isFlipped ? 'rotate-y-180' : ''} w-full h-full`}> 
                      <div className={`absolute backface-hidden bg-blue-200 rounded-lg w-full h-full flex items-center justify-center text-2xl`}>❓</div>
                      <div className={`absolute rotate-y-180 backface-hidden bg-green-200 rounded-lg w-full h-full flex items-center justify-center text-2xl`}>{carta.emoji}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {gameStatus === 'win' && (
              <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-lg">
                <p className="text-xl">¡Encontraste todas las parejas! +120 puntos</p>
                <button
                  onClick={resetGame}
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg"
                >
                  Jugar otra vez
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
