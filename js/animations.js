document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal-element");

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("active");
      }
    });
  }

  checkReveal();
  window.addEventListener("scroll", checkReveal);

  const statValues = document.querySelectorAll(".stat-value");

  function animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-count"));
    const suffix = element.getAttribute("data-suffix") || "";
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
      current += step;

      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = current + suffix;
      }
    }, 16);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statValues.forEach((value) => {
    counterObserver.observe(value);
  });

  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    setTimeout(() => {
      heroTitle.classList.add("active");
    }, 300);
  }

  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "var(--shadow-md)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  const partnerCardsHover = document.querySelectorAll(".partner-card");
  partnerCardsHover.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.boxShadow = "var(--shadow-md)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  const benefitCards = document.querySelectorAll(".benefit-card");
  benefitCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "var(--shadow-md)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) rotate(5deg)";
      this.style.backgroundColor = "var(--primary)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.backgroundColor = "";
    });
  });

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const line = document.createElement("span");
      line.classList.add("nav-line");
      this.appendChild(line);

      setTimeout(() => {
        line.style.width = "100%";
      }, 10);
    });

    link.addEventListener("mouseleave", function () {
      const line = this.querySelector(".nav-line");
      if (line) {
        line.style.width = "0";
        setTimeout(() => {
          line.remove();
        }, 300);
      }
    });
  });

  function initializePartnerCarousel() {
    if (window.partnerCarouselInitialized) return;

    console.log("Inicializando novo carrossel de parceiros");

    const partnersGrid = document.querySelector(".partners-grid");
    if (!partnersGrid) {
      console.error("Grid de parceiros não encontrado");
      return;
    }

    const existingNavs = document.querySelectorAll(".partners-nav");
    existingNavs.forEach((nav) => nav.remove());

    const navContainer = document.createElement("div");
    navContainer.id = "partners-nav-container";
    navContainer.classList.add("partners-nav");
    navContainer.style.display = "flex";
    navContainer.style.justifyContent = "center";
    navContainer.style.gap = "8px";
    navContainer.style.marginTop = "16px";

    partnersGrid.parentNode.insertBefore(navContainer, partnersGrid.nextSibling);

    const partnerCards = document.querySelectorAll(".partner-card");
    if (partnerCards.length === 0) {
      console.warn("Nenhum card de parceiro encontrado");
      return;
    }

    let currentIndex = 0;
    let autoScrollInterval;

    function getCardsPerView() {
      return window.innerWidth < 768 ? 1 : 3;
    }

    const totalPages = Math.ceil(partnerCards.length / getCardsPerView());
    console.log(`Criando ${totalPages} dots para o novo carrossel`);

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dot.classList.add("partners-nav-dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        goToPage(i);
        resetAutoScroll();
      });

      navContainer.appendChild(dot);
    }

    function goToPage(index) {
      if (partnerCards.length === 0) return;

      const cardsPerView = getCardsPerView();
      const cardWidth = partnerCards[0].offsetWidth;
      const gap = parseInt(getComputedStyle(partnersGrid).gap) || 16;
      const scrollPosition = index * (cardWidth + gap) * cardsPerView;

      partnersGrid.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      const dots = navContainer.querySelectorAll(".partners-nav-dot");
      dots.forEach((dot) => dot.classList.remove("active"));
      if (dots[index]) dots[index].classList.add("active");

      currentIndex = index;
    }

    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % totalPages;
        goToPage(nextIndex);
      }, 4000);
    }

    function resetAutoScroll() {
      clearInterval(autoScrollInterval);
      startAutoScroll();
    }

    function handleResize() {
      const newTotalPages = Math.ceil(partnerCards.length / getCardsPerView());

      if (newTotalPages !== totalPages) {
        navContainer.innerHTML = "";

        for (let i = 0; i < newTotalPages; i++) {
          const dot = document.createElement("span");
          dot.classList.add("partners-nav-dot");
          if (i === Math.min(currentIndex, newTotalPages - 1))
            dot.classList.add("active");

          dot.addEventListener("click", () => {
            goToPage(i);
            resetAutoScroll();
          });

          navContainer.appendChild(dot);
        }

        currentIndex = Math.min(currentIndex, newTotalPages - 1);
        goToPage(currentIndex);
      }
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 300);
    });

    startAutoScroll();

    window.partnerCarouselInitialized = true;
    console.log("Carrossel de parceiros inicializado com sucesso!");
  }

  setTimeout(initializePartnerCarousel, 500);
});