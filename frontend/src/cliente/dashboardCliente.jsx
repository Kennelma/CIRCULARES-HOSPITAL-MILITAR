import React, { useState, useRef } from 'react';

// Constantes movidas fuera
const DOCS = [
  {id:1,n:'Circular-RRHH-042025.pdf',sz:'1.2 MB',area:'Recursos Humanos',fecha:'2025-04-08',est:'Activo'},
  {id:2,n:'Politica-Vacaciones-2025.pdf',sz:'840 KB',area:'Administración',fecha:'2025-04-02',est:'En revisión'},
  {id:3,n:'Comunicado-Beneficios-Q1.pdf',sz:'2.1 MB',area:'Dirección',fecha:'2025-03-22',est:'Nuevo'},
  {id:4,n:'Reglamento-Interno-v3.pdf',sz:'3.4 MB',area:'Legal',fecha:'2025-01-15',est:'Archivado'},
  {id:5,n:'Circular-Capacitacion-Feb.pdf',sz:'680 KB',area:'Recursos Humanos',fecha:'2025-02-10',est:'Activo'},
  {id:6,n:'Comunicado-Direccion-Mar.pdf',sz:'510 KB',area:'Dirección',fecha:'2025-03-05',est:'Activo'},
  {id:7,n:'Politica-Home-Office-2025.pdf',sz:'920 KB',area:'Administración',fecha:'2025-04-01',est:'Nuevo'},
  {id:8,n:'Circular-Evaluaciones-Q1.pdf',sz:'1.1 MB',area:'Recursos Humanos',fecha:'2025-03-18',est:'Nuevo'}
];

const BC = {'Activo':'badge-activo','Nuevo':'badge-nuevo','En revisión':'badge-revision','Archivado':'badge-archivado'};
const AC = {'Activo':'#1D9E75','Nuevo':'#378ADD','En revisión':'#EF9F27','Archivado':'#888780'};
const MN = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DD = new Set(DOCS.map(d => d.fecha));

// Agregamos el prop isAdmin (por defecto en false para que los clientes no lo vean)
const DashboardCliente = ({ isAdmin = false }) => {
  const [cf, setCf] = useState('Todos');
  const [search, setSearch] = useState('');
  const [calY, setCalY] = useState(2025);
  const [calM, setCalM] = useState(3);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const modalRef = useRef(null);

  const fd = (d) => {
    const [y, m, dd] = d.split('-');
    return `${dd}/${m}/${y}`;
  };

  const handleFilter = (f) => {
    setCf(f);
  };

  const filteredDocs = DOCS
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .filter(d => cf === 'Todos' || d.est === cf)
    .filter(d => !search || d.n.toLowerCase().includes(search.toLowerCase()) || d.area.toLowerCase().includes(search.toLowerCase()));

  const openModal = (id) => {
    const d = DOCS.find(x => x.id === id);
    if (d) {
      setSelectedDoc(d);
    }
  };

  const renderCal = () => {
    const first = new Date(calY, calM, 1).getDay();
    const days = new Date(calY, calM + 1, 0).getDate();
    const now = new Date();
    const calDays = [];
    for (let i = 0; i < first; i++) calDays.push(<div key={`empty-${i}`}></div>);
    for (let d = 1; d <= days; d++) {
      const ds = `${calY}-${String(calM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const hd = DD.has(ds);
      const tod = now.getFullYear() === calY && now.getMonth() === calM && now.getDate() === d;
      calDays.push(
        <div
          key={d}
          className={`cal-day${hd ? ' has-doc' : ''}${tod ? ' today' : ''}`}
          onClick={hd ? () => {
            const doc = DOCS.find(x => x.fecha === ds);
            if (doc) openModal(doc.id);
          } : undefined}
          title={hd ? 'Circular del ' + fd(ds) : ''}
        >
          {d}
          {hd && <span className="cal-dot"></span>}
        </div>
      );
    }
    return calDays;
  };

  const chM = (dir) => {
    let newM = calM + dir;
    let newY = calY;
    if (newM > 11) { newM = 0; newY++; }
    if (newM < 0) { newM = 11; newY--; }
    setCalM(newM);
    setCalY(newY);
  };

  const recentActivity = DOCS
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, 5);

  return (
    <>
      <div className="portal-wrap container-fluid py-3 px-4 mx-auto" style={{maxWidth: '1280px'}}>

        {/* Header */}
        <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-4">
          <div>
            <div className="d-flex align-items-center mb-1">
              {isAdmin && <span className="badge rounded-pill me-2" style={{background: '#e6f1fb', color: '#185fa5', fontSize: '.7rem', fontWeight: 500}}>Vista Administrador</span>}
              <span className="brand-dot"></span><span className="brand-name">RRHH Portal</span>
            </div>
            <h1 className="mb-1" style={{fontSize: '1.3rem', fontWeight: 500, color: '#1a1a2e'}}>Portal de comunicados internos</h1>
            <p className="text-secondary mb-0" style={{fontSize: '.85rem'}}>Circulares y anuncios publicados por Recursos Humanos</p>
          </div>
          <span className="badge rounded-pill align-self-start mt-1" style={{background: '#e1f5ee', color: '#0f6e56', fontSize: '.75rem', padding: '6px 14px', fontWeight: 500}}>
            3 nuevos este mes
          </span>
        </div>

        {/* Stats */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card rrhh-card border-0 shadow-none h-100">
              <div className="card-body p-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="rounded-2 p-2 d-inline-flex bg-primary bg-opacity-10"><i className="bi bi-file-earmark-text text-primary" style={{fontSize: '.9rem'}}></i></span>
                  <span className="stat-label">Total circulares</span>
                </div>
                <div className="stat-value mb-1">148</div>
                <small className="text-success" style={{fontSize: '.72rem'}}>+23 este año</small>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card rrhh-card border-0 shadow-none h-100">
              <div className="card-body p-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="rounded-2 p-2 d-inline-flex bg-success bg-opacity-10"><i className="bi bi-check-circle text-success" style={{fontSize: '.9rem'}}></i></span>
                  <span className="stat-label">Subidos el último mes</span>
                </div>
                <div className="stat-value mb-1">92</div>
                <small className="text-success" style={{fontSize: '.72rem'}}>+12 este mes</small>
              </div>
            </div>
          </div>
        </div>

        {/* Layout principal */}
        <div className="row g-3 align-items-start">
          {/* Tabla */}
          <div className="col-12 col-xl-8">
            <div className="card rrhh-card border-0 shadow-none">
              <div className="card-body p-3">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <span className="section-title me-1">Últimos anuncios</span>
                    <div className="d-flex flex-wrap gap-1">
                      <button className={`btn filter-btn ${cf === 'Todos' ? 'active' : ''}`} onClick={() => handleFilter('Todos')}>Todos</button>
                      <button className={`btn filter-btn ${cf === 'Activo' ? 'active' : ''}`} onClick={() => handleFilter('Activo')}>Subidos el último mes</button>
                      <button className={`btn filter-btn ${cf === 'Nuevo' ? 'active' : ''}`} onClick={() => handleFilter('Nuevo')}>Nuevos</button>
                    </div>
                  </div>
                  <div className="input-group" style={{width: 200}}>
                    <span className="input-group-text bg-transparent rrhh-search border-end-0 pe-1"><i className="bi bi-search text-secondary" style={{fontSize: '.8rem'}}></i></span>
                    <input type="text" className="form-control rrhh-search border-start-0 ps-1" placeholder="Buscar..." style={{fontSize: '.8rem'}} value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table rrhh-table mb-0">
                    <thead><tr>
                      <th style={{width: '75%'}}>Documento</th>
                      <th style={{width: '17%'}}>Fecha</th>
                      <th style={{width: '8%'}}></th>
                    </tr></thead>
                    <tbody>
                      {filteredDocs.length === 0 ? (
                        <tr><td colSpan="3" className="text-center text-secondary py-4" style={{fontSize: '.85rem'}}><i className="bi bi-inbox me-2"></i>Sin resultados.</td></tr>
                      ) : (
                        filteredDocs.map(d => (
                          <tr key={d.id} onClick={() => openModal(d.id)}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <span className="doc-icon"><i className="bi bi-file-earmark-pdf text-danger" style={{fontSize: '.82rem'}}></i></span>
                                <div>
                                  <div style={{fontSize: '.82rem', fontWeight: 500}}>{d.n}</div>
                                  <div className="text-secondary" style={{fontSize: '.7rem'}}>{d.sz}</div>
                                </div>
                              </div>
                            </td>
                            <td className="text-secondary" style={{fontSize: '.8rem'}}>{fd(d.fecha)}</td>
                            <td className="text-center"><button className="btn-eye" onClick={(e) => { e.stopPropagation(); openModal(d.id); }}><i className="bi bi-eye" style={{fontSize: '.9rem'}}></i></button></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-12 col-xl-4">
            <div className="d-flex flex-column gap-3">
              
              {/* Cuadro de Subida - Condicionado a isAdmin */}
              {isAdmin && (
                <div className="card rrhh-card border-0 shadow-none">
                  <div className="card-body p-3">
                    <p className="section-title mb-3">Subir nueva circular</p>
                    <div className="upload-zone mb-3">
                      <input type="file" accept=".pdf" />
                      <div className="upload-icon mx-auto"><i className="bi bi-cloud-arrow-up-fill text-primary" style={{fontSize: '1.4rem'}}></i></div>
                      <div style={{fontSize: '.82rem', fontWeight: 500, color: '#1a1a2e'}} className="mb-1">Arrastra el PDF aquí</div>
                      <div style={{fontSize: '.72rem', color: '#9ca3af'}}>Solo PDF · Máx. 10 MB</div>
                    </div>
                    <div className="mb-2">
                      <label className="rrhh-label">Título</label>
                      <input type="text" className="form-control rrhh-input" placeholder="Ej. Circular Q2" />
                    </div>

                    {/* PROVISIONAL / ESCALABILIDAD: Menú visual de áreas (No funcional) */}
                    <div className="mb-2">
                      <label className="rrhh-label">Área receptora</label>
                      <select className="form-select rrhh-input" defaultValue="">
                        <option value="" disabled>Selecciona el área...</option>
                        <option>Recursos Humanos</option>
                        <option>Administración</option>
                        <option>Dirección General</option>
                        <option>Asesoría Legal</option>
                        <option>Enfermería</option>
                        <option>Servicios Médicos</option>
                      </select>
                    </div>

                    <button className="btn-primary-rrhh w-100 justify-content-center mt-2">
                      <i className="bi bi-cloud-upload"></i> Subir circular
                    </button>
                  </div>
                </div>
              )}

              {/* Calendario */}
              <div className="card rrhh-card border-0 shadow-none">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <button className="cal-nav-btn" onClick={() => chM(-1)}>&#8592;</button>
                    <span style={{fontSize: '.82rem', fontWeight: 500, color: '#1a1a2e'}}>{`${MN[calM]} ${calY}`}</span>
                    <button className="cal-nav-btn" onClick={() => chM(1)}>&#8594;</button>
                  </div>
                  <div className="cal-grid mb-1">
                    {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map(x => <div key={x} className="cal-day-label">{x}</div>)}
                  </div>
                  <div className="cal-grid">
                    {renderCal()}
                  </div>
                </div>
              </div>

              {/* Actividad */}
              <div className="card rrhh-card border-0 shadow-none">
                <div className="card-body p-3">
                  <p className="section-title">Actividad reciente</p>
                  <div>
                    {recentActivity.map(d => (
                      <div key={d.id} className="activity-item d-flex align-items-start gap-2 mb-2" onClick={() => openModal(d.id)}>
                        <span className="activity-dot" style={{background: AC[d.est]}}></span>
                        <div>
                          <div style={{fontSize: '.78rem', fontWeight: 500, color: '#1a1a2e'}}>{d.n}</div>
                          <div style={{fontSize: '.68rem', color: '#9ca3af'}}>{d.area} · {fd(d.fecha)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      {selectedDoc && (
        <div className="modal fade show" style={{display: 'block'}} tabIndex="-1" aria-labelledby="docModalLabel" aria-hidden="false">
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title" id="docModalLabel" style={{fontSize: '.9rem', fontWeight: 500}}>{selectedDoc.n}</h5>
                  <p className="mb-0 text-secondary" style={{fontSize: '.75rem'}}>{`${selectedDoc.area} · ${fd(selectedDoc.fecha)} · ${selectedDoc.sz}`}</p>
                </div>
                <button type="button" className="btn-close" onClick={() => setSelectedDoc(null)} style={{fontSize: '.75rem'}}></button>
              </div>
              <div className="modal-body p-4">
                <div className="pdf-sheet">
                  <div className="pdf-ttl">{selectedDoc.n.replace('.pdf', '').replace(/-/g, ' ')}</div>
                  <div className="pdf-line" style={{width: '100%'}}></div>
                  <div className="pdf-line" style={{width: '80%'}}></div>
                  <div className="pdf-line" style={{width: '100%'}}></div>
                  <div className="pdf-line" style={{width: '60%'}}></div>
                  <div style={{height: '10px'}}></div>
                  <div className="pdf-line" style={{width: '100%'}}></div>
                  <div className="pdf-line" style={{width: '90%'}}></div>
                  <div className="pdf-line" style={{width: '75%'}}></div>
                  <div style={{height: '10px'}}></div>
                  <div className="pdf-line" style={{width: '100%'}}></div>
                  <div className="pdf-line" style={{width: '65%'}}></div>
                  <div className="pdf-line" style={{width: '100%'}}></div>
                  <div className="mt-3 text-center text-secondary" style={{fontSize: '.72rem'}}>
                    <i className="bi bi-file-earmark-pdf me-1 text-danger"></i> Página 1 de 3
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between flex-wrap gap-2">
                <div className="d-flex align-items-center gap-2">
                  <button className="page-ctrl" disabled>&#8592;</button>
                  <span style={{fontSize: '.78rem', color: '#6b7280', minWidth: '52px', textAlign: 'center'}}>1 / 3</span>
                  <button className="page-ctrl">&#8594;</button>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="text-secondary" style={{fontSize: '.72rem'}}>{selectedDoc.sz} · PDF</span>
                  <button className="btn-download">
                    <i className="bi bi-download"></i> Descargar documento
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default DashboardCliente;