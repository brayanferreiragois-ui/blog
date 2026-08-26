// Lógica do Botão Curtir / Descurtir
const likeBtn = document.getElementById('likeBtn');
const likeText = document.getElementById('likeText');
const likeCount = document.getElementById('likeCount');
let isLiked = false;
let count = 0;

likeBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    if (isLiked) {
        count++;
        likeText.textContent = 'Curtido';
        likeBtn.classList.add('liked');
    } else {
        count--;
        likeText.textContent = 'Curtir';
        likeBtn.classList.remove('liked');
    }
    likeCount.textContent = count;
});

// Lógica do Modo Escuro / Modo Claro
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️ Modo Claro';
    } else {
        themeToggle.textContent = '🌙 Modo Escuro';
    }
});