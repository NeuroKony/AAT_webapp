import './App.css'
import { use100vh } from 'react-div-100vh'
import { Route, Switch } from 'react-router-dom'
import Fin from '../Fin/Fin'
import Instruccion from '../Instruccion'
import Inicio from '../Inicio'
import Exposicion from '../Exposicion'
import Bienvenida from '../Bienvenida'
import Consentimiento from '../Consentimiento'
import InstruccionesGenerales from '../InstruccionesGenerales'
import AAT from '../AAT'
import Cuestionario from '../Cuestionario'
import { useSelector } from 'react-redux'
import PreguntasExtra from '../PreguntasExtra'

const App = () => {

  const height = use100vh()
  const { sujeto } = useSelector(state => state.pruebas)

  if (!sujeto) {
    return <Inicio />
  }

  return (
    <div
      style={{ height, maxHeight: height }}
      className="App"
    >
      <Switch>
        <Route path="/instruccion">
          <Instruccion />
        </Route>
        <Route path="/exposicion">
          <Exposicion />
        </Route>
        <Route path="/aat">
          <AAT />
        </Route>
        <Route path='/cuestionario'>
          <Cuestionario />
        </Route>
        <Route path='/fin'>
          <Fin />
        </Route>
        <Route path='/instrucciones-generales'>
          <InstruccionesGenerales />
        </Route>
        <Route path='/consentimiento'>
          <Consentimiento />
        </Route>
        <Route path='/preguntas-pre'>
          <PreguntasExtra pos={0}/>
        </Route>
        <Route path='/preguntas-pos'>
          <PreguntasExtra pos={1}/>
        </Route>
        <Route path='/preguntas-final'>
          <PreguntasExtra pos={2}/>
        </Route>
        <Route path='/bienvenida'>
          <Bienvenida />
        </Route>
        <Route path='/'>
          <Inicio />
        </Route>
      </Switch>
    </div>
  )
}

export default App
