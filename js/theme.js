// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
  
    // Verificar se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  
    // Função para alternar o tema
    function toggleTheme() {
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      }
    }
    themeToggle.addEventListener("click", toggleTheme);
    const partnersGrid = document.querySelector('.partners-grid');
    
    if (partnersGrid && window.innerWidth <= 767) {
      const partnerCards = partnersGrid.querySelectorAll('.partner-card');
      const partnersSection = document.querySelector('.partners .container');
      
      // Criar indicadores de navegação
      const partnersNav = document.createElement('div');
      partnersNav.className = 'partners-nav';
      
      partnerCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'partners-nav-dot';
        if (index === 0) dot.classList.add('active');
        partnersNav.appendChild(dot);
      });
      
      partnersSection.appendChild(partnersNav);
      
      // Atualizar indicadores ao rolar
      const dots = partnersNav.querySelectorAll('.partners-nav-dot');
      
      partnersGrid.addEventListener('scroll', () => {
        const scrollPosition = partnersGrid.scrollLeft;
        const cardWidth = partnerCards[0].offsetWidth;
        const activeIndex = Math.round(scrollPosition / cardWidth);
        
        dots.forEach((dot, index) => {
          if (index === activeIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      });
    }
  });
  