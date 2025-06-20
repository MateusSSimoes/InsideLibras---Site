/*SLIDER*/
window.onload = function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  document.querySelector(".next").addEventListener("click", nextSlide);
  document.querySelector(".prev").addEventListener("click", prevSlide);

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      showSlide(parseInt(dot.dataset.index));
    });
  });

  setInterval(nextSlide, 5000);

  showSlide(currentSlide);
};  

// MENU HAMBÚRGUER
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  nav.classList.toggle('active');
  menuToggle.classList.toggle('active'); // ADICIONA ESSA LINHA para animar o botão
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.classList.remove('active'); // garante que o botão volte ao estado normal
  });
});

document.addEventListener('click', () => {
  if (nav.classList.contains('active')) {
    nav.classList.remove('active');
    menuToggle.classList.remove('active'); // garante que o botão volte ao estado normal
  }
});




// ------------------- DARK MODE -------------------
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;

  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
});

/* SERVIÇOS */
const observarSecoes = document.querySelectorAll('.servico-detalhado');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

observarSecoes.forEach(secao => observer.observe(secao));

/* Jornada */
function revealTimelineItems() {
  const items = document.querySelectorAll('.timeline-item');
  const windowHeight = window.innerHeight;

  items.forEach(item => {
    const elementTop = item.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealTimelineItems);
window.addEventListener('load', revealTimelineItems);

/* Scroll Reveal */
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* FORMULÁRIO DE CONTATO */
const form = document.querySelector('.form-contato');
const resposta = document.getElementById('resposta-form');
const submitBtn = form.querySelector('.botao[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  const dados = {
    name: form.nome.value.trim(),
    email: form.email.value.trim(),
    subject: form.assunto.value,
    message: form.mensagem.value.trim(),
    novidades: form.novidades.checked,
  };

  try {
    const res = await fetch('https://backend-insidelibras.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    const resultado = await res.json();

    if (resultado.success) {
      resposta.textContent = '✅ Sua mensagem foi enviada com sucesso!';
      resposta.style.color = 'green';
      form.reset();
    } else {
      resposta.textContent = '⚠️ Erro ao enviar. Tente novamente.';
      resposta.style.color = 'red';
    }

  } catch (erro) {
    console.error('Erro ao conectar:', erro);
    resposta.textContent = '❌ Erro de conexão com o servidor.';
    resposta.style.color = 'red';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar mensagem';
  }
});




/* VLIBRAS */
new window.VLibras.Widget('https://vlibras.gov.br/app');
