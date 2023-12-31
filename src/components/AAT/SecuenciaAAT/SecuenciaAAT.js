import { useSwipeable } from 'react-swipeable'
import { useEffect, useState, useRef } from 'react'
import { differenceInMilliseconds } from 'date-fns'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { guardaPrueba } from '../../../redux/ducks/pruebas'
import './SecuenciaAAT.css'
import { Icon } from '@iconify/react'

const SecuenciaAAT = ({ siguiente, repetir, practica, secuencia }) => {

  const [gesto, setGesto] = useState('')
  const [t, setT] = useState(0)
  const handlers = useSwipeable({
    onSwiped: () => setGesto(''),
    onSwipedUp: () => setGesto('Avoid'),
    onSwipedDown: () => setGesto('Approach'),
    preventDefaultTouchmoveEvent: true
  })
  const [conteoAciertos, setConteoAciertos] = useState(0)
  const { circuloAlejar } = useSelector(state => state.pruebas)

  //dispatch, idImagen, indiceImagen, practica, secuencia, t, tipoCue, tipoImagen

  const dispatch = useDispatch()
  const totalImagenes = secuencia?.length
  const [indiceImagen, setIndiceImagen] = useState(0)
  const imagenActual = secuencia[indiceImagen]
  const idImagen = secuencia[indiceImagen]?.id
  const tipoImagen = secuencia[indiceImagen]?.neutra ? 'Neutral' : 'Attractive'
  const tipoCue = secuencia[indiceImagen]?.cue ? (circuloAlejar ? 'Cuadrado' : 'Círculo') : (circuloAlejar ? 'Círculo' : 'Cuadrado')
  const intervalRef = useRef();
  const MS_EXPOSICION = 5000

  useEffect(() => {
    setT(Date.now())
  }, [])

  useEffect(() => {
    setIndiceImagen(0)
  }, [practica])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setGesto('None');
    }, MS_EXPOSICION);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {

    const el = document.getElementById('x')
    const cue = document.getElementById('y')
    const iconoAleja = document.getElementById('icono-aleja')
    const iconoAcerca = document.getElementById('icono-acerca')
    const cueEsApproach =  secuencia[indiceImagen]?.cue
    let to1, to2

    if (!(el && cue && iconoAleja && iconoAcerca))
      return null

    if (gesto === 'Avoid') {
      if (!cueEsApproach) {
        setConteoAciertos(v => v + 1)
      }
      el.classList.add('SecuenciaAAT__contenedor_imagen--aleja')
      iconoAleja.classList.add('SecuenciaAAT__icono--destacado')
      cue.style.display = 'none'
      to1 = setTimeout(() => setIndiceImagen(i => i + 1), 550)
      to2 = setTimeout(() => {
        el.classList.remove('SecuenciaAAT__contenedor_imagen--aleja')
        iconoAleja.classList.remove('SecuenciaAAT__icono--destacado')
        cue.style.display = 'block'
        setT(Date.now())
        setGesto('')
      }, 600)
      const tReaccion = differenceInMilliseconds(Date.now(), t)
      if (!practica) {
        dispatch(guardaPrueba({ tReaccion, tipoImagen, tipoCue, respuesta: gesto, idImagen }))
      }
    }
    else if (gesto === 'Approach') {
      if (cueEsApproach) {
        setConteoAciertos(v => v + 1)
      }
      el.classList.add('SecuenciaAAT__contenedor_imagen--acerca')
      iconoAcerca.classList.add('SecuenciaAAT__icono--destacado')
      cue.style.display = 'none'
      to1 = setTimeout(() => setIndiceImagen(i => i + 1), 550)
      to2 = setTimeout(() => {
        el.classList.remove('SecuenciaAAT__contenedor_imagen--acerca')
        iconoAcerca.classList.remove('SecuenciaAAT__icono--destacado')
        cue.style.display = 'block'
        setT(Date.now())
        setGesto('')
      }, 600)
      const tReaccion = differenceInMilliseconds(Date.now(), t)
      if (!practica) {
        dispatch(guardaPrueba({ tReaccion, tipoImagen, tipoCue, respuesta: gesto, idImagen }))
      }
    } else if (gesto === 'None') {
      el.classList.add('SecuenciaAAT__contenedor_imagen--aleja')
      iconoAleja.classList.add('SecuenciaAAT__icono--destacado')
      cue.style.display = 'none'
      to1 = setTimeout(() => setIndiceImagen(i => i + 1), 550)
      to2 = setTimeout(() => {
        el.classList.remove('SecuenciaAAT__contenedor_imagen--acerca')
        iconoAcerca.classList.remove('SecuenciaAAT__icono--destacado')
        cue.style.display = 'block'
        setT(Date.now())
        setGesto('')
      }, 600)
      const tReaccion = differenceInMilliseconds(Date.now(), t)
      if (!practica) {
        dispatch(guardaPrueba({ tReaccion, tipoImagen, tipoCue, respuesta: gesto, idImagen }))
      }
    }
    return () => {
      if (gesto !== '')
        clearInterval(intervalRef.current);
      clearTimeout(to1)
      clearTimeout(to2)
    }
    // eslint-disable-next-line 
  }, [gesto])

  if (indiceImagen >= secuencia.length) {
    if (practica) {
      const pruebaSuperada = (conteoAciertos / totalImagenes) >= .7
      return (
        <>
          <div className="SecuenciaAAT">
            <h2>Sesión de práctica terminada</h2>
            <p>Respondiste correctamente {conteoAciertos} de {totalImagenes}</p>
            {!pruebaSuperada && <p>Por favor vuelve a intentarlo</p>}
            {pruebaSuperada
              ? <button onClick={siguiente}>Comenzar tarea</button>
              : <button onClick={repetir}>Repetir práctica</button>
            }
          </div>
        </>
      )
    }
    else {
      siguiente()
      return null
    }
  }

  return (
    <>
      <div className="SecuenciaAAT">
        <Icon
          className="SecuenciaAAT__icono"
          icon="fa-solid:trash-alt"
          id="icono-aleja"
        />
        <div {...handlers} id="x" className="SecuenciaAAT__contenedor_imagen">
          <div
            id='y'
            className={classNames({
              "SecuenciaAAT__cue": true,
              "SecuenciaAAT__cue--approach": circuloAlejar ? !imagenActual.cue : imagenActual.cue,
              "SecuenciaAAT__cue--avoid": circuloAlejar ? imagenActual.cue : !imagenActual.cue,
            })}
          />
          <img
            src={secuencia[indiceImagen].imagen}
            className="SecuenciaAAT__imagen"
            alt="cake"
          />
        </div>
        <Icon
          className="SecuenciaAAT__icono"
          icon="fa-solid:shopping-basket"
          id="icono-acerca"
        />
      </div>
      {secuencia.map((imagen, i) => (
        <img
          src={imagen.imagen}
          className="SecuenciaAAT__imagen"
          alt="cake"
          key={`imagen-aat-${i}`}
          style={{ opacity: 0, height: 0 }}
        />
      ))}
    </>
  )
}

export default SecuenciaAAT