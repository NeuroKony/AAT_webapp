import { useHistory } from 'react-router'
import Stepper from '../Stepper'
import './InstruccionesGenerales.css'

const InstruccionesGenerales = () => {

  const history = useHistory()

  return (
    <>
      <div className="InstruccionesGenerales">
        <div className="InstruccionesGenerales__contenedor">
          <p>
            Esta experiencia cuenta de 3 etapas.
          </p>
          <p>
            En la <strong>Etapa 1: Exposición</strong>, te 
            aparecerán imágenes que te pediremos 
            mirar según las instrucciones del video.
          </p>
          <p>
            Luego, en la <strong>Etapa 2: Tarea de acercamiento y 
            alejamiento</strong> te pediremos 
            realizar una tarea con las imágenes que viste.
            Recibirás instrucciones más precisas de cómo 
            realizarla cuando entres a esa etapa.
          </p>
          <p>
            Finalmente, en la <strong>Etapa 3: Cuestionario</strong> te 
            haremos algunas preguntas pertinentes a esta investigación.
          </p>
          <div className="InstruccionesGenerales__contenedor_botones">
            <button onClick={() => history.push('/exposicion')}>Continuar</button>
            {/* <button onClick={() => history.goBack()} className="boton-secundario">Volver</button> */}
          </div>
        </div>
      </div>
      <Stepper paso={2} />
    </>
  )
}

export default InstruccionesGenerales