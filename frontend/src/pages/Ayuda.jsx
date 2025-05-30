import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

export const Ayuda = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: '¡Hola! Soy FeelBot, tu asistente virtual. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
        // Aquí se hará la petición a la API y se agregará la respuesta del bot
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
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md text-base flex items-end gap-2 ${msg.sender === 'user' ? 'bg-indigo-100 text-gray-900' : 'bg-blue-50 text-blue-900'}`}>
                                {msg.sender === 'bot' && <FaRobot className="text-blue-400 mr-2" />}
                                <span>{msg.text}</span>
                                {msg.sender === 'user' && <FaUser className="text-indigo-400 ml-2" />}
                            </div>
                        </div>
                    ))}
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
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-md transition-colors duration-200 focus:outline-none"
                        aria-label="Enviar"
                    >
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
}; 