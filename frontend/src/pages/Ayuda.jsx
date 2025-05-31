import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { sendMessage } from '../services/chatApi';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export const Ayuda = () => {
    // Simula un usuario autenticado
    const user = { username: 'prueba' };
    const [messages, setMessages] = useState([
        { 
            sender: 'bot', 
            text: '# ¡Hola! Soy FeelBot, tu asistente virtual. 👋\n\nEstoy aquí para ayudarte con cualquier duda que tengas sobre la encuesta de bienestar estudiantil. ¿En qué puedo ayudarte hoy?',
            timestamp: new Date().toISOString()
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const chatContainerRef = useRef(null);
    const chatEndRef = useRef(null);

    useEffect(() => {
        // Solo hacer scroll si hay mensajes y no es la carga inicial
        if (messages.length > 1 && chatContainerRef.current && chatEndRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatEndRef.current.offsetTop,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();

        if (!input.trim()) return;
        const userMessage = { 
            sender: 'user', 
            text: input,
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        try {
            const respuesta = await sendMessage(user.username, input);
            setMessages(prev => [...prev, { sender: 'bot', text: respuesta }]);
        } catch (err) {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Lo siento, hubo un error al conectar con el asistente.' }]);
            setError('Error al conectar con el chat.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 h-full pb-40 flex flex-col items-center">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-12 rounded-xl shadow-2xl mb-10 text-center w-full max-w-2xl animate-fade-in-down">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 flex items-center justify-center">
                    <FaRobot className="inline-block mr-4 text-blue-200" /> FeelBot
                </h1>
                <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                    Chatea con nuestro asistente virtual para resolver tus dudas al instante.
                </p>
            </div>
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border border-blue-100 flex flex-col h-[600px] md:h-[500px] animate-slide-in-left">
                {/* Chatbox */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-blue-100 shadow-sm'} rounded-2xl overflow-hidden`}>
                                {/* Cabecera del mensaje */}
                                <div className={`px-4 py-2 flex items-center ${msg.sender === 'user' ? 'bg-indigo-700 text-indigo-100' : 'bg-blue-50 text-blue-700'}`}>
                                    {msg.sender === 'bot' ? (
                                        <>
                                            <FaRobot className="text-blue-500 mr-2" />
                                            <span className="font-medium">FeelBot</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaUser className="text-indigo-300 mr-2" />
                                            <span className="font-medium">Tú</span>
                                        </>
                                    )}
                                    <span className="text-xs opacity-70 ml-2">
                                        {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                                
                                {/* Contenido del mensaje */}
                                <div className="p-4 text-gray-800">
                                    {msg.sender === 'bot' ? (
                                        <div className="prose prose-sm max-w-none">
                                            <ReactMarkdown 
                                                rehypePlugins={[rehypeRaw]} 
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2 mt-4 text-gray-800" {...props} />,
                                                    h2: ({node, ...props}) => <h2 className="text-lg font-semibold mb-2 mt-3 text-gray-800" {...props} />,
                                                    p: ({node, ...props}) => <p className="mb-3 leading-relaxed" {...props} />,
                                                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                                                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                                                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                                                    strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                                                    em: ({node, ...props}) => <em className="italic" {...props} />,
                                                    a: ({node, ...props}) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                                    code: ({node, ...props}) => <code className="bg-gray-100 px-1 rounded text-sm font-mono" {...props} />,
                                                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-300 pl-3 italic text-gray-600 my-2" {...props} />
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        <p className="text-white">{msg.text}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Indicador de carga */}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="max-w-[85%] md:max-w-[75%] bg-white border border-blue-100 rounded-2xl overflow-hidden">
                                <div className="px-4 py-2 flex items-center bg-blue-50 text-blue-700">
                                    <FaRobot className="text-blue-500 mr-2" />
                                    <span className="font-medium">FeelBot</span>
                                </div>
                                <div className="p-4 text-gray-800 flex items-center space-x-2">
                                    <FaSpinner className="animate-spin text-blue-500" />
                                    <span>Escribiendo respuesta...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                {/* Input */}
                <form onSubmit={handleSend} className="p-4 border-t border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-b-xl flex items-center gap-3">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-gray-900"
                        placeholder="Escribe tu mensaje..."
                        value={input}
                        onChange={e => setInput(e.target.value)}

                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-md transition-colors duration-200 focus:outline-none"
                        aria-label="Enviar"
                        disabled={loading}
                    >
                        <FaPaperPlane />
                    </button>
                </form>
                {error && <div className="text-red-500 text-center p-2">{error}</div>}
            </div>
        </div>
    );
}; 