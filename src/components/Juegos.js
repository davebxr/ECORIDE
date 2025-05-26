import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Juegos = ({ userData, setUserData }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing');
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [cards, setCards] = useState([]);

  const emojis = ['🌱', '🌍', '♻️', '🍃', '🌸', '🌊', '🦋', '🌾', '🌼', '🌻'];

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
    setCurrentGame(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Juegos Ecológicos</h2>

        {!currentGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="relative">
            <button
              onClick={() => setCurrentGame(null)}
              className="mb-4 text-gray-600 hover:text-green-600"
            >
              ← Volver a los juegos
            </button>

            <h3 className="text-xl font-semibold mb-4">Memorama Ecológico</h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {cards.map((card, index) => {
                const isFlipped = selectedItems.includes(index) || matchedCards.includes(index);
                return (
                  <motion.button
                    key={card.id}
                    onClick={() => handleSelectCard(index)}
                    disabled={isFlipped}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl rounded-lg transform transition-transform duration-500 ${
                      isFlipped ? 'bg-green-200' : 'bg-blue-200'
                    }`}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ perspective: 1000 }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center backface-hidden">
                      {isFlipped ? card.emoji : '❓'}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {gameStatus === 'win' && (
                <motion.div
                  className="fixed inset-0 bg-green-100 bg-opacity-90 flex flex-col items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.h2
                    className="text-4xl sm:text-5xl font-bold text-green-800 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    🎉 ¡Felicidades, lo completaste!
                  </motion.h2>
                  <motion.p
                    className="text-2xl text-green-700 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    +120 puntos
                  </motion.p>
                  <button
                    onClick={resetGame}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-700"
                  >
                    Volver al menú
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // Aquí va el otro juego de clasificación (se deja intacto)
          <></>
        )}
      </div>
    </div>
  );
};

export default Juegos;