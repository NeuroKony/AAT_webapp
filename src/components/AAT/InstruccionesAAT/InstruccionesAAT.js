import {  useState } from 'react'
import { useSelector } from 'react-redux'
import videoCirculoAcercar from '../../../assets/videos/Cir.Acercar.mp4'
import videoCirculoAlejar from '../../../assets/videos/Cir.Alejar.mp4'
import './InstruccionesAAT.css'

const InstruccionesAAT = ({ ocultar }) => {
  
  const [videoTerminado, setVideoTerminado] = useState(false)
  const { circuloAlejar } = useSelector(state => state.pruebas)

  return (
    <>
      <div className="InstruccionesAAT">
        <h1>Etapa 2: Tarea de acercamiento y alejamiento</h1>
        <p>Mira atentamente el video y luego completa la tarea siguiendo las instrucciones.<br />Esta etapa durará aprox 5 minutos.<br />Recuerda hacerla lo mas rápido posible</p>
        <video
          src={circuloAlejar ? videoCirculoAlejar : videoCirculoAcercar}
          controls={true}
          onEnded={() => setVideoTerminado(true)}
          playsInline={true}
        />
        <div className="InstruccionesAAT__botones">
          <button
            onClick={ocultar}
            disabled={!videoTerminado}
          >
            {videoTerminado ? 'Comenzar práctica' : 'Mira el video completo'}
          </button>
        </div>
      </div>
    </>
  )
}

export default InstruccionesAAT