import React, { useState } from 'react';

const LayoutHeader = ({ currentPage, setCurrentPage }) => {
  // No renderizar el header en la página de inicio animada ni en registro
  if (currentPage === 'inicio' || currentPage === 'registro') {
    return null;
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsDropdownOpen(false); // Cerrar el menú al seleccionar una opción
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">EcoRide</h1>
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="text-gray-600 hover:text-green-600 transition-colors focus:outline-none"
          >
            Menú
          </button>
          {isDropdownOpen && (
            <nav className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <ul className="flex flex-col">
                <li>
                  <button
                    onClick={() => handlePageChange('mapa')}
                    className={`block w-full text-left px-4 py-2 text-gray-600 hover:bg-green-100 transition-colors ${currentPage === 'mapa' ? 'font-semibold text-green-600' : ''}`}
                  >
                    Mapa
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageChange('solicitud')}
                    className={`block w-full text-left px-4 py-2 text-gray-600 hover:bg-green-100 transition-colors ${currentPage === 'solicitud' ? 'font-semibold text-green-600' : ''}`}
                  >
                    Solicitud
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageChange('tips')}
                    className={`block w-full text-left px-4 py-2 text-gray-600 hover:bg-green-100 transition-colors ${currentPage === 'tips' ? 'font-semibold text-green-600' : ''}`}
                  >
                    Consejos y Avisos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageChange('usuario')}
                    className={`block w-full text-left px-4 py-2 text-gray-600 hover:bg-green-100 transition-colors ${currentPage === 'usuario' ? 'font-semibold text-green-600' : ''}`}
                  >
                    Usuario
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageChange('mascota')}
                    className={`block w-full text-left px-4 py-2 text-gray-600 hover:bg-green-100 transition-colors ${currentPage === 'mascota' ? 'font-semibold text-green-600' : ''}`}
                  >
                    Mascota
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
