import React, { useState } from 'react';

interface Props {
  equipoId: number;
  onSubmit: (solicitante: string, carne: string, fechaLimite: string) => Promise<void>;
  onCancel: () => void;
}

export const FormularioPrestamo: React.FC<Props> = ({ equipoId, onSubmit, onCancel }) => {
  const [solicitante, setSolicitante] = useState('');
  const [carne, setCarne] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validar = () => {
    const err: Record<string, string> = {};
    if (solicitante.length < 5) err.solicitante = "Debe tener al menos 5 caracteres.";
    if (!/^\d{4}-\d{2}-\d{5}$/.test(carne)) err.carne = "Formato inválido (0000-00-00000).";
    
    if (!fechaLimite) {
      err.fechaLimite = "Obligatorio.";
    } else {
      const seleccionada = new Date(`${fechaLimite}T00:00:00`);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      const diffTime = seleccionada.getTime() - hoy.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diaSemana = seleccionada.getDay(); // 0 es Domingo, 6 es Sábado

      if (diffDays < 0) err.fechaLimite = "No puede ser anterior a hoy.";
      else if (diffDays > 2) err.fechaLimite = "Máximo 2 días de préstamo.";
      else if (diaSemana === 0 || diaSemana === 6) err.fechaLimite = "No se presta fines de semana.";
    }

    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;
    setLoading(true);
    await onSubmit(solicitante, carne, fechaLimite);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '2px solid black', padding: '1rem', marginTop: '1rem' }}>
      <h4>Nuevo Préstamo</h4>
      <div>
        <label>Solicitante:</label>
        <input value={solicitante} onChange={e => setSolicitante(e.target.value)} />
        {errores.solicitante && <span style={{ color: 'red' }}>{errores.solicitante}</span>}
      </div>
      <div>
        <label>Carné:</label>
        <input value={carne} onChange={e => setCarne(e.target.value)} placeholder="0000-00-00000" />
        {errores.carne && <span style={{ color: 'red' }}>{errores.carne}</span>}
      </div>
      <div>
        <label>Fecha Límite:</label>
        <input type="date" value={fechaLimite} onChange={e => setFechaLimite(e.target.value)} />
        {errores.fechaLimite && <span style={{ color: 'red' }}>{errores.fechaLimite}</span>}
      </div>
      <button type="submit" disabled={loading}>Guardar</button>
      <button type="button" onClick={onCancel} disabled={loading}>Cancelar</button>
    </form>
  );
};