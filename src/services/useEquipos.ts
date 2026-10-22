import { useState, useEffect } from 'react';
import { Equipo } from '../types';
import { obtenerEquipos } from './api';

export const useEquipos = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerEquipos();
      setEquipos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { equipos, loading, error, cargar, setEquipos };
};