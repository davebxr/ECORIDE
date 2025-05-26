import React from 'react';

const TipsVideos = () => {
  const tips = [
    { id: 1, title: 'Cómo separar tus residuos', content: 'Aprende a clasificar correctamente papel, plástico, vidrio y metal.' },
    { id: 2, title: 'Reciclaje de electrónicos', content: 'Descubre dónde y cómo desechar tus aparatos electrónicos viejos de forma segura.' },
    { id: 3, title: 'Composta casera', content: 'Convierte tus residuos orgánicos en abono para tus plantas.' },
    { id: 3, title: 'Reutiliza', content: 'Puedes crear con tu reciclaje.' },
    { id: 4, title: 'Conoce los materiales reciclables', content: 'Infórmate sobre qué materiales son reciclables en tu área.' },
    { id: 5, title: 'Limpia y seca los envases', content: 'Antes de reciclar, asegúrate de que los envases estén limpios y secos. Los residuos de alimentos pueden contaminar el reciclaje.' },
    { id: 6, title: 'Separa tus residuos:', content: 'Separa tu reciclaje por canecas que indiquen su funcion.' },
  ];

  const videos = [
    { id: 1, title: 'BENEFICIOS DEL RECICLAJE ♻ ¿Qué es el reciclaje?', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/5q2HSdgO7CA?si=UayP5pfjpgOpMbPM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
    { id: 2, title: 'Qué es el RECICLAJE y por qué es IMPORTANTE? ', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/uaI3PLmAJyM?si=f2oCNbeMo1Gzcfph" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' }, 
    { id: 3, title: 'Plaza Sésamo: Elmo aprende sobre el reciclaje', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/haR08SGmwfs?si=XtaOYUXT0mrrING9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' }, 
    { id: 4, title: 'La IMPORTANCIA de RECICLAR para el MEDIO AMBIENTE ', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/cvakvfXj0KE?si=MwC_9PXeJ_hPwTyH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' }, 
    { id: 5, title: '¿Cómo reciclar? Aprende con Nacho las 3 R del reciclaje', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/WVrxkF6TcQU?si=ty_OGkjA95OYExHD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' }, 
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Tips y Videos de Reciclaje</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Tips Rápidos</h3>
          <ul className="space-y-4">
            {tips.map(tip => (
              <li key={tip.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-700 mb-2">{tip.title}</h4>
                <p className="text-gray-600 text-sm">{tip.content}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Videos Educativos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map(video => (
              <div key={video.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-700 mb-2">{video.title}</h4>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsVideos;