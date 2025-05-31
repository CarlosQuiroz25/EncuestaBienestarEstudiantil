const API_URL = 'http://localhost:3001/api/chat';

export async function sendMessage(userId, message) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, message }),
    });
    if (!response.ok) {
        throw new Error('Error al enviar el mensaje al chat');
    }
    const data = await response.json();
    return data.response;
} 