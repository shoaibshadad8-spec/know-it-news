// مصفوفة عالمية لحفظ المقالات
var allNewsArticles = {};

async function getNewsData(category) {
    var newApiKey = 'pub_15195a2a769d860bb1675300eb53ffeedb5e4';
    var newApiUrl = `https://newsdata.io/api/1/latest?apikey=${newApiKey}&country=eg&category=${category}`;

    try {
        var data = await fetch(newApiUrl);
        var result = await data.json();

        if (!result.results || result.results.length === 0) return;

        allNewsArticles[category] = result.results;

        var container = document.querySelector(`#${category}-news`);
        if (!container) return;
        container.innerHTML = '';

        var limit = Math.min(result.results.length, 4);

        for (var a = 0; a < limit; a++) {
            var item = result.results[a];
            var imageUrl = item.image_url || 'https://via.placeholder.com/300x200?text=No+Image';

            var articleContent = `    
                <div class="news-card style="cursor: pointer;" onclick="openArticle('${category}', ${a})">
                    <img class="img-fluid" src="${imageUrl}">
                    <article class="row mt-2">
                        <p class="col-6 text-muted small">${item.pubDate ? item.pubDate.split(' ')[0] : ''}</p>
                        <p class="col-6">
                            <span class="badge bg-success float-end">${item.source_icon ? `<img style="width: 16px" src="${item.source_icon}">` : ''}</span>
                        </p>
                    </article>
                    <h4 class="fs-6 fw-bold text-dark mt-1">${item.title}</h4>
                </div>
            `;

            var article = document.createElement('section');
            article.classList.add('col-12', 'col-md-6', 'col-lg-3', 'mb-3');
            article.innerHTML = articleContent;
            container.appendChild(article);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function openArticle(category, index) {
    var selectedNews = allNewsArticles[category][index];
    localStorage.setItem('selectedArticle', JSON.stringify(selectedNews));
    window.location.href = 'article.html';
}