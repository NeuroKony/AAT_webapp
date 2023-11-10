import { useMemo, useState } from 'react'
import Stepper from '../../Stepper'
import './InstruccionesExposicion.css'
import { useSelector } from 'react-redux'
import videoNormal from '../../../assets/videos/VIDEO CONTROL.mp4'
import videoInmersion from '../../../assets/videos/VIDEO INMERSE.mp4'
import videoDereificacion from '../../../assets/videos/VIDEO MINDFUL.mp4'

const InstruccionesExposicion = ({ ocultar }) => {

  const [videoTerminado, setVideoTerminado] = useState(false)
  const { condicion } = useSelector(state => state.pruebas)

  let video = useMemo(() => {
    if (condicion === 'Control' || condicion === 'Publicidad') {
      return videoNormal
    }
    else if (condicion === 'Inmersion') {
      return videoInmersion
    }
    else {
      return videoDereificacion
    }
  }, [])

  return (
    <>
        <div className="InstruccionesExposicion">
          <h1>Etapa 1: Exposición</h1>
          <p>Mira atentamente el video y luego mira las imágenes siguiendo las instrucciones.<br />Esta etapa durará aprox. 5 minutos</p>
          <video
            src={video}
            controls={true}
            onEnded={() => setVideoTerminado(true)}
            playsInline={true}
          />
          <div className="InstruccionesExposicion__botones">
            <button
              onClick={ocultar}
              disabled={!videoTerminado}
            >
              {videoTerminado ? 'Comenzar exposición' : 'Mira el video completo'}
            </button>
          </div>
        </div>
        <Stepper paso={3} />
      </>
  )
}

export default InstruccionesExposicion