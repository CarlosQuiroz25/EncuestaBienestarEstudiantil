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
Tu nombre es FeelBot, eres un asistente virtual especializado en bienestar estudiantil universitario. 
Tu rol es brindar orientación y apoyo en temas relacionados con la salud mental, 
hábitos de estudio, relaciones interpersonales y bienestar general de los estudiantes universitarios.

Instrucciones estrictas:
1. SOLO responde preguntas relacionadas con bienestar estudiantil universitario. 
   Sin embargo, puedes responder a saludos y despedidas.
2. Para cualquier pregunta fuera de este tema, responde EXACTAMENTE: 
   "Lo siento, solo puedo responder preguntas relacionadas con bienestar estudiantil."
3. No des explicaciones adicionales ni te disculpes más allá de lo indicado.
4. No mantengas conversaciones fuera del tema.
5. Siempre responde en español.
6. Puedes respnder preguntas simples como: ¿Cómo estás?, ¿Qué tal?, ¿Cómo te sientes?, etc.
7. Si te saludan respondes: ¡Hola! ¿En qué puedo ayudarte hoy?
8. Si se despiden respondes: ¡Hasta luego! Te deseo un buen día.

Ejemplos de cómo responder:

Pregunta: Hola
Respuesta: ¡Hola! ¿En qué puedo ayudarte hoy?

Pregunta: ¿Cómo estás?
Respuesta: ¡Hola! ¿En qué puedo ayudarte hoy?

Pregunta: ¿Qué tal?
Respuesta: ¡Hola! ¿En qué puedo ayudarte hoy?

Pregunta: ¿Cómo te sientes?
Respuesta: ¡Hola! ¿En qué puedo ayudarte hoy?

Pregunta: ¿Hasta luego?
Respuesta: ¡Hasta luego! Te deseo un buen día.

Pregunta: ¿Cómo puedo manejar el estrés en época de exámenes?
Respuesta: Durante los exámenes, te recomiendo organizar tu tiempo con un horario de estudio, hacer pausas activas cada 45-50 minutos, mantener una buena alimentación e hidratación, y practicar técnicas de respiración o meditación para reducir la ansiedad.

Pregunta: ¿Qué hago si tengo problemas con mi compañero de cuarto?
Respuesta: La comunicación asertiva es clave. Intenta hablar con tu compañero en un momento tranquilo, exponiendo tus inquietudes de manera respetuosa. Si el problema persiste, podrías considerar involucrar a un mediador o buscar orientación en el departamento de bienestar estudiantil de tu universidad.

Pregunta: ¿Cuál es la capital de Francia?
Respuesta: Lo siento, solo puedo responder preguntas relacionadas con bienestar estudiantil.

Pregunta: ¿Cómo resuelvo esta ecuación de cálculo?
Respuesta: Lo siento, solo puedo responder preguntas relacionadas con bienestar estudiantil.

Recuerda que estoy aquí para ayudarte con:
- Manejo del estrés y ansiedad académica
- Técnicas de estudio efectivas
- Balance vida académica y personal
- Relaciones interpersonales en el ámbito universitario
- Recursos de apoyo estudiantil
- Hábitos saludables para estudiantes
- Orientación sobre servicios de bienestar universitario
`; 

/**
 * Conforma los mensajes de historia para el modelo de Gemini.
 * @param {Array<Object>} chatHistory - La historia de chat actual. Cada objeto debe tener `role` ('user' o 'model'/'assistant') y `content`.
 * @returns {Array<Object>} El arreglo de mensajes para Gemini, incluyendo el contexto del sistema y la historia de la conversación.
 */
function buildGeminiMessages(chatHistory) {
    const messages = [
        {
            role: 'user', // System prompt proporcionado como mensaje de usuario
            parts: [{ text: CONTEXT_MESSAGE }],
        },
        {
            role: 'model', // Initial model response to acknowledge context
            parts: [{ text: "Entendido. Estoy listo para ayudarte con temas de bienestar estudiantil, incluyendo saludos y despedidas, siguiendo tus instrucciones." }],
        }
    ];

    // Agrega la historia de conversación real, asegurándote de que los roles sean 'user' o 'model'
    chatHistory.forEach(msg => {
        let role = msg.role.toLowerCase();
        if (role === 'assistant') {
            role = 'model';
        }
        // Solo agregamos mensajes de usuario y modelo. Los mensajes de contexto inicial ya están establecidos.
        if (role === 'user' || role === 'model') {
            messages.push({
                role: role,
                parts: [{ text: msg.content || '' }], // Asegura que el contenido sea una cadena
            });
        }
    });
    
    return messages;
}

/**
 * Llama a la API de Gemini con los mensajes proporcionados.
 * @param {Array<Object>} messagesForGemini - Los mensajes conformados por buildGeminiMessages.
 * @returns {Promise<string>} La respuesta de texto de Gemini.
 */
async function callGemini(messagesForGemini) {
    try {
        // La historia para startChat debe incluir todos los mensajes *excepto* el último (consulta actual del usuario).
        const historyForChatInitialization = messagesForGemini.slice(0, -1);
        
        // El último mensaje es la consulta actual del usuario.
        const lastUserMessageParts = messagesForGemini[messagesForGemini.length - 1]?.parts;
        const lastUserMessageContent = lastUserMessageParts?.[0]?.text;

        if (!lastUserMessageContent && messagesForGemini.length > 2) { // Verifica si el contenido de la consulta del usuario está vacío después del contexto + ack
            console.warn('El contenido de la consulta del usuario está vacío. El modelo podría no responder como se espera.');
        }
        
        if (messagesForGemini.length < 3 && lastUserMessageContent === undefined) { 
            console.error('Los mensajes para Gemini no parecen contener la consulta actual del usuario después de establecer el contexto.');
            return "Lo siento, no pude procesar tu mensaje. Asegúrate de que no esté vacío.";
        }

        const chat = model.startChat({
            history: historyForChatInitialization,
        });
        
        const result = await chat.sendMessage(lastUserMessageContent || ""); 
        const response = await result.response;
        let responseText = response.text();
        
        // Verifica después de la respuesta
        const predefinedResponses = [
            "¡Hola! ¿En qué puedo ayudarte hoy?",
            "¡Hasta luego! Te deseo un buen día.",
            "Lo siento, solo puedo responder preguntas relacionadas con bienestar estudiantil."
        ];

        if (predefinedResponses.includes(responseText.trim())) {
            return responseText.trim();
        }

        const lowerResponse = responseText.toLowerCase();
        const allowedKeywords = [
            'bienestar', 'estrés', 'ansiedad', 'estudio', 'universidad', 'universitario',
            'estudiante', 'salud mental', 'relaciones', 'hábitos', 'aprendizaje',
            'concentración', 'motivación', 'equilibrio', 'tiempo', 'organización',
            'sueño', 'alimentación', 'ejercicio', 'apoyo', 'recursos',
            'hola', 'saludo', 'despido', 'adiós', 'gracias',
            'ayuda', 'consejo', 'guía', 'depresión', 'consejos'
        ];
            
        const isOnTopicOrGreeting = allowedKeywords.some(keyword => lowerResponse.includes(keyword));
            
        if (!isOnTopicOrGreeting) {
            return "Lo siento, solo puedo responder preguntas relacionadas con bienestar estudiantil.";
        }
        
        return responseText;

    } catch (error) {
        console.error('Error al llamar a la API de Gemini:', error.message, error.stack);
        if (error.message && error.message.toLowerCase().includes('safety')) {
            return "Tu solicitud no pudo ser procesada debido a nuestras políticas de seguridad. Por favor, reformula tu pregunta.";
        }
        if (error.message && error.message.toLowerCase().includes('api key not valid')) {
            return "Error de configuración: La clave API para el servicio de IA no es válida.";
        }
        return "Lo siento, ocurrió un error al intentar procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.";
    }
}

module.exports = { buildGeminiMessages, callGemini, CONTEXT_MESSAGE };