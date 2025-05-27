import React, { useState } from 'react';

const LayoutHeader = ({ currentPage, setCurrentPage }) => {
  if (currentPage === 'inicio' || currentPage === 'registro') return null;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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

  return (
    <>
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-20 flex items-center px-4 py-3">
        {/* Sidebar Izquierda: Avatar */}
        <div className="flex items-center w-20 justify-center">
          <div
            onClick={toggleProfileMenu}
            className="w-12 h-12 rounded-full border-4 border-green-600 cursor-pointer bg-black bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80')] bg-center bg-cover"
            title="Perfil"
          ></div>

          {/* Menú pequeño del perfil */}
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

        {/* Menú para PC */}
        <nav className="hidden md:flex space-x-6 mr-8">
          {pages.map(({ key, label }) => {
            const isSelected = currentPage === key;
            return (
              <button
                key={key}
                onClick={() => handlePageChange(key)}
                className={`
                  text-gray-700
                  transition-transform
                  duration-200
                  ${isSelected ? 'text-green-600 font-semibold scale-110' : 'hover:scale-105'}
                `}
                style={{ transformOrigin: 'center' }}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* Botón menú móvil */}
        <div className="md:hidden relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-600 hover:text-green-600 transition-colors focus:outline-none"
            aria-label="Abrir menú"
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
                          isSelected ? 'bg-green-600 text-white font-semibold' : 'text-gray-700 hover:bg-green-100'
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

      {/* Modal para Confirmar Cerrar Sesión */}
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
                onClick={() => {
                  closeLogoutModal();
                  alert('Sesión cerrada'); // Aquí agregas tu lógica de logout real
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutHeader;
