import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir
import { FaUserCircle } from 'react-icons/fa'; // Icono persona

const LayoutHeader = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate('/InicioAnimado'); // Redirige a InicioAnimado.js
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsDropdownOpen(false);
    setShowLogout(false); // Cerrar logout si estaba abierto
  };

  const menuItems = [
    { name: 'Mapa', page: 'mapa' },
    { name: 'Solicitud', page: 'solicitud' },
    { name: 'Consejos y Avisos', page: 'tips' },
    { name: 'Usuario', page: 'usuario' },
    { name: 'Mascota', page: 'mascota' },
  ];

  const logoutButton = (
    <button
      onClick={handleLogout}
      className="mt-2 px-4 py-2 text-sm bg-green-100 text-green-700 rounded-full shadow transition-all duration-300 hover:bg-green-200 scale-95 hover:scale-100"
    >
      Cerrar sesión
    </button>
  );

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Avatar con logout solo en PC */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => setShowLogout(!showLogout)}
            className="cursor-pointer relative hidden md:block"
            title="Perfil"
          >
            <div className="w-12 h-12 rounded-full border-2 border-green-600 flex justify-center items-center">
              <FaUserCircle className="text-green-600 text-4xl" />
            </div>
            {showLogout && (
              <div className="absolute top-14 left-1/2 -translate-x-1/2">
                {logoutButton}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-green-600">EcoRide</h1>
        </div>

        {/* Menú completo en PC */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map(({ name, page }) => (
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
        </nav>

        {/* Menú en celular */}
        <div className="relative md:hidden">
          <button
            onClick={handleDropdownToggle}
            className="text-gray-600 hover:text-green-600 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            Menú
          </button>

          {isDropdownOpen && (
            <nav className="absolute right-0 mt-2 w-screen bg-white border-t border-gray-200 shadow-lg z-20">
              <ul className="flex flex-col items-center py-4 space-y-4 list-none">
                {/* Avatar en celular */}
                <li>
                  <div
                    onClick={() => setShowLogout(!showLogout)}
                    className="cursor-pointer flex justify-center"
                    title="Perfil"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-green-600 flex justify-center items-center">
                      <FaUserCircle className="text-green-600 text-6xl" />
                    </div>
                  </div>
                  {showLogout && (
                    <div className="mt-2 flex justify-center">{logoutButton}</div>
                  )}
                </li>

                {/* Menú normal */}
                {menuItems.map(({ name, page }) => (
                  <li key={page}>
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`text-gray-600 transition-all duration-200 px-6 py-2 rounded-md
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
