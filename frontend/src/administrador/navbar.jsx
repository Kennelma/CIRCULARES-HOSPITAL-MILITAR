// components/Navbar.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "Tendrás que ingresar tus credenciales nuevamente para acceder.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#185fa5',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // ESCALABILIDAD: Aquí limpiarías localStorage/Cookies y redirigirías al Login
        console.log('Cerrando sesión...');
        window.location.href = '/'; 
      }
    });
  };

  return (
    <header className="rrhh-navbar">
      <div className="input-group" style={{maxWidth: '280px'}}>
        <span className="input-group-text bg-transparent rrhh-search border-end-0 pe-1">
          <i className="bi bi-search text-secondary" style={{fontSize: '.8rem'}}></i>
        </span>
        <input type="text" className="form-control rrhh-search border-start-0 ps-1" placeholder="Buscar en el portal..." style={{fontSize: '.8rem'}} />
      </div>

      <div className="dropdown">
        <div 
          className="d-flex align-items-center gap-2 px-3 py-2 rrhh-card bg-white" 
          style={{borderRadius: '10px', cursor: 'pointer', border: 'none'}} 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '28px', height: '28px', background: '#e6f1fb'}}>
            <i className="bi bi-person-fill text-primary" style={{fontSize: '.8rem'}}></i>
          </span>
          <div className="d-none d-sm-block text-start">
            <div style={{fontSize: '.75rem', fontWeight: 500, color: '#1a1a2e', lineHeight: 1}}>{user?.name || 'Usuario'}</div>
            <div style={{fontSize: '.65rem', color: '#9ca3af'}}>{user?.role || 'Perfil'}</div>
          </div>
          <i className="bi bi-chevron-down ms-1 text-secondary" style={{fontSize: '.7rem'}}></i>
        </div>
        
        <ul 
          className={`dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2 rrhh-card ${isOpen ? 'show' : ''}`} 
          style={{
            fontSize: '.8rem', 
            minWidth: '180px',
            display: isOpen ? 'block' : 'none'
          }}>
          <li><a className="dropdown-item py-2" href="#"><i className="bi bi-person me-2"></i> Mi Perfil</a></li>
          <li><a className="dropdown-item py-2" href="#"><i className="bi bi-gear me-2"></i> Configuración</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <a className="dropdown-item py-2 text-danger" href="#" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i> 
              Cerrar Sesión
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;