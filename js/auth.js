import { LAMBDA_API_URL } from './config.js';

export function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://SEU_BACKEND_URL/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.access_token) {
            localStorage.setItem('token', data.access_token);
            window.location.href = 'index.html';
        } else {
            alert('Login falhou!');
        }
    });
}

export function isAuthenticated() {
    return !!localStorage.getItem('token');
}

export function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

export function getToken() {
    return localStorage.getItem('token');
}
