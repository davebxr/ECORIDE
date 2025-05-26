import React, { useState } from 'react';

const LayoutHeader = ({ currentPage, setCurrentPage }) => {
  if (currentPage === 'inicio' || currentPage === 'registro') {
    return null;
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsDropdownOpen(false);
  };

  const menuItems = (
    <>
      <li>
        <button
          onClick={() => handlePageChange('mapa')}
          className={`px-4 py-2 text-gray-600 hover:text-green-600 ${currentPage === 'mapa' ? 'font-semibold text-green-600' : ''}`}
        >
          Mapa
        </button>
      </li>
      <li>
        <button
          onClick={() => handlePageChange('solicitud')}
          className={`px-4 py-2 text-gray-600 hover:text-green-600 ${currentPage === 'solicitud' ? 'font-semibold text-green-600' : ''}`}
        >
          Solicitud
        </button>
      </li>
      <li>
        <button
          onClick={() => handlePageChange('tips')}
          className={`px-4 py-2 text-gray-600 hover:text-green-600 ${currentPage === 'tips' ? 'font-semibold text-green-600' : ''}`}
        >
          Consejos y Avisos
        </button>
      </li>
      <li>
        <button
          onClick={() => handlePageChange('usuario')}
          className={`px-4 py-2 text-gray-600 hover:text-green-600 ${currentPage === 'usuario' ? 'font-semibold text-green-600' : ''}`}
        >
          Usuario
        </button>
      </li>
      <li>
        <button
          onClick={() => handlePageChange('mascota')}
          className={`px-4 py-2 text-gray-600 hover:text-green-600 ${currentPage === 'mascota' ? 'font-semibold text-green-600' : ''}`}
        >
          Mascota
        </button>
      </li>
    </>
  );

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">EcoRide</h1>

        {/* Menú completo en pantallas medianas en adelante */}
        <nav className="hidden md:flex gap-4">{menuItems}</nav>

        {/* Botón de menú en móviles */}
        <div className="relative md:hidden">
          <button
            onClick={handleDropdownToggle}
            className="text-gray-600 hover:text-green-600 transition-colors focus:outline-none"
          >
            Menú
          </button>
          {isDropdownOpen && (
            <nav className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <ul className="flex flex-col">{menuItems}</ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
