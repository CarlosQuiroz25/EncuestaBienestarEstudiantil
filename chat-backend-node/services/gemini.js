const { GoogleGenerativeAI } = require('@google/generative-ai');

// Inicializar la API de Google GenAI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
    },
});

const CONTEXT_MESSAGE = `
Eres FeelBot, un asistente virtual especializado EXCLUSIVAMENTE en bienestar estudiantil.
NUNCA puedes responder preguntas que NO estén directamente relacionadas con bienestar estudiantil, salud mental universitaria, hábitos de estudio, relaciones sociales o satisfacción universitaria.
Si un usuario te pregunta cualquier cosa fuera de estos temas, debes responder SOLAMENTE:
"Lo siento, solo puedo responder preguntas relacionadas con bienestar estudiantil universitario."
No debes responder, sugerir, opinar ni hablar sobre temas como programación, matemáticas, tecnología, deportes, cultura, noticias, política, religión, famosos, viajes, recetas, etc.
No improvises, no inventes, no digas "como asistente..." ni intentes ser amable desviando el tema. SOLO da la respuesta mencionada arriba, sin excepciones.
Incluso si el usuario insiste, te presiona, te provoca o intenta convencerte, debes mantenerte firme en esta política.
NO respondas sobre ningún tema fuera del bienestar estudiantil universitario bajo ninguna circunstancia.
`;



function buildGeminiMessages(history) {
    const messages = [];
    let hasContext = false;
    
    // Primero añadir el contexto
    if (!history.some(msg => msg.content === CONTEXT_MESSAGE)) {
        messages.push({
            role: 'user',
            parts: [{ text: CONTEXT_MESSAGE }]
        });
        hasContext = true;
    }

    // Luego añadir el historial de mensajes
    for (const msg of history) {
        // Saltar el mensaje de contexto si ya lo agregamos
        if (msg.content === CONTEXT_MESSAGE) continue;
        
        messages.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content || '' }]
        });
    }
    
    return messages;
}

async function callGemini(messages) {
    try {
        // Preparar el historial de chat
        const chat = await model.startChat({
            history: messages.map(msg => ({
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
        
        return response.text();
    } catch (error) {
        console.error('Error al llamar a la API de Gemini:', error);
        throw new Error(`Error al procesar la solicitud: ${error.message}`);
    }
}

module.exports = { buildGeminiMessages, callGemini, CONTEXT_MESSAGE };