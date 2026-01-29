// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Ajuste para o menu fixo
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efeito de mudança no menu ao rolar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animação de elementos ao rolar
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elementos para animação
document.querySelectorAll('.step, .design-card, .depoimento, .momento-categoria').forEach(el => {
    observer.observe(el);
});








// scripts.js - Sistema de carregamento progressivo de designs

document.addEventListener('DOMContentLoaded', function() {
    const designsGrid = document.getElementById('designsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Array com todos os 30+ designs (adicione seus próprios dados aqui)
    const allDesigns = [
        // Primeiros 6 designs (aparecem inicialmente)
        { 
            name: "Design Clássico 1", 
            description: "Bordados tradicionais com flores e nomes dos noivos",
            image: "imagens/design-1.jpg"
        },
        { 
            name: "Design Moderno 1", 
            description: "Linhas limpas e elementos contemporâneos",
            image: "imagens/design-2.jpg"
        },
        { 
            name: "Design Personalizado 1", 
            description: "Criado exclusivamente para o seu casamento",
            image: "imagens/design-3.jpg"
        },
        { 
            name: "Design Rústico 1", 
            description: "Inspirado na natureza com elementos orgânicos",
            image: "imagens/design-4.jpg"
        },
        { 
            name: "Design Minimalista 1", 
            description: "Simples e elegante com foco na tipografia",
            image: "imagens/design-5.jpg"
        },
        { 
            name: "Design Luxuoso 1", 
            description: "Detalhes em dourado e pedrarias especiais",
            image: "imagens/design-6.jpg"
        },
        // Adicione mais 24 designs abaixo (você pode copiar e modificar)
        { name: "Design Clássico 2", description: "Tradicional com toque moderno", image: "imagens/design-1.jpg" },
        { name: "Design Moderno 2", description: "Contemporâneo e sofisticado", image: "imagens/design-2.jpg" },
        { name: "Design Personalizado 2", description: "Totalmente único para você", image: "imagens/design-3.jpg" },
        { name: "Design Rústico 2", description: "Conectado com a natureza", image: "imagens/design-4.jpg" },
        { name: "Design Minimalista 2", description: "Menos é mais", image: "imagens/design-5.jpg" },
        { name: "Design Luxuoso 2", description: "Brilho e elegância", image: "imagens/design-6.jpg" },
        { name: "Design Clássico 3", description: "Elegância atemporal", image: "imagens/design-1.jpg" },
        { name: "Design Moderno 3", description: "Inovador e atual", image: "imagens/design-2.jpg" },
        { name: "Design Personalizado 3", description: "Feito sob medida", image: "imagens/design-3.jpg" },
        { name: "Design Rústico 3", description: "Charme campestre", image: "imagens/design-4.jpg" },
        { name: "Design Minimalista 3", description: "Limpo e refinado", image: "imagens/design-5.jpg" },
        { name: "Design Luxuoso 3", description: "Suntuoso e exclusivo", image: "imagens/design-6.jpg" },
        { name: "Design Clássico 4", description: "Tradição e sofisticação", image: "imagens/design-1.jpg" },
        { name: "Design Moderno 4", description: "Design arrojado", image: "imagens/design-2.jpg" },
        { name: "Design Personalizado 4", description: "Sua história contada", image: "imagens/design-3.jpg" },
        { name: "Design Rústico 4", description: "Simples e acolhedor", image: "imagens/design-4.jpg" },
        { name: "Design Minimalista 4", description: "Essência pura", image: "imagens/design-5.jpg" },
        { name: "Design Luxuoso 4", description: "Máxima qualidade", image: "imagens/design-6.jpg" },
        { name: "Design Clássico 5", description: "Eterno e belo", image: "imagens/design-1.jpg" },
        { name: "Design Moderno 5", description: "Futurista e elegante", image: "imagens/design-2.jpg" },
        { name: "Design Personalizado 5", description: "Seu sonho realizado", image: "imagens/design-3.jpg" },
        { name: "Design Rústico 5", description: "Natural e autêntico", image: "imagens/design-4.jpg" },
        { name: "Design Minimalista 5", description: "Sofisticação discreta", image: "imagens/design-5.jpg" },
        { name: "Design Luxuoso 5", description: "Exclusivo e refinado", image: "imagens/design-6.jpg" }
    ];
    
    // Configuração
    const designsPerLoad = 6; // Quantos designs carregar por vez
    let loadedDesigns = 0;
    
    // Função para criar um card de design
    function createDesignCard(design, index) {
        const card = document.createElement('div');
        card.className = 'design-card';
        card.style.animationDelay = `${(index % 6) * 0.1}s`; // Animação em cascata
        
        card.innerHTML = `
            <div class="design-img">
                <img src="${design.image}" alt="${design.name}" loading="lazy">
            </div>
            <h3>${design.name}</h3>
            <p>${design.description}</p>
        `;
        
        return card;
    }
    
    // Função para carregar mais designs
    function loadMoreDesigns() {
        loadMoreBtn.classList.add('loading');
        loadMoreBtn.innerHTML = '<span>Carregando...</span>';
        
        // Simular um pequeno delay para mostrar o carregamento
        setTimeout(() => {
            // Calcular quantos designs mostrar
            const nextBatch = allDesigns.slice(loadedDesigns, loadedDesigns + designsPerLoad);
            
            // Adicionar cada design ao grid
            nextBatch.forEach((design, index) => {
                const card = createDesignCard(design, loadedDesigns + index);
                designsGrid.appendChild(card);
            });
            
            // Atualizar contador
            loadedDesigns += nextBatch.length;
            
            // Verificar se ainda tem mais designs para carregar
            if (loadedDesigns >= allDesigns.length) {
                loadMoreBtn.classList.add('hidden'); // Esconde o botão quando todos estiverem carregados
            }
            
            // Restaurar botão
            setTimeout(() => {
                loadMoreBtn.classList.remove('loading');
                loadMoreBtn.innerHTML = `
                    <span>Ver Mais Designs</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 9l-7 7-7-7"/>
                    </svg>
                `;
                
                // Rolagem suave para o último design carregado
                if (nextBatch.length > 0) {
                    const lastCard = designsGrid.lastElementChild;
                    lastCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 300);
            
        }, 600);
    }
    
    // Carregar os primeiros designs automaticamente
    function loadInitialDesigns() {
        const initialDesigns = allDesigns.slice(0, designsPerLoad);
        
        initialDesigns.forEach((design, index) => {
            const card = createDesignCard(design, index);
            designsGrid.appendChild(card);
        });
        
        loadedDesigns = initialDesigns.length;
        
        // Esconder botão se já carregou tudo
        if (loadedDesigns >= allDesigns.length) {
            loadMoreBtn.classList.add('hidden');
        }
    }
    
    // Configurar evento do botão
    loadMoreBtn.addEventListener('click', loadMoreDesigns);
    
    // Iniciar carregando os primeiros designs
    loadInitialDesigns();
});