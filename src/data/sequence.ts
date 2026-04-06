export type SlideType = 'onboarding' | 'story' | 'challenge' | 'success';

export interface SequenceStep {
  id: string;
  type: SlideType;
  // For Story Slides
  title?: string;
  subtitle?: string;
  content?: string;
  bullets?: string[];
  narrative?: string; // Voice over text
  bgImage?: string;
  layout?: 'center' | 'bottom' | 'split';
  // For Challenge Slides
  question?: string;
  options?: string[];
  inputType?: 'textarea' | 'options';
  lockCode?: string;
  answerKey?: 'fase1_aprendizaje' | 'fase2_comportamiento' | 'fase3_evaluacion';
}

export const SEQUENCE: SequenceStep[] = [
  {
    id: '0_onboarding',
    type: 'onboarding',
    narrative: 'Bienvenido al Skills Lab del INS. Por favor, identifícate para iniciar la simulación.'
  },
  // --- SECCIÓN 1: EL CONTEXTO Y EL CAMBIO DE META ---
  {
    id: '1_intro',
    type: 'story',
    title: '11 DE ABRIL DE 1970',
    subtitle: 'El Despegue de la Misión',
    content: 'El objetivo original era claro: alunizar en la región de Fra Mauro. Todo parecía rutinario hasta que, a 330,000 kilómetros de la Tierra, un tanque de oxígeno explotó.',
    bullets: [
      'La nave perdía oxígeno y energía rápidamente.',
      'El plan original quedó completamente destruido en segundos.',
      'El equipo en Houston tuvo que reaccionar de inmediato.'
    ],
    narrative: '11 de abril de 1970. El objetivo original era alunizar. Todo parecía rutinario hasta que un tanque de oxígeno explotó. El plan original quedó destruido.',
    bgImage: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop',
    layout: 'bottom'
  },
  {
    id: '2_redefiniendo',
    type: 'story',
    title: 'REDEFINIENDO EL ÉXITO',
    subtitle: 'El nuevo resultado esperado',
    content: 'En cuestión de segundos, el Director de Vuelo, Gene Kranz, cambió el objetivo. Ya no importaba la Luna. El único resultado aceptable era: "Traer a la tripulación viva a casa".',
    bullets: [
      'Enfoque a Resultados implica adaptabilidad extrema.',
      'Si el entorno cambia, la estrategia debe cambiar.',
      'No hay espacio para lamentarse por el plan original.'
    ],
    narrative: 'Redefiniendo el éxito. Gene Kranz cambió el objetivo. Ya no importaba la Luna. El único resultado aceptable era traer a la tripulación viva a casa. El enfoque a resultados implica adaptabilidad.',
    bgImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop',
    layout: 'split'
  },
  {
    id: '3_challenge1',
    type: 'challenge',
    title: 'RETO 1: LA CRISIS',
    subtitle: 'Mentalidad de Excusas vs Enfoque a Resultados',
    narrative: 'Evaluación de conocimiento. Seleccione la respuesta correcta en su terminal. Esperando código de autorización.',
    question: 'Ante una crisis inesperada donde los planes originales fallan, ¿cuál es la reacción de un equipo CON verdadero enfoque a resultados?',
    options: [
      "A) Buscar culpables y justificar por qué no se puede lograr la meta.",
      "B) Redefinir el objetivo según la nueva realidad y adaptar la estrategia inmediatamente.",
      "C) Esperar a que las condiciones vuelvan a ser perfectas para actuar."
    ],
    inputType: 'options',
    lockCode: 'OXIGENO',
    answerKey: 'fase1_aprendizaje',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop'
  },

  // --- SECCIÓN 2: LOS RECURSOS Y LA EJECUCIÓN ---
  {
    id: '4_crisis_co2',
    type: 'story',
    title: 'CRISIS DE CO2',
    subtitle: 'Filtros cuadrados en agujeros redondos',
    content: 'Los astronautas se trasladaron al módulo lunar para sobrevivir. Pero este no estaba diseñado para 3 personas. El dióxido de carbono alcanzó niveles letales.',
    bullets: [
      'Había filtros de repuesto, pero eran cuadrados.',
      'Los conectores del módulo lunar eran redondos.',
      'No había forma de enviar piezas nuevas al espacio.'
    ],
    narrative: 'Crisis de CO2. Los astronautas se trasladaron al módulo lunar. El dióxido de carbono alcanzó niveles letales. Teníamos filtros cuadrados para agujeros redondos.',
    bgImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop',
    layout: 'center'
  },
  {
    id: '5_ingenieria',
    type: 'story',
    title: 'INGENIERÍA DE LO POSIBLE',
    subtitle: 'Actuar con lo que se tiene',
    content: 'El equipo en Tierra no pidió más presupuesto ni tiempo. Tomaron exactamente lo que los astronautas tenían a bordo: bolsas de plástico, cartones, manuales y cinta americana.',
    bullets: [
      'Enfoque a Resultados es no poner excusas.',
      'Es utilizar los recursos disponibles al máximo.',
      'La "cinta americana" y el ingenio salvaron la misión.'
    ],
    narrative: 'Ingeniería de lo posible. El equipo no pidió más presupuesto. Usaron bolsas de plástico, cartones y cinta americana. El enfoque a resultados es no poner excusas.',
    bgImage: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=1000&auto=format&fit=crop',
    layout: 'bottom'
  },
  {
    id: '6_challenge2',
    type: 'challenge',
    title: 'RETO 2: INGENIERÍA',
    subtitle: 'El Paralelismo Operativo',
    narrative: 'Evaluación de comportamiento. Escriba su compromiso en la terminal. Esperando código de autorización.',
    question: 'Pensando en tu rol en el INS, ¿cuál será tu "cinta americana"? Describe una acción concreta que cambiarás hoy para asegurar un resultado a pesar de las limitaciones de recursos o tiempo.',
    inputType: 'textarea',
    lockCode: 'HOUSTON',
    answerKey: 'fase2_comportamiento',
    bgImage: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=1000&auto=format&fit=crop'
  },

  // --- SECCIÓN 3: EL CIERRE Y LA RESPONSABILIDAD ---
  {
    id: '7_reingreso',
    type: 'story',
    title: 'EL REINGRESO',
    subtitle: 'Energía al límite',
    content: 'Para volver a entrar en la atmósfera, debían encender el módulo de mando. Pero no había suficiente energía. Tuvieron que inventar una secuencia de encendido completamente nueva.',
    bullets: [
      'Cada miembro del equipo asumió responsabilidad total (Accountability).',
      'Nadie dijo "ese no es mi trabajo".',
      'El resultado dependía de la colaboración extrema y la confianza.'
    ],
    narrative: 'El reingreso. Energía al límite. Tuvieron que inventar una secuencia de encendido nueva. Cada miembro asumió responsabilidad total. Nadie dijo "ese no es mi trabajo".',
    bgImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop',
    layout: 'split'
  },
  {
    id: '8_leccion',
    type: 'story',
    title: 'EL FRACASO EXITOSO',
    subtitle: '¿Qué nos enseña el Apolo 13?',
    content: 'El Apolo 13 nunca pisó la Luna, pero es considerado uno de los mayores éxitos de la NASA. Demostró que un equipo enfocado en un resultado claro puede superar cualquier obstáculo.',
    bullets: [
      'Claridad absoluta en la meta final.',
      'Adaptación rápida a la realidad del entorno.',
      'Ejecución impecable bajo presión.'
    ],
    narrative: 'El fracaso exitoso. El Apolo 13 nunca pisó la Luna, pero demostró que un equipo enfocado puede superar cualquier obstáculo. Claridad, adaptación y ejecución.',
    bgImage: 'https://images.unsplash.com/photo-1498092651296-641e88c3b057?q=80&w=1000&auto=format&fit=crop',
    layout: 'center'
  },
  {
    id: '9_challenge3',
    type: 'challenge',
    title: 'RETO 3: EL AMERIZAJE',
    subtitle: 'Calibración Final',
    narrative: 'Evaluación de aprendizaje. Última prueba. Esperando código de autorización final.',
    question: 'Tras esta misión, ¿cómo defines el "Enfoque a Resultados" en el contexto de tu trabajo diario en el INS?',
    options: [
      "A) Cumplir el plan original al pie de la letra, sin importar los cambios del entorno.",
      "B) La capacidad de usar lo que tenemos hoy para lograr la meta, asumiendo responsabilidad total.",
      "C) Trabajar más horas hasta que el problema se resuelva por sí solo."
    ],
    inputType: 'options',
    lockCode: 'AMERIZAJE',
    answerKey: 'fase3_evaluacion',
    bgImage: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '10_success',
    type: 'success',
    narrative: 'Transmisión de telemetría iniciada. Misión finalizada con éxito absoluto.'
  }
];