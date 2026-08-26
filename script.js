const botao = document.getElementById('meuBotao');
const titulo = document.getElementById('titulo');
const mensagem = document.getElementById('mensagem');

// Lista de cores para alternar
const cores = ['#f0f2f5', '#ffe6e6', '#e6f7ff', '#e6ffe6', '#fff0f5'];
let indiceCor = 0;

botao.addEventListener('click', () => {
    // Avança para a próxima cor da lista
    indiceCor = (indiceCor + 1) % cores.length;
    
    // Altera a cor de fundo do body
    document.body.style.backgroundColor = cores[indiceCor];
    
    // Atualiza o texto na tela
    titulo.innerText = "Interatividade Ativa!";
    mensagem.innerText = `Cor de fundo alterada com sucesso.`;
});