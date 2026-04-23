// components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ view, setView, userRole }) => {
  return (
    <aside className="sidebar-wrapper d-none d-md-block">
      <div className="p-4 mb-2">
        <div className="d-flex align-items-center">
          <span className="brand-dot"></span>
          <span className="brand-name">RRHH Portal</span>
        </div>
      </div>
      <nav className="d-flex flex-column gap-1">
        <div 
          className={`sidebar-link ${view === 'dashboard' ? 'active' : ''}`} 
          onClick={() => setView('dashboard')}>
          <i className="bi bi-speedometer2" style={{fontSize: '1rem'}}></i> Dashboard
        </div>
        {userRole === 'Informático' && (
          <div 
            className={`sidebar-link ${view === 'usuarios' ? 'active' : ''}`} 
            onClick={() => setView('usuarios')}>
            <i className="bi bi-people" style={{fontSize: '1rem'}}></i> Gestión Usuarios
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;