import React, { useState, useEffect } from 'react';

const MemoramaEcologico = ({ userData, setUserData }) => {
  const emojis = ['🌱', '🌍', '♻️', '🍃', '🌸', '🌊', '🐢', '🌾', '🦋', '🌻'];

  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [showStars, setShowStars] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // Inicializar cartas al montar y al resetear
  useEffect(() => {
    resetGame();
  }, []);

  // Función para mezclar cartas
  const shuffleCards = () => {
    const duplicated = [...emojis, ...emojis]; // pares de emojis
    const shuffled = duplicated
      .map((emoji, i) => ({ id: i, emoji }))
      .sort(() => Math.random() - 0.5);
    return shuffled;
  };

  // Manejo clic en carta
  const handleCardClick = (index) => {
    if (
      selected.length === 2 ||          // No seleccionar más de 2
      selected.includes(index) ||       // No seleccionar misma carta 2 veces
      matched.includes(index) ||        // No seleccionar cartas ya emparejadas
      isShuffling                      // Evitar clicks durante shuffle
    ) return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (cards[first].emoji === cards[second].emoji) {
        // Si es pareja correcta
        setTimeout(() => {
          const newMatched = [...matched, first, second];
          setMatched(newMatched);
          setSelected([]);
          addPoints(2);
          setShowStars(true);
          setTimeout(() => setShowStars(false), 1000);

          if (newMatched.length === cards.length) {
            setGameStatus('win');
          }
        }, 600);
      } else {
        // No es pareja, reset seleccionar después de retraso
        setTimeout(() => setSelected([]), 1000);
      }
    }
  };

  // Sumar puntos al usuario
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

  // Resetear juego
  const resetGame = () => {
    setGameStatus('playing');
    setSelected([]);
    setMatched([]);
    setIsShuffling(true);
    const newCards = shuffleCards();
    setCards(newCards);
    setTimeout(() => setIsShuffling(false), 1000);
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-6">Memorama Ecológico</h2>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {cards.map((card, index) => {
          const isFlipped = selected.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={isFlipping || isMatched}
              className={`relative w-full aspect-square rounded-lg cursor-pointer focus:outline-none
                ${isFlipped ? 'bg-green-200' : 'bg-gray-300'}
                ${isMatched ? 'opacity-60 cursor-default' : ''}
                `}
              type="button"
              aria-label={isFlipped ? `Carta con ${card.emoji}` : 'Carta boca abajo'}
            >
              <span className="text-4xl select-none">
                {isFlipped ? card.emoji : '❓'}
              </span>
            </button>
          );
        })}
      </div>

      {showStars && (
        <div className="text-yellow-400 text-5xl mb-4 animate-pulse select-none">🌟🌟🌟</div>
      )}

      {gameStatus === 'win' && (
        <div className="text-green-700 font-bold text-xl mb-4">
          🎉 ¡Felicidades, completaste el memorama! 🎉
        </div>
      )}

      <button
        onClick={resetGame}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        type="button"
      >
        {gameStatus === 'win' ? 'Jugar de nuevo' : 'Reiniciar juego'}
      </button>
    </div>
  );
};

export default MemoramaEcologico;
