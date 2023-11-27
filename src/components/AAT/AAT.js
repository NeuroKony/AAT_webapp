import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { crearSecuenciaAAT2, crearSecuenciaPractica } from '../../helpers/imagenes'
import './AAT.css'
import InstruccionesAAT from './InstruccionesAAT'
import SecuenciaAAT from './SecuenciaAAT'
import imagenManoDerecha from '../../assets/images/manos/mano_derecha.png'
import imagenManoIzquierda from '../../assets/images/manos/mano_izquierda.png'
import imagenManoDerechaSostenido from '../../assets/images/manos/mano_derecha_sostenido.png'
import imagenManoIzquierdaSostenido from '../../assets/images/manos/mano_izquierda_sostenido.png'
import { guardaFormaDeRespuesta, guardaManoDominante } from '../../redux/ducks/pruebas'

const PASO1 = 'PASO1'
const PASO2 = 'PASO2'
const PASO3 = 'PASO3'
const PASO4 = 'PASO4'
const PASO5 = 'PASO5'
const PASO6 = 'PASO6'

const AAT = () => {

  const [paso, setPaso] = useState(PASO1)
  const { conPublicidad } = useSelector(state => state.pruebas)
  const dispatch = useDispatch()
  const secuenciaPractica = useMemo(() => crearSecuenciaPractica(conPublicidad).slice(0, window.location.href.indexOf('localhost') > 0 ? 1 : 1000), [conPublicidad])
  const secuencia = useMemo(() => {
    return crearSecuenciaAAT2(conPublicidad).slice(0, window.location.href.indexOf('localhost') > 0 ? 2 : 1000)
  }, [conPublicidad])

  let componente
  switch(paso) {
    case PASO1:
      componente = <InstruccionesAAT ocultar={() => setPaso(PASO2)} />
      break
    case PASO2:
      componente = <SecuenciaAAT practica={true} secuencia={secuenciaPractica} siguiente={() => setPaso(PASO3)} repetir={() => setPaso(PASO1)} />
      break
    case PASO3:
      componente = <SecuenciaAAT practica={false} secuencia={secuencia} siguiente={() => setPaso(PASO4)} />
      break
    case PASO4:
      componente = (
        <div className="Cuestionario">
          <div className="Cuestionario__pregunta">
            <h1>¿Cómo respondiste la tarea?</h1>
            <div className="AAT__contenedor_manos">
              <div className="AAT__contenedor_radio">
                <input
                  type="radio"
                  name="formaDeRespuesta"
                  id="manoIzquierda"
                  value="pulgar mano izquierda"
                  onChange={e => dispatch(guardaFormaDeRespuesta(e.target.value))}
                />
                <label htmlFor="manoIzquierda">
                  <img className="AAT__imagen_mano" src={imagenManoIzquierda} alt="imagen_mano" />
                </label>
              </div>
              <div className="AAT__contenedor_radio">
                <input
                  type="radio"
                  name="formaDeRespuesta"
                  id="manoDerecha"
                  value="pulgar mano derecha"
                  onChange={e => dispatch(guardaFormaDeRespuesta(e.target.value))}
                />
                <label htmlFor="manoDerecha">
                  <img className="AAT__imagen_mano" src={imagenManoDerecha} alt="imagen_mano" />
                </label>
              </div>
              <div className="AAT__contenedor_radio">
                <input
                  type="radio"
                  name="formaDeRespuesta"
                  id="manoIzquierdaSostenido"
                  value="índice mano izquierda"
                  onChange={e => dispatch(guardaFormaDeRespuesta(e.target.value))}
                />
                <label htmlFor="manoIzquierdaSostenido">
                  <img className="AAT__imagen_mano" src={imagenManoIzquierdaSostenido} alt="imagen_mano" />
                </label>
              </div>
              <div className="AAT__contenedor_radio">
                <input
                  type="radio"
                  name="formaDeRespuesta"
                  id="manoDerechaSostenido"
                  value="índice mano derecha"
                  onChange={e => dispatch(guardaFormaDeRespuesta(e.target.value))}
                />
                <label htmlFor="manoDerechaSostenido">
                  <img className="AAT__imagen_mano" src={imagenManoDerechaSostenido} alt="imagen_mano" />
                </label>
              </div>
            </div>
            <button onClick={() => setPaso(PASO5)}>Continuar</button>
          </div>
        </div>
      )
      break
    case PASO5:
      componente = (
        <div className="Cuestionario">
          <div className="AAT__pregunta">
            <h1>¿Cuál es tu mano dominante?</h1>
            <div className="AAT__contenedor_radio">
              <input
                onChange={e => dispatch(guardaManoDominante(e.target.value))}
                type="radio"
                name="manoDominante"
                id="izquierda"
                value="izquierda"
              />
              <label htmlFor="izquierda">Izquierda</label>
            </div>
            <div className="AAT__contenedor_radio">
              <input
                onChange={e => dispatch(guardaManoDominante(e.target.value))}
                type="radio"
                name="manoDominante"
                id="derecha"
                value="derecha"
              />
              <label htmlFor="derecha">Derecha</label>
            </div>
            <button onClick={() => setPaso(PASO6)}>Continuar</button>
          </div>
        </div>
      )
      break
    default:
      return <Redirect to='/preguntas-pos' />
  }

  return (
    <>
      {componente}
      {secuenciaPractica.map((s, i) => (
        <img
          key={`imagen-secuencia-practica-AAT-${i}`}
          style={{ position: 'absolute', pointerEvents: 'none', opacity: 0, height: 0 }}
          alt={`imagen-secuencia-practica-AAT-${i}`}
          src={s.imagen}
        />
      ))}
      {secuencia.map((s, i) => (
        <img
          key={`imagen-secuencia-AAT-${i}`}
          style={{ position: 'absolute', pointerEvents: 'none', opacity: 0, height: 0 }}
          alt={`imagen-secuencia-AAT-${i}`}
          src={s.imagen}
        />
      ))}
    </>
  )
}

export default AAT