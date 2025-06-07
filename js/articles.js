function loadArticles() {
    fetch('https://SEU_BACKEND_URL/artigos/pending', {
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('articles');
        container.innerHTML = '';

        data.forEach(article => {
            const div = document.createElement('div');
            div.className = 'article';
            div.innerHTML = `
                <h2>${article.titulo}</h2>
                <p>${article.conteudo}</p>
                <button onclick="approveArticle(${article.id})">Aprovar</button>
                <button onclick="rejectArticle(${article.id})">Reprovar</button>
                <hr />
            `;
            container.appendChild(div);
        });
    });
}

function approveArticle(id) {
    fetch(`https://SEU_BACKEND_URL/artigos/${id}/approve`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    }).then(() => loadArticles());
}

function rejectArticle(id) {
    fetch(`https://SEU_BACKEND_URL/artigos/${id}/reject`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    }).then(() => loadArticles());
}
