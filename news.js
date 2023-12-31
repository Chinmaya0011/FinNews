function fetchNewsByQuery(query) {
    const url = `https://newsapi.org/v2/everything?q=${query}&from=2023-11-30&sortBy=publishedAt&apiKey=6121f568485746fd89d05bac2433d94b`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Clear existing articles
            const articlesContainer = document.getElementById("articles-container");
            articlesContainer.innerHTML = '';

            // Append new articles
            data.articles.forEach(article => {
                articlesContainer.innerHTML += `
                <div class="article">
                    <div class="articleContainer">
                        <img class="articleImage" src="${article.urlToImage}" alt="">
                        <h1 class="articleTitle">${article.title}</h1>
                        <p class="articleDescription">${article.description}</p>
                        <p class="articleAuthor">${article.author}</p>
                        <p class="articlePublished">${article.publishedAt}</p>
                        <a href="${article.url}" target="_blank" class="readMoreButton">Read more</a>
                    </div>
                </div>`;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function searchInput() {
    const searchValue = document.getElementById("search-bar").value;
    document.getElementById("search-bar").value = '';
    fetchNewsByQuery(searchValue);
}

function fetchNews(category) {
    fetchNewsByQuery(category.toLowerCase());
}
fetchNewsByQuery('bihar')