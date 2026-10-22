import React from 'react';
import { Equipo } from '../types';

interface Props { equipos: Equipo[]; }

export const Encabezado: React.FC<Props> = ({ equipos }) => {
  const disponibles = equipos.filter(e => e.disponible).length;
  return (
    <header style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <h1>Préstamos Lab — 0902-23-11034</h1>
      <p>{disponibles} de {equipos.length} equipos disponibles</p>
    </header>
  );
};