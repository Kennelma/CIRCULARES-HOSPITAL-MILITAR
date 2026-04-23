
import { useState } from 'react';
import DashboardCliente from './cliente/dashboardCliente';
import AdminLayout from './administrador/AdminLayout';
import './styles/rrhh.css';

function App() {
  const [view, setView] = useState('cliente');

  return (
    <div>
      <div className="d-flex gap-2 p-3 border-bottom">
        <button
          type="button"
          className={`btn ${view === 'cliente' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setView('cliente')}
        >
          Vista Cliente
        </button>
        <button
          type="button"
          className={`btn ${view === 'admin' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setView('admin')}
        >
          Vista Administrador
        </button>
      </div>

      <div>
        {view === 'cliente' ? <DashboardCliente /> : <AdminLayout />}
      </div>
    </div>
  );
}

export default App;