import _ from 'lodash'

function importAll(r) {
  let images = [];
  r.keys().map(function(item, index) {
      images[index] = r(item).default;
      new Image().src = images[index] 
      return images[index];
    }
  );
  return images;
}

export const imagenesAtrCP = importAll(require.context('../assets/images/study/Atr_CP', false, /\.(png|jpe?g|svg)$/));
export const imagenesAtrSP = importAll(require.context('../assets/images/study/Atr_SP', false, /\.(png|jpe?g|svg)$/));
export const imagenesNeuCP = importAll(require.context('../assets/images/study/Neu_CP', false, /\.(png|jpe?g|svg)$/));
export const imagenesNeuSP = importAll(require.context('../assets/images/study/Neu_SP', false, /\.(png|jpe?g|svg)$/));
export const imagenesPracticaSP = importAll(require.context('../assets/images/study/P', false, /\.(png|jpe?g|svg)$/));
export const imagenesPracticaCP = importAll(require.context('../assets/images/study/PP', false, /\.(png|jpe?g|svg)$/));

export const crearSecuenciaExposicion = conPublicidad => {
  if (conPublicidad) {
    return _.shuffle([...imagenesAtrCP, ...imagenesNeuCP])
  }
  else {
    return _.shuffle([...imagenesAtrSP, ...imagenesNeuSP])
  }
}

const crearSecuenciaDeRepeticiones = (total, maxRep) => {
  const secuencia = []
  let conteo = 0
  while (conteo < total) {
    if (total - conteo < maxRep) {
      secuencia.push(total - conteo)
      break
    }
    const elemento = Math.ceil(Math.random() * maxRep)
    secuencia.push(elemento)
    conteo += elemento
  }
  return secuencia
}

const crearWrapperCue = (imagen, cue, neutra) => ({
  //id: imagen.substring(14, imagen.indexOf('.')),
  id: imagen.substring(15, imagen.indexOf('.', imagen.indexOf('.') + 1)),
  cue,
  imagen,
  neutra
})

export const crearSecuenciaAAT2 = conPublicidad => {
  const imagenesAttrCueT = _.shuffle((conPublicidad ? imagenesAtrCP : imagenesAtrSP)).map(img => crearWrapperCue(img, true, false))
  const imagenesAttrCueF = _.shuffle((conPublicidad ? imagenesAtrCP : imagenesAtrSP)).map(img => crearWrapperCue(img, false, false))
  const imagenesNeutCueT = _.shuffle((conPublicidad ? imagenesNeuCP : imagenesNeuSP)).map(img => crearWrapperCue(img, true, true))
  const imagenesNeutCueF = _.shuffle((conPublicidad ? imagenesNeuCP : imagenesNeuSP)).map(img => crearWrapperCue(img, false, true))
  let secuencia
  while (true) {
    secuencia = _.shuffle([
      ...imagenesAttrCueT,
      ...imagenesAttrCueF,
      ...imagenesNeutCueT,
      ...imagenesNeutCueF,
    ])
    let reps = 0
    let muchasReps = false
    for (let i = 1; i < secuencia.length; i++) {
      if (secuencia[i - 1].cue !== secuencia[i].cue) {
        reps = 1
      }
      else {
        reps++
        if (reps > 3) {
          muchasReps = true
          break
        }
      }
    }
    if (!muchasReps) {
      break
    }
  }
  return secuencia
}

export const crearSecuenciaCuestionario = conPublicidad => {
  const imagenesAttr = _.shuffle((conPublicidad ? imagenesAtrCP : imagenesAtrSP)).map(img => crearWrapperCue(img, true, false))
  const imagenesNeut = _.shuffle((conPublicidad ? imagenesNeuCP : imagenesNeuSP)).map(img => crearWrapperCue(img, true, true))
  return _.shuffle([...imagenesAttr, ...imagenesNeut])
}

export const crearSecuenciaAAT = conPublicidad => {
  let imagenesPorCategoria = imagenesAtrCP.length
  let maxRep = 3
  const imagenesAttr = _.sampleSize((conPublicidad ? imagenesAtrCP : imagenesAtrSP), imagenesPorCategoria)
  const imagenesNeut = _.sampleSize((conPublicidad ? imagenesNeuCP : imagenesNeuSP), imagenesPorCategoria)
  const secuenciaAttr = crearSecuenciaDeRepeticiones(imagenesPorCategoria, maxRep)
  const secuenciaNeut = _.shuffle(secuenciaAttr)
  const secuenciaCuesAttr = crearSecuenciaDeRepeticiones(imagenesPorCategoria, maxRep)
  const secuenciaCuesNeut = _.shuffle(secuenciaCuesAttr).map(x => -x)
  const secuenciaCues = _.flatten(_.zip(secuenciaCuesAttr, secuenciaCuesNeut)).reduce((arr, v) => [...arr, ...Array(Math.abs(v)).fill(v)], [])
  const secuencia = []
  for (let i = 0, indiceAttr = 0, indiceNeut = 0, indiceCues = 0; i < secuenciaAttr.length; i++) {
    for (let j = 0; j < secuenciaAttr[i]; j++) {
      secuencia.push({
        id: imagenesAttr[indiceAttr].substring(14, imagenesAttr[indiceAttr].indexOf('.')),
        cue: secuenciaCues[indiceCues++] > 0,
        imagen: imagenesAttr[indiceAttr++],
        neutra: false
      })
    }
    for (let j = 0; j < secuenciaNeut[i]; j++) {
      secuencia.push({
        id: imagenesNeut[indiceNeut].substring(14, imagenesNeut[indiceNeut].indexOf('.')),
        cue: secuenciaCues[indiceCues++] > 0,
        imagen: imagenesNeut[indiceNeut++],
        neutra: true
      })
    }
  }
  return secuencia
}

export const crearSecuenciaPractica = (conPublicidad) => {
  return (conPublicidad ? imagenesPracticaCP : imagenesPracticaSP).map(img => ({
    //id: img.substring(14, img.indexOf('.')),
    id: img.substring(15, img.indexOf('.', img.indexOf('.') + 1)),
    cue: Math.random() > .5,
    imagen: img,
    neutra: true
  }))
}
