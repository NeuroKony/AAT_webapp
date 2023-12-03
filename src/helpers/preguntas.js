export const preguntasInicio = [
  {
    enunciado: '¿Te sientes contento en este momento?',
    valoraciones: [
      '1: Para nada contento',
      '2',
      '3',
      '4: Ni contento ni no contento',
      '5',
      '6',
      '7: Extremadamente contento',
    ],
    answer_type: "number"
  },
  {
    enunciado: '¿Estás hambriento en este momento?',
    valoraciones: [
      '1: Nada hambriento',
      '2',
      '3',
      '4: Ni hambriento ni no hambriento',
      '5',
      '6',
      '7: Extremadamente hambriento',
    ],
    answer_type: "number"
  },
  {
    enunciado: '¿Te sientes ansioso en este momento?',
    valoraciones: [
      '1: Nada ansioso',
      '2',
      '3',
      '4: Ni ansioso ni no ansioso',
      '5',
      '6',
      '7: Extremadamente ansioso',
    ],
    answer_type: "number"
  },
  {
    enunciado: '¿Te sientes estresado en este momento?',
    valoraciones: [
      '1: Nada estresado',
      '2',
      '3',
      '4: Ni estresado ni no estresado',
      '5',
      '6',
      '7: Extremadamente estresado',
    ],
    answer_type: "number"
  },
  {
    enunciado: '¿Sientes deseos de comer?',
    valoraciones: [
      '1: Nada de deseos',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7: Muchos deseos',
    ],
    answer_type: "number"
  }
]

export const preguntasPost = [
  {
    enunciado: '¿Hace cuánto tiempo tuviste tu última comida?',
    valoraciones: [
      'Ayer',
      'Hace 4 horas',
      'Hace 2 horas',
      'Hace 1 hora',
      'Hace menos de 1 hora'
    ],
    answer_type: "text"
  }
]

export const preguntasFinal = [
  {
    enunciado: 'Genero:',
    valoraciones: [
      'Masculino',
      'Femenino',
      'Otro'
    ],
    answer_type: "text"
  },
  {
    enunciado: 'Edad:',
    valoraciones: [
      '20 o menos',
      '21-25',
      '26-30',
      '31-40',
      '40 o mas'
    ],
    answer_type: "text"
  },
  {
    enunciado: 'Seleccione su tipo de dieta:',
    valoraciones: [
      'Omnívoro (de todo)',
      'Vegetariano',
      'Vegano',
      'Pecetariano'
    ],
    answer_type: "text"
  },
  {
    enunciado: '¿Que tan frecuente usas apps para pedir comida?',
    valoraciones: [
      '1 vez por semana',
      'De 2 a 3 veces por semana',
      'De 4 a 5 veces por semana',
      'De 6 a 7 veces por semana'
    ],
    answer_type: "text"
  },
  {
    enunciado: '¿Que tan frecuente te cocinas?',
    valoraciones: [
      '1 vez por semana',
      'De 2 a 3 veces por semana',
      'De 4 a 5 veces por semana',
      'De 6 a 7 veces por semana'
    ],
    answer_type: "text"
  },
    //¿Dentro de tu estilo de vida cuanta importancia le das a tu alimentacion? (0 nada  10 maxima prioridad).
    //1_____5_____10
  {
    enunciado: '¿Cuanto me he informado de lo que es una alimentacion sana?',
    valoraciones: [
      'No tengo para nada claro lo que seria una alimentacion sana',
      'Tengo una vaga idea de lo que seria una alimentacion sana',
      'Tengo alguna claridad de lo que seria una alimentacion sana',
      'Tengo muy claro lo que seria una alimentacion sana'
    ],
    answer_type: "text"
  },
  {
    enunciado: '¿Cuanto te preocupas de llevar una alimentación sana?',
    valoraciones: [
      'No me preocupa para nada',
      'Me preocupa un poco',
      'Me preocupa bastante',
      'Me preocupa demasiado'
    ],
    answer_type: "text"
  }
]
