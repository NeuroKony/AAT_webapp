import { useSelector } from 'react-redux'
import axios from 'axios'
import monito from '../../assets/images/monito.svg'
import Papa from 'papaparse'
import './Fin.css'
import { useState, useMemo } from 'react'

const Fin = () => {

  const { sujeto, manoDominante, formaDeRespuesta, pruebas, grupo, condicion, cuestionario, preguntasExtra, circuloAlejar } = useSelector(state => state.pruebas)
  const [enviando, setEnviando] = useState(true)
  const [enviados, setEnviados] = useState(false)
  const [error, setError] = useState()

  let index = preguntasExtra.findIndex(p => p.enunciado === "¿Hace cuánto tiempo tuviste tu última comida?")
  const lastFood = preguntasExtra.splice(index,1)

  const enviarDatos = useMemo(() => {
    setError('')
    axios.post('https://aat-project.netlify.app/.netlify/functions/send-mail',
    {
      message: `
        <table>
          <tbody>
            <tr>
              <td>Sujeto</td><td>${sujeto}</td>
            </tr>
            <tr>
              <td>Grupo</td><td>${grupo}</td>
            </tr>
            <tr>
              <td>Condición</td><td>${condicion}</td>
            </tr>
            <tr>
              <td>Círculo = alejar</td><td>${circuloAlejar ? 'Sí' : 'No'}</td>
            </tr>
            <tr>
              <td>Mano dominante</td><td>${manoDominante}</td>
            </tr>
            <tr>
              <td>Forma de respuesta</td><td>${formaDeRespuesta}</td>
            </tr>
            <tr>
              <td>Última comida</td><td>${lastFood[0].valoracionPost}</td>
            </tr>
          </tbody>
        </table>
      `,
      content: Papa.unparse(pruebas, {
        quotes: true,
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ";",
        header: true,
        newline: "\r\n",
      }),
      filename: `${sujeto}-${condicion}-aat.csv`,
      content2: Papa.unparse(cuestionario, {
        quotes: true,
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ";",
        header: true,
        newline: "\r\n",
      }),
      filename2: `${sujeto}-${condicion}-cuestionario.csv`,
      content3: Papa.unparse(preguntasExtra, {
        quotes: true,
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ";",
        header: true,
        newline: "\r\n",
      }),
      filename3: `${sujeto}-${condicion}-preguntas.csv`,
    })
      .then(() => {
        setEnviados(true)
        setEnviando(false)
      })
      .catch(() => {
        setEnviando(false)
        setEnviados(false)
        setError('Ocurrió un error al enviar los datos')
      })
    }, [circuloAlejar, condicion, cuestionario, formaDeRespuesta, grupo, manoDominante, preguntasExtra, pruebas, sujeto, lastFood]);

  return (
    <div className="Fin">
      <h1>
        ¡Muchas gracias por participar!<br />
        Tu tiempo es valioso para la ciencia de la conducta
      </h1>
      <img
        src={monito}
        alt="monito"
        className="Fin__monito"
      />
      {enviados
        ? null
        : <>
            <p className="Fin__error">{error}</p>
            <button
              disabled={enviando}
              onClick={enviarDatos}
            >
              {error ? 'Volver a intentarlo' : 'Enviando...' }
            </button>
          </>
      }
    </div>
  )
}

export default Fin
