import { useState } from 'react';

interface Props {
  onSubmit: (solicitante: string, carne: string, fechaLimite: string) => Promise<void>;
  onCancel: () => void;
}

export const FormularioPrestamo = ({ onSubmit, onCancel }: Props) => {
  const [solicitante, setSolicitante] = useState('');
  const [carne, setCarne] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(solicitante, carne, fechaLimite);
    setSolicitante('');
    setCarne('');
    setFechaLimite('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Solicitante:</label>
        <input
          type="text"
          value={solicitante}
          onChange={(e) => setSolicitante(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Carne:</label>
        <input
          type="text"
          value={carne}
          onChange={(e) => setCarne(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Fecha Límite:</label>
        <input
          type="date"
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
          required
        />
      </div>
      <button type="submit">Solicitar Préstamo</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};