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
let autoPlayInterval;
const totalSlides = 3;

function updateCarousel() {
    const wrapper = document.getElementById('docsWrapper');
    if (wrapper && window.innerWidth <= 768) {
        const slideWidth = wrapper.clientWidth;
        wrapper.scrollTo({
            left: currentSlide * slideWidth,
            behavior: 'smooth'
        });
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
        currentSlide = 0;
    }
    updateCarousel();
    resetAutoPlay();
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = totalSlides - 1;
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
    if (window.innerWidth <= 768) {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
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

// Detectar quando o scroll do wrapper termina (para sincronizar os dots)
function setupScrollListener() {
    const wrapper = document.getElementById('docsWrapper');
    if (wrapper) {
        wrapper.addEventListener('scroll', () => {
            if (window.innerWidth <= 768) {
                const scrollPosition = wrapper.scrollLeft;
                const slideWidth = wrapper.clientWidth;
                const newSlide = Math.round(scrollPosition / slideWidth);
                if (newSlide !== currentSlide && newSlide >= 0 && newSlide < totalSlides) {
                    currentSlide = newSlide;
                    const dots = document.querySelectorAll('.dot');
                    dots.forEach((dot, index) => {
                        if (index === currentSlide) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                    resetAutoPlay();
                }
            }
        });
    }
}

// Reiniciar carrossel quando redimensionar a tela
function handleResize() {
    if (window.innerWidth <= 768) {
        createDots();
        currentSlide = 0;
        updateCarousel();
        if (!autoPlayInterval) {
            startAutoPlay();
        }
    } else {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
}

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

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createDots();
    setupScrollListener();
    handleResize();
    window.addEventListener('resize', handleResize);
});

console.log("Website Wimbe Traduções Lda carregado.");