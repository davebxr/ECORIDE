import React, { useState, useEffect } from 'react';

const Juegos = () => {
  // Estado general
  const [currentGame, setCurrentGame] = useState(null); // null | 'memorama' | 'adivinaEmoji'
  const [points, setPoints] = useState(0);

  // --- MEMORAMA ECOLOGICO ---

  // Cartas memorama
  const cartas = [
    { id: 1, tipo: 'recycle', emoji: '♻️' },
    { id: 2, tipo: 'tree', emoji: '🌳' },
    { id: 3, tipo: 'flower', emoji: '🌸' },
    { id: 4, tipo: 'water', emoji: '💧' },
    { id: 5, tipo: 'sun', emoji: '☀️' },
    { id: 6, tipo: 'earth', emoji: '🌍' },
  ];

  // Estado memorama
  const [cartasJuego, setCartasJuego] = useState([]);
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
  const [cartasAcertadas, setCartasAcertadas] = useState([]);

  useEffect(() => {
    if (currentGame === 'memorama') {
      iniciarMemorama();
    }
  }, [currentGame]);

  const iniciarMemorama = () => {
    const cartasDuplicadas = [...cartas, ...cartas].map((c, i) => ({
      ...c,
      uid: i + 1, // id único para cada carta
    }));
    // Barajar
    for (let i = cartasDuplicadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartasDuplicadas[i], cartasDuplicadas[j]] = [cartasDuplicadas[j], cartasDuplicadas[i]];
    }
    setCartasJuego(cartasDuplicadas);
    setCartasSeleccionadas([]);
    setCartasAcertadas([]);
  };

  // Al seleccionar una carta
  const handleClickCarta = (uid) => {
    if (
      cartasSeleccionadas.length === 2 ||
      cartasSeleccionadas.includes(uid) ||
      cartasAcertadas.includes(uid)
    ) {
      return; // No hacer nada si ya 2 seleccionadas o ya acertada o ya seleccionada
    }

    const nuevasSeleccionadas = [...cartasSeleccionadas, uid];
    setCartasSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      // Verificar si son pareja
      const [primera, segunda] = nuevasSeleccionadas.map((id) =>
        cartasJuego.find((c) => c.uid === id)
      );
      if (primera.tipo === segunda.tipo) {
        // Acertaron pareja
        setTimeout(() => {
          setCartasAcertadas((prev) => [...prev, primera.uid, segunda.uid]);
          setCartasSeleccionadas([]);
          addPoints(25);
        }, 700);
      } else {
        // No acertaron pareja
        setTimeout(() => {
          setCartasSeleccionadas([]);
        }, 1000);
      }
    }
  };

  // --- JUEGO ADIVINA EL EMOJI ---

  const emojisAdivina = ['🌱', '🌍', '♻️', '🍃', '🌸', '🌊', '🐢', '🌾', '🦋', '🌻'];

  const [adivinaEmoji, setAdivinaEmoji] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    if (currentGame === 'adivinaEmoji') {
      iniciarJuegoAdivina();
    }
  }, [currentGame]);

  const iniciarJuegoAdivina = () => {
    const correcto = emojisAdivina[Math.floor(Math.random() * emojisAdivina.length)];
    let opcionesJuego = [correcto];
    while (opcionesJuego.length < 3) {
      const randomEmoji = emojisAdivina[Math.floor(Math.random() * emojisAdivina.length)];
      if (!opcionesJuego.includes(randomEmoji)) opcionesJuego.push(randomEmoji);
    }
    opcionesJuego.sort(() => Math.random() - 0.5);

    setAdivinaEmoji(correcto);
    setOpciones(opcionesJuego);
    setResultado(null);
  };

  const handleOpcionClick = (emoji) => {
    if (resultado) return;

    if (emoji === adivinaEmoji) {
      setResultado('correcto');
      addPoints(20);
    } else {
      setResultado('incorrecto');
    }
  };

  // --- FUNCION PARA SUMAR PUNTOS ---

  const addPoints = (pts) => {
    setPoints((prev) => prev + pts);
  };

  // --- RESET AL MENU PRINCIPAL ---
  const resetGame = () => {
    setCurrentGame(null);
    setResultado(null);
    setCartasSeleccionadas([]);
    setCartasAcertadas([]);
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Juegos Ecológicos</h1>
      <p className="mb-6 text-center text-lg font-semibold">Puntos: {points}</p>

      {!currentGame ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Memorama Ecológico</h3>
            <p className="mb-4">Encuentra las parejas de elementos ecológicos.</p>
            <button
              onClick={() => setCurrentGame('memorama')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Jugar (25 puntos)
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Adivina el Emoji</h3>
            <p className="mb-4">Descubre cuál es el emoji oculto entre las opciones.</p>
            <button
              onClick={() => setCurrentGame('adivinaEmoji')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Jugar (20 puntos)
            </button>
          </div>
        </div>
      ) : currentGame === 'memorama' ? (
        <div className="text-center">
          <button
            onClick={resetGame}
            className="mb-4 text-gray-600 hover:text-green-600"
          >
            ← Volver a los juegos
          </button>
          <h3 className="text-xl font-semibold mb-4">Memorama Ecológico</h3>
          <div className="grid grid-cols-4 gap-4 justify-center max-w-xs mx-auto">
            {cartasJuego.map((c) => {
              const mostrar =
                cartasSeleccionadas.includes(c.uid) || cartasAcertadas.includes(c.uid);
              return (
                <button
                  key={c.uid}
                  onClick={() => handleClickCarta(c.uid)}
                  disabled={mostrar}
                  className={`bg-green-200 rounded-lg text-3xl py-4 ${
                    mostrar ? 'cursor-default' : 'hover:bg-green-300'
                  }`}
                >
                  {mostrar ? c.emoji : '❓'}
                </button>
              );
            })}
          </div>
          {cartasAcertadas.length === cartasJuego.length && (
            <p className="mt-6 font-bold text-green-700 text-lg">
              ¡Felicidades! Completaste el memorama.
            </p>
          )}
        </div>
      ) : currentGame === 'adivinaEmoji' ? (
        <div className="text-center">
          <button
            onClick={resetGame}
            className="mb-4 text-gray-600 hover:text-green-600"
          >
            ← Volver a los juegos
          </button>

          <h3 className="text-xl font-semibold mb-4">Adivina el Emoji</h3>
          <p className="mb-6 text-lg">¿Cuál es el emoji oculto?</p>

          <div className="mb-6 text-6xl">
            {resultado === 'correcto' ? adivinaEmoji : '❓'}
          </div>

          <div className="flex justify-center gap-6 mb-6">
            {opciones.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleOpcionClick(emoji)}
                className="bg-green-200 px-6 py-4 rounded-lg text-4xl hover:bg-green-300"
                disabled={!!resultado}
              >
                {emoji}
              </button>
            ))}
          </div>

          {resultado === 'correcto' && (
            <p className="text-green-700 font-bold mb-4">¡Correcto! +20 puntos 🎉</p>
          )}
          {resultado === 'incorrecto' && (
            <p className="text-red-600 font-bold mb-4">Incorrecto, intenta de nuevo.</p>
          )}

          {(resultado === 'correcto' || resultado === 'incorrecto') && (
            <button
              onClick={iniciarJuegoAdivina}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Jugar otra vez
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Juegos;
