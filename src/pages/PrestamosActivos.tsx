import React, { useEffect, useState } from 'react';
import { Prestamo } from '../types';
import { obtenerPrestamosActivos, devolverPrestamo, actualizarEstadoEquipo } from '../services/api';

export const PrestamosActivos = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    setLoading(true);
    const data = await obtenerPrestamosActivos();
    setPrestamos(data);
    setLoading(false);
  };

  const manejarDevolucion = async (idPrestamo: number, equipoId: number) => {
    await devolverPrestamo(idPrestamo);
    await actualizarEstadoEquipo(equipoId, true);
    setPrestamos(prev => prev.filter(p => p.id !== idPrestamo));
  };

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (loading) return <p>Cargando préstamos...</p>;

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Equipo ID</th><th>Solicitante</th><th>Fecha Límite</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {prestamos.map(p => {
          const vencido = new Date(`${p.fechaLimite}T00:00:00`) < hoy;
          return (
            <tr key={p.id} style={{ backgroundColor: vencido ? '#ffcccc' : 'white' }}>
              <td>{p.equipoId}</td>
              <td>{p.solicitante}</td>
              <td>{p.fechaLimite}</td>
              <td><button onClick={() => manejarDevolucion(p.id, p.equipoId)}>Devolver</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};