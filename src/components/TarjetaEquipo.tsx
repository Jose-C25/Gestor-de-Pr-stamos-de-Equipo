import type { Equipo } from '../types';

interface TarjetaEquipoProps {
  equipo: Equipo;
  onPrestar: (id: number) => void;
}

export const TarjetaEquipo = ({ equipo, onPrestar }: TarjetaEquipoProps) => {
  return (
    <div className="ts-card">
      <h3 style={{ marginBottom: '8px' }}>{equipo.nombre}</h3>
      <p style={{ color: '#57534E', fontSize: '15px', marginBottom: '16px' }}>Categoría: {equipo.categoria}</p>
      <p style={{ 
        display: 'inline-block',
        padding: '4px 12px',
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase',
        backgroundColor: equipo.disponible ? '#F0FDF4' : '#FEF2F2',
        color: equipo.disponible ? '#65A30D' : '#DC2626',
        border: `1px solid ${equipo.disponible ? '#BBF7D0' : '#FECACA'}`,
        marginBottom: '24px'
      }}>
        {equipo.disponible ? 'Disponible' : 'Prestado'}
      </p>
      <br />
      <button 
        className="btn-primary" 
        disabled={!equipo.disponible} 
        onClick={() => onPrestar(equipo.id)}
        style={{ opacity: equipo.disponible ? 1 : 0.4, cursor: equipo.disponible ? 'pointer' : 'not-allowed', width: '100%' }}
      >
        Prestar
      </button>
    </div>
  );
};