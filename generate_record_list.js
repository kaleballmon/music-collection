document.addEventListener("DOMContentLoaded", function() {
    fetch("/records.json").then(response => response.json()).then(records => {
        const sortedRecords = records.sort((a, b) => b.title - a.title)

        renderRecords(sortedRecords);

        const fuse = new Fuse(records, {
            keys: ['title'],
            threshold: 0.3,
        });

        const search = document.getElementById('search');
        search.addEventListener('input', (event) => {
            const query = event.target.value.trim()
            const results = query ? fuse.search(query).map(result => result.item): sortedRecords;
            renderRecords(results);
        });
    });
});

const renderRecords = (records) => {
    const list = document.getElementById('record-list');
    list.innerHTML = '';

    records.forEach(record => {
        const li = document.createElement('li');
        li.textContent = record.title; // Adjust to match your JSON structure
        list.appendChild(li);
    });
}