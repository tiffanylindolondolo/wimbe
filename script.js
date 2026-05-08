// Rolagem Suave
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Função para Pedido de Cotação
function pedirCotacao(via) {
    const meuNumero = "258XXXXXXXXX"; // Substitua pelo seu número
    const email = "comercial@wimbetraducoes.co.mz";
    
    if (via === 'WhatsApp') {
        const texto = encodeURIComponent("Olá! Gostaria de pedir uma cotação para a tradução de um documento. Como posso enviar o arquivo?");
        window.open(`https://wa.me/${meuNumero}?text=${texto}`, '_blank');
    } else {
        const assunto = encodeURIComponent("Pedido de Cotação de Tradução - Wimbe Traduções");
        const corpo = encodeURIComponent("Olá, gostaria de solicitar um orçamento para tradução. Segue em anexo o documento.");
        window.location.href = `mailto:${email}?subject=${assunto}&body=${corpo}`;
    }
}

console.log("Website Wimbe Traduções Lda carregado.");