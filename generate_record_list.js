document.addEventListener("DOMContentLoaded", function() {
    fetch("./records.json").then(response => response.json()).then(records => {
        const sortedRecords = records.sort((a, b) => b.title - a.title)

        renderRecords(sortedRecords);

        const fuse = new Fuse(records, {
            keys: ["title", "artist"],
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
        const artistText = record.artist ? ` by ${record.artist}` : '';

        const li = document.createElement('li');
        li.textContent = record.title + artistText;
        list.appendChild(li);
    });
}