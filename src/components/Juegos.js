import React, { useState, useEffect } from 'react';

const Juegos = ({ userData, setUserData }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing');
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [cards, setCards] = useState([]);

  const emojis = ['🌱', '🌍', '♻️', '🍃', '🌸', '🌊'];

  useEffect(() => {
    if (currentGame === 'memorama') {
      const shuffled = [...emojis, ...emojis]
        .map((emoji, index) => ({ id: index, emoji, matched: false }))
        .sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setSelectedItems([]);
      setMatchedCards([]);
      setGameStatus('playing');
    }
  }, [currentGame]);

  const handleSelectCard = (cardIndex) => {
    if (
      selectedItems.length === 2 ||
      selectedItems.includes(cardIndex) ||
      matchedCards.includes(cardIndex)
    ) {
      return;
    }

    const newSelected = [...selectedItems, cardIndex];
    setSelectedItems(newSelected);

    if (newSelected.length === 2) {
      const [firstIndex, secondIndex] = newSelected;
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        // Pareja encontrada
        setTimeout(() => {
          const newMatched = [...matchedCards, firstIndex, secondIndex];
          setMatchedCards(newMatched);
          setSelectedItems([]);
          addPoints(120);
          if (newMatched.length === cards.length) {
            setGameStatus('win');
          }
        }, 500);
      } else {
        // No son pareja
        setTimeout(() => {
          setSelectedItems([]);
        }, 1000);
      }
    }
  };

  const addPoints = (points) => {
    const newPoints = (userData.puntosReciclaje || 0) + points;
    const updatedUser = {
      ...userData,
      puntosReciclaje: newPoints,
      mascotaDesbloqueada: newPoints >= 1000,
    };
    localStorage.setItem('ecorideUser', JSON.stringify(updatedUser));
    setUserData(updatedUser);
  };

  const resetGame = () => {
    setGameStatus('playing');
    setCurrentGame(null); // reinicia a selección de juegos
  };

  // ... deja intacta la parte de clasificación y estructura general

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Juegos Ecológicos</h2>

        {!currentGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clasificación */}
            {/* ...esto queda igual */}
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
        ) : currentGame === 'memorama' ? (
          <div>
            <button
              onClick={() => setCurrentGame(null)}
              className="mb-4 text-gray-600 hover:text-green-600"
            >
              ← Volver a los juegos
            </button>

            <h3 className="text-xl font-semibold mb-4">Memorama Ecológico</h3>
            <div className="grid grid-cols-4 gap-4">
              {cards.map((card, index) => (
                <button
                  key={card.id}
                  onClick={() => handleSelectCard(index)}
                  disabled={selectedItems.includes(index) || matchedCards.includes(index)}
                  className={`aspect-square flex items-center justify-center text-4xl rounded-lg ${
                    selectedItems.includes(index) || matchedCards.includes(index)
                      ? 'bg-green-200'
                      : 'bg-blue-200'
                  }`}
                >
                  {selectedItems.includes(index) || matchedCards.includes(index)
                    ? card.emoji
                    : '❓'}
                </button>
              ))}
            </div>

            {gameStatus === 'win' && (
              <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-lg">
                <p className="text-xl">¡Completaste el memorama! +120 puntos</p>
                <button
                  onClick={resetGame}
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg"
                >
                  Volver al menú
                </button>
              </div>
            )}
          </div>
        ) : (
          // Aquí va el otro juego de clasificación (lo dejas igual)
          <></>
        )}
      </div>
    </div>
  );
};

export default Juegos;
