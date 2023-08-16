function searchWikipedia() {
    var searchTerm = document.getElementById('search').value;
    var url = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=" + encodeURIComponent(searchTerm) + "&utf8=1&srprop=snippet";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var searchResults = data.query.search;
            var contentDiv = document.getElementById('main-content');
            contentDiv.innerHTML = "";

            searchResults.forEach(result => {
                var articleDiv = document.createElement('div');
                articleDiv.className = "article";
                var title = document.createElement('h3');
                title.innerHTML = `<a href="https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}" target="_blank">${result.title}</a>`;
                var snippet = document.createElement('p');
                snippet.innerHTML = result.snippet + "...";
                articleDiv.appendChild(title);
                articleDiv.appendChild(snippet);
                contentDiv.appendChild(articleDiv);
            });
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
        });
}
