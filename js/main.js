// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")
  const menuClose = document.querySelector(".mobile-menu-close")
  const body = document.body

  menuToggle.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active")
      body.style.overflow = ""
      return
    }
    mobileMenu.classList.add("active")
    body.style.overflow = "hidden"
  })

  // Adiciona event listener para o botão de fechar
  if (menuClose) {
    menuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      body.style.overflow = ""
    })
  }

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !mobileMenu.contains(event.target) &&
      !menuToggle.contains(event.target) &&
      mobileMenu.classList.contains("active")
    ) {
      mobileMenu.classList.remove("active")
      body.style.overflow = ""
    }
  })

  // Sticky Header
  const header = document.querySelector(".site-header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 10) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    lastScrollTop = scrollTop
  })

  // Scroll to Top Button
  const scrollToTopBtn = document.querySelector(".scroll-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      scrollToTopBtn.classList.add("visible")
    } else {
      scrollToTopBtn.classList.remove("visible")
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Função para enviar mensagem pelo WhatsApp
  function sendWhatsApp(event) {
    event.preventDefault();

    // Obter os valores do formulário
    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;

    // Número de telefone (use o número da Assistec)
    const telefone = "5533988488458"; // Substitua pelo número correto com código do país

    // Criar a mensagem formatada
    let mensagemFormatada = `Contato via Site Assistec cliente Nome: *${nome}*Mensagem: ${mensagem}
`;

    // Codificar a mensagem para URL
    mensagemFormatada = encodeURIComponent(mensagemFormatada);

    // Criar o link do WhatsApp
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${telefone}&text=${mensagemFormatada}`;

    // Abrir o WhatsApp em uma nova janela
    window.open(linkWhatsApp, '_blank');

    // Limpar o formulário
    document.getElementById('whatsappForm').reset();
  }

  // Adicionar o event listener ao formulário
  const whatsappForm = document.getElementById('whatsappForm');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', sendWhatsApp);
  }
})
