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
    const commentForm = document.getElementById('commentForm');
    const authorInput = document.getElementById('authorInput');
    const commentInput = document.getElementById('commentInput');
    const commentsList = document.getElementById('commentsList');
    const commentCountSpan = document.getElementById('commentCount');

    // Carregar comentários existentes do localStorage
    let comments = JSON.parse(localStorage.getItem('blogComments')) || [];

    function renderComments() {
        commentsList.innerHTML = '';
        commentCountSpan.textContent = comments.length;

        if (comments.length === 0) {
            commentsList.innerHTML = '<p style="opacity: 0.7; font-style: italic;">Seja o primeiro a comentar!</p>';
            return;
        }

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment-item');
            commentElement.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${escapeHTML(comment.author)}</span>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <div class="comment-text">${escapeHTML(comment.text)}</div>
            `;
            commentsList.appendChild(commentElement);
        });
    }

    // Função para prevenir ataques XSS nos comentários
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Processar novo comentário
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const author = authorInput.value.trim();
        const text = commentInput.value.trim();

        if (author && text) {
            const newComment = {
                author: author,
                text: text,
                date: new Date().toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            comments.unshift(newComment); // Adiciona no início da lista
            localStorage.setItem('blogComments', JSON.stringify(comments));

            // Limpa os campos
            authorInput.value = '';
            commentInput.value = '';

            renderComments();
        }
    });

    // Inicializa a renderização dos comentários
    renderComments();
});