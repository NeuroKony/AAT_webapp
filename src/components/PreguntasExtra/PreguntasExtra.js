import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { guardaRespuestaPreguntaExtra } from '../../redux/ducks/pruebas'
import { preguntasInicio, preguntasFinal } from '../../helpers/preguntas'
import './PreguntasExtra.css'

/*const preguntasExtra = [
  {
    enunciado: '¿Te sientes contento en este momento?',
    valoraciones: [
      '1: Para nada contento',
      '2',
      '3',
      '4: Ni contento ni no contento',
      '5',
      '6',
      '7: Extremadamente contento',
    ]
  },
  {
    enunciado: '¿Estás hambriento en este momento?',
    valoraciones: [
      '1: Nada hambriento',
      '2',
      '3',
      '4: Ni hambriento ni no hambriento',
      '5',
      '6',
      '7: Extremadamente hambriento',
    ]
  },
  {
    enunciado: '¿Te sientes ansioso en este momento?',
    valoraciones: [
      '1: Nada ansioso',
      '2',
      '3',
      '4: Ni ansioso ni no ansioso',
      '5',
      '6',
      '7: Extremadamente ansioso',
    ]
  },
  {
    enunciado: '¿Te sientes estresado en este momento?',
    valoraciones: [
      '1: Nada estresado',
      '2',
      '3',
      '4: Ni estresado ni no estresado',
      '5',
      '6',
      '7: Extremadamente estresado',
    ]
  },
  {
    enunciado: '¿Sientes deseos de comer?',
    valoraciones: [
      '1: Nada de deseos',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7: Muchos deseos',
    ]
  },
  {
    enunciado: '¿Hace cuánto tiempo tuviste tu última comida?',
    valoraciones: [
      'Ayer',
      'Hace 4 horas',
      'Hace 2 horas',
      'Hace 1 hora',
      'Hace menos de 1 hora'
    ]
  },

]
*/

const PreguntasExtra = ({ pos }) => {

  const questionCount = pos ? preguntasInicio.length + preguntasFinal.length : preguntasInicio.length;

  const [indicePregunta, setIndicePregunta] = useState(0)
  const dispatch = useDispatch()

  const siguientePregunta = valoracionPreguntaActual => {
    const { enunciado } = (indicePregunta >= preguntasInicio.length) ? preguntasFinal[indicePregunta - preguntasInicio.length] : preguntasInicio[indicePregunta]

    dispatch(guardaRespuestaPreguntaExtra({ enunciado, valoracion: valoracionPreguntaActual, pos }))
    setIndicePregunta(i => i + 1)
  }

  if (indicePregunta >= questionCount) {  
    if (pos)
      return <Redirect to='/cuestionario' />
    else
      return <Redirect to='/instrucciones-generales' />
  }

  const { enunciado, valoraciones } = (indicePregunta >= preguntasInicio.length) ? preguntasFinal[indicePregunta - preguntasInicio.length] : preguntasInicio[indicePregunta]

  return (
    <div className="PreguntasExtra">
      <div className="PreguntasExtra__pregunta">
        <h1>{enunciado}</h1>
        {valoraciones.map((v, i) => (
          <button
            className="PreguntasExtra__boton"
            key={`boton-valoracion-${i + 1}`}
            onClick={() => siguientePregunta((indicePregunta === questionCount.length - 1 && pos) ? preguntasFinal[indicePregunta].valoraciones[i] : i + 1)} // esto es para que la valoracion de la ultima pregunta sea el texto en lugar del numero
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PreguntasExtra