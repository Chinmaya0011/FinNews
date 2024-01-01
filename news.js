function fetchNewsByQuery(query) {
    const url = `
    https://newsapi.org/v2/everything?q=${query}&from=2023-12-01&sortBy=publishedAt&apiKey=6121f568485746fd89d05bac2433d94b`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Clear existing articles
            const articlesContainer = document.getElementById("articles-container");
            articlesContainer.innerHTML = '';

            // Check if data.articles is defined and is an array
            if (data.articles && Array.isArray(data.articles)) {
                const limitedArticles = data.articles.slice(0, 25);
                // Append new articles
                limitedArticles.forEach(article => {
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
            } else {
                console.error('Invalid data format:', data);
            }
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

