import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { guardaRespuestaPreguntaExtra } from '../../redux/ducks/pruebas'
import { preguntasInicio, preguntasPost, preguntasFinal } from '../../helpers/preguntas'
import './PreguntasExtra.css'

const PreguntasExtra = ({ pos }) => {

  const questionCount = (pos === 1) ? preguntasInicio.length + preguntasPost.length : ( (pos === 2) ? preguntasFinal.length : preguntasInicio.length);

  const [indicePregunta, setIndicePregunta] = useState(0)
  const dispatch = useDispatch()

  const siguientePregunta = valoracionPreguntaActual => {
    const { enunciado } = (pos !== 2) ? ((indicePregunta >= preguntasInicio.length) ? preguntasPost[indicePregunta - preguntasInicio.length] : preguntasInicio[indicePregunta]) : preguntasFinal[indicePregunta]
    dispatch(guardaRespuestaPreguntaExtra({ enunciado, valoracion: valoracionPreguntaActual, pos }))
    setIndicePregunta(i => i + 1)
  }

  if (indicePregunta >= questionCount) {
    if (pos === 0)
      return <Redirect to='/instrucciones-generales' />
    else if (pos === 1)
      return <Redirect to='/cuestionario' />
    else
      return <Redirect to='/fin'/>
  }

  const { enunciado, valoraciones } = (pos !== 2) ? ((indicePregunta >= preguntasInicio.length) ? preguntasPost[indicePregunta - preguntasInicio.length] : preguntasInicio[indicePregunta]) : preguntasFinal[indicePregunta]

  return (
    <div className="PreguntasExtra">
      <div className="PreguntasExtra__pregunta">
        <h1>{enunciado}</h1>
        {valoraciones.map((v, i) => (
          <button
            className="PreguntasExtra__boton"
            key={`boton-valoracion-${i + 1}`}
            onClick={() => {
              if (pos !== 2) {
                // we are in pre-preguntas
                if (indicePregunta - preguntasInicio.length < 0)
                  siguientePregunta((preguntasInicio[indicePregunta]["answer_type"] === "text") ? preguntasInicio[indicePregunta].valoraciones[i] : i + 1)
                else
                  siguientePregunta((preguntasPost[indicePregunta - preguntasInicio.length]["answer_type"] === "text") ? preguntasPost[indicePregunta - preguntasInicio.length].valoraciones[i] : i + 1)
              } else {
                siguientePregunta((preguntasFinal[indicePregunta]["answer_type"] === "text") ? preguntasFinal[indicePregunta].valoraciones[i] : i + 1)
              }

            }}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PreguntasExtra
