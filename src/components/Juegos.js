import React, { useState, useEffect } from 'react';

// Datos memorama
const elementos = [
  { id: 1, imagen: '🌱', texto: 'Planta' },
  { id: 2, imagen: '🌍', texto: 'Planeta' },
  { id: 3, imagen: '♻️', texto: 'Reciclaje' },
  { id: 4, imagen: '🍃', texto: 'Hoja' },
  { id: 5, imagen: '🌸', texto: 'Flor' },
  { id: 6, imagen: '🌊', texto: 'Agua' },
];

// Datos adivina emoji
const emojisAdivina = ['🌱', '🌍', '♻️', '🍃', '🌸', '🌊', '🐢', '🌾', '🦋', '🌻'];

// Datos trivia
const preguntasTrivia = [
  {
    pregunta: '¿Cuál es la principal causa del calentamiento global?',
    opciones: ['Contaminación del aire', 'Uso de plásticos', 'Deforestación', 'Emisiones de gases de efecto invernadero'],
    correcta: 3,
  },
  {
    pregunta: '¿Qué símbolo indica que un material es reciclable?',
    opciones: ['♻️', '⚠️', '❌', '✅'],
    correcta: 0,
  },
  {
    pregunta: '¿Cuál es una fuente de energía renovable?',
    opciones: ['Petróleo', 'Energía solar', 'Carbón', 'Gas natural'],
    correcta: 1,
  },
];

// Datos ordena la secuencia
const pasosReciclaje = [
  'Lavar los residuos',
  'Separar los materiales',
  'Colocar en el contenedor correcto',
  'Transportar al centro de reciclaje',
];

const Juegos = () => {
  const [puntos, setPuntos] = useState(0);
  const [currentGame, setCurrentGame] = useState(null); // 'memorama', 'adivinaEmoji', 'trivia', 'secuencia'

  // --- MEMORAMA ---
  const [cartas, setCartas] = useState([]);
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]);
  const [cartasEmparejadas, setCartasEmparejadas] = useState([]);
  const [deshabilitarClick, setDeshabilitarClick] = useState(false);

  // --- ADIVINA EL EMOJI ---
  const [adivinaEmoji, setAdivinaEmoji] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [resultado, setResultado] = useState(null);

  // --- TRIVIA ---
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [triviaResultado, setTriviaResultado] = useState(null);

  // --- SECUENCIA ---
  const [pasosDesordenados, setPasosDesordenados] = useState([]);
  const [pasosUsuario, setPasosUsuario] = useState([]);
  const [secuenciaResultado, setSecuenciaResultado] = useState(null);

  // Función para sumar puntos
  const addPoints = (pts) => setPuntos((p) => p + pts);

  // -------- MEMORAMA --------
  useEffect(() => {
    if (currentGame === 'memorama') {
      iniciarJuegoMemorama();
    }
  }, [currentGame]);

  const iniciarJuegoMemorama = () => {
    const pares = [...elementos, ...elementos].map((item, index) => ({
      ...item,
      id: index + 1 + Math.random(),
      visible: false,
    }));
    const barajado = pares.sort(() => Math.random() - 0.5);
    setCartas(barajado);
    setCartasSeleccionadas([]);
    setCartasEmparejadas([]);
    setDeshabilitarClick(false);
  };

  const manejarClickCarta = (carta) => {
    if (deshabilitarClick) return;
    if (
      cartasSeleccionadas.length === 2 ||
      cartasSeleccionadas.find((c) => c.id === carta.id) ||
      cartasEmparejadas.find((c) => c.id === carta.id)
    )
      return;

    const nuevasSeleccionadas = [...cartasSeleccionadas, carta];
    setCartasSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      setDeshabilitarClick(true);
      setTimeout(() => {
        const [primera, segunda] = nuevasSeleccionadas;
        if (primera.texto === segunda.texto) {
          setCartasEmparejadas((prev) => [...prev, primera, segunda]);
          addPoints(25);
        }
        setCartasSeleccionadas([]);
        setDeshabilitarClick(false);
      }, 1000);
    }
  };

  // -------- ADIVINA EL EMOJI --------
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
    opcionesJuego = opcionesJuego.sort(() => Math.random() - 0.5);

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

  // -------- TRIVIA --------
  useEffect(() => {
    if (currentGame === 'trivia') {
      iniciarJuegoTrivia();
    }
  }, [currentGame]);

  const iniciarJuegoTrivia = () => {
    setPreguntaActual(0);
    setRespuestaSeleccionada(null);
    setTriviaResultado(null);
  };

  const manejarRespuestaTrivia = (index) => {
    if (respuestaSeleccionada !== null) return;
    setRespuestaSeleccionada(index);
    const correcta = preguntasTrivia[preguntaActual].correcta;
    if (index === correcta) {
      setTriviaResultado('correcto');
      addPoints(15);
    } else {
      setTriviaResultado('incorrecto');
    }
  };

  const siguientePregunta = () => {
    if (preguntaActual + 1 < preguntasTrivia.length) {
      setPreguntaActual(preguntaActual + 1);
      setRespuestaSeleccionada(null);
      setTriviaResultado(null);
    } else {
      alert('Has terminado la trivia!');
      setCurrentGame(null);
    }
  };

  // -------- SECUENCIA --------
  useEffect(() => {
    if (currentGame === 'secuencia') {
      iniciarJuegoSecuencia();
    }
  }, [currentGame]);

  const iniciarJuegoSecuencia = () => {
    const desorden = [...pasosReciclaje].sort(() => Math.random() - 0.5);
    setPasosDesordenados(desorden);
    setPasosUsuario([]);
    setSecuenciaResultado(null);
  };

  const moverPaso = (paso) => {
    // Añadir paso al orden del usuario, evitar duplicados
    if (pasosUsuario.includes(paso)) return;
    setPasosUsuario([...pasosUsuario, paso]);
  };

  const reiniciarSecuencia = () => {
    setPasosUsuario([]);
    setSecuenciaResultado(null);
  };

  const verificarSecuencia = () => {
    if (pasosUsuario.length !== pasosReciclaje.length) {
      alert('Por favor selecciona todos los pasos antes de verificar.');
      return;
    }
    const correcto = pasosUsuario.every((paso, i) => paso === pasosReciclaje[i]);
    if (correcto) {
      setSecuenciaResultado('correcto');
      addPoints(30);
    } else {
      setSecuenciaResultado('incorrecto');
    }
  };

  const resetGame = () => {
    setCurrentGame(null);
    setCartas([]);
    setCartasSeleccionadas([]);
    setCartasEmparejadas([]);
    setAdivinaEmoji(null);
    setOpciones([]);
    setResultado(null);
    setPreguntaActual(0);
    setRespuestaSeleccionada(null);
    setTriviaResultado(null);
    setPasosDesordenados([]);
    setPasosUsuario([]);
    setSecuenciaResultado(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Juegos Ecológicos</h2>
      <p className="mb-6 text-center font-semibold text-lg">Puntos: {puntos}</p>

      {!currentGame ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MEMORAMA */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Memorama Ecológico</h3>
            <p className="mb-4">Encuentra las parejas de elementos ecológicos.</p>
            <button
              onClick={() => setCurrentGame('memorama')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Jugar (25 pts)
            </button>
          </div>

          {/* ADIVINA EL EMOJI */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Adivina el Emoji</h3>
            <p className="mb-4">Descubre cuál es el emoji oculto entre las opciones.</p>
            <button
              onClick={() => setCurrentGame('adivinaEmoji')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Jugar (20 pts)
            </button>
          </div>

          {/* TRIVIA */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Trivia Verde</h3>
            <p className="mb-4">Responde preguntas sobre ecología.</p>
            <button
              onClick={() => setCurrentGame('trivia')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Jugar (15 pts)
            </button>
          </div>

          {/* SECUENCIA */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Ordena la Secuencia</h3>
            <p className="mb-4">Ordena correctamente los pasos para reciclar.</p>
            <button
              onClick={() => setCurrentGame('secuencia')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Jugar (30 pts)
            </button>
          </div>
        </div>
      ) : null}

      {/* --- MEMORAMA UI --- */}
      {currentGame === 'memorama' && (
        <div>
          <button
            onClick={resetGame}
            className="mb-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Volver al menú
          </button>
          <div className="grid grid-cols-4 gap-4 justify-center max-w-md mx-auto">
            {cartas.map((carta) => {
              const estaSeleccionada = cartasSeleccionadas.find((c) => c.id === carta.id);
              const estaEmparejada = cartasEmparejadas.find((c) => c.id === carta.id);
              return (
                <button
                  key={carta.id}
                  onClick={() => manejarClickCarta(carta)}
                  disabled={estaEmparejada}
                  className={`border rounded h-20 flex items-center justify-center text-3xl cursor-pointer
                  ${estaSeleccionada || estaEmparejada ? 'bg-green-300' : 'bg-gray-200 hover:bg-gray-300'}
                  `}
                >
                  {estaSeleccionada || estaEmparejada ? carta.imagen : '?'}
                </button>
              );
            })}
          </div>
          {cartasEmparejadas.length === cartas.length && (
            <p className="text-center mt-4 text-green-700 font-bold">¡Felicidades! Completaste el memorama.</p>
          )}
        </div>
      )}

      {/* --- ADIVINA EL EMOJI UI --- */}
      {currentGame === 'adivinaEmoji' && (
        <div className="text-center">
          <button
            onClick={resetGame}
            className="mb-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Volver al menú
          </button>
          <p className="mb-4 text-lg font-semibold">¿Cuál es este emoji?</p>
          <p className="text-6xl mb-4">{adivinaEmoji}</p>
          <div className="flex justify-center gap-8 mb-4">
            {opciones.map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => handleOpcionClick(emoji)}
                disabled={resultado !== null}
                className="text-5xl hover:bg-green-200 rounded p-2"
              >
                {emoji}
              </button>
            ))}
          </div>
          {resultado && (
            <p className={`font-bold text-xl ${resultado === 'correcto' ? 'text-green-600' : 'text-red-600'}`}>
              {resultado === 'correcto' ? '¡Correcto!' : 'Incorrecto, intenta de nuevo.'}
            </p>
          )}
          {resultado === 'correcto' && (
            <button
              onClick={iniciarJuegoAdivina}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Siguiente
            </button>
          )}
        </div>
      )}

      {/* --- TRIVIA UI --- */}
      {currentGame === 'trivia' && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={resetGame}
            className="mb-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Volver al menú
          </button>
          <p className="mb-4 text-xl font-semibold">{preguntasTrivia[preguntaActual].pregunta}</p>
          <div className="flex flex-col gap-3">
            {preguntasTrivia[preguntaActual].opciones.map((opcion, i) => {
              const correcta = preguntasTrivia[preguntaActual].correcta === i;
              const seleccionada = respuestaSeleccionada === i;
              let bgClass = 'bg-gray-200 hover:bg-gray-300';
              if (respuestaSeleccionada !== null) {
                if (correcta) bgClass = 'bg-green-400 text-white';
                else if (seleccionada) bgClass = 'bg-red-400 text-white';
                else bgClass = 'bg-gray-300';
              }
              return (
                <button
                  key={i}
                  onClick={() => manejarRespuestaTrivia(i)}
                  disabled={respuestaSeleccionada !== null}
                  className={`${bgClass} px-4 py-2 rounded`}
                >
                  {opcion}
                </button>
              );
            })}
          </div>
          {triviaResultado && (
            <p className={`mt-4 font-bold text-center text-xl ${triviaResultado === 'correcto' ? 'text-green-700' : 'text-red-700'}`}>
              {triviaResultado === 'correcto' ? '¡Correcto!' : 'Incorrecto.'}
            </p>
          )}
          {respuestaSeleccionada !== null && (
            <button
              onClick={siguientePregunta}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {preguntaActual + 1 < preguntasTrivia.length ? 'Siguiente' : 'Terminar'}
            </button>
          )}
        </div>
      )}

      {/* --- ORDENAR SECUENCIA UI --- */}
      {currentGame === 'secuencia' && (
        <div className="max-w-md mx-auto">
          <button
            onClick={resetGame}
            className="mb-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Volver al menú
          </button>
          <p className="mb-2 font-semibold text-center">Ordena los pasos para reciclar correctamente:</p>

          <div className="mb-4">
            <p className="font-semibold mb-1">Pasos disponibles:</p>
            <div className="flex flex-wrap gap-2">
              {pasosDesordenados.map((paso, idx) => (
                <button
                  key={idx}
                  onClick={() => moverPaso(paso)}
                  disabled={pasosUsuario.includes(paso)}
                  className={`px-3 py-1 rounded border ${
                    pasosUsuario.includes(paso) ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-200 hover:bg-green-300'
                  }`}
                >
                  {paso}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-1">Tu orden:</p>
            <ol className="list-decimal list-inside border p-3 rounded min-h-[120px] bg-gray-100">
              {pasosUsuario.map((paso, idx) => (
                <li key={idx}>{paso}</li>
              ))}
            </ol>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={verificarSecuencia}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Verificar
            </button>
            <button
              onClick={reiniciarSecuencia}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Reiniciar
            </button>
          </div>

          {secuenciaResultado && (
            <p className={`mt-4 text-center font-bold text-xl ${secuenciaResultado === 'correcto' ? 'text-green-700' : 'text-red-700'}`}>
              {secuenciaResultado === 'correcto'
                ? '¡Muy bien! Orden correcto.'
                : 'Orden incorrecto, intenta de nuevo.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Juegos;
