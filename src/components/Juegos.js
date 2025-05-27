import React, { useState, useEffect, useCallback } from 'react';

const Juegos = ({ userData, setUserData }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing' | 'win'

  // --- Estados Memorama ---
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [showStars, setShowStars] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // --- Datos para Adivina el Emoji ---
  const adivinaData = [
    { emoji: '🌱', pista: 'Comienza con "Planta pequeña".', opciones: ['🌱', '🐢', '🌍'] },
    { emoji: '♻️', pista: 'Símbolo universal de reciclaje.', opciones: ['🍃', '♻️', '🌊'] },
    { emoji: '🐢', pista: 'Animal que vive en el agua y tierra.', opciones: ['🦋', '🐢', '🌸'] },
  ];
  const [adivinaIndex, setAdivinaIndex] = useState(0);
  const [adivinaSelected, setAdivinaSelected] = useState(null);
  const [adivinaMessage, setAdivinaMessage] = useState('');

  // --- Datos para Orden para Reciclar ---
  const ordenCorrecto = ['Basura', 'Separar', 'Reciclar', 'Reutilizar', 'Compostar'];
  const [ordenItems, setOrdenItems] = useState([]);
  const [ordenSelected, setOrdenSelected] = useState([]);
  const [ordenMessage, setOrdenMessage] = useState('');

  // Emojis para memorama
  const emojis = ['🌱', '🌍', '♻️', '🍃', '🌸', '🌊', '🐢', '🌾', '🦋', '🌻'];

  // --- Inicialización de cada juego cuando cambia currentGame ---
  useEffect(() => {
    if (currentGame === 'memorama') {
      const doubled = [...emojis, ...emojis].map((emoji, i) => ({
        id: i,
        emoji,
        matched: false,
      }));
      const shuffled = doubled.sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setSelectedCards([]);
      setMatchedCards([]);
      setGameStatus('playing');
      setIsShuffling(true);
      setTimeout(() => setIsShuffling(false), 1000);
    } else if (currentGame === 'orden') {
      const shuffledOrden = [...ordenCorrecto].sort(() => Math.random() - 0.5);
      setOrdenItems(shuffledOrden);
      setOrdenSelected([]);
      setOrdenMessage('');
      setGameStatus('playing');
    } else if (currentGame === 'adivina') {
      setAdivinaIndex(0);
      setAdivinaSelected(null);
      setAdivinaMessage('');
      setGameStatus('playing');
    } else {
      // Reseteo general
      setGameStatus('playing');
      setSelectedCards([]);
      setMatchedCards([]);
      setShowStars(false);
      setIsShuffling(false);
      setOrdenItems([]);
      setOrdenSelected([]);
      setOrdenMessage('');
      setAdivinaSelected(null);
      setAdivinaMessage('');
      setAdivinaIndex(0);
    }
  }, [currentGame]);

  // --- Función para agregar puntos ---
  const addPoints = useCallback(
    (points) => {
      const total = (userData.puntosReciclaje || 0) + points;
      const updated = {
        ...userData,
        puntosReciclaje: total,
        mascotaDesbloqueada: total >= 1000,
      };
      localStorage.setItem('ecorideUser', JSON.stringify(updated));
      setUserData(updated);
    },
    [userData, setUserData]
  );

  // --- Memorama: manejo de clic en carta ---
  const handleCardClick = useCallback(
    (index) => {
      if (
        gameStatus !== 'playing' ||
        isShuffling ||
        selectedCards.length === 2 ||
        selectedCards.includes(index) ||
        matchedCards.includes(index)
      ) {
        return;
      }

      const newSelected = [...selectedCards, index];
      setSelectedCards(newSelected);

      if (newSelected.length === 2) {
        const [first, second] = newSelected;
        if (cards[first].emoji === cards[second].emoji) {
          setTimeout(() => {
            const newMatched = [...matchedCards, first, second];
            setMatchedCards(newMatched);
            setSelectedCards([]);
            addPoints(2);
            setShowStars(true);
            setTimeout(() => setShowStars(false), 1000);

            if (newMatched.length === cards.length) {
              setGameStatus('win');
            }
          }, 600);
        } else {
          setTimeout(() => setSelectedCards([]), 1000);
        }
      }
    },
    [cards, selectedCards, matchedCards, isShuffling, gameStatus, addPoints]
  );

  // --- Adivina el Emoji: selección ---
  const handleAdivinaSelect = useCallback(
    (opcion) => {
      if (adivinaSelected) return; // evitar multiple clicks

      setAdivinaSelected(opcion);
      const correcto = adivinaData[adivinaIndex].emoji;

      if (opcion === correcto) {
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
    },
    [adivinaIndex, adivinaSelected, adivinaData, addPoints]
  );

  // --- Orden para Reciclar: selección ---
  const handleOrdenSelect = useCallback(
    (item) => {
      if (gameStatus !== 'playing' || ordenSelected.length === ordenCorrecto.length) return;

      if (item === ordenCorrecto[ordenSelected.length]) {
        const updatedSelected = [...ordenSelected, item];
        setOrdenSelected(updatedSelected);
        addPoints(2);
        setOrdenMessage('¡Correcto!');

        if (updatedSelected.length === ordenCorrecto.length) {
          setGameStatus('win');
        }
      } else {
        setOrdenMessage('Incorrecto, inténtalo de nuevo');
        setOrdenSelected([]);
        setTimeout(() => setOrdenMessage(''), 1500);
      }
    },
    [ordenSelected, gameStatus, addPoints]
  );

  // --- Reset juego ---
  const resetGame = () => {
    setCurrentGame(null);
  };

  // --- Renderizado juegos individuales ---

  const renderMemorama = () => (
    <>
      <button onClick={resetGame} className="mb-4 text-gray-600 hover:text-green-600">
        ← Volver a los juegos
      </button>

      <div className="grid grid-cols-5 gap-4 perspective relative">
        {cards.map((card, index) => {
          const isFlipped = selectedCards.includes(index) || matchedCards.includes(index);
          const isMatched = matchedCards.includes(index);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`relative w-full aspect-square cursor-pointer ${
                isShuffling ? 'shuffling-card' : ''
              }`}
              aria-label={`Carta ${index + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(index)}
            >
              <div className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}>
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
        <div className="mt-6 p-4 bg-green-100 rounded text-green-800 font-semibold text-center">
          ¡Felicitaciones! Completaste el memorama y ganaste puntos.
        </div>
      )}
    </>
  );

  const renderAdivina = () => {
    const current = adivinaData[adivinaIndex];
    return (
      <>
        <button onClick={resetGame} className="mb-4 text-gray-600 hover:text-green-600">
          ← Volver a los juegos
        </button>

        <div className="text-center space-y-4">
          <div className="text-7xl">{current.emoji}</div>
          <div className="text-lg font-semibold">{current.pista}</div>

          <div className="flex justify-center gap-4 mt-4">
            {current.opciones.map((opcion) => {
              const isSelected = opcion === adivinaSelected;
              const isCorrect = opcion === current.emoji;
              const className = isSelected
                ? isCorrect
                  ? 'bg-green-300'
                  : 'bg-red-300'
                : 'bg-gray-100 hover:bg-gray-200';

              return (
                <button
                  key={opcion}
                  onClick={() => handleAdivinaSelect(opcion)}
                  className={`px-6 py-2 rounded shadow ${className}`}
                  disabled={!!adivinaSelected}
                >
                  {opcion}
                </button>
              );
            })}
          </div>

          {adivinaMessage && (
            <div className="mt-4 font-semibold text-center">{adivinaMessage}</div>
          )}

          {gameStatus === 'win' && (
            <div className="mt-6 p-4 bg-green-100 rounded text-green-800 font-semibold text-center">
              ¡Felicidades! Completaste Adivina el Emoji y ganaste puntos.
            </div>
          )}
        </div>
      </>
    );
  };

  const renderOrden = () => (
    <>
      <button onClick={resetGame} className="mb-4 text-gray-600 hover:text-green-600">
        ← Volver a los juegos
      </button>

      <div className="space-y-4 max-w-md mx-auto text-center">
        <div className="text-xl font-semibold">Selecciona el orden correcto para reciclar:</div>

        <div className="flex flex-wrap justify-center gap-3">
          {ordenItems.map((item, i) => {
            const isSelected = ordenSelected.includes(item);
            const canClick = gameStatus === 'playing' && !isSelected;

            return (
              <button
                key={i}
                onClick={() => canClick && handleOrdenSelect(item)}
                className={`px-4 py-2 rounded shadow ${
                  isSelected ? 'bg-green-300' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                disabled={!canClick}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="mt-4 font-semibold">{ordenMessage}</div>

        {gameStatus === 'win' && (
          <div className="mt-6 p-4 bg-green-100 rounded text-green-800 font-semibold">
            ¡Felicidades! Completaste Orden para Reciclar y ganaste puntos.
          </div>
        )}
      </div>
    </>
  );

  // --- Pantalla inicial: selección de juego ---
  if (!currentGame) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 p-4">
        <h2 className="text-2xl font-bold mb-4">Juegos Ecológicos</h2>
        <button
          onClick={() => setCurrentGame('memorama')}
          className="block w-full py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Memorama Ecológico
        </button>
        <button
          onClick={() => setCurrentGame('adivina')}
          className="block w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Adivina el Emoji
        </button>
        <button
          onClick={() => setCurrentGame('orden')}
          className="block w-full py-3 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Orden para Reciclar
        </button>
      </div>
    );
  }

  // --- Renderizar juego activo ---
  switch (currentGame) {
    case 'memorama':
      return renderMemorama();
    case 'adivina':
      return renderAdivina();
    case 'orden':
      return renderOrden();
    default:
      return null;
  }
};

export default Juegos;
