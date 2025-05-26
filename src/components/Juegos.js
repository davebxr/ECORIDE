import React, { useState, useEffect } from 'react';

const Juegos = ({ userData, setUserData }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [showStars, setShowStars] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const emojis = ['🌱', '🌍', '♻️', '🍃', '🌸', '🌊', '🐢', '🌾', '🦋', '🌻'];

  useEffect(() => {
    if (currentGame === 'memorama') {
      const shuffled = [...emojis, ...emojis]
        .map((emoji, i) => ({ id: i, emoji, matched: false }))
        .sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setSelected([]);
      setMatched([]);
      setGameStatus('playing');
      setIsShuffling(true);

      // Quitar la animación después de 1 segundo (duración de la animación)
      setTimeout(() => setIsShuffling(false), 1000);
    }
  }, [currentGame]);

  const handleCardClick = (index) => {
    if (
      selected.length === 2 ||
      selected.includes(index) ||
      matched.includes(index) ||
      isShuffling
    )
      return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [i1, i2] = newSelected;
      if (cards[i1].emoji === cards[i2].emoji) {
        setTimeout(() => {
          const newMatched = [...matched, i1, i2];
          setMatched(newMatched);
          setSelected([]);
          addPoints(120);
          setShowStars(true);
          setTimeout(() => setShowStars(false), 1000);

          if (newMatched.length === cards.length) {
            setGameStatus('win');
          }
        }, 600);
      } else {
        setTimeout(() => setSelected([]), 1000);
      }
    }
  };

  const addPoints = (points) => {
    const total = (userData.puntosReciclaje || 0) + points;
    const updated = {
      ...userData,
      puntosReciclaje: total,
      mascotaDesbloqueada: total >= 1000,
    };
    localStorage.setItem('ecorideUser', JSON.stringify(updated));
    setUserData(updated);
  };

  const resetGame = () => {
    setCurrentGame(null);
    setGameStatus('playing');
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Juegos Ecológicos</h2>

        {!currentGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Memorama Ecológico</h3>
              <p className="mb-4">Encuentra las parejas de elementos ecológicos.</p>
              <button
                onClick={() => setCurrentGame('memorama')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Jugar (120 puntos)
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={resetGame}
              className="mb-4 text-gray-600 hover:text-green-600"
            >
              ← Volver a los juegos
            </button>

            <div className="grid grid-cols-5 gap-4 perspective relative">
              {cards.map((card, index) => {
                const isFlipped = selected.includes(index) || matched.includes(index);
                const isMatched = matched.includes(index);

                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(index)}
                    className={`relative w-full aspect-square cursor-pointer ${
                      isShuffling ? 'shuffling-card' : ''
                    }`}
                  >
                    <div
                      className={`card ${isFlipped ? 'flipped' : ''} ${
                        isMatched ? 'matched' : ''
                      }`}
                    >
                      <div className="card-face card-front">❓</div>
                      <div className="card-face card-back">{card.emoji}</div>
                    </div>
                  </div>
                );
              })}

              {showStars && (
                <div className="stars absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                  <div className="text-yellow-400 text-5xl animate-stars">🌟🌟🌟</div>
                </div>
              )}
            </div>

            {gameStatus === 'win' && (
              <div className="fixed inset-0 bg-green-100 flex flex-col items-center justify-center z-50 animate-fadeIn">
                <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4 animate-bounce">
                  🎉 ¡Felicidades, lo completaste! 🎉
                </h1>
                <p className="text-2xl text-green-700 font-semibold">+120 puntos</p>
                <button
                  onClick={resetGame}
                  className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Volver al menú
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Estilos personalizados */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }
        .flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          border-radius: 0.5rem;
        }
        .card-front {
          background-color: #bee3f8;
        }
        .card-back {
          background-color: #c6f6d5;
          transform: rotateY(180deg);
        }
        .matched .card-back {
          background-color: #fcd34d; /* amarillo/dorado */
          animation: pop 0.3s ease-out;
        }

        /* Animación shuffle - movimiento aleatorio al inicio */
        .shuffling-card {
          animation: shuffle-move 1s ease-in-out forwards;
          pointer-events: none; /* no clickeable durante shuffle */
        }

        @keyframes shuffle-move {
          0% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-10px, -10px);
          }
          40% {
            transform: translate(10px, -10px);
          }
          60% {
            transform: translate(-10px, 10px);
          }
          80% {
            transform: translate(10px, 10px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .animate-stars {
          animation: stars 1s ease-out forwards;
        }

        @keyframes stars {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        @keyframes pop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Juegos;
