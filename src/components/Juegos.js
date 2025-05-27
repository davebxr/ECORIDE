import React, { useState, useEffect } from 'react';

const Juegos = ({ userData, setUserData }) => {
  const [currentGame, setCurrentGame] = useState(null);

  // MEMORAMA
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [showStars, setShowStars] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const emojis = ['🌱', '🌍', '♻️', '🍃', '🌸', '🌊', '🐢', '🌾', '🦋', '🌻'];

  // JUEGO 2: Trivia simple
  const triviaQuestions = [
    {
      question: "¿Cuál es el gas más responsable del calentamiento global?",
      options: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Hidrógeno"],
      answer: "Dióxido de carbono",
    },
    {
      question: "¿Qué tipo de energía es renovable?",
      options: ["Carbón", "Solar", "Petróleo", "Gas natural"],
      answer: "Solar",
    },
    {
      question: "¿Qué animal es símbolo de la conservación ambiental?",
      options: ["Tigre", "Elefante", "Panda", "Lobo"],
      answer: "Panda",
    },
  ];

  // Estado trivia
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaAnswered, setTriviaAnswered] = useState(false);
  const [triviaFeedback, setTriviaFeedback] = useState('');

  // JUEGO 3: Contar reciclaje (simulación)
  const [recycledCount, setRecycledCount] = useState(0);
  const [targetRecycle, setTargetRecycle] = useState(10);
  const [recycleStatus, setRecycleStatus] = useState('playing');

  // JUEGO 4: Adivina el sonido (simplificado texto)
  const soundClues = [
    { clue: "Soy verde y doy sombra, ¿qué soy?", answer: "árbol" },
    { clue: "Sin mí, las aguas están sucias, ¿qué soy?", answer: "planta de tratamiento" },
    { clue: "Vuelo y ayudo a polinizar, ¿qué soy?", answer: "abeja" },
  ];
  const [soundIndex, setSoundIndex] = useState(0);
  const [soundAnswer, setSoundAnswer] = useState('');
  const [soundFeedback, setSoundFeedback] = useState('');

  // ------------------ EFECTO MEMORAMA --------------------
  useEffect(() => {
    if (currentGame === 'memorama') {
      const selectedEmojis = emojis.slice(0, 8); // 8 pares, 16 cartas
      const shuffled = [...selectedEmojis, ...selectedEmojis]
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

  // ----------- FUNCIONES MEMORAMA -------------------
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
          addPoints(25);
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

  // ----------- FUNCION PARA SUMAR PUNTOS -------------
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

  // --------- FUNCIONES TRIVIA ------------------------
  const handleTriviaAnswer = (option) => {
    if (triviaAnswered) return;

    setTriviaAnswered(true);
    if (option === triviaQuestions[triviaIndex].answer) {
      setTriviaScore(triviaScore + 1);
      setTriviaFeedback('¡Correcto! 🎉');
      addPoints(15);
    } else {
      setTriviaFeedback(`Incorrecto. La respuesta es "${triviaQuestions[triviaIndex].answer}".`);
    }
  };

  const nextTrivia = () => {
    setTriviaAnswered(false);
    setTriviaFeedback('');
    if (triviaIndex + 1 < triviaQuestions.length) {
      setTriviaIndex(triviaIndex + 1);
    } else {
      setGameStatus('win');
    }
  };

  // --------- FUNCIONES RECICLAJE ----------------------
  const handleRecycle = () => {
    if (recycleStatus !== 'playing') return;

    const nuevoConteo = recycledCount + 1;
    setRecycledCount(nuevoConteo);
    addPoints(5);

    if (nuevoConteo >= targetRecycle) {
      setRecycleStatus('win');
      setGameStatus('win');
    }
  };

  const resetRecycle = () => {
    setRecycledCount(0);
    setRecycleStatus('playing');
    setGameStatus('playing');
  };

  // --------- FUNCIONES ADIVINA EL SONIDO --------------
  const handleSoundSubmit = () => {
    if (soundAnswer.trim().toLowerCase() === soundClues[soundIndex].answer.toLowerCase()) {
      setSoundFeedback('¡Correcto! 🎉');
      addPoints(20);
      if (soundIndex + 1 < soundClues.length) {
        setSoundIndex(soundIndex + 1);
        setSoundAnswer('');
      } else {
        setGameStatus('win');
      }
    } else {
      setSoundFeedback('Incorrecto, intenta otra vez.');
    }
  };

  const resetSound = () => {
    setSoundIndex(0);
    setSoundAnswer('');
    setSoundFeedback('');
    setGameStatus('playing');
  };

  // ---------- RESETEAR JUEGO (MENU) -------------------
  const resetGame = () => {
    setCurrentGame(null);
    setGameStatus('playing');
    setTriviaIndex(0);
    setTriviaScore(0);
    setTriviaAnswered(false);
    setTriviaFeedback('');
    setRecycledCount(0);
    setRecycleStatus('playing');
    setSoundIndex(0);
    setSoundAnswer('');
    setSoundFeedback('');
    setSelected([]);
    setMatched([]);
  };

  // ------------ RENDER JUEGOS --------------------------

  return (
    <div className="container mx-auto px-4 py-10 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Juegos Ecológicos</h2>

        {!currentGame && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Memorama Ecológico</h3>
              <p className="mb-4">Encuentra las parejas de elementos ecológicos.</p>
              <button
                onClick={() => setCurrentGame('memorama')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Jugar (25 puntos)
              </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Trivia Ecológica</h3>
              <p className="mb-4">Responde preguntas sobre el medio ambiente.</p>
              <button
                onClick={() => setCurrentGame('trivia')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Jugar (15 puntos por respuesta correcta)
              </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Contar Reciclaje</h3>
              <p className="mb-4">Simula reciclar y llega a la meta.</p>
              <button
                onClick={() => setCurrentGame('reciclaje')}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Jugar (5 puntos por reciclaje)
              </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Adivina el Sonido</h3>
              <p className="mb-4">Adivina qué objeto ecológico describe la pista.</p>
              <button
                onClick={() => setCurrentGame('sonido')}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
              >
                Jugar (20 puntos por acierto)
              </button>
            </div>
          </div>
        )}

        {/* MEMORAMA */}
        {currentGame === 'memorama' && (
          <div>
            <button
              onClick={resetGame}
              className="mb-4 text-gray-600 hover:text-green-600"
            >
              ← Volver a los juegos
            </button>

            <div className="grid grid-cols-4 gap-4 perspective relative">
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
                <p className="text-2xl text-green-700 font-semibold">+25 puntos</p>
                <button
                  onClick={resetGame}
                  className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-xl font-semibold"
                >
                  Volver a juegos
                </button>
              </div>
            )}
          </div>
        )}

        {/* TRIVIA */}
        {currentGame === 'trivia' && (
          <div className="max-w-xl mx-auto text-left">
            <button
              onClick={resetGame}
              className="mb-4 text-gray-600 hover:text-blue-600"
            >
              ← Volver a los juegos
            </button>

            {gameStatus !== 'win' && (
              <>
                <h3 className="text-xl font-bold mb-2">{triviaQuestions[triviaIndex].question}</h3>
                <div className="space-y-2 mb-4">
                  {triviaQuestions[triviaIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTriviaAnswer(opt)}
                      disabled={triviaAnswered}
                      className={`block w-full text-left px-4 py-2 rounded-md border ${
                        triviaAnswered
                          ? opt === triviaQuestions[triviaIndex].answer
                            ? 'bg-green-300 border-green-600'
                            : 'bg-gray-200 border-gray-400'
                          : 'bg-white border-gray-300 hover:bg-blue-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {triviaAnswered && (
                  <>
                    <p className="mb-4 font-semibold">{triviaFeedback}</p>
                    <button
                      onClick={nextTrivia}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      {triviaIndex + 1 < triviaQuestions.length ? 'Siguiente pregunta' : 'Terminar'}
                    </button>
                  </>
                )}
              </>
            )}

            {gameStatus === 'win' && (
              <div className="text-center text-green-700">
                <h2 className="text-3xl font-bold mb-4">¡Has terminado la trivia!</h2>
                <p className="mb-4">Puntaje: {triviaScore} / {triviaQuestions.length}</p>
                <button
                  onClick={resetGame}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Volver a juegos
                </button>
              </div>
            )}
          </div>
        )}

        {/* CONTAR RECICLAJE */}
        {currentGame === 'reciclaje' && (
          <div className="text-center max-w-md mx-auto">
            <button
              onClick={resetGame}
              className="mb-4 text-gray-600 hover:text-purple-600"
            >
              ← Volver a los juegos
            </button>

            {recycleStatus === 'playing' && (
              <>
                <p className="mb-4 text-lg">Haz clic en el botón para reciclar objetos.</p>
                <button
                  onClick={handleRecycle}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 mb-4"
                >
                  Reciclar ♻️
                </button>
                <p>
                  Objetos reciclados: <strong>{recycledCount}</strong> / {targetRecycle}
                </p>
              </>
            )}

            {recycleStatus === 'win' && (
              <div className="text-green-700">
                <h2 className="text-3xl font-bold mb-4">¡Meta alcanzada!</h2>
                <p className="mb-4">¡Has reciclado {recycledCount} objetos! +{recycledCount * 5} puntos</p>
                <button
                  onClick={resetRecycle}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
                >
                  Jugar otra vez
                </button>
                <button
                  onClick={resetGame}
                  className="ml-4 text-purple-600 hover:underline"
                >
                  Volver a juegos
                </button>
              </div>
            )}
          </div>
        )}

        {/* ADIVINA EL SONIDO */}
        {currentGame === 'sonido' && (
          <div className="max-w-xl mx-auto text-center">
            <button
              onClick={resetGame}
              className="mb-4 text-gray-600 hover:text-yellow-600"
            >
              ← Volver a los juegos
            </button>

            {gameStatus !== 'win' && (
              <>
                <p className="mb-6 text-lg italic">{soundClues[soundIndex].clue}</p>
                <input
                  type="text"
                  placeholder="Escribe tu respuesta aquí"
                  value={soundAnswer}
                  onChange={(e) => setSoundAnswer(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full text-center"
                />
                <button
                  onClick={handleSoundSubmit}
                  className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700"
                >
                  Enviar
                </button>
                <p className="mt-4 font-semibold">{soundFeedback}</p>
              </>
            )}

            {gameStatus === 'win' && (
              <div className="text-green-700">
                <h2 className="text-3xl font-bold mb-4">¡Correcto, completaste el juego!</h2>
                <button
                  onClick={resetSound}
                  className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 mr-4"
                >
                  Jugar otra vez
                </button>
                <button
                  onClick={resetGame}
                  className="text-yellow-700 hover:underline"
                >
                  Volver a juegos
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.5s;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          background: white;
          user-select: none;
        }
        .card.flipped {
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
          font-size: 3rem;
          border-radius: 12px;
        }
        .card-front {
          background: #2a9d8f;
          color: white;
        }
        .card-back {
          background: #e9c46a;
          transform: rotateY(180deg);
        }
        .stars {
          animation: fadeIn 1s ease forwards;
          font-size: 2.5rem;
        }
        .animate-stars {
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Juegos;
