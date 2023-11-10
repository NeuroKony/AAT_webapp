import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { crearSecuenciaExposicion } from '../../helpers/imagenes'
import './Exposicion.css'
import InstruccionesExposicion from './InstruccionesExposicion'
import SecuenciaExposicion from './SecuenciaExposicion'

const Exposicion = () => {

  const [viendoInstrucciones, setViendoInstrucciones] = useState(true)
  const { conPublicidad } = useSelector(state => state.pruebas)
  const secuencia = useMemo(() => crearSecuenciaExposicion(conPublicidad).slice(0, window.location.href.indexOf('localhost') > 0 ? 1 : 1000), [conPublicidad])

  return (
    <>
      {viendoInstrucciones
        ? <InstruccionesExposicion ocultar={() => setViendoInstrucciones(false)} />
        : <SecuenciaExposicion secuencia={secuencia} />
      }
      {secuencia.map((s, i) => (
        <img
          key={`imagen-secuencia-exposicion-${i}`}
          style={{ opacity: 0, height: 0 }}
          alt={`imagen-secuencia-exposicion-${i}`}
          src={s}
        />
      ))}
    </>
  )
}

export default Exposicion