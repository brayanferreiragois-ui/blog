document.addEventListener("DOMContentLoaded", () => {
  // --- Alternador de Tema (Claro / Escuro) ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  
  // Verifica se o usuário já salvou a preferência anteriormente
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggleBtn.textContent = "☀️ Modo Claro";
  }

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    
    themeToggleBtn.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // --- Sistema de Curtidas ---
  const likeBtn = document.getElementById("like-btn");
  const likeCountSpan = document.getElementById("like-count");

  // Carrega o número de curtidas salvas (ou começa em 0)
  let likes = parseInt(localStorage.getItem("leo_likes")) || 0;
  likeCountSpan.textContent = likes;

  likeBtn.addEventListener("click", () => {
    likes++;
    likeCountSpan.textContent = likes;
    localStorage.setItem("leo_likes", likes);
  });
});