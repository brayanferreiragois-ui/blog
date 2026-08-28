document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Modo Escuro (Dark Mode) ---
    const themeToggleBtn = document.getElementById('themeToggle');
    
    // Verifica tema salvo previamente
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️ Modo Claro';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        themeToggleBtn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // --- 2. Botão de Curtida (Like) ---
    const likeBtn = document.getElementById('likeBtn');
    const likeCountSpan = document.getElementById('likeCount');
    const likeTextSpan = document.getElementById('likeText');
    
    let likes = parseInt(localStorage.getItem('blogLikes')) || 0;
    let isLiked = localStorage.getItem('userLiked') === 'true';

    likeCountSpan.textContent = likes;
    if (isLiked) {
        likeBtn.classList.add('liked');
        likeTextSpan.textContent = 'Curtido';
    }

    likeBtn.addEventListener('click', () => {
        if (!isLiked) {
            likes++;
            isLiked = true;
            likeBtn.classList.add('liked');
            likeTextSpan.textContent = 'Curtido';
        } else {
            likes--;
            isLiked = false;
            likeBtn.classList.remove('liked');
            likeTextSpan.textContent = 'Curtir';
        }

        likeCountSpan.textContent = likes;
        localStorage.setItem('blogLikes', likes);
        localStorage.setItem('userLiked', isLiked);
    });

    // --- 3. Sistema de Comentários Funcional ---
    const commentForm =