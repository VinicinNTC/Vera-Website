// Efeito de rolagem do cabeçalho
const cabecalho = document.getElementById('cabecalho');
window.addEventListener('scroll', () => {
   if (window.scrollY > 100) {
      cabecalho.classList.add('scrolled');
   } else {
      cabecalho.classList.remove('scrolled');
   }
});

// Navegação Mobile
const menuAbrir = document.getElementById('menuAbrir');
const navMobile = document.getElementById('navMobile');
const barraMobile = document.getElementById('sobreposicaoMobile');
const navMobileFechar = document.getElementById('navMobileFechar');
const navMobileLinks = document.querySelectorAll('.nav-mobile-links a');

function abrirNavMobile() {
   navMobile.classList.add('active');
   barraMobile.classList.add('active');
   document.body.style.overflow = 'hidden';
}

function fecharNavMobile() {
   navMobile.classList.remove('active');
   barraMobile.classList.remove('active');
   document.body.style.overflow = '';
}

menuAbrir.addEventListener('click', abrirNavMobile);
navMobileFechar.addEventListener('click', fecharNavMobile);
barraMobile.addEventListener('click', fecharNavMobile);

navMobileLinks.forEach(link => {
   link.addEventListener('click', fecharNavMobile);
});

// Rolagem suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href === '#') {
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         });
         return;
      }
      const alvo = document.querySelector(href);
      if (alvo) {
         const alturaCabecalho = cabecalho.offsetHeight;
         const posicaoAlvo = alvo.offsetTop - alturaCabecalho;
         window.scrollTo({
            top: posicaoAlvo,
            behavior: 'smooth'
         });
      }
   });
});

// Apresentação de slides da imagem principal
const slides = document.querySelectorAll('.slide-principal');
const tituloPrincipal = document.getElementById('tituloPrincipal');
const precoPrincipal = document.getElementById('precoPrincipal');
let slideAtual = 0;

function trocarSlide() {
   slides[slideAtual].classList.remove('active');
   slideAtual = (slideAtual + 1) % slides.length;

   // Efeito de fade no texto
   tituloPrincipal.style.opacity = '0';
   precoPrincipal.style.opacity = '0';

   setTimeout(() => {
      tituloPrincipal.textContent = slides[slideAtual].dataset.titulo;
      precoPrincipal.textContent = slides[slideAtual].dataset.preco;
      tituloPrincipal.style.opacity = '1';
      precoPrincipal.style.opacity = '1';
   }, 500);

   slides[slideAtual].classList.add('active');
}

setInterval(trocarSlide, 4000);

// Envio do formulário
const formAgendamento = document.getElementById('formAgendamento');
formAgendamento.addEventListener('submit', function (e) {
   e.preventDefault();
   alert('Thank you for your inquiry! We will contact you within 24 hours to confirm your appointment.');
   formAgendamento.reset();
});

// Observador de interseção para animações ao rolar
const opcoesObservador = {
   threshold: 0.1,
   rootMargin: '0px 0px -50px 0px'
};

const observador = new IntersectionObserver((entradas) => {
   entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
         entrada.target.style.opacity = '1';
         entrada.target.style.transform = 'translateY(0)';
      }
   });
}, opcoesObservador);

// Adiciona animação de fade-in às seções (exceto a principal)
document.querySelectorAll('section:not(.principal)').forEach(secao => {
   secao.style.opacity = '0';
   secao.style.transform = 'translateY(30px)';
   secao.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
   observador.observe(secao);
});