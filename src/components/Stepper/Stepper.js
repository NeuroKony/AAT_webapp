import classNames from 'classnames'
import './Stepper.css'

const pasos = [
  {
    ruta: '/consentimiento'
  },
  {
    ruta: '/instrucciones-generales'
  },
  {
    ruta: '/instrucciones'
  },
  {
    ruta: '/'
  },
  {
    ruta: '/'
  },
]

const Stepper = ({ paso }) => {

  const circulos = Array(pasos.length).fill(0).map((_, i) => (
    <div
      key={`paso-${i}`}
      className={classNames({
        'Stepper__circulo_paso': true,
        'Stepper__circulo_paso--activo': paso === i + 1
      })}
    />
  ))

  return null
}

export default Stepper