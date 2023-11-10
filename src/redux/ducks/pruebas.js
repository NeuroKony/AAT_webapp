import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'prueba',
  initialState: {
    sujeto: '',
    manoDominante: '',
    formaDeRespuesta: '',
    grupo: 'NA',
    condicion: 'NA',
    pruebas: [],
    cuestionario: [],
    preguntasExtra: [],
    circuloAlejar: false
  },
  reducers: {
    guardaSujeto(state, action) {
      const { sujeto } = action.payload
      state.sujeto = sujeto
    },
    guardaManoDominante(state, action) {
      state.manoDominante = action.payload
      state.pruebas = state.pruebas.map(prueba => ({ ...prueba, manoDominante: action.payload }))
    },
    guardaFormaDeRespuesta(state, action) {
      state.formaDeRespuesta = action.payload
      state.pruebas = state.pruebas.map(prueba => ({ ...prueba, formaDeRespuesta: action.payload }))
    },
    guardaGrupo(state, action) {
      state.grupo = action.payload
    },
    guardaCondicion(state, action) {
      state.condicion = action.payload
      state.conPublicidad = action.payload?.startsWith('Publicidad')
    },
    guardaCirculoAlejar(state, action) {
      state.circuloAlejar = action.payload
    },
    guardaPrueba(state, action) {
      const { tReaccion, tipoImagen, tipoCue, respuesta, idImagen } = action.payload
      state.pruebas.push({
        grupo: state.grupo,
        condicion: state.condicion,
        circuloAlejar: state.circuloAlejar,
        sujeto: state.sujeto,
        tReaccion,
        tipoImagen,
        tipoCue,
        respuesta,
        idImagen
      })
    },
    guardaRespuestaCuestionario(state, action) {
      const { idImagen, valoracion } = action.payload
      state.cuestionario.push({
        grupo: state.grupo,
        condicion: state.condicion,
        circuloAlejar: state.circuloAlejar,
        sujeto: state.sujeto,
        idImagen,
        valoracion
      })
    },
    guardaRespuestaPreguntaExtra(state, action) {
      const { enunciado, valoracion, pos } = action.payload
      if (pos) {
        const indicePregunta = state.preguntasExtra.findIndex(p => p.enunciado === enunciado)
        state.preguntasExtra[indicePregunta].valoracionPos = valoracion
      }
      else {
        state.preguntasExtra.push({ enunciado, valoracionPre: valoracion, valoracionPos: '-' })
      }
    }
  }
})

export const {
  guardaSujeto,
  guardaManoDominante,
  guardaFormaDeRespuesta,
  guardaPrueba,
  guardaGrupo,
  guardaCondicion,
  guardaCirculoAlejar,
  guardaRespuestaCuestionario,
  guardaRespuestaPreguntaExtra
} = slice.actions

export default slice.reducer