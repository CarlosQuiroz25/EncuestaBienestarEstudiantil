import ApoyoEmocional from '../assets/ApoyoEmocional.jpg';
import OrientacionLogro from '../assets/OrientacionLogro.jpg';
import SaludFisica from '../assets/SaludFisica.jpg';
import OrientacionVocacional from '../assets/OrientacionVocacional.jpg';
import HabilidadesBlandas from '../assets/HabilidadesBlandas.jpg';
import ApoyoSocioeconomico from '../assets/ApoyoSocioeconomico.png';

const servicios = [
  {
    id: "1",
    titulo: "Atención Psicológica",
    descripcion: "Apoyo emocional y psicológico para estudiantes.",
    icono: "🧠",
    categoria: "salud",
    destacado: true,
    beneficios: [
      "Atención personalizada",
      "Confidencialidad garantizada",
      "Apoyo profesional"
    ],
    imagen: ApoyoEmocional,
    detalle: `Nuestro servicio de atención psicológica está diseñado para acompañar a los estudiantes en su bienestar emocional.
Contamos con profesionales capacitados que ofrecen sesiones individuales y grupales, talleres de manejo del estrés y orientación en momentos de crisis.
El objetivo es brindar un espacio seguro y confidencial donde puedas expresar tus inquietudes y recibir el apoyo necesario para afrontar los desafíos de la vida universitaria.`
  },
  {
    id: "2",
    titulo: "Asesoría Académica",
    descripcion: "Orientación y apoyo para mejorar tu rendimiento académico.",
    icono: "📚",
    categoria: "academico",
    destacado: false,
    beneficios: [
      "Tutores especializados",
      "Planificación de estudios",
      "Estrategias de aprendizaje"
    ],
    imagen: OrientacionLogro,
    detalle: `La asesoría académica te ayuda a identificar tus fortalezas y áreas de mejora en el ámbito académico.
Recibe acompañamiento de tutores expertos, participa en talleres de técnicas de estudio y accede a recursos para optimizar tu tiempo y rendimiento.
Nuestro objetivo es que logres tus metas educativas de manera eficiente y con menos estrés.`
  },
  {
    id: "3",
    titulo: "Promoción de la Salud Física",
    descripcion: "Actividades y recursos para cuidar tu salud física.",
    icono: "🏃‍♂️",
    categoria: "salud",
    destacado: false,
    beneficios: [
      "Clases de actividad física",
      "Charlas de nutrición",
      "Evaluaciones de salud gratuitas"
    ],
    imagen: SaludFisica,
    detalle: `Participa en nuestras clases de actividad física, accede a evaluaciones de salud gratuitas y recibe orientación nutricional.
Promovemos hábitos saludables para que puedas mantener un equilibrio entre tu vida académica y tu bienestar físico.
¡Súmate a nuestras actividades y cuida tu salud de manera integral!`
  },
  {
    id: "4",
    titulo: "Orientación Vocacional",
    descripcion: "Te ayudamos a descubrir tu vocación y planificar tu futuro profesional.",
    icono: "🧭",
    categoria: "academico",
    destacado: false,
    beneficios: [
      "Test de orientación vocacional",
      "Sesiones individuales",
      "Información sobre carreras"
    ],
    imagen: OrientacionVocacional,
    detalle: `Nuestro servicio de orientación vocacional está dirigido a estudiantes que desean explorar sus intereses, habilidades y valores para tomar decisiones informadas sobre su futuro profesional.
Ofrecemos test vocacionales, sesiones de asesoramiento y acceso a información actualizada sobre carreras y el mercado laboral.`
  },
  {
    id: "5",
    titulo: "Talleres de Habilidades Blandas",
    descripcion: "Desarrolla habilidades sociales, liderazgo y trabajo en equipo.",
    icono: "🤝",
    categoria: "bienestar",
    destacado: false,
    beneficios: [
      "Talleres prácticos",
      "Certificados de participación",
      "Desarrollo personal"
    ],
    imagen: HabilidadesBlandas,
    detalle: `Los talleres de habilidades blandas están diseñados para potenciar tus capacidades de comunicación, liderazgo, empatía y trabajo en equipo.
Participa en actividades dinámicas y recibe retroalimentación para tu crecimiento personal y profesional.`
  },
  {
    id: "6",
    titulo: "Apoyo Socioeconómico",
    descripcion: "Información y gestión de becas, ayudas y subsidios.",
    icono: "💸",
    categoria: "bienestar",
    destacado: false,
    beneficios: [
      "Asesoría personalizada",
      "Gestión de trámites",
      "Acceso a becas y subsidios"
    ],
    imagen: ApoyoSocioeconomico,
    detalle: `El área de apoyo socioeconómico brinda información y acompañamiento en la gestión de becas, ayudas y subsidios para estudiantes.
Te orientamos en los requisitos, plazos y documentación necesaria para acceder a los diferentes beneficios disponibles.`
  }
];

export default servicios;