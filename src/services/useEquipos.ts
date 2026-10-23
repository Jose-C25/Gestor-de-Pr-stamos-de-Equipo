import { useState, useEffect, useCallback } from 'react';
import type { Equipo } from '../types';
import { obtenerEquipos } from './api';

export const useEquipos = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargar();
  }, [cargar]);

  return { equipos, loading, error, cargar, setEquipos };
};