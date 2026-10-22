import React, { useState } from 'react';
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

  if (loading) return <p>Cargando inventario...</p>;
  if (error) return <div><p>Error: {error}</p><button onClick={cargar}>Reintentar</button></div>;

  const equiposFiltrados = equipos.filter(e => 
    e.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (filtroCategoria === '' || e.categoria === filtroCategoria)
  );

  return (
    <div>
      <Encabezado equipos={equipos} />
      <div style={{ margin: '1rem 0' }}>
        <input placeholder="Buscar equipo..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
        <select value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)}>
          <option value="">Todas las categorías</option>
          <option value="Tablet">Tablet</option>
          <option value="Cámara">Cámara</option>
          <option value="Micrófono">Micrófono</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {equiposFiltrados.map(equipo => (
          <TarjetaEquipo key={equipo.id} equipo={equipo} onPrestar={setEquipoSeleccionado} />
        ))}
      </div>
      {equipoSeleccionado && (
        <FormularioPrestamo 
          equipoId={equipoSeleccionado} 
          onSubmit={manejarPrestamo} 
          onCancel={() => setEquipoSeleccionado(null)} 
        />
      )}
    </div>
  );
};