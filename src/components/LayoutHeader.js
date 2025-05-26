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
      {[
        { name: 'Mapa', page: 'mapa' },
        { name: 'Solicitud', page: 'solicitud' },
        { name: 'Consejos y Avisos', page: 'tips' },
        { name: 'Usuario', page: 'usuario' },
        { name: 'Mascota', page: 'mascota' },
      ].map(({ name, page }) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 text-gray-600 transition-all duration-200 
            hover:text-green-600 hover:scale-105 
            ${currentPage === page ? 'text-green-600 text-lg font-semibold scale-110' : ''}`}
        >
          {name}
        </button>
      ))}
    </>
  );

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">EcoRide</h1>

        {/* Menú completo en pantallas grandes */}
        <nav className="hidden md:flex items-center gap-4">{menuItems}</nav>

        {/* Menú en celular */}
        <div className="relative md:hidden">
          <button
            onClick={handleDropdownToggle}
            className="text-gray-600 hover:text-green-600 transition-colors focus:outline-none"
          >
            Menú
          </button>

          {isDropdownOpen && (
            <nav className="absolute right-0 mt-2 w-screen bg-white border-t border-gray-200 shadow-lg z-20">
              <ul className="flex flex-col items-center py-4 space-y-2 list-none">
                {[
                  { name: 'Mapa', page: 'mapa' },
                  { name: 'Solicitud', page: 'solicitud' },
                  { name: 'Consejos y Avisos', page: 'tips' },
                  { name: 'Usuario', page: 'usuario' },
                  { name: 'Mascota', page: 'mascota' },
                ].map(({ name, page }) => (
                  <li key={page}>
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`text-gray-600 transition-all duration-200 px-4 py-2 
                        hover:text-green-600 hover:scale-105 
                        ${currentPage === page ? 'text-green-600 text-lg font-semibold scale-110' : ''}`}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
