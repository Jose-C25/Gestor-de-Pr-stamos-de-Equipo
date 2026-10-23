import type { Equipo, Prestamo } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerEquipos = async (): Promise<Equipo[]> => {
  const res = await fetch(`${API_URL}/equipos`);
  if (!res.ok) throw new Error("Error al cargar equipos");
  return res.json();
};

export const obtenerPrestamosActivos = async (): Promise<Prestamo[]> => {
  const res = await fetch(`${API_URL}/prestamos?devuelto=false`);
  if (!res.ok) throw new Error("Error al cargar préstamos");
  return res.json();
};

export const registrarPrestamo = async (prestamo: Omit<Prestamo, 'id'>): Promise<Prestamo> => {
  const res = await fetch(`${API_URL}/prestamos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prestamo)
  });
  if (!res.ok) throw new Error("Error al registrar préstamo");
  return res.json();
};

export const actualizarEstadoEquipo = async (id: number, disponible: boolean): Promise<Equipo> => {
  const res = await fetch(`${API_URL}/equipos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ disponible })
  });
  if (!res.ok) throw new Error("Error al actualizar equipo");
  return res.json();
};

export const devolverPrestamo = async (id: number): Promise<Prestamo> => {
  const res = await fetch(`${API_URL}/prestamos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ devuelto: true })
  });
  if (!res.ok) throw new Error("Error al devolver préstamo");
  return res.json();
};