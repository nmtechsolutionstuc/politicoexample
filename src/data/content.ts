// Todos los datos de este archivo son ficticios. Sirven como demo comercial de NMTECH Solutions
// y están pensados para reemplazarse por la información real de cualquier candidato o funcionario.

export const SITE = {
  name: 'Martín Álvarez',
  shortName: 'Martín',
  initials: 'MA',
  role: 'Candidato a Concejal',
  district: 'San Miguel de Tucumán',
  party: 'Frente Ciudadano',
  listNumber: 'Lista 504',
  tagline: 'Conocé mi trabajo, mis propuestas y las formas de participar. Todo en un solo lugar.',
  heroStatement:
    'Vengo del barrio y me metí en política para resolver problemas concretos, no para prometer lo que no depende de un concejal.',
}

export const STATS = [
  { value: 300, suffix: '+', label: 'Jóvenes capacitados en oficios' },
  { value: 11, suffix: '', label: 'Años de trabajo en el barrio' },
  { value: 292, suffix: '', label: 'Participaciones en esta plataforma' },
  { value: 8, suffix: '', label: 'Barrios con trabajo activo' },
] as const

export const PILLARS = [
  {
    key: 'conocer',
    title: 'Conocer',
    description: 'Quién es Martín, su trayectoria, sus propuestas y sus prioridades.',
  },
  {
    key: 'transparencia',
    title: 'Transparencia',
    description: 'Proyectos, actividad y compromisos, ordenados y fáciles de consultar.',
  },
  {
    key: 'participacion',
    title: 'Participación',
    description: 'Un canal para proponer, consultar, avisar y encontrarse cara a cara.',
  },
] as const

export interface NavLink {
  label: string
  href: string
}

export interface NavGroup {
  label: string
  links: NavLink[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Conocer',
    links: [
      { label: 'Quién soy', href: '#quien-soy' },
      { label: 'Por qué me involucré', href: '#por-que' },
      { label: 'Candidatura', href: '#candidatura' },
      { label: 'Trayectoria', href: '#trayectoria' },
      { label: 'Visión y valores', href: '#vision' },
    ],
  },
  {
    label: 'Propuestas',
    links: [
      { label: 'Propuestas por área', href: '#propuestas' },
      { label: 'Mis prioridades', href: '#prioridades' },
    ],
  },
  {
    label: 'Transparencia',
    links: [
      { label: 'Documentos y actividad', href: '#/transparencia' },
      { label: 'Agenda pública', href: '#agenda' },
      { label: 'Prensa', href: '#prensa' },
    ],
  },
  {
    label: 'Participación',
    links: [
      { label: 'Participá', href: '#participa' },
      { label: 'Propuestas y seguimiento', href: '#comunidad' },
      { label: 'Mapa de participación', href: '#mapa' },
      { label: 'Preguntas y respuestas', href: '#preguntas' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
]

export interface SocialLink {
  platform: string
  handle: string
  href: string
  icon: 'instagram' | 'facebook' | 'tiktok' | 'x' | 'youtube' | 'whatsapp'
}

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Instagram', handle: '@martinalvarezmt', href: '#', icon: 'instagram' },
  { platform: 'Facebook', handle: 'Martín Álvarez - Frente Ciudadano', href: '#', icon: 'facebook' },
  { platform: 'TikTok', handle: '@martinalvarezmt', href: '#', icon: 'tiktok' },
  { platform: 'X', handle: '@malvareztuc', href: '#', icon: 'x' },
  { platform: 'YouTube', handle: 'Martín Álvarez', href: '#', icon: 'youtube' },
  { platform: 'WhatsApp', handle: '+54 9 381 412-7733', href: '#', icon: 'whatsapp' },
]

export const CONTACT = {
  whatsapp: '+54 9 381 412-7733',
  whatsappLink: 'https://wa.me/5493814127733',
  email: 'contacto@martinalvarez.com.ar',
  address: 'Casa de contacto vecinal, Barrio Villa 9 de Julio, San Miguel de Tucumán',
}

export const BIO_PARAGRAPHS = [
  'Nací y crecí en Villa 9 de Julio, al sur de la ciudad. Ingeniero Industrial (UTN Tucumán), con años en la metalúrgica familiar antes de meterme de lleno en el trabajo barrial.',
  'Desde 2014 en la Junta Vecinal: luminarias, calles, el comedor del barrio. En 2019 cofundé Oficio Tucumán, que ya formó a más de 300 jóvenes en oficios.',
  'Casado con Carolina, dos hijos: Bautista y Delfina. Sigo viviendo a seis cuadras de la casa donde nací.',
]

export const MOTIVATION = {
  intro: 'Mi visión, en primera persona: sin solución mágica, pero con prioridades claras.',
  situations: [
    'Un poste de luz quemado durante años me enseñó que nadie estaba mirando el alumbrado de los barrios del sur.',
    'Vi chicos sin oficio y comercios sin gente capacitada para tomar, al mismo tiempo.',
    'Acompañé vecinos que esperaron meses una respuesta simple, por falta de seguimiento.',
  ],
  lessons: 'La gestión se juega en el detalle: un bache, un trámite. La desconfianza nace de la falta de seguimiento, no de mala intención.',
}

export const CANDIDACY = {
  role: 'Concejal',
  district: 'San Miguel de Tucumán',
  party: 'Frente Ciudadano',
  listNumber: 'Lista 504',
  period: 'Elecciones municipales 2027',
  councilFunctions: [
    'Sancionar ordenanzas: las normas que regulan la vida cotidiana del municipio (tránsito, uso del suelo, comercio, espacio público, entre otras).',
    'Aprobar el presupuesto municipal y controlar cómo se ejecuta durante el año.',
    'Controlar los actos del Departamento Ejecutivo municipal (el intendente y su gabinete), pidiendo informes y explicaciones.',
    'Habilitar y regular la actividad comercial, la obra privada y el uso de los espacios públicos dentro del ejido municipal.',
    'Recibir y canalizar formalmente los reclamos e iniciativas de los vecinos hacia las áreas correspondientes.',
  ],
  councilLimits: [
    'Un concejal no maneja directamente la policía provincial ni las fuerzas de seguridad, que dependen del gobierno provincial.',
    'No dicta leyes provinciales o nacionales: su competencia es exclusivamente municipal.',
    'No administra hospitales públicos ni escuelas, que en general dependen de la provincia.',
    'No ejecuta obras por sí mismo: puede impulsarlas, priorizarlas y controlarlas, pero la ejecución depende del Ejecutivo municipal.',
  ],
}

export type TrajectoryStatus = 'Presentado' | 'En análisis' | 'Aprobado' | 'En ejecución' | 'Finalizado'

export interface TrajectoryItem {
  year: string
  title: string
  role: string
  description: string
  status: TrajectoryStatus
  detail: string
}

export const TRAJECTORY: TrajectoryItem[] = [
  {
    year: '2014',
    title: 'Recuperación de la plaza San Expedito',
    role: 'Vecino organizador, Junta Vecinal Villa 9 de Julio',
    description: 'Gestión vecinal para recuperar una plaza en desuso: juegos, riego y alumbrado.',
    status: 'Finalizado',
    detail:
      'Se organizaron jornadas de trabajo con vecinos y se gestionaron ante el municipio la poda, el riego y la instalación de seis luminarias. La plaza volvió a usarse de forma habitual por familias del barrio.',
  },
  {
    year: '2016',
    title: 'Reclamo colectivo por bacheo en Av. Mate de Luna sur',
    role: 'Coordinador del reclamo vecinal',
    description: 'Relevamiento fotográfico y presentación formal de más de 40 reclamos individuales unificados.',
    status: 'Finalizado',
    detail:
      'Se armó un informe con ubicación georreferenciada de cada bache y se entregó en Defensa del Vecino. El municipio realizó una intervención de bacheo parcial seis meses después.',
  },
  {
    year: '2018',
    title: 'Mesa de seguridad barrial Villa 9 de Julio',
    role: 'Impulsor e integrante estable',
    description: 'Espacio mensual de diálogo entre vecinos, comisaría local y municipio.',
    status: 'En ejecución',
    detail:
      'La mesa sigue reuniéndose de forma mensual. Permitió coordinar recorridas del patrullero y priorizar puntos oscuros para instalación de luminarias.',
  },
  {
    year: '2019',
    title: 'Programa "Oficio Tucumán"',
    role: 'Cofundador y coordinador',
    description: 'Capacitación gratuita en oficios para jóvenes de 18 a 25 años sin empleo formal.',
    status: 'En ejecución',
    detail:
      'Más de 300 jóvenes capacitados en electricidad domiciliaria, soldadura y gestión de pequeños comercios, en articulación con una escuela técnica y comercios locales que suman pasantías.',
  },
  {
    year: '2021',
    title: 'Incorporación a Frente Ciudadano',
    role: 'Referente barrial zona sur',
    description: 'Suma su trabajo territorial al espacio político, coordinando la zona sur de la ciudad.',
    status: 'Finalizado',
    detail:
      'Desde entonces coordina la relación entre las juntas vecinales del sur de la ciudad y el espacio político, llevando reclamos concretos a las reuniones de armado programático.',
  },
  {
    year: '2022',
    title: 'Propuesta de ordenanza de alumbrado inteligente por barrios',
    role: 'Redactor junto a equipo técnico de Frente Ciudadano',
    description: 'Anteproyecto presentado a bloques del Concejo para tratamiento en comisión.',
    status: 'En análisis',
    detail:
      'El anteproyecto propone un sistema de reporte y reposición de luminarias con plazos máximos de respuesta. Fue presentado formalmente y espera su tratamiento en la comisión de Obras y Servicios.',
  },
  {
    year: '2023',
    title: 'Programa piloto de huertas comunitarias',
    role: 'Coordinador general',
    description: 'Tres huertas comunitarias en terrenos municipales ociosos del sur de la ciudad.',
    status: 'En ejecución',
    detail:
      'El piloto involucra a 45 familias y produce verduras de estación que se reparten entre los participantes y el comedor barrial. Se evalúa ampliar a dos barrios más en 2026.',
  },
  {
    year: '2025',
    title: 'Candidatura a Concejal por Frente Ciudadano',
    role: 'Candidato, Lista 504',
    description: 'Postulación formal para las elecciones municipales, con foco en seguridad, empleo joven y transparencia.',
    status: 'Presentado',
    detail:
      'La candidatura se apoya en el trabajo territorial de más de una década y en un plan de gestión construido con vecinos de distintos barrios de la ciudad.',
  },
]

export type ProposalArea =
  | 'Seguridad'
  | 'Educación'
  | 'Salud'
  | 'Empleo'
  | 'Producción'
  | 'Transporte'
  | 'Infraestructura'
  | 'Ambiente'
  | 'Tecnología'
  | 'Juventud'

export interface Proposal {
  area: ProposalArea
  title: string
  problem: string
  proposal: string
  implementation: string[]
  measurement: string[]
}

export const PROPOSALS: Proposal[] = [
  {
    area: 'Seguridad',
    title: 'Alumbrado inteligente con reposición garantizada',
    problem: 'Más del 30% de los reclamos vecinales del sur de la ciudad son por luminarias apagadas durante semanas.',
    proposal: 'Ordenanza que fije plazos máximos de reposición y un mapa público del estado del alumbrado por cuadra.',
    implementation: [
      'Relevamiento georreferenciado del estado actual de luminarias por barrio.',
      'Plazo máximo de 72 horas para reposición de reclamos críticos.',
      'Tablero público con el estado de cada reclamo, actualizado semanalmente.',
    ],
    measurement: [
      'Porcentaje de reclamos resueltos dentro del plazo establecido.',
      'Reducción de reclamos repetidos sobre la misma luminaria.',
    ],
  },
  {
    area: 'Seguridad',
    title: 'Mesas de seguridad barrial en toda la ciudad',
    problem: 'Muchos barrios no tienen un espacio formal de diálogo entre vecinos, policía y municipio.',
    proposal: 'Replicar el modelo de mesa de seguridad de Villa 9 de Julio en al menos ocho barrios más.',
    implementation: [
      'Convenio de funcionamiento entre municipio, comisarías y juntas vecinales.',
      'Reuniones mensuales con agenda pública y minuta publicada.',
      'Priorización conjunta de puntos oscuros y recorridas.',
    ],
    measurement: [
      'Cantidad de mesas activas y reuniones realizadas por año.',
      'Cantidad de puntos oscuros resueltos por mesa.',
    ],
  },
  {
    area: 'Empleo',
    title: 'Oficio Tucumán a escala municipal',
    problem: 'Jóvenes sin primer empleo conviven con comercios y pymes que no encuentran personal capacitado.',
    proposal: 'Llevar el programa de capacitación en oficios de escala barrial a una red municipal con salida laboral.',
    implementation: [
      'Convenios con escuelas técnicas y cámaras de comercio para definir oficios demandados.',
      'Becas de transporte y materiales para sostener la cursada.',
      'Bolsa de pasantías con pymes locales al finalizar cada curso.',
    ],
    measurement: [
      'Cantidad de jóvenes egresados por cuatrimestre.',
      'Porcentaje de egresados con empleo o pasantía a los 6 meses.',
    ],
  },
  {
    area: 'Juventud',
    title: 'Primer empleo municipal para jóvenes',
    problem: 'Faltan antecedentes laborales formales para que los jóvenes accedan a su primer trabajo.',
    proposal: 'Programa de pasantías rentadas de seis meses en áreas municipales y pymes adheridas.',
    implementation: [
      'Cupo mínimo de pasantías por área municipal.',
      'Certificación de la pasantía como antecedente laboral formal.',
      'Seguimiento con tutor asignado durante la pasantía.',
    ],
    measurement: [
      'Cantidad de pasantías otorgadas por año.',
      'Porcentaje de pasantes que consiguen empleo formal posterior.',
    ],
  },
  {
    area: 'Infraestructura',
    title: 'Plan de bacheo por prioridad vecinal',
    problem: 'El bacheo se decide sin un criterio público conocido por los vecinos.',
    proposal: 'Criterio de priorización público basado en tránsito, transporte público y reclamos acumulados.',
    implementation: [
      'Publicación del criterio de priorización utilizado por el municipio.',
      'Actualización trimestral del cronograma de intervenciones.',
      'Canal único de reclamo vinculado al mapa de participación ciudadana.',
    ],
    measurement: [
      'Cuadras intervenidas por trimestre.',
      'Tiempo promedio entre el reclamo y la intervención.',
    ],
  },
  {
    area: 'Transporte',
    title: 'Frecuencias reales para los barrios del sur',
    problem: 'Las líneas que llegan a los barrios del sur reducen frecuencia fuera del horario pico, dejando tramos sin cobertura.',
    proposal: 'Revisión de frecuencias mínimas garantizadas y refugios con información en tiempo real.',
    implementation: [
      'Auditoría pública de cumplimiento de frecuencias por línea.',
      'Instalación de refugios con información de próximos arribos en paradas prioritarias.',
      'Canal de reclamo específico por incumplimiento de frecuencia.',
    ],
    measurement: [
      'Porcentaje de cumplimiento de frecuencia mínima por línea.',
      'Cantidad de refugios con información instalados.',
    ],
  },
  {
    area: 'Ambiente',
    title: 'Huertas comunitarias en terrenos ociosos',
    problem: 'Existen terrenos municipales sin uso mientras crece la demanda de espacios verdes productivos.',
    proposal: 'Ampliar el programa piloto de huertas comunitarias a dos barrios adicionales por año.',
    implementation: [
      'Relevamiento de terrenos municipales ociosos aptos para huerta.',
      'Convenios con familias y escuelas para el mantenimiento.',
      'Provisión inicial de herramientas, semillas y agua de riego.',
    ],
    measurement: [
      'Cantidad de huertas activas y familias participantes.',
      'Kilos de producción distribuidos por temporada.',
    ],
  },
  {
    area: 'Tecnología',
    title: 'Trámites municipales simples desde el celular',
    problem: 'Muchos trámites simples todavía requieren presencialidad o formularios poco claros.',
    proposal: 'Digitalizar los diez trámites municipales más solicitados con seguimiento por WhatsApp.',
    implementation: [
      'Relevamiento de los trámites más solicitados y sus cuellos de botella.',
      'Rediseño de los formularios en lenguaje claro.',
      'Seguimiento del estado del trámite por WhatsApp o mensaje de texto.',
    ],
    measurement: [
      'Tiempo promedio de resolución por trámite antes y después.',
      'Cantidad de trámites iniciados de forma digital.',
    ],
  },
  {
    area: 'Educación',
    title: 'Apoyo escolar en comedores barriales',
    problem: 'Varios comedores barriales no cuentan con apoyo escolar organizado para los chicos que asisten.',
    proposal: 'Red de apoyo escolar con estudiantes universitarios voluntarios en comedores del sur de la ciudad.',
    implementation: [
      'Convenio con universidades locales para voluntariado con reconocimiento académico.',
      'Provisión de material didáctico básico a cada comedor.',
      'Coordinación con las escuelas de la zona para detectar necesidades.',
    ],
    measurement: [
      'Cantidad de comedores con apoyo escolar activo.',
      'Cantidad de chicos y chicas participando de forma sostenida.',
    ],
  },
  {
    area: 'Salud',
    title: 'Turnos de los CAPS por WhatsApp',
    problem: 'Conseguir turno en los centros de salud barriales exige madrugar y hacer fila de forma presencial.',
    proposal: 'Sistema de turnos por WhatsApp para los Centros de Atención Primaria de la zona sur.',
    implementation: [
      'Piloto en dos CAPS del sur de la ciudad durante el primer semestre.',
      'Línea de WhatsApp con turnero y recordatorios automáticos.',
      'Capacitación al personal administrativo de cada centro.',
    ],
    measurement: [
      'Cantidad de turnos gestionados por WhatsApp por mes.',
      'Reducción de ausentismo a turnos ya asignados.',
    ],
  },
  {
    area: 'Producción',
    title: 'Compras municipales para pymes locales',
    problem: 'Buena parte de las compras municipales se concentran en proveedores de fuera de la ciudad.',
    proposal: 'Cupo mínimo de compras municipales reservado a pymes con sede en San Miguel de Tucumán.',
    implementation: [
      'Registro simplificado de proveedores locales.',
      'Cupo mínimo garantizado en licitaciones menores.',
      'Publicación anual de compras realizadas a proveedores locales.',
    ],
    measurement: [
      'Porcentaje de compras municipales adjudicadas a pymes locales.',
      'Cantidad de pymes registradas como proveedoras.',
    ],
  },
]

export interface Priority {
  title: string
  summary: string
  detail: string
}

export const PRIORITIES: Priority[] = [
  {
    title: 'Seguridad barrial',
    summary: 'Alumbrado que funcione y mesas de diálogo activas en cada barrio.',
    detail:
      'La seguridad se construye con presencia sostenida, no con anuncios puntuales: alumbrado que se repara rápido, espacios públicos cuidados y un canal directo con la fuerza de seguridad y el municipio.',
  },
  {
    title: 'Empleo joven',
    summary: 'Formación en oficios conectada con la demanda real de las pymes locales.',
    detail:
      'Escalar programas como Oficio Tucumán, con becas de transporte y pasantías reales, para que la primera experiencia laboral deje de ser un obstáculo.',
  },
  {
    title: 'Infraestructura',
    summary: 'Bacheo, veredas y espacios públicos con criterios públicos de prioridad.',
    detail:
      'Que cualquier vecino pueda saber por qué se interviene una cuadra antes que otra, con cronogramas públicos y actualizados.',
  },
  {
    title: 'Modernización municipal',
    summary: 'Trámites simples, digitales y con seguimiento real.',
    detail:
      'Los trámites más frecuentes deberían poder iniciarse y seguirse desde el celular, con lenguaje claro y sin vueltas innecesarias.',
  },
  {
    title: 'Participación ciudadana',
    summary: 'Canales reales para proponer, reclamar y saber qué pasó después.',
    detail:
      'La participación no puede terminar en un formulario que nadie vuelve a mirar: cada propuesta o reclamo necesita una respuesta y un seguimiento visible.',
  },
]

export const VISION = {
  title: 'Visión',
  text: 'Una San Miguel de Tucumán donde vivir lejos del centro no signifique menos alumbrado, menos transporte y menos oportunidades. Una ciudad que se gestiona mirando el detalle de cada barrio.',
}

export const MISSION = {
  title: 'Misión',
  text: 'Estar presente en el territorio, escuchar antes de decidir y responder por lo que se hace y lo que no se llega a hacer.',
}

export interface Value {
  name: string
  meaning: string
}

export const VALUES: Value[] = [
  {
    name: 'Transparencia',
    meaning: 'Publicar lo que se hace, lo que no se pudo hacer y por qué, sin maquillar la información.',
  },
  {
    name: 'Responsabilidad',
    meaning: 'Comprometerme solamente con lo que un concejal puede efectivamente impulsar o controlar.',
  },
  {
    name: 'Diálogo',
    meaning: 'Escuchar primero, incluso cuando el reclamo es directamente hacia mi gestión.',
  },
  {
    name: 'Trabajo',
    meaning: 'Estar en el territorio de forma sostenida, no solamente en épocas de campaña.',
  },
  {
    name: 'Respeto',
    meaning: 'Discutir ideas sin descalificar a quien piensa distinto, dentro o fuera de mi espacio político.',
  },
  {
    name: 'Cercanía',
    meaning: 'Que cualquier vecino tenga una forma simple y real de comunicarse conmigo.',
  },
]

export interface ParticipationOption {
  title: string
  description: string
  icon: 'lightbulb' | 'flag' | 'message-circle-question' | 'calendar-check' | 'users' | 'handshake'
  target: string
}

export const PARTICIPATION_OPTIONS: ParticipationOption[] = [
  {
    title: 'Proponer una idea o contar un problema',
    description: 'Una propuesta para tu barrio, o avisanos sobre calles, alumbrado u otra situación puntual.',
    icon: 'lightbulb',
    target: '#contacto',
  },
  {
    title: 'Hacer una consulta',
    description: 'Escribinos con una duda sobre propuestas, trayectoria o el rol de concejal.',
    icon: 'message-circle-question',
    target: '#contacto',
  },
  {
    title: 'Solicitar una reunión',
    description: 'Pedí un encuentro para conversar sobre un tema puntual de tu organización o barrio.',
    icon: 'calendar-check',
    target: '#contacto',
  },
  {
    title: 'Participar de una actividad',
    description: 'Sumate a alguno de los encuentros de la agenda pública.',
    icon: 'users',
    target: '#agenda',
  },
  {
    title: 'Sumarme como colaborador',
    description: 'Ofrecé tu tiempo para acompañar el trabajo territorial del espacio.',
    icon: 'handshake',
    target: '#contacto',
  },
]

export const IDEA_CATEGORIES = [
  'Seguridad',
  'Transporte',
  'Salud',
  'Educación',
  'Ambiente',
  'Infraestructura',
  'Espacios públicos',
  'Otro',
] as const

export type CommunityProposalStatus = 'Recibida' | 'En análisis' | 'Respondida' | 'Incorporada' | 'Proyecto presentado'

export interface CommunityProposal {
  id: string
  title: string
  category: (typeof IDEA_CATEGORIES)[number]
  neighborhood: string
  description: string
  status: CommunityProposalStatus
  supports: number
}

export const COMMUNITY_PROPOSALS: CommunityProposal[] = [
  {
    id: 'prop-001',
    title: 'Reductores de velocidad en Av. Aconquija y Los Nogales',
    category: 'Transporte',
    neighborhood: 'Barrio Norte',
    description: 'Vecinos piden lomos de burro en una esquina con varios accidentes menores en el último año.',
    status: 'En análisis',
    supports: 64,
  },
  {
    id: 'prop-002',
    title: 'Más luminarias en el pasaje interno de Villa 9 de Julio',
    category: 'Seguridad',
    neighborhood: 'Villa 9 de Julio',
    description: 'El pasaje que conecta con la escuela primaria queda totalmente oscuro después de las 20 h.',
    status: 'Incorporada',
    supports: 118,
  },
  {
    id: 'prop-003',
    title: 'Arreglo de la plaza de Villa Alem',
    category: 'Espacios públicos',
    neighborhood: 'Villa Alem',
    description: 'Los juegos están rotos hace más de un año y el playón no tiene aros de básquet.',
    status: 'Proyecto presentado',
    supports: 92,
  },
  {
    id: 'prop-004',
    title: 'Punto verde de reciclaje en Barrio Sur',
    category: 'Ambiente',
    neighborhood: 'Barrio Sur',
    description: 'Propuesta de instalar contenedores diferenciados cerca del centro vecinal.',
    status: 'Recibida',
    supports: 37,
  },
  {
    id: 'prop-005',
    title: 'Refuerzo escolar los sábados en el CAPS de Villa Amalia',
    category: 'Educación',
    neighborhood: 'Villa Amalia',
    description: 'Idea de sumar el CAPS como sede de apoyo escolar los fines de semana.',
    status: 'Respondida',
    supports: 45,
  },
  {
    id: 'prop-006',
    title: 'Rampa de accesibilidad en la parada de colectivo de Barrio Centro',
    category: 'Infraestructura',
    neighborhood: 'Centro',
    description: 'La parada actual no tiene rampa y complica a personas con movilidad reducida.',
    status: 'En análisis',
    supports: 58,
  },
  {
    id: 'prop-007',
    title: 'Patrullaje nocturno en la zona comercial de Villa 9 de Julio',
    category: 'Seguridad',
    neighborhood: 'Villa 9 de Julio',
    description: 'Comerciantes piden mayor frecuencia de recorridas después del cierre de los locales.',
    status: 'Incorporada',
    supports: 76,
  },
  {
    id: 'prop-008',
    title: 'Wifi público en la plaza principal de Barrio Centro',
    category: 'Otro',
    neighborhood: 'Centro',
    description: 'Propuesta de conectividad gratuita para estudiantes que usan la plaza para estudiar.',
    status: 'Recibida',
    supports: 29,
  },
]

export const TRACKING_STAGES: CommunityProposalStatus[] = [
  'Recibida',
  'En análisis',
  'Respondida',
  'Incorporada',
  'Proyecto presentado',
]

export const REPORT_CATEGORIES = [
  'Calles',
  'Alumbrado',
  'Transporte',
  'Espacios públicos',
  'Seguridad',
  'Limpieza',
  'Otros',
] as const

export interface MapZone {
  neighborhood: string
  participations: number
  topTopics: string[]
}

export const MAP_ZONES: MapZone[] = [
  { neighborhood: 'Barrio Norte', participations: 27, topTopics: ['Transporte', 'Espacios públicos', 'Seguridad'] },
  { neighborhood: 'Centro', participations: 43, topTopics: ['Infraestructura', 'Otro', 'Transporte'] },
  { neighborhood: 'Villa 9 de Julio', participations: 61, topTopics: ['Seguridad', 'Alumbrado', 'Empleo'] },
  { neighborhood: 'Villa Alem', participations: 34, topTopics: ['Espacios públicos', 'Limpieza'] },
  { neighborhood: 'Barrio Sur', participations: 22, topTopics: ['Ambiente', 'Limpieza'] },
  { neighborhood: 'Villa Amalia', participations: 18, topTopics: ['Educación', 'Salud'] },
  { neighborhood: 'Barrio Echeverría', participations: 15, topTopics: ['Calles', 'Alumbrado'] },
  { neighborhood: 'San Cayetano', participations: 12, topTopics: ['Transporte', 'Seguridad'] },
]

export interface AgendaEvent {
  title: string
  date: string
  place: string
  description: string
}

export const AGENDA_EVENTS: AgendaEvent[] = [
  {
    title: 'Recorrida por Villa 9 de Julio',
    date: 'Sábado 4 de octubre, 10:00 h',
    place: 'Plaza San Expedito',
    description: 'Recorrida abierta para relevar el estado del alumbrado junto a vecinos del barrio.',
  },
  {
    title: 'Foro abierto: empleo joven',
    date: 'Jueves 9 de octubre, 18:30 h',
    place: 'Centro Vecinal Barrio Sur',
    description: 'Conversación abierta sobre el programa Oficio Tucumán y su posible ampliación.',
  },
  {
    title: 'Mesa de seguridad barrial',
    date: 'Martes 14 de octubre, 19:00 h',
    place: 'Sede de la Junta Vecinal Villa 9 de Julio',
    description: 'Encuentro mensual con vecinos, comisaría local y equipo del municipio.',
  },
  {
    title: 'Café con vecinos: Barrio Norte',
    date: 'Sábado 18 de octubre, 09:30 h',
    place: 'Plaza de Barrio Norte',
    description: 'Espacio informal para charlar propuestas y dudas sobre la candidatura.',
  },
  {
    title: 'Visita a huerta comunitaria de Villa Amalia',
    date: 'Domingo 26 de octubre, 11:00 h',
    place: 'Huerta comunitaria Villa Amalia',
    description: 'Jornada abierta de trabajo en la huerta, con devolución del programa piloto.',
  },
  {
    title: 'Cierre de agenda de propuestas vecinales',
    date: 'Viernes 31 de octubre, 18:00 h',
    place: 'Casa de contacto vecinal',
    description: 'Presentación pública de las propuestas de vecinos incorporadas al plan de gestión.',
  },
]

export interface FaqItem {
  question: string
  answer: string
}

export const FAQS: FaqItem[] = [
  {
    question: '¿Por qué te presentás como candidato a Concejal y no a otro cargo?',
    answer:
      'Porque es el lugar desde donde se controla el presupuesto municipal y se legisla sobre la vida cotidiana del barrio. Es un cargo con impacto real si se lo trabaja con seriedad.',
  },
  {
    question: '¿Hace cuánto participás de Frente Ciudadano?',
    answer: 'Me sumé en 2021, después de años de trabajo territorial independiente en la zona sur de la ciudad.',
  },
  {
    question: '¿Qué puede hacer realmente un concejal y qué no?',
    answer:
      'Puede sancionar ordenanzas, aprobar y controlar el presupuesto municipal, y controlar al Ejecutivo. No maneja la policía provincial ni dicta leyes provinciales o nacionales. Podés ver el detalle completo en la sección Candidatura.',
  },
  {
    question: '¿Cómo se financia el programa Oficio Tucumán?',
    answer:
      'Combina aportes de una escuela técnica local, colaboraciones de pymes de la zona y, en los últimos dos años, una partida específica gestionada ante el municipio.',
  },
  {
    question: '¿Qué pasa con las propuestas que envían los vecinos por esta plataforma?',
    answer:
      'Cada propuesta recibe una respuesta y un estado de seguimiento público. Podés revisarlo tocando "Ver seguimiento" en cualquier propuesta de la sección "Propuestas de la comunidad".',
  },
  {
    question: '¿Los apoyos a las propuestas de la comunidad son una encuesta oficial?',
    answer:
      'No. Son una forma de interacción dentro de esta plataforma y no representan una medición de la opinión general de la población.',
  },
  {
    question: '¿Puedo pedir una reunión personal?',
    answer: 'Sí, desde la sección Contacto podés solicitar una reunión indicando el motivo y la disponibilidad horaria.',
  },
  {
    question: '¿Vas a mantener actualizada la información de gestión si resultás electo?',
    answer:
      'Sí, la idea de este espacio es justamente esa: mantener actualizada la actividad, los proyectos y los compromisos asumidos durante todo el mandato.',
  },
]

export interface PressItem {
  outlet: string
  title: string
  date: string
  type: 'Entrevista' | 'Nota' | 'Podcast' | 'Comunicado' | 'Video'
}

export const PRESS_ITEMS: PressItem[] = [
  {
    outlet: 'Diario del Norte',
    title: 'Martín Álvarez: "La seguridad se construye con presencia sostenida"',
    date: '12 de agosto de 2025',
    type: 'Entrevista',
  },
  {
    outlet: 'Radio Ciudad 98.5',
    title: 'Entrevista sobre el programa Oficio Tucumán y su posible ampliación',
    date: '2 de agosto de 2025',
    type: 'Entrevista',
  },
  {
    outlet: 'Tucumán Actual',
    title: 'Frente Ciudadano presentó a sus candidatos para el Concejo Deliberante',
    date: '20 de julio de 2025',
    type: 'Nota',
  },
  {
    outlet: 'Podcast Agenda Local',
    title: 'Qué hace realmente un concejal, explicado sin tecnicismos',
    date: '15 de julio de 2025',
    type: 'Podcast',
  },
  {
    outlet: 'Canal 12 Tucumán',
    title: 'Recorrida periodística por la huerta comunitaria de Villa Amalia',
    date: '3 de julio de 2025',
    type: 'Video',
  },
  {
    outlet: 'Frente Ciudadano',
    title: 'Comunicado de presentación de la candidatura de Martín Álvarez',
    date: '30 de junio de 2025',
    type: 'Comunicado',
  },
]

export interface TransparencyDoc {
  title: string
  type: 'Proyecto' | 'Informe' | 'Declaración' | 'Enlace oficial'
  date: string
  description: string
}

export const TRANSPARENCY_DOCS: TransparencyDoc[] = [
  {
    title: 'Anteproyecto de ordenanza de alumbrado inteligente',
    type: 'Proyecto',
    date: 'Marzo 2022',
    description: 'Texto completo presentado ante bloques del Concejo Deliberante para su tratamiento en comisión.',
  },
  {
    title: 'Informe de actividad territorial 2023',
    type: 'Informe',
    date: 'Diciembre 2023',
    description: 'Resumen de actividades, reclamos gestionados y resultados del programa de huertas comunitarias.',
  },
  {
    title: 'Declaración jurada de bienes',
    type: 'Declaración',
    date: 'Julio 2025',
    description: 'Presentada ante la Justicia Electoral en el marco de la candidatura.',
  },
  {
    title: 'Informe de actividad territorial 2024',
    type: 'Informe',
    date: 'Diciembre 2024',
    description: 'Detalle de la actividad de la mesa de seguridad barrial y del programa Oficio Tucumán.',
  },
  {
    title: 'Justicia Electoral de Tucumán',
    type: 'Enlace oficial',
    date: 'Vigente',
    description: 'Sitio oficial para consultar el padrón, la boleta única y la normativa electoral vigente.',
  },
  {
    title: 'Plataforma electoral completa de Frente Ciudadano',
    type: 'Proyecto',
    date: 'Julio 2025',
    description: 'Documento con el detalle de propuestas del espacio político para el municipio.',
  },
]

export interface ContactReason {
  key: string
  label: string
  helper: string
}

export const CONTACT_REASONS: ContactReason[] = [
  { key: 'propuesta', label: 'Tengo una propuesta o un problema', helper: 'Contanos tu idea o qué está pasando en tu barrio.' },
  { key: 'consulta', label: 'Tengo una consulta', helper: 'Escribinos tu duda y te respondemos a la brevedad.' },
  { key: 'reunion', label: 'Quiero solicitar una reunión', helper: 'Indicanos el motivo y tu disponibilidad.' },
  { key: 'prensa', label: 'Prensa', helper: 'Consultas de medios de comunicación.' },
  { key: 'participar', label: 'Quiero participar', helper: 'Contanos cómo te gustaría sumarte.' },
  { key: 'otro', label: 'Otro', helper: 'Cualquier otro motivo de contacto.' },
]

export const ADMIN_SUMMARY = {
  ideasReceived: 214,
  inquiries: 86,
  meetingRequests: 31,
  totalParticipations: 292,
  topTopics: [
    { topic: 'Seguridad y alumbrado', count: 98 },
    { topic: 'Transporte', count: 71 },
    { topic: 'Espacios públicos', count: 54 },
    { topic: 'Empleo joven', count: 40 },
  ],
  recentActivity: [
    { label: 'Nueva propuesta recibida', detail: 'Punto verde de reciclaje en Barrio Sur', time: 'Hace 2 horas' },
    { label: 'Consulta respondida', detail: 'Financiamiento de Oficio Tucumán', time: 'Hace 5 horas' },
    { label: 'Reunión agendada', detail: 'Centro vecinal Villa Alem, 21 de octubre', time: 'Ayer' },
    { label: 'Reporte de barrio actualizado', detail: 'Alumbrado en pasaje interno, Villa 9 de Julio', time: 'Hace 2 días' },
  ],
}

export interface RecentPost {
  platform: 'Instagram' | 'Facebook' | 'TikTok' | 'X'
  caption: string
  date: string
}

export const RECENT_POSTS: RecentPost[] = [
  {
    platform: 'Instagram',
    caption: 'Recorrida por el pasaje interno de Villa 9 de Julio junto a vecinos del barrio.',
    date: 'Hace 3 días',
  },
  {
    platform: 'X',
    caption: 'Presentamos el anteproyecto de alumbrado inteligente ante la comisión de Obras y Servicios.',
    date: 'Hace 1 semana',
  },
  {
    platform: 'Facebook',
    caption: 'Charla abierta sobre empleo joven en el Centro Vecinal de Barrio Sur.',
    date: 'Hace 1 semana',
  },
  {
    platform: 'TikTok',
    caption: 'Qué hace un concejal, explicado en dos minutos.',
    date: 'Hace 2 semanas',
  },
]
