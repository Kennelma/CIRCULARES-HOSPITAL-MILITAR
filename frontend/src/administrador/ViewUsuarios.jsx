// views/ViewUsuarios.jsx
import React from 'react';
import Swal from 'sweetalert2';

const ViewUsuarios = ({ users }) => {
  // Handler para nuevo empleado
  const handleNewUser = () => {
    Swal.fire({
      title: 'Registrar Nuevo Empleado',
      html: `
        <div class="text-start px-1">
          <div class="mb-3">
            <label class="rrhh-label">Nombre Completo</label>
            <input id="swal-name" class="form-control rrhh-input" placeholder="Ej. Juan Pérez">
          </div>
          <div class="mb-3">
            <label class="rrhh-label">Área / Departamento</label>
            <select id="swal-area" class="form-select rrhh-input">
              <option>Recursos Humanos</option>
              <option>Administración</option>
              <option>Dirección General</option>
              <option>Enfermería</option>
              <option>Servicios Médicos</option>
              <option>Tecnología</option>
            </select>
          </div>
          <div class="mb-2">
            <label class="rrhh-label">Rol de Acceso</label>
            <select id="swal-role" class="form-select rrhh-input">
              <option>Editor</option>
              <option>Informático</option>
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Crear cuenta',
      confirmButtonColor: '#185fa5',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Éxito!', 'El empleado ha sido registrado y se han enviado sus credenciales.', 'success');
      }
    });
  };

  // Handler para restablecer contraseña
  const handleResetPassword = (user) => {
    Swal.fire({
      title: '¿Restablecer contraseña?',
      text: `Se generará una clave temporal para ${user.name} directamente en la base de datos del sistema.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#185fa5',
      confirmButtonText: 'Sí, restablecer',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Restablecida', 'La nueva contraseña ha sido generada con éxito.', 'success');
      }
    });
  };

  // Handler para editar y deshabilitar
  const handleEditUser = (user) => {
    Swal.fire({
      title: `Gestionar: ${user.name}`,
      html: `
        <div class="text-start px-1">
          <div class="mb-3">
            <label class="rrhh-label">Estado de la cuenta</label>
            <select id="swal-state" class="form-select rrhh-input">
              <option value="Activo" ${user.state === 'Activo' ? 'selected' : ''}>Activo (Habilitado)</option>
              <option value="Inactivo" ${user.state === 'Inactivo' ? 'selected' : ''}>Inactivo (Deshabilitado)</option>
            </select>
          </div>
          <div class="mb-2">
            <label class="rrhh-label">Rol Asignado</label>
            <select id="swal-role" class="form-select rrhh-input">
              <option ${user.role === 'Editor' ? 'selected' : ''}>Editor</option>
              <option ${user.role === 'Informático' ? 'selected' : ''}>Informático</option>
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar cambios',
      confirmButtonColor: '#185fa5',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Actualizado', 'Los cambios han sido aplicados correctamente.', 'success');
      }
    });
  };

  /*
    LÓGICA BACKEND (COMENTARIO DE VALIDACIÓN):
    Aquí debes validar en tu controlador o middleware que el usuario
    autenticado tenga el rol adecuado ('Super Usuario' o 'Informático').
  */
  
  return (
    <div className="container-fluid p-0 animate__animated animate__fadeIn mx-auto" style={{maxWidth: '1280px'}}>
      <div className="mb-4">
        <h1 className="mb-1" style={{fontSize: '1.3rem', fontWeight: 500, color: '#1a1a2e'}}>Control de Usuarios y Roles</h1>
        <p className="text-secondary mb-0" style={{fontSize: '.85rem'}}>Administra quién puede acceder, crear empleados y asignar permisos al sistema</p>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-8">
          <div className="card rrhh-card border-0 shadow-none">
            <div className="card-body p-3">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                <span className="section-title">Directorio de Accesos</span>
                <button className="btn-primary-rrhh" onClick={handleNewUser}><i className="bi bi-person-plus"></i> Nuevo Empleado</button>
              </div>
              
              <div className="table-responsive">
                <table className="table rrhh-table mb-0">
                  <thead>
                    <tr>
                      <th>Empleado</th>
                      <th>Rol Asignado</th>
                      <th>Estado</th>
                      <th className="text-end">Acciones / Soporte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>
                          <div style={{fontSize: '.82rem', fontWeight: 500, color: '#1a1a2e'}}>{u.name}</div>
                          <div className="text-secondary" style={{fontSize: '.7rem'}}>{u.area}</div>
                        </td>
                        <td>
                          <span className={`badge rounded-pill fw-normal ${u.role === 'Informático' ? 'badge-nuevo' : 'badge-borrador'}`} style={{fontSize: '.68rem', padding: '4px 10px'}}>
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <span style={{fontSize: '.75rem', color: u.state === 'Activo' ? '#0f6e56' : '#dc2626'}}>
                            • {u.state}
                          </span>
                        </td>
                        <td className="text-end">
                          <div className="d-flex align-items-center justify-content-end gap-1">
                            <button 
                              className="btn-icon" 
                              title="Restablecer Contraseña"
                              onClick={() => handleResetPassword(u)}
                            >
                              <i className="bi bi-key" style={{fontSize: '.9rem'}}></i>
                            </button>
                            <button 
                              className="btn-icon" 
                              title="Editar / Deshabilitar"
                              onClick={() => handleEditUser(u)}
                            >
                              <i className="bi bi-pencil" style={{fontSize: '.85rem'}}></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card rrhh-card border-0 shadow-none mb-3">
            <div className="card-body p-3">
              <p className="section-title mb-3">Niveles de Acceso</p>
              <div className="p-3 mb-2" style={{background: '#f9fafb', borderRadius: '8px', border: '0.5px solid #e5e7eb'}}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <i className="bi bi-pencil-square text-primary"></i>
                  <strong style={{fontSize: '.8rem', color: '#1a1a2e'}}>Editor</strong>
                </div>
                <p className="mb-0 text-secondary" style={{fontSize: '.72rem'}}>Perfil enfocado en la gestión de contenido. Puede subir, editar y publicar circulares en el portal.</p>
              </div>
              <div className="p-3" style={{background: '#f9fafb', borderRadius: '8px', border: '0.5px solid #e5e7eb'}}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <i className="bi bi-terminal-fill text-dark"></i>
                  <strong style={{fontSize: '.8rem', color: '#1a1a2e'}}>Informático</strong>
                </div>
                <p className="mb-0 text-secondary" style={{fontSize: '.72rem'}}>Acceso administrativo total. Gestiona cuentas de empleados, brinda soporte y restablece claves desde la base de datos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUsuarios;