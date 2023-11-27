import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { crearSecuenciaCuestionario } from '../../helpers/imagenes'
import { guardaRespuestaCuestionario } from '../../redux/ducks/pruebas'
import './Cuestionario.css'

const valoraciones = [
  'Repulsiva',
  'No atractiva',
  'Ni atractiva ni no atractiva',
  'Atractiva',
  'Muy atractiva'
].reverse()

const Cuestionario = () => {

  const { conPublicidad } = useSelector(state => state.pruebas)
  const secuenciaImagenes = useMemo(() => crearSecuenciaCuestionario(conPublicidad).slice(0, window.location.href.indexOf('localhost') > 0 ? 1 : 1000), [conPublicidad])
  const [indiceImagen, setIndiceImagen] = useState(-1)
  const [valoracion, setValoracion] = useState(3)
  const dispatch = useDispatch()
  const imagenActual = secuenciaImagenes[indiceImagen]

  const siguienteImagen = () => {
    dispatch(guardaRespuestaCuestionario({ idImagen: imagenActual.id, valoracion }))
    setIndiceImagen(i => i + 1)
  }

  if (indiceImagen >= secuenciaImagenes.length) {
    return <Redirect to='/fin' />
  }
  
  if (indiceImagen === -1) {
    return (
      <>
        <div className="Cuestionario">
          <div className="Cuestionario__pregunta">
            <h1 className="Cuestionario__titulo">Etapa 3: Cuestionario</h1>
            <p className="Cuestionario__instrucciones">
              A continuación verás una serie de imágenes de comida.
              Por favor clasifica cada una de estas en cuanto a qué tan atractiva se presenta esa comida para ti.
              Trata de hacerlo lo mas rápido posible, no detenerte más de 3 segundos por imagen.
              Contestar esta encuesta te tomará entre 4 y 5 minutos.
            </p>
            <button style={{ height: '3rem' }} onClick={() => setIndiceImagen(0)}>
              Comenzar
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="Cuestionario">
        <div className="Cuestionario__pregunta">
          <h1>¿Cómo calificarías la comida en la siguiente imagen? </h1>
          <div className="Cuestionario__contenedor_imagen">
            <img src={secuenciaImagenes[indiceImagen].imagen} alt="food_image" />
          </div>
          {valoraciones.map((v, i) => (
            <button
              className="Cuestionario__boton"
              key={`boton-valoracion-${i + 1}`}
              onClick={() => {
                siguienteImagen()
                setValoracion(i + 1)
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Cuestionario