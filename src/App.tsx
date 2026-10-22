import { Inventario } from './pages/Inventario';
import { PrestamosActivos } from './pages/PrestamosActivos';

function App() {
  return (
    <div>
      <Inventario />
      <hr />
      <h2>Préstamos Activos</h2>
      <PrestamosActivos />
    </div>
  );
}
export default App;