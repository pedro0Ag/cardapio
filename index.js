document.addEventListener('DOMContentLoaded', () => {
    // Pega todos os elementos necessários
    const modal = document.getElementById('modal');
    const modalName = document.getElementById('modal-name');
    const modalImg = document.getElementById('modal-img');
    const modalIngredients = document.getElementById('modal-ingredients');
    const closeButton = document.querySelector('.close-button');
    const menuItems = document.querySelectorAll('.menu-item');

    // Adiciona um evento de clique a cada item do cardápio
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Pega os dados do item clicado
            const name = item.dataset.name;
            const ingredients = item.dataset.ingredients;
            const imgSrc = item.querySelector('img').src;

            // Preenche o modal com os dados
            modalName.textContent = name;
            modalIngredients.textContent = ingredients;
            modalImg.src = imgSrc;
            
            // Mostra o modal
            modal.style.display = 'block';
        });
    });

    // Função para fechar o modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Fecha o modal ao clicar no 'X'
    closeButton.addEventListener('click', closeModal);

    // Fecha o modal ao clicar fora da caixa de conteúdo
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});

/* ======================================= */
/* LÓGICA DO CHAT DE INTELIGÊNCIA ARTIFICIAL */
/* ======================================= */

// Elementos do Chat
const chatButton = document.getElementById('chat-button');
const chatContainer = document.getElementById('chat-container');
const closeChat = document.getElementById('close-chat');
const sendButton = document.getElementById('send-button');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

// Abrir e fechar o chat
chatButton.addEventListener('click', () => {
    chatContainer.classList.toggle('hidden');
});

closeChat.addEventListener('click', () => {
    chatContainer.classList.add('hidden');
});

// Enviar mensagem
sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const question = chatInput.value.trim().toLowerCase();
    if (question === '') return;

    // Adiciona a mensagem do usuário na tela
    addMessage(question, 'user');

    // Limpa o input
    chatInput.value = '';

    // Gera e exibe a resposta do bot
    setTimeout(() => {
        const response = getAIResponse(question);
        addMessage(response, 'bot');
    }, 800); // Pequeno delay para simular "pensamento"
}

function addMessage(text, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', type);
    messageElement.textContent = text;
    chatMessages.appendChild(messageElement);
    // Rola para a mensagem mais recente
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ==========================================================
// AQUI FICA A "INTELIGÊNCIA" DO NOSSO BOT.
// Personalize as respostas aqui!
// ==========================================================
function getAIResponse(question) {
    // Alergia a glúten / ingredientes do pão
    if (question.includes('pão') || question.includes('glúten') || question.includes('trigo')) {
        return 'Nosso pão brioche contém farinha de trigo (glúten), ovos e leite. Se você tem alergia a glúten, infelizmente nossos lanches atuais não são recomendados.';
    }

    // Alergia a lactose / queijo / leite
    if (question.includes('queijo') || question.includes('leite') || question.includes('lactose')) {
        return 'Sim, nossos queijos (cheddar e mussarela) são feitos de leite de vaca e contêm lactose. O pão brioche também contém leite.';
    }

    // Sobre o bacon
    if (question.includes('bacon')) {
        return 'Nosso bacon é de origem suína, preparado na chapa para ficar bem crocante!';
    }

    // Sobre o ovo
    if (question.includes('ovos')) {
        return 'nenhum ingrediente que vai no hamburguer contem ovos, a não ser os hambugueres que tem ovo dentre seus ingregientes';
    }
    
    // Opções vegetarianas/veganas
    if (question.includes('vegano') || question.includes('vegetariano')) {
        return 'No momento, estamos desenvolvendo opções vegetarianas. Por enquanto, todos os nossos hambúrgueres são de carne bovina. A porção de batata frita sem bacon é uma ótima opção vegetariana!';
    }
    
    // Horário de funcionamento
    if (question.includes('horário') || question.includes('aberto') || question.includes('fecha')) {
        return 'Funcionamos de terça a domingo, das 18h às 23h.';
    }
    
    // Pergunta genérica sobre alergia
    if (question.includes('alergia') || question.includes('alérgico')) {
        return 'Por favor, me diga qual é a sua alergia para que eu possa verificar nos nossos ingredientes. Os alérgenos mais comuns em nossa cozinha são: glúten, leite, ovos e soja.';
    }

    // Se não entender a pergunta
    return 'Desculpe, não entendi sua pergunta. Você pode tentar perguntar de outra forma? Sou especialista em ingredientes e alergias.';
}
