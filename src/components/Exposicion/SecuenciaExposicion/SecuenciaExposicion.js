import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import './SecuenciaExposicion.css'

const MS_EXPOSICION = 3500

const SecuenciaExposicion = ({ secuencia }) => {

  const [indiceImagenActual, setIndiceImagenActual] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => setIndiceImagenActual(i => i + 1), MS_EXPOSICION)
    return () => clearInterval(intervalo)
  }, [])

  if (indiceImagenActual >= secuencia.length) {
    return <Redirect to='/aat' />
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