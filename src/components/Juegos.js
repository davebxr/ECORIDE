import React, { useState, useEffect } from 'react';

const Juegos = ({ userData, setUserData }) => {
  const [currentGame, setCurrentGame] = useState(null);

  // Estados para memorama (ya estaba)
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [showStars, setShowStars] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // Para Adivina el Emoji
  const adivinaData = [
    { emoji: '🌱', pista: 'Comienza con "Planta pequeña".', opciones: ['🌱', '🐢', '🌍'] },
    { emoji: '♻️', pista: 'Símbolo universal de reciclaje.', opciones: ['🍃', '♻️', '🌊'] },
    { emoji: '🐢', pista: 'Animal que vive en el agua y tierra.', opciones: ['🦋', '🐢', '🌸'] },
  ];
  const [adivinaIndex, setAdivinaIndex] = useState(0);
  const [adivinaSelected, setAdivinaSelected] = useState(null);
  const [adivinaMessage, setAdivinaMessage] = useState('');

  // Para Orden para Reciclar
  // Orden correcto: basura -> separar -> reciclar -> reutilizar -> compostar
  const ordenCorrecto = ['Basura', 'Separar', 'Reciclar', 'Reutilizar', 'Compostar'];
  const [ordenItems, setOrdenItems] = useState([]);
  const [ordenSelected, setOrdenSelected] = useState([]);
  const [ordenMessage, setOrdenMessage] = useState('');

  // Emojis para memorama
  const emojis = ['🌱', '🌍', '♻️', '🍃', '🌸', '🌊', '🐢', '🌾', '🦋', '🌻'];

  // --- Memorama setup ---
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
      setTimeout(() => setIsShuffling(false), 1000);
    }
  }, [currentGame]);

  // --- Orden para Reciclar setup ---
  useEffect(() => {
    if (currentGame === 'orden') {
      // Mezclar los elementos
      const shuffled = [...ordenCorrecto].sort(() => Math.random() - 0.5);
      setOrdenItems(shuffled);
      setOrdenSelected([]);
      setOrdenMessage('');
    }
  }, [currentGame]);

  // Manejo de selección en memorama
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
          addPoints(2);  // Puntos reducidos a 2
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

  // Función para agregar puntos al usuario
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

  // --- Adivina el Emoji ---
  const handleAdivinaSelect = (opcion) => {
    setAdivinaSelected(opcion);
    if (opcion === adivinaData[adivinaIndex].emoji) {
      setAdivinaMessage('¡Correcto! +2 puntos');
      addPoints(2);
      setTimeout(() => {
        setAdivinaMessage('');
        setAdivinaSelected(null);
        if (adivinaIndex + 1 < adivinaData.length) {
          setAdivinaIndex(adivinaIndex + 1);
        } else {
          setGameStatus('win');
        }
      }, 1500);
    } else {
      setAdivinaMessage('Incorrecto, intenta otra vez');
      setTimeout(() => {
        setAdivinaMessage('');
        setAdivinaSelected(null);
      }, 1500);
    }
  };

  // --- Orden para Reciclar ---
  // El usuario selecciona en orden los items para ordenar
  const handleOrdenSelect = (item) => {
    if (ordenSelected.length === ordenCorrecto.length) return;

    if (item === ordenCorrecto[ordenSelected.length]) {
      setOrdenSelected([...ordenSelected, item]);
      addPoints(2);
      setOrdenMessage('¡Correcto!');
      if (ordenSelected.length + 1 === ordenCorrecto.length) {
        setGameStatus('win');
      }
    } else {
      setOrdenMessage('Incorrecto, inténtalo de nuevo');
      setOrdenSelected([]);
      setTimeout(() => setOrdenMessage(''), 1500);
    }
  };

  // Reset general para todos los juegos
  const resetGame = () => {
    setCurrentGame(null);
    setGameStatus('playing');
    setAdivinaIndex(0);
    setAdivinaSelected(null);
    setAdivinaMessage('');
    setOrdenSelected([]);
    setOrdenMessage('');
  };

  // Diseño tarjetas de juego para menú principal
  const juegosData = [
    {
      id: 'memorama',
      emoji: '🃏',
      titulo: 'Memorama Ecológico',
      descripcion: 'Encuentra las parejas de elementos ecológicos.',
      puntos: 2,
    },
    {
      id: 'adivina',
      emoji: '❓',
      titulo: 'Adivina el Emoji',
      descripcion: 'Adivina el emoji según la pista.',
      puntos: 2,
    },
    {
      id: 'orden',
      emoji: '🔄',
      titulo: 'Orden para Reciclar',
      descripcion: 'Ordena correctamente los pasos para reciclar.',
      puntos: 2,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Juegos Ecológicos</h2>

        {!currentGame ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {juegosData.map(({ id, emoji, titulo, descripcion, puntos }) => (
              <div
                key={id}
                onClick={() => setCurrentGame(id)}
                className="bg-green-100 p-6 rounded-lg cursor-pointer transform transition-transform hover:scale-105 shadow-md"
              >
                <div className="text-6xl mb-4 bg-green-300 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                  {emoji}
                </div>
                <h3 className="text-xl font-semibold mb-2">{titulo}</h3>
                <p className="mb-4">{descripcion}</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Jugar (+{puntos} puntos)
                </button>
              </div>
            ))}
          </div>
        ) : currentGame === 'memorama' ? (
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
                <p className="text-2xl text-green-700 font-semibold">+2 puntos</p>
                <button
                  onClick={resetGame}
                  className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Volver al menú
                </button>
              </div>
            )}
          </div>
        ) : currentGame === 'adivina' ? (
          <div>
            <button
              onClick={resetGame}
              className="mb-4 text-gray-600 hover:text-green-600"
            >
              ← Volver a los juegos
            </button>

            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-2xl mb-4">Pista: {adivinaData[adivinaIndex].pista}</h3>
              <div className="flex justify-center gap-6">
                {adivinaData[adivinaIndex].opciones.map((opcion, i) => (
                  <button
                    key={i}
                    onClick={() => handleAdivinaSelect(opcion)}
                    disabled={!!adivinaSelected}
                    className={`text-5xl p-4 rounded-lg border-2 transition ${
                      adivinaSelected === opcion
                        ? opcion === adivinaData[adivinaIndex].emoji
                          ? 'border-green-600 bg-green-200'
                          : 'border-red-600 bg-red-200'
                        : 'border-gray-300 hover:bg-green-100'
                    }`}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
              {adivinaMessage && (
                <p className="mt-4 text-lg font-semibold text-center">{adivinaMessage}</p>
              )}
            </div>
          </div>
        ) : currentGame === 'orden' ? (
          <div>
            <button
              onClick={resetGame}
              className="mb-4 text-gray-600 hover:text-green-600"
            >
              ← Volver a los juegos
            </button>

            <div className="p-6 bg-green-50 rounded-lg text-center">
              <h3 className="text-2xl mb-4">Selecciona el orden correcto para reciclar:</h3>

              <div className="flex flex-wrap justify-center gap-4 mb-4">
                {ordenItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleOrdenSelect(item)}
                    disabled={ordenSelected.includes(item)}
                    className="bg-green-200 hover:bg-green-300 px-4 py-2 rounded-lg text-lg font-semibold transition"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div>
                <p className="mb-4">
                  Orden seleccionado:{' '}
                  {ordenSelected.length > 0 ? ordenSelected.join(' → ') : 'Nada aún'}
                </p>
                {ordenMessage && (
                  <p
                    className={`font-semibold ${
                      ordenMessage === '¡Correcto!' ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {ordenMessage}
                  </p>
                )}
                {gameStatus === 'win' && (
                  <div className="mt-4">
                    <p className="text-green-700 font-bold text-xl">
                      🎉 ¡Completado! +2 puntos 🎉
                    </p>
                    <button
                      onClick={resetGame}
                      className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                    >
                      Volver al menú
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Estilos adicionales para cartas memorama */}
      <style>{`
        .card {
          width: 100%;
          height: 100%;
          cursor: pointer;
          perspective: 1000px;
          position: relative;
        }
        .card-face {
          width: 100%;
          height: 100%;
          position: absolute;
          backface-visibility: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 3rem;
          border-radius: 0.5rem;
          user-select: none;
        }
        .card-front {
          background: #4ade80;
          color: white;
        }
        .card-back {
          background: #16a34a;
          color: white;
          transform: rotateY(180deg);
        }
        .card.flipped .card-front {
          transform: rotateY(180deg);
        }
        .card.flipped .card-back {
          transform: rotateY(0deg);
        }
        .card.matched {
          background: #bbf7d0 !important;
          cursor: default;
        }
        .shuffling-card {
          pointer-events: none;
        }

        /* Animaciones estrellas */
        @keyframes stars {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg);}
          50% { opacity: 0.5; transform: scale(1.3) rotate(15deg);}
        }
        .animate-stars {
          animation: stars 1s ease-in-out infinite;
        }
        /* Animación fadeIn */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }

        /* Hover general para agrandar juegos en menú */
        .cursor-pointer:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(34,197,94,0.7);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Juegos;
