document.addEventListener("DOMContentLoaded", () => {
  // Reveal Elements on Scroll
  const revealElements = document.querySelectorAll(".reveal-element")

  function checkReveal() {
    const windowHeight = window.innerHeight
    const revealPoint = 150

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("active")
      }
    })
  }

  // Check on initial load
  checkReveal()

  // Check on scroll
  window.addEventListener("scroll", checkReveal)

  // Animated Counter
  const statValues = document.querySelectorAll(".stat-value")

  function animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-count"))
    const suffix = element.getAttribute("data-suffix") || ""
    const duration = 2000
    const step = Math.ceil(target / (duration / 16)) // 60fps
    let current = 0

    const timer = setInterval(() => {
      current += step

      if (current >= target) {
        element.textContent = target + suffix
        clearInterval(timer)
      } else {
        element.textContent = current + suffix
      }
    }, 16)
  }

  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statValues.forEach((value) => {
    counterObserver.observe(value)
  })

  // Hero Text Animation
  const heroTitle = document.querySelector(".hero-title")

  if (heroTitle) {
    setTimeout(() => {
      heroTitle.classList.add("active")
    }, 300)
  }

  // Feature Cards Hover Effect
  const featureCards = document.querySelectorAll(".feature-card")

  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
      this.style.boxShadow = "var(--shadow-md)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = ""
    })
  })

  // Partner Cards Hover Effect
  const partnerCards = document.querySelectorAll(".partner-card")

  partnerCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)"
      this.style.boxShadow = "var(--shadow-md)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = ""
    })
  })

  // Benefit Cards Hover Effect
  const benefitCards = document.querySelectorAll(".benefit-card")

  benefitCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
      this.style.boxShadow = "var(--shadow-md)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = ""
    })
  })

  // Button Hover Effects
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })

  // Social Links Animation
  const socialLinks = document.querySelectorAll(".social-link")

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) rotate(5deg)"
      this.style.backgroundColor = "var(--primary)"
    })

    link.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.backgroundColor = ""
    })
  })

  // Nav Links Hover Effect
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const line = document.createElement("span")
      line.classList.add("nav-line")
      this.appendChild(line)

      setTimeout(() => {
        line.style.width = "100%"
      }, 10)
    })

    link.addEventListener("mouseleave", function () {
      const line = this.querySelector(".nav-line")
      if (line) {
        line.style.width = "0"
        setTimeout(() => {
          line.remove()
        }, 300)
      }
    })
  })
})
