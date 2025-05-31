const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('chat.sqlite3');
const { buildGeminiMessages, callGemini } = require('../services/gemini');

// Crear tabla si no existe
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS conversation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    role TEXT,
    content TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);
});

router.post('/', async (req, res) => {
    const { user_id, message } = req.body;
    
    if (!user_id || !message) {
        return res.status(400).json({ 
            error: 'Se requieren user_id y message',
            details: 'Faltan campos obligatorios en la solicitud'
        });
    }

    try {
        // Primero guardamos el mensaje del usuario
        db.run(
            `INSERT INTO conversation (user_id, role, content) VALUES (?, 'user', ?)`,
            [user_id, message],
            async function(err) {
                if (err) {
                    console.error('Error al guardar mensaje del usuario:', err);
                    return res.status(500).json({ 
                        error: 'Error al guardar el mensaje',
                        details: err.message 
                    });
                }

                try {
                    // Obtenemos el historial de la conversación
                    db.all(
                        `SELECT role, content FROM conversation 
                         WHERE user_id = ? 
                         ORDER BY timestamp ASC`,
                        [user_id],
                        async (err, rows) => {
                            if (err) {
                                console.error('Error al consultar el historial:', err);
                                return res.status(500).json({ 
                                    error: 'Error al obtener el historial',
                                    details: err.message 
                                });
                            }

                            try {
                                const history = rows || [];
                                const messages = buildGeminiMessages(history);

                                // Llamar a Gemini
                                const aiResponse = await callGemini(messages);

                                // Guardar la respuesta de la IA
                                db.run(
                                    `INSERT INTO conversation (user_id, role, content) VALUES (?, 'model', ?)`,
                                    [user_id, aiResponse],
                                    (err) => {
                                        if (err) {
                                            console.error('Error al guardar respuesta de la IA:', err);
                                            return res.status(500).json({ 
                                                error: 'Error al guardar la respuesta',
                                                details: err.message 
                                            });
                                        }
                                        
                                        // Todo salió bien, devolvemos la respuesta
                                        res.json({ 
                                            success: true,
                                            response: aiResponse 
                                        });
                                    }
                                );
                            } catch (error) {
                                console.error('Error al procesar la solicitud:', error);
                                res.status(500).json({ 
                                    error: 'Error al procesar la solicitud',
                                    details: error.message 
                                });
                            }
                        }
                    );
                } catch (error) {
                    console.error('Error inesperado:', error);
                    res.status(500).json({ 
                        error: 'Error inesperado',
                        details: error.message 
                    });
                }
            }
        );
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message 
        });
    }
});

module.exports = router;