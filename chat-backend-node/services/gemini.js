const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

// Inicializar la API de Google GenAI
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
    },
});

const CONTEXT_MESSAGE = `
Eres FeelBot, un asistente virtual especializado EXCLUSIVAMENTE en bienestar estudiantil universitario. Tu rol es proporcionar orientación y apoyo en temas relacionados con la salud mental, hábitos de estudio, relaciones interpersonales y bienestar general de los estudiantes universitarios.

Instrucciones estrictas:
1. SOLO responde preguntas relacionadas con bienestar estudiantil universitario.
2. Para cualquier pregunta fuera de este tema, responde EXACTAMENTE: "Lo siento, solo puedo responder preguntas relacionadas con bienestar estudiantil universitario."
3. No des explicaciones adicionales ni te disculpes más allá de lo indicado.
4. No mantengas conversaciones fuera del tema.

Ejemplos de cómo responder:

Pregunta: ¿Cómo puedo manejar el estrés en época de exámenes?
Respuesta: Durante los exámenes, te recomiendo organizar tu tiempo con un horario de estudio, hacer pausas activas cada 45-50 minutos, mantener una buena alimentación e hidratación, y practicar técnicas de respiración o meditación para reducir la ansiedad.

Pregunta: ¿Qué hago si tengo problemas con mi compañero de cuarto?
Respuesta: La comunicación asertiva es clave. Intenta hablar con tu compañero en un momento tranquilo, exponiendo tus inquietudes de manera respetuosa. Si el problema persiste, podrías considerar involucrar a un mediador o buscar orientación en el departamento de bienestar estudiantil de tu universidad.

Pregunta: ¿Cuál es la capital de Francia?
Respuesta: Lo siento, solo puedo responder preguntas relacionadas con bienestar estudiantil universitario.

Pregunta: ¿Cómo resuelvo esta ecuación de cálculo?
Respuesta: Lo siento, solo puedo responder preguntas relacionadas con bienestar estudiantil universitario.

Recuerda que estoy aquí para ayudarte con:
- Manejo del estrés y ansiedad académica
- Técnicas de estudio efectivas
- Balance vida académica y personal
- Relaciones interpersonales en el ámbito universitario
- Recursos de apoyo estudiantil
- Hábitos saludables para estudiantes
- Orientación sobre servicios de bienestar universitario
`;

function buildGeminiMessages(history) {
    // Siempre comenzamos con el mensaje de contexto
    const messages = [{
        role: 'user',
        parts: [{ text: CONTEXT_MESSAGE }]
    }];
    
    // Solo agregamos el último mensaje del usuario (sin historial previo)
    const lastUserMessage = history
        .filter(msg => msg.role === 'user' && msg.content !== CONTEXT_MESSAGE)
        .pop();
    
    if (lastUserMessage) {
        messages.push({
            role: 'user',
            parts: [{ text: lastUserMessage.content }]
        });
    }
    
    return messages;
}

async function callGemini(messages) {
    try {
        // Preparar el chat con el contexto
        const chat = await model.startChat({
            history: messages.slice(0, -1).map(msg => ({
                role: msg.role,
                parts: msg.parts || [{ text: msg.content || '' }]
            }))
        });

        // Obtener el último mensaje del usuario
        const lastMessage = messages[messages.length - 1];
        const userMessage = lastMessage.parts?.[0]?.text || lastMessage.content;
        
        if (!userMessage) {
            throw new Error('No se pudo obtener el mensaje del usuario');
        }
        
        // Enviar el mensaje al chat
        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        let responseText = response.text();
        
        // Verificación adicional para asegurar que la respuesta cumple con las directrices
        const lowerResponse = responseText.toLowerCase();
        const allowedTopics = [
            'bienestar', 'estrés', 'ansiedad', 'estudio', 'universidad',
            'estudiante', 'salud mental', 'relaciones', 'hábitos', 'aprendizaje',
            'concentración', 'motivación', 'equilibrio', 'tiempo', 'organización',
            'sueño', 'alimentación', 'ejercicio', 'apoyo', 'recursos'
        ];
        
        const isOnTopic = allowedTopics.some(topic => lowerResponse.includes(topic));
        
        if (!isOnTopic) {
            return "Lo siento, solo puedo responder preguntas relacionadas con bienestar estudiantil universitario.";
        }
        
        return responseText;
    } catch (error) {
        console.error('Error al llamar a la API de Gemini:', error);
        return "Lo siento, solo puedo responder preguntas relacionadas con bienestar estudiantil universitario.";
    }
}

module.exports = { buildGeminiMessages, callGemini, CONTEXT_MESSAGE };