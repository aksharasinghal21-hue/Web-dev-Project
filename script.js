const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('titles');
const codeInput = document.getElementById('codes');
const notesContainer = document.getElementById('notes-container');
const searchBar = document.getElementById('search-bar');

noteForm.addEventListener('submit', function(e) {
    
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = codeInput.value.trim();

    if (!title || !content) return;

    createCheatCard(title, content);

    noteForm.reset();
});
function createCheatCard(title, content) {
    const card = document.createElement('div');
    card.classList.add('cheat-card');

    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const header = document.createElement('h3');
    header.classList.add('card-header');
    header.style.backgroundColor = randomColor;

    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '&times;';

    deleteBtn.addEventListener('click', function() {
        card.remove();
    });

    header.appendChild(titleSpan);
    header.appendChild(deleteBtn);
    const table = document.createElement('table');
    table.classList.add('cheat-table');

    const lines = content.split('\n');
    lines.forEach(line => {
        if (!line.trim()) return;

        // Split by colon: "command : description"
        const parts = line.split(':');
        const command = parts[0] ? parts[0].trim() : '';
        const description = parts[1] ? parts[1].trim() : '';

        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${command}</td><td>${description}</td>`;
        table.appendChild(tr);
    });

    card.appendChild(header);
    card.appendChild(table);
    notesContainer.appendChild(card);
}
searchBar.addEventListener('input', function() {
    const filter = searchBar.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.cheat-card');

    cards.forEach(card => {
        const title = card.querySelector('.card-header').textContent.toLowerCase();
        
        if (title.includes(filter)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});