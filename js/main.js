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

})
