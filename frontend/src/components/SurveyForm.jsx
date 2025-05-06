import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg mb-6 overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection(id)}
        className="w-full flex justify-between items-center px-6 py-4 text-left text-xl font-semibold text-gray-700 bg-blue-50 hover:bg-blue-100 transition-colors"
      >
        {title}
        {openSection === id ? (
          <ChevronUp className="w-5 h-5 text-blue-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-500" />
        )}
      </button>
      <div
        className={`transition-all duration-500 ease-in-out px-6 ${
          openSection === id ? 'max-h-[1000px] py-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );

  const renderInput = (label, name, type = 'text', isTextarea = false, options = []) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {isTextarea ? (
        <textarea
          name={name}
          value={respuestas[name]}
          onChange={handleChange}
          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          placeholder="Escribe tu respuesta..."
        />
      ) : options.length > 0 ? (
        <select
          name={name}
          value={respuestas[name]}
          onChange={handleChange}
          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        >
          <option value="">Selecciona una opción</option>
          {options.map((op) => (
            <option key={op} value={op}>
              {op.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={respuestas[name]}
          onChange={handleChange}
          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          required
        />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-xl space-y-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Encuesta de Bienestar Estudiantil</h1>

      {/* Información Demográfica */}
      <SectionContainer id="demografica" title="Información Demográfica">
        <div className="grid gap-6">
          {renderInput('¿Cuál es tu edad?', 'edad', 'number')}
          {renderInput('¿Con qué género te identificas?', 'genero', 'select', false, ['masculino', 'femenino', 'otro', 'prefiero_no_decirlo'])}
          {renderInput('¿En qué programa académico estás matriculado?', 'programa')}
        </div>
      </SectionContainer>

      {/* Salud Física */}
      <SectionContainer id="fisica" title="Salud Física">
        <div className="grid gap-6">
          {renderInput('¿Con qué frecuencia realizas actividad física?', 'actividadFisica', 'select', false, ['diario', '3-4', '1-2', 'nunca'])}
          {renderInput('¿Cómo describirías tu dieta?', 'dieta', 'select', false, ['muy_saludable', 'saludable', 'regular', 'poco_saludable'])}
          {renderInput('¿Cuánto tiempo pasas frente a una pantalla al día?', 'pantalla', 'select', false, ['menos3', '3-6', 'mas6', 'todo_dia'])}
          {renderInput('¿Cuántas horas duermes en promedio por noche?', 'suenio', 'select', false, ['menos5', '5-6', '7-8', 'mas8'])}
          {renderInput('¿Qué tipo de actividad física disfrutas más?', 'actividadPreferida', 'text', true)}
        </div>
      </SectionContainer>

      {/* Salud Mental */}
      <SectionContainer id="mental" title="Salud Mental">
        <div className="grid gap-6">
          {renderInput('¿Con qué frecuencia te sientes estresado?', 'estres', 'select', false, ['nunca', 'a_veces', 'frecuentemente', 'todo_el_tiempo'])}
          {renderInput('¿Cómo describirías tu estado de ánimo general?', 'estadoAnimo', 'select', false, ['muy_positivo', 'positivo', 'neutral', 'negativo'])}
          {renderInput('¿Tienes dificultades para concentrarte?', 'concentracion', 'select', false, ['nunca', 'ocasionalmente', 'frecuentemente', 'siempre'])}
          {renderInput('¿Tienes acceso a apoyo emocional si lo necesitas?', 'apoyoEmocional', 'select', false, ['siempre', 'a_veces', 'rara_vez', 'nunca'])}
        </div>
      </SectionContainer>

      {/* Hábitos de Estudio */}
      <SectionContainer id="habitos" title="Hábitos de Estudio">
        <div className="grid gap-6">
          {renderInput('¿Cuántas horas estudias al día?', 'horasEstudio', 'select', false, ['menos1', '1-2', '3-4', 'mas4'])}
          {renderInput('¿Dónde sueles estudiar?', 'lugarEstudio', 'select', false, ['casa', 'biblioteca', 'aula', 'otro'])}
          {renderInput('¿Con qué frecuencia usas tecnología para estudiar?', 'usoTecnologia', 'select', false, ['nunca', 'a_veces', 'frecuentemente', 'siempre'])}
          {renderInput('¿Qué técnicas de estudio utilizas?', 'tecnicasEstudio', 'text', true)}
        </div>
      </SectionContainer>

      {/* Vida Social */}
      <SectionContainer id="social" title="Vida Social">
        <div className="grid gap-6">
          {renderInput('¿Con qué frecuencia participas en actividades sociales?', 'vidaSocial', 'select', false, ['nunca', 'ocasionalmente', 'frecuentemente', 'siempre'])}
          {renderInput('¿Cómo describirías tu relación con tus compañeros?', 'relacionesCompanieros', 'select', false, ['muy_buena', 'buena', 'neutral', 'mala'])}
          {renderInput('¿Tienes un círculo social en la universidad?', 'circuloSocial', 'select', false, ['amplio', 'moderado', 'pequeño', 'ninguno'])}
          {renderInput('¿Te sientes parte de la comunidad estudiantil?', 'comunidadEstudiantil', 'select', false, ['totalmente', 'parcialmente', 'poco', 'nada'])}
        </div>
      </SectionContainer>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white text-lg py-3 rounded-xl font-bold hover:bg-blue-700 transition-shadow hover:shadow-lg"
      >
        Enviar Encuesta
      </button>
    </form>
  );
};

export default SurveyForm;
