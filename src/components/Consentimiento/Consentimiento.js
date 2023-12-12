import { useState } from 'react'
import { use100vh } from 'react-div-100vh'
import { useHistory } from 'react-router'
import './Consentimiento.css'

const Consentimiento = () => {

  const maxHeight = use100vh()
  const history = useHistory()
  const [mostrandoConsentimiento, setMostrandoConsentimiento] = useState(true)

  const irAInstruccionesGenerales = e => {
    e.preventDefault()
    history.push('/preguntas-pre')
  }

  return (
    <div
      className="Consentimiento"
      style={{ maxHeight }}
    >
      <h1>Consentimiento informado</h1>
      {mostrandoConsentimiento
        ? <>
            <div className="Consentimiento__contenedor">
              <div className="Consentimiento__contenedor_texto">
                <h2>Entendiendo la percepción de las imágenes de comida</h2>
                <p>Dra. Constanza Baquedano</p>
                <p>Escuela de Psicología, Universidad Adolfo Ibáñez</p>
                <p>
                  Usted ha sido invitado a participar en el estudio “Entendiendo la percepción de imágenes de comida” a cargo de la investigadora Post-Doctoral Dra. Constanza. Esta investigación se llevará a cabo entre los años 2024 - 2025, el objeto de esta carta es ayudarlo a tomar la decisión de participar en la presente investigación.
                </p>
                <h2>¿Cuál es el propósito de esta investigación?</h2>
                <p>
                  El propósito de esta investigación es entender aspectos conductuales de la percepción de las imágenes de comida, y su función en la conducta alimentaria.
                </p>
                <h2>¿En qué consiste su participación?</h2>
                <p>
                  Si acepta, su participación consistirá en realizar una tarea de reconocimiento visual, en las que verá imágenes de diferentes ítems de comida en una pantalla de computador. Su tarea consistirá en alejarse o acercarse estas imágenes de acuerdo al color del marco con que estas imágenes sean presentadas. Al inicio y al final de la sesión se le pedirá llenar algunos cuestionarios con el objeto de conocer información básica sobre su estado antes y después de realizar las tareas.
                </p>
                <h2>¿Cuánto durará su participación?</h2>
                <p>
                  Su participación consta de 1 sesión de aproximadamente 15 minutos de duración. Este tiempo incluye todas las instancias previas a la realización de la tarea, la ejecución de la tarea y el tiempo para responder a los cuestionarios.
                </p>
                <h2>¿Qué riesgos corre al participar?</h2>
                <p>
                  Las metodologías utilizadas en este estudio, es decir el llenado de cuestionarios y la tarea conductual con imágenes de comida, no representan riesgo alguno para usted. 
                </p>
                <h2>¿Qué beneficios puede tener su participación?</h2>
                <p>
                  Este estudio no tiene beneficios directos para usted; sin embargo al participar estará contribuyendo al conocimiento científico sobre la percepción visual de imágenes de comida y sus posibles aplicaciones en la salud mental y física. 
                </p>
                <h2>¿Qué pasa con la información y datos que usted entregue?</h2>
                <p>
                  Los investigadores mantendrán CONFIDENCIALIDAD ABSOLUTA con respecto a cualquier información obtenida en este estudio y ninguna persona ajena a la investigación tendrá acceso alguno a los datos obtenidos. Los registros obtenidos durante la investigación serán codificados con un sistema alfanumérico, impidiendo así su identificación. Los datos aquí obtenidos podrían ser utilizados en otros análisis si usted lo autoriza (ver al final del consentimiento), siempre bajo el compromiso de total confidencialidad. Bajo ninguna circunstancia publicaremos ningún dato obtenido bajo alguna forma que permita identificarlo y si son presentados en el marco de una publicación científica, toda información relativa a su identidad será eliminada.
                </p>
                <h2>¿Tendrá usted acceso a los datos o resultados de este estudio? </h2>
                <p>
                  Los datos de su participación en el estudio no le serán entregados directamente, sin embargo si usted lo solicita al investigador responsable, podrá tener acceso a la publicación final y/o datos generales de la investigación.
                </p>
                <h2>¿Es obligación participar? ¿Puede arrepentirse después de participar?</h2>
                <p>
                  Usted NO está obligado de ninguna manera a participar en este estudio. Si accede a participar, puede dejar de hacerlo en cualquier momento sin repercusión alguna.
                </p>
                <h2>¿A quién puede contactar Ud. para saber más de este estudio o si le surgen dudas?</h2>
                <p>
                  Si tiene cualquier pregunta acerca de esta investigación, puede contactar a la Dra. Constanza Baquedano (E-mail: constanzabaquedano@gmail.com, cel:991240886). Si usted tiene alguna consulta o preocupación respecto a sus derechos como participante de este estudio, puede contactar a Paula Rojas (paula.rojas.s@uai.cl, teléfono +562 2331 1812) directora de investigación de la Universidad Adolfo Ibáñez.
                </p>
              </div>
            </div>
            <div className="Consentimiento__contenedor_botones">
              <button onClick={() => setMostrandoConsentimiento(false)}>Continuar</button>
            </div>
          </>
        : <div className="Consentimiento__contenedor">
            <p className="Consentimiento__texto_aprobacion">He tenido la oportunidad de leer esta declaración de consentimiento informado, hacer preguntas acerca del proyecto de investigación, y acepto participar en este proyecto.
            </p>
            <form
              className="Consentimiento__formulario_aprobar"
              onSubmit={irAInstruccionesGenerales}
            >
              <div className="contenedor_checkbox">
                <input
                  id="checkbox-ci"
                  type="checkbox"
                  required
                />
                <label
                  htmlFor="checkbox-ci"
                  className="label-destacado"
                >
                  Acepto participar en la investigación (el marcar esta casilla equivale a firmar electrónicamente este consentimiento informado)
                </label>
              </div>
              <button
                className="Consentimiento__boton_aprobar"
                type="submit"
              >
                Continuar
              </button>
            </form>
          </div>
      }
    </div>
  )
}

export default Consentimiento