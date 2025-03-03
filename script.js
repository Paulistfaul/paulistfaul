// Hier speichern wir die Notizen im localStorage als JSON
const notesKey = "notizen";
let notes = JSON.parse(localStorage.getItem(notesKey)) || [];

// Elemente
const searchBar = document.getElementById("search-bar");
const addNoteBtn = document.getElementById("add-note-btn");
const notizenContainer = document.getElementById("notizen-container");

// Funktionen
function renderNotes() {
    notizenContainer.innerHTML = "";
    notes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `<p>${note}</p>`;
        notizenContainer.appendChild(noteElement);
    });
}

function addNoteToStorage(note) {
    notes.push(note);
    localStorage.setItem(notesKey, JSON.stringify(notes));
    renderNotes();
}

function searchNotes(query) {
    const results = notes.filter(note => note.toLowerCase().includes(query.toLowerCase()));
    notizenContainer.innerHTML = "";
    results.forEach(result => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("result");
        resultElement.innerHTML = `<p>${result}</p>`;
        notizenContainer.appendChild(resultElement);
    });
}

// Event Listener
addNoteBtn.addEventListener("click", () => {
    const newNote = prompt("Gib eine neue Notiz ein:");
    if (newNote) {
        addNoteToStorage(newNote);
    }
});

searchBar.addEventListener("input", () => {
    searchNotes(searchBar.value);
});

// Render initial notes
renderNotes();
