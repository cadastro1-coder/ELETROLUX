// --- SPLASH ---
window.addEventListener('load', () => {
    // Carrega as imagens nos IDs corretos assim que o site abre
    const imgQ = document.getElementById('bg-quarto');
    const imgB = document.getElementById('bg-banheiro');
    if(imgQ) imgQ.src = dadosQuarto.imagem;
    if(imgB) imgB.src = dadosBanheiro.imagem;

    // [CORREÇÃO]: Removemos o setTimeout. O CSS já carrega o splash visível.
    // [AJUSTE]: Centraliza o scroll mobile no carregamento
    centerScroll();

    // Garante o clique no botão
    const btnSplash = document.querySelector('.btn-splash');
    if(btnSplash) btnSplash.addEventListener('click', fecharSplash);
});

function fecharSplash() {
    const splash = document.getElementById('splash-inicial');
    // [CORREÇÃO]: Agora adicionamos a classe 'escondido' para sumir com o splash
    if(splash) splash.classList.add('escondido');
    
    // Remove trava de scroll se houver
    document.body.classList.remove('modal-open');
}

// --- DADOS ---
const dadosQuarto = {
    // [IMPORTANTE]: Coloque aqui sua imagem 4K | BOTÕES +
    imagem: "https://i.ibb.co/Z7bSNtr/Gemini-Generated-Image-xzfofkxzfofkxzfo.png",
    produtos: [
        { titulo: "Lençol mil fios", desc: "Conforto e sofisticação.", link: "https://bfcasa.com.br", imgUrl: "https://images.unsplash.com/photo-1579656381226-5fcbb456046e?q=80&w=800", top: "73%", left: "18%" },
        { titulo: "Colcha Dobrada", desc: "Volume para o pé da cama.", link: "https://bfcasa.com.br", imgUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800", top: "63%", left: "33%" },
        { titulo: "Fronhas de Cetim", desc: "Toque macio.", link: "https://bfcasa.com.br", imgUrl: "https://images.unsplash.com/photo-1631679706909-1e4404322971?q=80&w=800", top: "60%", left: "21%" },
        { titulo: "Tapete rustico", desc: "Acabamento exclusivo.", link: "https://bfcasa.com.br", imgUrl: "https://images.unsplash.com/photo-1631679706909-1e4404322971?q=80&w=800", top: "80%", left: "55%" }
    ]
};

const dadosBanheiro = {
    imagem: "https://i.ibb.co/gLQbsxWD/Gemini-Generated-Image-epzrjkepzrjkepzr.png", 
    produtos: [
        { titulo: "Toalha de Banho", desc: "Algodão egípcio.", link: "https://bfcasa.com.br", imgUrl: "https://images.unsplash.com/photo-1616627561950-9f746e33018e?q=80&w=800", top: "50%", left: "30%" },
        { titulo: "Kit Saboneteira", desc: "Design moderno.", link: "https://bfcasa.com.br", imgUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800", top: "60%", left: "70%" }
    ]
};

const wrapper = document.getElementById('elemento-que-gira');
const container = document.getElementById('palco-3d');
const modalOverlay = document.getElementById('modal-principal');
let comodoAtual = 'quarto';

// --- INICIALIZAÇÃO ---
mudarComodo('quarto', true);

function mudarComodo(novoComodo, isInitial = false) {
    if (!isInitial && comodoAtual === novoComodo) return; 
    comodoAtual = novoComodo;
    const dados = (novoComodo === 'quarto') ? dadosQuarto : dadosBanheiro;

    // Atualiza Menu
    document.getElementById('btn-quarto').classList.toggle('ativo', novoComodo === 'quarto');
    document.getElementById('btn-banheiro').classList.toggle('ativo', novoComodo === 'banheiro');

    // Troca de Imagem via CLASSE (Instantâneo)
    const imgQ = document.getElementById('bg-quarto');
    const imgB = document.getElementById('bg-banheiro');

    if (novoComodo === 'quarto') {
        imgQ.classList.add('ativo');
        imgB.classList.remove('ativo');
    } else {
        imgB.classList.add('ativo');
        imgQ.classList.remove('ativo');
    }

    // Recria os botões
    document.querySelectorAll('.hotspot').forEach(b => b.remove());
    renderizarBolinhas(dados.produtos);
}

// --- RESTO DO CÓDIGO (BOTÕES, MODAL, 3D) ---
function renderizarBolinhas(listaProdutos) {
    listaProdutos.forEach(prod => {
        const btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'hotspot';
        btn.style.top = prod.top; btn.style.left = prod.left;
        
        // Adiciona ícone
        const icon = document.createElement('div'); icon.className = 'hotspot-icon'; btn.appendChild(icon);
        
        btn.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); abrirModal(prod); });
        wrapper.appendChild(btn);
    });
}

const mImg = document.getElementById('modal-img-alvo');
const mTitulo = document.getElementById('modal-titulo');
const mDesc = document.getElementById('modal-desc');
const mLink = document.getElementById('modal-link');

function abrirModal(produto) { 
    mImg.src = produto.imgUrl; mTitulo.textContent = produto.titulo; mDesc.textContent = produto.desc; mLink.href = produto.link; 
    modalOverlay.classList.add('active');
    document.body.classList.add('modal-open'); 
    wrapper.classList.add('blur-active');
}

function fecharModal() { 
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    wrapper.classList.remove('blur-active');
}

function isTouchDevice() { return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0)); }

if (!isTouchDevice() && window.innerWidth > 768) {
    const intensity = 2; 
    container.addEventListener('mousemove', (e) => {
        if (modalOverlay.classList.contains('active')) return;
        requestAnimationFrame(() => {
            const w = window.innerWidth; const h = window.innerHeight;
            const rotateX = ((e.clientY - h/2) / (h/2)) * intensity * -1;
            const rotateY = ((e.clientX - w/2) / (w/2)) * intensity;
            wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    container.addEventListener('mouseleave', () => { wrapper.style.transform = `rotateX(0deg) rotateY(0deg)`; });
}

function centerScroll() {
    if (window.innerWidth <= 768) {
        const centerPosition = (wrapper.offsetWidth - window.innerWidth) / 2;
        container.scrollLeft = centerPosition;
    }
}

// Ajustes de evento
window.addEventListener('load', centerScroll);
window.addEventListener('orientationchange', () => { setTimeout(centerScroll, 100); });