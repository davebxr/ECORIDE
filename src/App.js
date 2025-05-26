import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import RegistroForm from './components/RegistroForm';
import MapaView from './components/MapaView';
import SolicitudForm from './components/SolicitudForm';
import TipsVideos from './components/TipsVideos';
import UsuarioProfile from './components/UsuarioProfile';
import InicioAnimado from './components/InicioAnimado';
import MascotaVirtual from './components/MascotaVirtual';
import Juegos from './components/Juegos';

const App = () => {
  const [currentPage, setCurrentPage] = useState('inicio');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Cargar datos del usuario si existe
    const savedUser = localStorage.getItem('ecorideUser');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setCurrentPage('mapa');
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <InicioAnimado setCurrentPage={setCurrentPage} />;
      case 'registro':
        return <RegistroForm setCurrentPage={setCurrentPage} setUserData={setUserData} />;
      case 'mapa':
        return <MapaView />;
      case 'solicitud':
        return <SolicitudForm userData={userData} setUserData={setUserData} />;
      case 'tips':
        return <TipsVideos />;
      case 'usuario':
        return <UsuarioProfile userData={userData} />;
      case 'mascota':
        return <MascotaVirtual userData={userData} setCurrentPage={setCurrentPage} />;
      case 'juegos':
        return <Juegos userData={userData} setUserData={setUserData} />;
      default:
        return <InicioAnimado setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <LayoutHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className={currentPage !== 'inicio' && currentPage !== 'registro' ? 'pt-16' : ''}>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;

// DONE