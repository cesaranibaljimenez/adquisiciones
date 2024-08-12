import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenido a la Plataforma de Gestión de Adquisiciones</h1>
      <Link to="/configure-tender">
        <button>Configurar Licitación</button>
      </Link>
    </div>
  );
}

export default Home;
