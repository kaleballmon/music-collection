document.addEventListener("DOMContentLoaded", function () {
    fetch("./records.json")
        .then((response) => response.json())
        .then((records) => {
            const recordsWithArtist = records.filter((record) => record.artist);
            const recordsWithNoArtist = records.filter(
                (record) => !record.artist
            );

            const sortedRecordsWithArtist = recordsWithArtist.sort(
                (a, b) =>
                    a.artist.localeCompare(b.artist) ||
                    a.title.localeCompare(b.title)
            );
            const sortedRecordsWithNoArtist = recordsWithNoArtist.sort((a, b) =>
                a.title.localeCompare(b.title)
            );

            const sortedRecords = [
                ...sortedRecordsWithArtist,
                ...sortedRecordsWithNoArtist,
            ];

            renderRecords(sortedRecords);

            const fuse = new Fuse(sortedRecords, {
                keys: ["title", "artist"],
                threshold: 0.3,
            });

            const search = document.getElementById("search");
            search.addEventListener("input", (event) => {
                const query = event.target.value.trim();
                const results = query
                    ? fuse.search(query).map((result) => result.item)
                    : sortedRecords;
                renderRecords(results);
            });
        });
});

const renderRecords = (records) => {
    const list = document.getElementById("record-list");
    list.innerHTML = "";

    records.forEach((record) => {
        const artistText = record.artist ? ` by ${record.artist}` : "";

        const li = document.createElement("li");

        if (record.link) {
            const a = document.createElement("a");
            a.href = record.link;
            a.target = "_blank";
            a.textContent = record.title + artistText;
            li.appendChild(a);
        } else {
            li.textContent = record.title + artistText;
        }
        list.appendChild(li);
    });
};
