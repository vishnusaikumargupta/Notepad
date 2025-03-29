
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}
function formatText(command) {
    document.execCommand(command, false, null);
    updateActiveButtons();
}

function updateActiveButtons() {
    const buttons = document.querySelectorAll(".btn-toolbar .btn");
    buttons.forEach(button => {
        const command = button.getAttribute("onclick").match(/'([^']+)'/)[1]; // Extract command
        if (document.queryCommandState(command)) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

// Detect selection changes and update active buttons
document.addEventListener("selectionchange", updateActiveButtons);

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    const savedNote = localStorage.getItem('savedNote');
    if (savedNote) {
        document.getElementById('editor').innerHTML = savedNote;
    }
});
function changeFontSize(size) {
    document.execCommand("fontSize", false, size);
}

function changeFontFamily(font) {
    document.execCommand('fontName', false, font);
}
function formatText(command) {
    if (command === "createLink") {
        let url = prompt("Enter the URL:", "https://");
        if (url) {
            document.execCommand("createLink", false, url);
        }
    } else {
        document.execCommand(command, false, null);
    }
}
function downloadNote() {
    // Get the note content
    const text = document.getElementById('editor').innerText;
    // Prompt user for filename
    const filename = prompt("Enter file name:", "my-note");
    // If user entered a name, create the file
    if (filename) {
        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename + ".txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function changeColor(color) {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
}

function saveNote() {
    const note = document.getElementById('editor').innerHTML;
    localStorage.setItem('savedNote', note);
    alert('Note saved!');
}

function clearNote() {
    if (confirm('Are you sure you want to clear the note?')) {
        document.getElementById('editor').innerHTML = '';
        localStorage.removeItem('savedNote');
    }
}

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveNote();
    }
});
function updateWordCount() {
    const editor = document.getElementById('editor');
    const text = editor.innerText.trim(); // Get text without extra spaces
    const words = text.length > 0 ? text.split(/\s+/).length : 0; // Count words
    document.getElementById('wordCount').textContent = `Words in the document: ${words}`; // Update UI
}

// Bind the function to detect real-time changes in the editor
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('editor').addEventListener('input', updateWordCount);
    updateWordCount(); // Ensure count updates on page load
});
