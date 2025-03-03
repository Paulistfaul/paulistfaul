// Einfaches Notizen-Speichern und Suchen

const searchInput = document.getElementById('search');
const notesTextarea = document.getElementById('notes');

// Laden der gespeicherten Notizen aus dem LocalStorage
const loadNotes = () => {
    const notes = localStorage.getItem('notes');
    if (notes) {
        notesTextarea.value = notes;
    }
};

// Speichern der Notizen in den LocalStorage
const saveNotes = () => {
    localStorage.setItem('notes', notesTextarea.value);
};

// Suchen in den Notizen
const searchNotes = () => {
    const query = searchInput.value.toLowerCase();
    const notes = notesTextarea.value.toLowerCase();
    if (notes.includes(query)) {
        alert('Text gefunden!');
    } else {
        alert('Kein Ergebnis gefunden.');
    }
};

searchInput.addEventListener('input', searchNotes);
notesTextarea.addEventListener('input', saveNotes);

// Beim Laden der Seite die Notizen laden
loadNotes();
