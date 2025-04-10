import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
  { id: 'demografica', title: 'Información Demográfica' },
  { id: 'fisica', title: 'Salud Física' },
  { id: 'mental', title: 'Salud Mental' },
  { id: 'habitos', title: 'Hábitos de Estudio' },
  { id: 'social', title: 'Vida Social' }
];

const SurveyForm = () => {
  const [openSection, setOpenSection] = useState(null);

  const [respuestas, setRespuestas] = useState({
    edad: '',
    genero: '',
    programa: '',
    actividadFisica: '',
    dieta: '',
    pantalla: '',
    suenio: '',
    actividadPreferida: '',
    estres: '',
    estadoAnimo: '',
    concentracion: '',
    apoyoEmocional: '',
    horasEstudio: '',
    lugarEstudio: '',
    usoTecnologia: '',
    tecnicasEstudio: '',
    vidaSocial: '',
    relacionesCompanieros: '',
    circuloSocial: '',
    comunidadEstudiantil: '',
  });

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuestas({ ...respuestas, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Respuestas:', respuestas);
    localStorage.setItem('encuesta', JSON.stringify(respuestas));
    alert('Encuesta enviada con éxito.');
  };

  const SectionContainer = ({ id, title, children }) => (
    <div className="border rounded-xl shadow-sm bg-gray-50 mb-4">
      <button
        type="button"
        onClick={() => toggleSection(id)}
        className="w-full px-6 py-4 flex justify-between items-center font-semibold text-lg text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-t-xl transition-all"
      >
        {title}
        {openSection === id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 px-6 ${
          openSection === id ? 'max-h-[1000px] py-4' : 'max-h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-6"
    >
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Encuesta de Bienestar Estudiantil</h1>

      {/* Sección 1: Información Demográfica */}
      <SectionContainer id="demografica" title="Información Demográfica">
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">¿Cuál es tu edad?</label>
            <input
              type="number"
              name="edad"
              value={respuestas.edad}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">¿Con qué género te identificas?</label>
            <select name="genero" value={respuestas.genero} onChange={handleChange} className="w-full p-2 border rounded-md" required>
              <option value="">Selecciona una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
              <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">¿En qué programa académico estás matriculado?</label>
            <input
              type="text"
              name="programa"
              value={respuestas.programa}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>
      </SectionContainer>

      {/* Sección 2: Salud Física */}
      <SectionContainer id="fisica" title="Salud Física">
        <div className="space-y-4">
          {[
            {
              label: '¿Con qué frecuencia realizas actividad física?',
              name: 'actividadFisica',
              options: ['diario', '3-4', '1-2', 'nunca']
            },
            {
              label: '¿Cómo describirías tu dieta?',
              name: 'dieta',
              options: ['muy_saludable', 'saludable', 'regular', 'poco_saludable']
            },
            {
              label: '¿Cuánto tiempo pasas frente a una pantalla al día?',
              name: 'pantalla',
              options: ['menos3', '3-6', 'mas6', 'todo_dia']
            },
            {
              label: '¿Cuántas horas duermes en promedio por noche?',
              name: 'suenio',
              options: ['menos5', '5-6', '7-8', 'mas8']
            }
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label className="block font-semibold">{label}</label>
              <select name={name} value={respuestas[name]} onChange={handleChange} className="w-full p-2 border rounded-md">
                <option value="">Selecciona una opción</option>
                {options.map((op) => (
                  <option key={op} value={op}>
                    {op.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="block font-semibold">¿Qué tipo de actividad física disfrutas más?</label>
            <textarea
              name="actividadPreferida"
              value={respuestas.actividadPreferida}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Ej: caminar, fútbol, yoga, etc."
            />
          </div>
        </div>
      </SectionContainer>

                          {/* Sección 3: Salud Mental */}
      <SectionContainer id="mental" title="Salud Mental">
        <div className="space-y-4">
          {[
            {
              label: '¿Con qué frecuencia te sientes estresado?',
              name: 'estres',
              options: ['nunca', 'a_veces', 'frecuentemente', 'todo_el_tiempo']
            },
            {
              label: '¿Cómo describirías tu estado de ánimo general?',
              name: 'estadoAnimo',
              options: ['muy_positivo', 'positivo', 'neutral', 'negativo']
            },
            {
              label: '¿Tienes dificultades para concentrarte en tus estudios?',
              name: 'concentracion',
              options: ['nunca', 'ocasionalmente', 'frecuentemente', 'siempre']
            },
            {
              label: '¿Tienes acceso a apoyo emocional si lo necesitas?',
              name: 'apoyoEmocional',
              options: ['siempre', 'a_veces', 'rara_vez', 'nunca']
            }
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label className="block font-semibold">{label}</label>
              <select name={name} value={respuestas[name]} onChange={handleChange} className="w-full p-2 border rounded-md">
                <option value="">Selecciona una opción</option>
                {options.map((op) => (
                  <option key={op} value={op}>
                    {op.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </SectionContainer>

                          {/* Sección 4: Hábitos de Estudio */}
      <SectionContainer id="habitos" title="Hábitos de Estudio">
        <div className="space-y-4">
          {[
            {
              label: '¿Cuántas horas estudias al día?',
              name: 'horasEstudio',
              options: ['menos1', '1-2', '3-4', 'mas4']
            },
            {
              label: '¿Dónde sueles estudiar?',
              name: 'lugarEstudio',
              options: ['casa', 'biblioteca', 'aula', 'otro']
            },
            {
              label: '¿Con qué frecuencia usas tecnología para estudiar?',
              name: 'usoTecnologia',
              options: ['nunca', 'a_veces', 'frecuentemente', 'siempre']
            }
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label className="block font-semibold">{label}</label>
              <select name={name} value={respuestas[name]} onChange={handleChange} className="w-full p-2 border rounded-md">
                <option value="">Selecciona una opción</option>
                {options.map((op) => (
                  <option key={op} value={op}>
                    {op.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="block font-semibold">¿Qué técnicas de estudio utilizas?</label>
            <textarea
              name="tecnicasEstudio"
              value={respuestas.tecnicasEstudio}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Ej: mapas mentales, resúmenes, flashcards, etc."
            />
          </div>
        </div>
      </SectionContainer>

                          {/* Sección 5: Vida Social */}
      <SectionContainer id="social" title="Vida Social">
        <div className="space-y-4">
          {[
            {
              label: '¿Con qué frecuencia participas en actividades sociales?',
              name: 'vidaSocial',
              options: ['nunca', 'ocasionalmente', 'frecuentemente', 'siempre']
            },
            {
              label: '¿Cómo describirías tu relación con tus compañeros de estudio?',
              name: 'relacionesCompanieros',
              options: ['muy_buena', 'buena', 'neutral', 'mala']
            },
            {
              label: '¿Tienes un círculo social en la universidad?',
              name: 'circuloSocial',
              options: ['amplio', 'moderado', 'pequeño', 'ninguno']
            },
            {
              label: '¿Te sientes parte de la comunidad estudiantil?',
              name: 'comunidadEstudiantil',
              options: ['totalmente', 'parcialmente', 'poco', 'nada']
            }
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label className="block font-semibold">{label}</label>
              <select name={name} value={respuestas[name]} onChange={handleChange} className="w-full p-2 border rounded-md">
                <option value="">Selecciona una opción</option>
                {options.map((op) => (
                  <option key={op} value={op}>
                    {op.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </SectionContainer>


      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
      >
        Enviar Encuesta
      </button>
    </form>
  );
};

export default SurveyForm;
