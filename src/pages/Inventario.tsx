import { useState } from 'react';
import { useEquipos } from '../services/useEquipos';
import { TarjetaEquipo } from '../components/TarjetaEquipo';
import { Encabezado } from '../components/Encabezado';
import { FormularioPrestamo } from '../components/FormularioPrestamo';
import { registrarPrestamo, actualizarEstadoEquipo } from '../services/api';

export const Inventario = () => {
  const { equipos, loading, error, cargar, setEquipos } = useEquipos();
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<number | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const manejarPrestamo = async (solicitante: string, carne: string, fechaLimite: string) => {
    if (!equipoSeleccionado) return;
    const nuevoPrestamo = {
      equipoId: equipoSeleccionado,
      solicitante, carne, fechaLimite,
      fechaPrestamo: new Date().toISOString(),
      devuelto: false
    };
    await registrarPrestamo(nuevoPrestamo);
    await actualizarEstadoEquipo(equipoSeleccionado, false);
    
    setEquipos(prev => prev.map(e => e.id === equipoSeleccionado ? { ...e, disponible: false } : e));
    setEquipoSeleccionado(null);
  };

  if (loading) {
    return <div className="ts-loading">Cargando el inventario...</div>;
  }

  if (error) {
    return (
      <div className="ts-error-container">
        <h3>No se pudo conectar con el servidor</h3>
        <p>Asegúrate de que JSON Server esté ejecutándose (npm run dev).</p>
        <p style={{ fontSize: '13px', opacity: 0.8 }}>Detalle: {error}</p>
        <button onClick={cargar}>Reintentar conexión</button>
      </div>
    );
  }

  const equiposFiltrados = equipos.filter(e => 
    e.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (filtroCategoria === '' || e.categoria === filtroCategoria)
  );

  return (
    <div>
      <Encabezado equipos={equipos} />
      <div style={{ margin: '36px 0', display: 'flex', gap: '12px' }}>
        <input 
          placeholder="Buscar equipo..." 
          value={busqueda} 
          onChange={e => setBusqueda(e.target.value)} 
          style={{ padding: '12px 16px', border: '1px solid #D6D3D1', borderRadius: '0px', flex: 1 }}
        />
        <select 
          value={filtroCategoria} 
          onChange={e => setFiltroCategoria(e.target.value)}
          style={{ padding: '12px 16px', border: '1px solid #D6D3D1', borderRadius: '0px' }}
        >
          <option value="">Todas las categorías</option>
          <option value="Tablet">Tablet</option>
          <option value="Cámara">Cámara</option>
          <option value="Micrófono">Micrófono</option>
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
        {equiposFiltrados.map(equipo => (
          <TarjetaEquipo key={equipo.id} equipo={equipo} onPrestar={setEquipoSeleccionado} />
        ))}
      </div>
      {equipoSeleccionado && (
        <FormularioPrestamo 
          onSubmit={manejarPrestamo} 
          onCancel={() => setEquipoSeleccionado(null)} 
        />
      )}
    </div>
  );
};