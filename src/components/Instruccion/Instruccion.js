import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Instruccion.css'

const Instruccion = () => {
  
  const { condicion } = useSelector(state => state.pruebas)
  
  return (
    <div className="Instruccion">
      Instrucción (aquí va el video para la condición {condicion})
      <Link to="/exposicion">Siguiente</Link>
    </div>
  )
}

export default Instruccion