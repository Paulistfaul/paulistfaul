const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(express.json());

app.post('/search', async (req, res) => {
    const userInput = req.body.input;
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',
                prompt: `Suche nach folgenden Notizen, die mit dem Stichwort ${userInput} zu tun haben und gib mir eine detaillierte Antwort basierend auf den Informationen, die ich über das Thema gespeichert habe.`,
                max_tokens: 150
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({ message: response.data.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: 'Fehler bei der Anfrage an die API' });
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
