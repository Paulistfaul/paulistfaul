// Lade Umgebungsvariablen aus der .env-Datei
require('dotenv').config(); // Um Umgebungsvariablen wie den API-Schlüssel zu laden

const axios = require('axios');  // Importiere axios für HTTP-Anfragen

// Hol dir den API-Schlüssel aus den Umgebungsvariablen
const apiKey = process.env.OPENAI_API_KEY;

// Funktion für das Senden der Anfrage an OpenAI GPT-3
async function fetchAIResponse(query) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',  // OpenAI API Endpoint
            {
                model: 'text-davinci-003',  // GPT-3 Modell
                prompt: query,  // Die Eingabe für die KI
                max_tokens: 200,  // Maximale Anzahl an Tokens (Wörtern)
                temperature: 0.7,  // Bestimmt die Kreativität der Antworten
                n: 1  // Anzahl der gewünschten Antworten
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,  // Authentifizierung mit dem API-Schlüssel
                    'Content-Type': 'application/json'
                }
            }
        );

        // Gibt die Antwort der KI zurück
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Fehler bei der Anfrage an OpenAI:", error);
        return "Es gab ein Problem mit der Anfrage.";
    }
}

// Diese Funktion wird beim Absenden des Suchformulars aufgerufen
document.getElementById("searchBtn").addEventListener("click", async function() {
    const query = document.getElementById("searchInput").value;  // Hole die Eingabe aus der Suchleiste
    
    // Sende die Anfrage an die OpenAI API und hole die Antwort
    const aiResponse = await fetchAIResponse(query);
    
    // Zeige die Antwort im "result" Div an
    document.getElementById("result").innerText = aiResponse;
});

// Optionale Funktion für das Hinzufügen neuer Notizen (falls du es benötigst)
document.getElementById("addNoteBtn").addEventListener("click", function() {
    const newNote = document.getElementById("noteInput").value;  // Hole den Text aus dem Notizeneingabefeld
    
    // Hier könntest du Code hinzufügen, um die Notizen zu speichern (z.B. in einer lokalen Datenbank oder einer Datei)
    
    console.log("Neue Notiz hinzugefügt:", newNote);
});
