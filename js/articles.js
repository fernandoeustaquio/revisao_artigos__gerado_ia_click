import { LAMBDA_API_URL } from './config.js';
import { getToken } from './auth.js';

export function loadArticles() {
    fetch(`${LAMBDA_API_URL}/artigos/pending`, {
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
    .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar artigos');
        return res.json();
    })
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
    })
    .catch(err => {
        alert('Erro: ' + err.message);
    });
}

export function approveArticle(id) {
    fetch(`${LAMBDA_API_URL}/artigos/${id}/approve`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    }).then(() => loadArticles());
}

export function rejectArticle(id) {
    fetch(`${LAMBDA_API_URL}/artigos/${id}/reject`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    }).then(() => loadArticles());
}
