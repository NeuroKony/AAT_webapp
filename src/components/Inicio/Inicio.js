import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { guardaCirculoAlejar, guardaCondicion, guardaGrupo, guardaSujeto } from '../../redux/ducks/pruebas'
// import DeviceDetector from "device-detector-js"
import './Inicio.css'
import { useEffect } from 'react'
import { useRef } from 'react'
import { use100vh } from 'react-div-100vh'

const Inicio = () => {

  const history = useHistory()
  const [sujeto, setSujeto] = useState('')
  const refNombre = useRef()
  const dispatch = useDispatch()
  const height = use100vh()

  const enviarFormulario = e => {
    e.preventDefault()
    dispatch(guardaSujeto({ sujeto }))
    history.push('/bienvenida')
  }

  useEffect(() => {
    const parametro = new URLSearchParams(document.location.search).get('c')
    if (parametro) {
      const [grupo, condicion] = atob(parametro).split('|')
      const [nombreCondicion, circuloAlejar] = condicion.split(' ')
      dispatch(guardaGrupo(grupo))
      dispatch(guardaCondicion(nombreCondicion))
      dispatch(guardaCirculoAlejar(circuloAlejar === 'Cir.Alejar'))
    } else {
      console.warn('Recordar agregar parámetros')
    }
    refNombre.current.focus()
  }, [dispatch]);

  return (
    <div className="Inicio" style={{ height }}>
    {/* <a href="/.netlify/functions/send-emails">Send mail</a> */}
      <h1 className="Inicio__titulo">Inicio</h1>
      <form className="Inicio__formulario" onSubmit={enviarFormulario}>
        <div className="contenedor_campo">
          <label className="Inicio__label_destacado">Nombre y apellido</label>
          <input
            type="text"
            onChange={e => setSujeto(e.target.value)}
            className="Inicio__input_texto"
            required
            ref={refNombre}
          />
        </div>
        {/* <div className="contenedor_campo">
          <label className="Inicio__label_destacado">Mano dominante</label>
          <div className="Inicio__contenedor_grupo_radios">
            <div className="Inicio__contenedor_radio">
              <input
                type="radio"
                name="mano"
                value="izquierda"
                id="radio-mano-izquierda"
                required
                onChange={e => setManoDominante(e.target.value)}
              />
              <label htmlFor="radio-mano-izquierda">Izquierda</label>
            </div>
            <div className="Inicio__contenedor_radio">
              <input
                type="radio"
                name="mano"
                value="derecha"
                id="radio-mano-derecha"
                required
                onChange={e => setManoDominante(e.target.value)}
              />
              <label htmlFor="radio-mano-derecha">Derecha</label>
            </div>
          </div>
        </div> */}
        <button
          type="submit"
          className="Inicio__boton"
        >
          Comenzar
        </button>
      </form>
    </div>
  )
}

export default Inicio