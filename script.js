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

// ========== CARROSSEL MOBILE ==========
let currentSlide = 0;
const totalSlides = 3;
let autoPlayInterval;

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    if (track) {
        const slideWidth = track.clientWidth / totalSlides;
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
    
    // Atualizar dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
    } else {
        currentSlide = 0; // Volta ao primeiro (loop)
    }
    updateCarousel();
    resetAutoPlay();
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = totalSlides - 1; // Vai para o último (loop)
    }
    updateCarousel();
    resetAutoPlay();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoPlay();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Muda a cada 5 segundos
}

function resetAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
}

function createDots() {
    const dotsContainer = document.getElementById('carouselDots');
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentSlide) dot.classList.add('active');
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        }
    }
}

// Inicializar carrossel quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    createDots();
    updateCarousel();
    startAutoPlay();
    
    // Ajustar carrossel quando a janela for redimensionada
    window.addEventListener('resize', () => {
        updateCarousel();
    });
});

// Menu Mobile
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.style.display = 'none';
}

// Fechar menu ao clicar fora
document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (menu && menuBtn && menu.style.display === 'flex') {
        if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
            menu.style.display = 'none';
        }
    }
});

console.log("Website Wimbe Traduções Lda carregado.");