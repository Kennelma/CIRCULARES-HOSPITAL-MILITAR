// layouts/AdminLayout.jsx (o pages/admin/index.jsx)
import React, { useState } from 'react';
import './admin.css';
import Sidebar from './sidebar';
import Navbar from './navbar';
import ViewUsuarios from './ViewUsuarios';
import DashboardAdmin from './DashboardAdmin';

const AdminLayout = () => {
  // Simulación de usuario autenticado proveniente de la base de datos
  const [currentUser] = useState({
    name: 'Denis Eduardo Zerón',
    role: 'Informático', // Cambiar a 'Editor' para probar la restricción
    area: 'Tecnología'
  });

  const [view, setView] = useState('dashboard');

  // Datos mock (reemplazar con llamadas a tu API/Laravel)
  const [docs] = useState([
    {id:1, n:'Circular-RRHH-042025.pdf', sz:'1.2 MB', area:'Recursos Humanos', fecha:'2025-04-08', upBy:'María González', est:'Publicado'},
    {id:2, n:'Politica-Vacaciones-2025.pdf', sz:'840 KB', area:'Administración', fecha:'2025-04-02', upBy:'Carlos Medina', est:'Borrador'}
  ]);

  const [users] = useState([
    {id:1, name:'María González', area:'Recursos Humanos', role:'Informático', state:'Activo'},
    {id:2, name:'Denis Eduardo Zerón', area:'Tecnología', role:'Informático', state:'Activo'},
    {id:3, name:'Carlos Medina', area:'Administración', role:'Editor', state:'Inactivo'}
  ]);

  return (
    <div className="layout-wrapper">
      <Sidebar view={view} setView={setView} userRole={currentUser.role} />
      
      <main className="content-wrapper">
        <Navbar user={currentUser} />
        
        <div className="portal-wrap p-4">
          {view === 'usuarios' && currentUser.role === 'Informático' && <ViewUsuarios users={users} />}
          
          {/* Ahora usamos el Dashboard independiente para Admin */}
          {view === 'dashboard' && <DashboardAdmin />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;