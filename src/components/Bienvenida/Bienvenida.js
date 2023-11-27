import { useHistory } from 'react-router'
import './Bienvenida.css'

const Bienvenida = () => {

  const history = useHistory()

  return (
    <div className="Bienvenida">
      <div className="Bienvenida__contenedor_bienvenida">
        <h1>Bienvenido a esta experiencia experimental</h1>
        <p>Esta aplicación fue hecha para medir conducta alimentaria. Pasar por las etapas de la experiencia te tomará aprox. 10 minutos</p>
        <h2>Las etapas son:</h2>
        <ul>
          <li>Consentimiento informado</li>
          <li>Instrucciones generales</li>
          <li>Etapa 1: Exposición</li>
          <li>Etapa 2: Tarea de acercamiento y alejamiento</li>
          <li>Etapa 3: Cuestionario</li>
        </ul>
        <p>Busca un lugar tranquilo para realizar la experiencia, y hazla en una sola sesión</p>
        <div className="Bienvenida__contenedor_botones_bienvenida">
          <button onClick={() => history.push('/consentimiento')}>Continuar</button>
        </div>
      </div>
    </div>
  )
}

export default Bienvenida