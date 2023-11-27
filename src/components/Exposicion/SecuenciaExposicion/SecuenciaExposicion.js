import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './SecuenciaExposicion.css'

const MS_EXPOSICION = 3500

const SecuenciaExposicion = ({ secuencia }) => {

  const [indiceImagenActual, setIndiceImagenActual] = useState(0)
  const history = useHistory()

  useEffect(() => {
    const intervalo = setInterval(() => setIndiceImagenActual(i => i + 1), MS_EXPOSICION)
    return () => clearInterval(intervalo)
  }, [])

  if (indiceImagenActual >= secuencia.length) {
    history.push('/aat')
    return null
  }

  return (
    <>
      <div className="SecuenciaExposicion">
        <img
          className="SecuenciaExposicion__imagen"
          alt={`imagen-secuencia-actual`}
          src={secuencia[indiceImagenActual]}
        />
      </div>
    </>
  )
}

export default SecuenciaExposicion