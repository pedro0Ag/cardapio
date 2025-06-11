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

const searchInput = document.getElementById('search-input');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuCategories = document.querySelectorAll('.menu-category');
    const noResultsMessage = document.getElementById('no-results-message');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let itemsFound = 0;

        // 1. Filtra os itens individualmente
        menuItems.forEach(item => {
            const name = item.dataset.name.toLowerCase();
            const ingredients = item.dataset.ingredients.toLowerCase();
            const description = item.querySelector('.description').textContent.toLowerCase();
            
            const isVisible = name.includes(searchTerm) || 
                                ingredients.includes(searchTerm) || 
                                description.includes(searchTerm);
            
            if (isVisible) {
                item.style.display = 'flex'; // ou o display original do item
                itemsFound++;
            } else {
                item.style.display = 'none';
            }
        });

        // 2. Esconde os títulos das categorias que ficaram vazias
        menuCategories.forEach(category => {
            const visibleItemsInCategory = category.querySelectorAll('.menu-item[style*="display: flex"]');
            
            if (visibleItemsInCategory.length > 0) {
                category.style.display = 'block'; // Mostra a categoria
            } else {
                category.style.display = 'none'; // Esconde a categoria
            }
        });
        
        // 3. Mostra ou esconde a mensagem de "nenhum resultado"
        if (itemsFound === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }

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
// Respostas personalizadas para o cardápio de Dindins.
// ==========================================================
function getAIResponse(question) {
    // Alergia a glúten / trigo
    if (question.includes('glúten') || question.includes('trigo') || (question.includes('oreo') && question.includes('glúten'))) {
        return 'Ótima pergunta! A grande maioria dos nossos dindins não contém glúten. A única exceção é o sabor Oreo, pois o biscoito é feito com farinha de trigo. Os outros sabores são seguros para quem tem restrição ao glúten.';
    }

    // Alergia a lactose / leite
    if (question.includes('leite') || question.includes('lactose') || question.includes('derivados')) {
        return 'Sim, a maioria dos nossos dindins cremosos (como Ninho com Nutella, Oreo, Paçoca, Coco e Mousse de Maracujá) são feitos com leite e/ou leite condensado, portanto contêm lactose. No momento não temos opções à base de água, mas estamos planejando lançar em breve!';
    }
    
    // Sobre o Ninho com Nutella
    if (question.includes('ninho') || question.includes('nutella')) {
        return 'O nosso Dindin de Ninho com Nutella é o campeão de vendas! Usamos Leite Ninho original, leite condensado e recheamos com a autêntica Nutella. É pura cremosidade!';
    }

    // Sobre o amendoim / paçoca
    if (question.includes('amendoim') || question.includes('paçoca')) {
        return 'Sim, nosso dindin de Paçoca contém amendoim em sua composição. Se você tem alergia a amendoim, recomendamos evitar este sabor.';
    }

    // Opções de fruta
    if (question.includes('fruta')) {
        return 'Nosso sabor Mousse de Maracujá é feito com a polpa natural da fruta, trazendo aquele equilíbrio perfeito entre o doce e o azedinho. É uma ótima pedida refrescante!';
    }

    // Sobre as encomendas / kits
    if (question.includes('kit') || question.includes('encomenda') || question.includes('festa')) {
        return 'Temos kits especiais para sua festa ou evento! O Kit Festa vem com 10 dindins por R$ 45,00 e o Kit Família com 20 dindins por R$ 85,00. Você pode escolher os sabores que preferir (sujeito à disponibilidade). Recomendamos encomendar com antecedência!';
    }
    
    // Horário de funcionamento
    if (question.includes('horário') || question.includes('aberto') || question.includes('fecha')) {
        return 'Funcionamos de terça a domingo, das 18h às 23h.';
    }

    if (question.includes('senha')|| question.includes('wi-fi')) {
        return 'A senha do wi-fi e visitantes e : dindinjao10';
    }

    if (question.includes('trufa')) {
        return 'Nossa trufa e recheada com chocolate ao lite ';
    }
    
    // Pergunta genérica sobre alergia
    if (question.includes('alergia') || question.includes('alérgico')) {
        return 'Para sua segurança, por favor, me diga qual é a sua alergia para que eu possa ajudar. Nossos principais alérgenos são: LACTOSE (na maioria dos sabores), GLÚTEN (no sabor Oreo) e AMENDOIM (no sabor Paçoca).';
    }

    // Se não entender a pergunta
    return 'Desculpe, não entendi sua pergunta. Sou um assistente virtual e posso responder sobre nossos sabores de dindin, ingredientes, preços, kits e alergias. Como posso te ajudar?';
}