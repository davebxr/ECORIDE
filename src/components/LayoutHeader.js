import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

const LayoutHeader = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const pages = [
    { key: 'mapa', label: 'Mapa' },
    { key: 'solicitud', label: 'Solicitud' },
    { key: 'tips', label: 'Consejos y Avisos' },
    { key: 'usuario', label: 'Usuario' },
    { key: 'mascota', label: 'Mascota' },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen((v) => !v);
  const toggleProfileMenu = () => setIsProfileMenuOpen((v) => !v);

  const openLogoutModal = () => {
    setIsProfileMenuOpen(false);
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    setHasLoggedOut(true);
    setTimeout(() => navigate('/InicioAnimado'), 2000); // Redirige con retraso para ver animación
  };

  if (currentPage === 'inicio' || currentPage === 'registro') return null;

  return (
    <>
      {!hasLoggedOut ? (
        <>
          <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-20 flex items-center px-4 py-3">
            {/* Imagen circular */}
            <div className="flex items-center w-20 justify-center">
              <div
                onClick={toggleProfileMenu}
                className="w-12 h-12 rounded-full border-4 border-green-600 cursor-pointer bg-[url('/danne.jpg')] bg-center bg-cover"
                title="Perfil"
              ></div>

              {isProfileMenuOpen && (
                <div className="absolute top-16 left-4 bg-white border border-gray-300 rounded-md shadow-lg w-40 z-30">
                  <button
                    onClick={openLogoutModal}
                    className="block w-full text-left px-4 py-2 hover:bg-green-100 text-gray-700"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            {/* Título */}
            <h1 className="text-2xl font-bold text-green-600 ml-4 flex-1">EcoRide</h1>

            {/* Menú PC */}
            <nav className="hidden md:flex space-x-6 mr-8">
              {pages.map(({ key, label }) => {
                const isSelected = currentPage === key;
                return (
                  <button
                    key={key}
                    onClick={() => handlePageChange(key)}
                    className={`text-gray-700 transition-transform duration-200 ${
                      isSelected ? 'text-green-600 font-semibold scale-110' : 'hover:scale-105'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>

            {/* Menú móvil */}
            <div className="md:hidden relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Menú
              </button>
              {isDropdownOpen && (
                <nav className="absolute top-10 right-0 w-screen max-w-xs bg-white border border-gray-200 rounded-md shadow-lg z-40">
                  <ul className="flex flex-col w-full">
                    {pages.map(({ key, label }) => {
                      const isSelected = currentPage === key;
                      return (
                        <li key={key}>
                          <button
                            onClick={() => handlePageChange(key)}
                            className={`w-full text-left px-6 py-3 transition-colors ${
                              isSelected
                                ? 'bg-green-600 text-white font-semibold'
                                : 'text-gray-700 hover:bg-green-100'
                            }`}
                          >
                            {label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              )}
            </div>
          </header>

          {/* Modal cerrar sesión */}
          {isLogoutModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50 p-4"
              onClick={closeLogoutModal}
            >
              <div
                className="bg-white rounded-lg p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-4">¿Seguro que quieres cerrar sesión?</h2>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeLogoutModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmLogout}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="fixed inset-0 bg-green-100 flex flex-col justify-center items-center z-50 p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 mb-6 animate-zoomIn">
            Gracias por visitar EcoRide
          </h1>
          <div className="flex space-x-4 text-4xl md:text-6xl animate-emojiMove">
            <span role="img" aria-label="Globo terráqueo">🌍</span>
            <span role="img" aria-label="Reciclaje">♻️</span>
            <span role="img" aria-label="Planta">🌱</span>
            <span role="img" aria-label="Hoja">🍃</span>
          </div>
        </div>
      )}

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes zoomIn {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-zoomIn {
          animation: zoomIn 0.8s ease forwards;
        }

        @keyframes emojiMove {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-emojiMove span {
          display: inline-block;
          animation: emojiMove 2s ease-in-out infinite;
        }
        .animate-emojiMove span:nth-child(2) { animation-delay: 0.2s; }
        .animate-emojiMove span:nth-child(3) { animation-delay: 0.4s; }
        .animate-emojiMove span:nth-child(4) { animation-delay: 0.6s; }
      `}</style>
    </>
  );
};

export default LayoutHeader;
