import React from 'react';
import { Equipo } from '../types';

interface TarjetaEquipoProps {
  equipo: Equipo;
  onPrestar: (id: number) => void;
}

export const TarjetaEquipo: React.FC<TarjetaEquipoProps> = ({ equipo, onPrestar }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem', width: '200px' }}>
      <h3>{equipo.nombre}</h3>
      <p>Categoría: {equipo.categoria}</p>
      <p style={{ color: equipo.disponible ? 'green' : 'red' }}>
        {equipo.disponible ? 'Disponible' : 'Prestado'}
      </p>
      <button disabled={!equipo.disponible} onClick={() => onPrestar(equipo.id)}>
        Prestar
      </button>
    </div>
  );
};