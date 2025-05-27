import React, { useState, useEffect } from 'react';

const Juegos = ({ userData, setUserData }) => {
  const [currentGame, setCurrentGame] = useState(null);

  // Memorama
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [showStars, setShowStars] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // Adivina el Emoji
  const emojisAdivina = ['🌱', '🌍', '♻️', '🍃', '🌸'];
  const [emojiToGuess, setEmojiToGuess] = useState(null);
  const [guessInput, setGuessInput] = useState('');
  const [adivinaStatus, setAdivinaStatus] = useState(null);

  // Orden para Reciclar
  // Ejemplo sencillo: ordenar 4 elementos (papel, plástico, vidrio, orgánico)
  const ordenCorrecto = ['Papel', 'Plástico', 'Vidrio', 'Orgánico'];
  const [ordenUser, setOrdenUser] = useState(['Plástico', 'Orgánico', 'Vidrio', 'Papel']);
  const [ordenStatus, setOrdenStatus] = useState(null);

  // Otros juegos simplificados: Contar Reciclaje y Reto Verde solo con puntaje y mensaje

  // Iniciar memorama
  const emojisMemorama = ['🌱', '🌍', '♻️', '🍃', '🌸', '🌊', '🐢', '🌾', '🦋', '🌻'];

  useEffect(() => {
    if (currentGame === 'memorama') {
      const shuffled = [...emojisMemorama, ...emojisMemorama]
        .map((emoji, i) => ({ id: i, emoji, matched: false }))
        .sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setSelected([]);
      setMatched([]);
      setGameStatus('playing');
      setIsShuffling(true);
      setTimeout(() => setIsShuffling(false), 1000);
    }

    if (currentGame === 'adivina') {
      const random = emojisAdivina[Math.floor(Math.random() * emojisAdivina.length)];
      setEmojiToGuess(random);
      setGuessInput('');
      setAdivinaStatus(null);
    }

    if (currentGame === 'orden') {
      setOrdenUser(['Plástico', 'Orgánico', 'Vidrio', 'Papel'].sort(() => Math.random() - 0.5));
      setOrdenStatus(null);
    }
  }, [currentGame]);

  // Memorama lógica
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
          addPoints(15);
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

  // Adivina el emoji
  const handleGuessSubmit = () => {
    if (guessInput.trim() === '') return;
    if (guessInput.trim() === emojiToGuess) {
      setAdivinaStatus('correct');
      addPoints(5);
    } else {
      setAdivinaStatus('wrong');
    }
  };

  // Orden para reciclar
  const swapPositions = (index1, index2) => {
    const newOrden = [...ordenUser];
    [newOrden[index1], newOrden[index2]] = [newOrden[index2], newOrden[index1]];
    setOrdenUser(newOrden);
  };

  const checkOrden = () => {
    const correct = ordenUser.every((item, i) => item === ordenCorrecto[i]);
    if (correct) {
      setOrdenStatus('correct');
      addPoints(20);
    } else {
      setOrdenStatus('wrong');
    }
  };

  // Simples juegos
  const jugarContar = () => {
    addPoints(10);
    alert('¡Has ganado 10 puntos en Contar Reciclaje!');
  };

  const jugarRetoVerde = () => {
    addPoints(8);
    alert('¡Has ganado 8 puntos en Reto Verde!');
  };

  // Sumar puntos y actualizar localStorage
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
    setAdivinaStatus(null);
    setOrdenStatus(null);
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">🌿 Juegos Ecológicos</h2>

        {!currentGame ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Memorama */}
            <div
              onClick={() => setCurrentGame('memorama')}
              className="cursor-pointer rounded-xl shadow-lg p-8 text-white text-center transition-transform transform hover:scale-110"
              style={{ backgroundColor: '#34d399', minHeight: '200px' }}
            >
              <div style={{ fontSize: '6rem' }}>🃏</div>
              <div className="mt-4 text-2xl font-semibold">Memorama</div>
              <div className="mt-2 text-lg font-semibold">15 pts</div>
            </div>

            {/* Adivina el Emoji */}
            <div
              onClick={() => setCurrentGame('adivina')}
              className="cursor-pointer rounded-xl shadow-lg p-8 text-white text-center transition-transform transform hover:scale-110"
              style={{ backgroundColor: '#60a5fa', minHeight: '200px' }}
            >
              <div style={{ fontSize: '6rem' }}>❓</div>
              <div className="mt-4 text-2xl font-semibold">Adivina el Emoji</div>
              <div className="mt-2 text-lg font-semibold">5 pts</div>
            </div>

            {/* Orden para Reciclar */}
            <div
              onClick={() => setCurrentGame('orden')}
              className="cursor-pointer rounded-xl shadow-lg p-8 text-white text-center transition-transform transform hover:scale-110"
              style={{ backgroundColor: '#fbbf24', minHeight: '200px' }}
            >
              <div style={{ fontSize: '6rem' }}>♻️</div>
              <div className="mt-4 text-2xl font-semibold">Orden para Reciclar</div>
              <div className="mt-2 text-lg font-semibold">20 pts</div>
            </div>

            {/* Contar Reciclaje */}
            <div
              onClick={() => jugarContar()}
              className="cursor-pointer rounded-xl shadow-lg p-8 text-white text-center transition-transform transform hover:scale-110"
              style={{ backgroundColor: '#f87171', minHeight: '200px' }}
            >
              <div style={{ fontSize: '6rem' }}>📦</div>
              <div className="mt-4 text-2xl font-semibold">Contar Reciclaje</div>
              <div className="mt-2 text-lg font-semibold">10 pts</div>
            </div>

            {/* Reto Verde */}
            <div
              onClick={() => jugarRetoVerde()}
              className="cursor-pointer rounded-xl shadow-lg p-8 text-white text-center transition-transform transform hover:scale-110"
              style={{ backgroundColor: '#34d399', minHeight: '200px' }}
            >
              <div style={{ fontSize: '6rem' }}>🌳</div>
              <div className="mt-4 text-2xl font-semibold">Reto Verde</div>
              <div className="mt-2 text-lg font-semibold">8 pts</div>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            {/* Memorama */}
            {currentGame === 'memorama' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Memorama</h3>
                <div className="grid grid-cols-5 gap-4 max-w-xl mx-auto">
                  {cards.map((card, idx) => {
                    const flipped =
                      selected.includes(idx) || matched.includes(idx);
                    return (
                      <div
                        key={card.id}
                        className={`card ${flipped ? 'flipped' : ''}`}
                        onClick={() => handleCardClick(idx)}
                        style={{
                          width: '60px',
                          height: '80px',
                          perspective: '1000px',
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          className="card-face card-front"
                          style={{
                            backgroundColor: '#4ade80',
                            color: 'white',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '2.5rem',
                            backfaceVisibility: 'hidden',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            transformStyle: 'preserve-3d',
                            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            transition: 'transform 0.6s',
                          }}
                        >
                          {card.emoji}
                        </div>
                        <div
                          className="card-face card-back"
                          style={{
                            backgroundColor: '#16a34a',
                            color: 'white',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '2.5rem',
                            backfaceVisibility: 'hidden',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            transformStyle: 'preserve-3d',
                            transform: flipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                            transition: 'transform 0.6s',
                          }}
                        >
                          ?
                        </div>
                      </div>
                    );
                  })}
                </div>
                {gameStatus === 'win' && (
                  <div className="mt-4 text-green-600 font-bold">
                    ¡Ganaste el memorama! 🎉
                  </div>
                )}
                <button
                  className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={resetGame}
                >
                  Volver a juegos
                </button>
              </div>
            )}

            {/* Adivina el Emoji */}
            {currentGame === 'adivina' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Adivina el Emoji</h3>
                <div style={{ fontSize: '6rem' }}>{emojiToGuess}</div>
                <input
                  type="text"
                  value={guessInput}
                  onChange={(e) => setGuessInput(e.target.value)}
                  placeholder="Escribe el emoji aquí"
                  className="border rounded px-3 py-2 mt-4 w-full max-w-xs"
                />
                <button
                  onClick={handleGuessSubmit}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Adivinar
                </button>
                {adivinaStatus === 'correct' && (
                  <p className="text-green-600 font-bold mt-4">¡Correcto! 🎉</p>
                )}
                {adivinaStatus === 'wrong' && (
                  <p className="text-red-600 font-bold mt-4">Incorrecto. Intenta de nuevo.</p>
                )}
                <button
                  className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={resetGame}
                >
                  Volver a juegos
                </button>
              </div>
            )}

            {/* Orden para Reciclar */}
            {currentGame === 'orden' && (
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-bold mb-6">Orden para Reciclar</h3>
                <p className="mb-4">Ordena correctamente los materiales:</p>
                <ul className="mb-4 space-y-2">
                  {ordenUser.map((item, i) => (
                    <li
                      key={i}
                      className="border rounded p-2 cursor-pointer bg-white shadow flex justify-between items-center"
                    >
                      {item}
                      <div>
                        <button
                          disabled={i === 0}
                          onClick={() => swapPositions(i, i - 1)}
                          className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          ↑
                        </button>
                        <button
                          disabled={i === ordenUser.length - 1}
                          onClick={() => swapPositions(i, i + 1)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          ↓
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                {ordenStatus === 'correct' && (
                  <p className="text-green-600 font-bold mb-4">¡Orden correcto! 🎉</p>
                )}
                {ordenStatus === 'wrong' && (
                  <p className="text-red-600 font-bold mb-4">Orden incorrecto. Intenta otra vez.</p>
                )}
                <button
                  onClick={checkOrden}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
                >
                  Revisar
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={resetGame}
                >
                  Volver a juegos
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
