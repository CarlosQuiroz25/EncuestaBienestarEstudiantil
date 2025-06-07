import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/botton/botton';

// 🧱 Componente separado para evitar re-render innecesario
const SectionContainer = ({ id, title, isOpen, onToggle, children }) => (
  <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg mb-6 overflow-hidden">
    <button
      type="button"
      onClick={() => onToggle(id)}
      className="w-full flex justify-between items-center px-6 py-4 text-left text-xl font-semibold text-gray-700 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer rounded-lg"
    >
      {title}
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-blue-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-blue-500" />
      )}
    </button>
    <div
      className={`transition-all duration-500 ease-in-out px-6 ${
        isOpen ? 'max-h-[1000px] py-4' : 'max-h-0 overflow-hidden'
      }`}
    >
      {children}
    </div>
  </div>
);

const SurveyForm = () => {
  const [openSection, setOpenSection] = useState(null);
  const [respuestas, setRespuestas] = useState({
    edad: '',
    genero: '',
    programa: '',
    actividadFisica: '',
    manejoestres: '',
    dieta: '',
    pantalla: '',
    suenio: '',
    actividadPreferida: '',
    estres: '',
    rendimientoActual: '',
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
    dificualtadSocial: '',
  });

  const toggleSection = useCallback((id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuestas((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Respuestas:', respuestas);
    localStorage.setItem('encuesta', JSON.stringify(respuestas));
     // ✅ Para usar una API en el futuro:
    // try {
    //   const response = await fetch('https://tu-api.com/encuesta', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(respuestas),
    //   });
    //   const data = await response.json();
    //   console.log('Respuesta del servidor:', data);
    // } catch (error) {
    //   console.error('Error al enviar la encuesta:', error);
    // } 
    alert('Encuesta enviada con éxito.');
    window.location.reload(); // Refresca la encuesta tras el envío
  };

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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-gradient-to-b from-gray-100 to-white rounded-3xl shadow-xl space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Encuesta de Bienestar Estudiantil</h1>

      {/* Información Demográfica */}
      <SectionContainer id="demografica" title="Información Demográfica" isOpen={openSection === 'demografica'} onToggle={toggleSection}>
        <div className="grid gap-6">
          {renderInput('¿Cuál es tu edad?', 'edad', 'number')}
          {renderInput('¿Con qué género te identificas?', 'genero', 'select', false, ['masculino', 'femenino', 'No binario', 'prefiero_no_decirlo'])}
          {renderInput('¿En qué programa académico estás matriculado?', 'programa')}
        </div>
      </SectionContainer>

      {/* Salud Física */}
      <SectionContainer id="fisica" title="Salud Física" isOpen={openSection === 'fisica'} onToggle={toggleSection}>
        <div className="grid gap-6">
          {renderInput('¿Con qué frecuencia realizas actividad física?', 'actividadFisica', 'select', false, ['Diariamente', '3-4 veces por semana', '1-2 veces por semana', 'Casi nunca'])}
          {renderInput('¿Cómo describirías tu dieta?', 'dieta', 'select', false, ['muy_saludable', 'saludable', 'regular', 'poco_saludable'])}
          {renderInput('¿Cuánto tiempo pasas frente a una pantalla al día?', 'pantalla', 'select', false, ['Menos de 3 horas', 'Entre 3 y 6 horas', 'Más de 6 horas', 'Casi todo el día'])}
          {renderInput('¿Cuántas horas duermes en promedio por noche?', 'suenio', 'select', false, ['Menos de 5 horas', '5-6 horas', '7-8 horas', 'Más de 8 horas'])}
          {renderInput('¿Qué tipo de actividad física disfrutas más?', 'actividadPreferida', 'text', true)}
        </div>
      </SectionContainer>

      {/* Salud Mental */}
      <SectionContainer id="mental" title="Salud Mental" isOpen={openSection === 'mental'} onToggle={toggleSection}>
        <div className="grid gap-6">
          {renderInput('¿Con qué frecuencia te sientes estresado?', 'estres', 'select', false, ['nunca', 'a_veces', 'frecuentemente', 'todo_el_tiempo'])}
          {renderInput('¿Cómo describirías tu estado de ánimo general?', 'estadoAnimo', 'select', false, ['muy_positivo', 'positivo', 'neutral', 'negativo'])}
          {renderInput('¿Tienes dificultades para concentrarte?', 'concentracion', 'select', false, ['nunca', 'ocasionalmente', 'frecuentemente', 'siempre'])}
          {renderInput('¿Tienes acceso a apoyo emocional si lo necesitas?', 'apoyoEmocional', 'select', false, ['siempre', 'a_veces', 'rara_vez', 'nunca'])}
          {renderInput('¿Qué actividades realizas para manejar el estrés?', 'manejoestres', 'text', true)}
        </div>
      </SectionContainer>

      {/* Hábitos de Estudio */}
      <SectionContainer id="habitos" title="Hábitos de Estudio" isOpen={openSection === 'habitos'} onToggle={toggleSection}>
        <div className="grid gap-6">
          {renderInput('¿Cómo calificarías tu rendimiento académico actual?', 'rendimientoActual', 'select', false, ['Excelente', 'Bueno', 'Regular', 'Deficiente'])}
          {renderInput('¿Cuántas horas estudias al día?', 'horasEstudio', 'select', false, ['Menos de 1 hora', '1-2 horas', '3-4 horas', 'Más de 4 horas'])}
          {renderInput('¿Dónde sueles estudiar?', 'lugarEstudio', 'select', false, ['casa', 'biblioteca', 'aula', 'otro'])}
          {renderInput('¿Con qué frecuencia usas tecnología para estudiar?', 'usoTecnologia', 'select', false, ['nunca', 'a_veces', 'frecuentemente', 'siempre'])}
          {renderInput('¿Qué técnicas utilizas para organizar tu tiempo de estudio?', 'tecnicasEstudio', 'text', true)}
        </div>
      </SectionContainer>

      {/* Vida Social */}
      <SectionContainer id="social" title="Vida Social" isOpen={openSection === 'social'} onToggle={toggleSection}>
        <div className="grid gap-6">
          {renderInput('¿Con qué frecuencia participas en actividades sociales?', 'vidaSocial', 'select', false, ['nunca', 'ocasionalmente', 'frecuentemente', 'siempre'])}
          {renderInput('¿Cómo describirías tu relación con tus compañeros?', 'relacionesCompanieros', 'select', false, ['muy_buena', 'buena', 'neutral', 'mala'])}
          {renderInput('¿Tienes un círculo social en la universidad?', 'circuloSocial', 'select', false, ['amplio', 'moderado', 'pequeño', 'ninguno'])}
          {renderInput('¿Te sientes parte de la comunidad estudiantil?', 'comunidadEstudiantil', 'select', false, ['totalmente', 'parcialmente', 'poco', 'nada'])}
          {renderInput('¿Has enfrentado dificultades para socializar con tus compañeros? Si es así, ¿cuáles crees que han sido las causas?', 'dificualtadSocial', 'text', true)}
        </div>
      </SectionContainer>

      <Button type="submit">
        Enviar Encuesta
      </Button>
    </form>
  );
};

export default SurveyForm;
