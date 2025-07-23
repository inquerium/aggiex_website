document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar")
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
        // Close mobile menu if open
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      }
    })
  })

  // Testimonials slider
  const testimonialsTrack = document.getElementById("testimonials-track")
  const testimonialPrev = document.getElementById("testimonial-prev")
  const testimonialNext = document.getElementById("testimonial-next")
  const testimonialDots = document.querySelectorAll(".testimonial-dot")

  let currentSlide = 0
  const totalSlides = testimonialDots.length

  function updateSlider() {
    const translateX = -currentSlide * 100
    testimonialsTrack.style.transform = `translateX(${translateX}%)`

    // Update dots
    testimonialDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide)
    })
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides
    updateSlider()
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
    updateSlider()
  }

  testimonialNext.addEventListener("click", nextSlide)
  testimonialPrev.addEventListener("click", prevSlide)

  // Dot navigation
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index
      updateSlider()
    })
  })

  // Auto-play testimonials
  setInterval(nextSlide, 5000)

  // Contact form handling
  const contactForm = document.getElementById("contact-form")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent

    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    setTimeout(() => {
      submitButton.textContent = "Message Sent!"
      submitButton.style.background = "var(--secondary)"

      setTimeout(() => {
        submitButton.textContent = originalText
        submitButton.disabled = false
        submitButton.style.background = ""
        contactForm.reset()
      }, 2000)
    }, 1000)
  })

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document
    .querySelectorAll(".service-card, .team-member, .advisor-card, .testimonial-card, .story-chapter")
    .forEach((el) => {
      el.classList.add("animate-on-scroll")
      observer.observe(el)
    })

  // Story timeline animation
  const storyChapters = document.querySelectorAll(".story-chapter")
  const storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"
        }
      })
    },
    { threshold: 0.3 },
  )

  storyChapters.forEach((chapter) => {
    storyObserver.observe(chapter)
  })

  // Parallax effect for floating elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-element")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Animate hero elements
    const heroElements = document.querySelectorAll(
      ".hero-badge, .hero-title, .hero-description, .hero-buttons, .hero-social-proof",
    )
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 200)
    })
  })

  // Add hover effects for service cards
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add typing effect for hero title
  function typeWriter(element, text, speed = 100) {
    let i = 0
    element.innerHTML = ""

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }

    type()
  }

  // Initialize typing effect after page load
  setTimeout(() => {
    const heroTitle = document.querySelector(".hero-title")
    if (heroTitle) {
      const originalText = heroTitle.textContent
      typeWriter(heroTitle, originalText, 50)
    }
  }, 1000)
})

// Add CSS for loading states
const style = document.createElement("style")
style.textContent = `
    body:not(.loaded) .hero-badge,
    body:not(.loaded) .hero-title,
    body:not(.loaded) .hero-description,
    body:not(.loaded) .hero-buttons,
    body:not(.loaded) .hero-social-proof {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease-out;
    }
    
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: var(--spacing-lg);
        box-shadow: var(--shadow-lg);
        border-top: 1px solid var(--border);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`
document.head.appendChild(style)
