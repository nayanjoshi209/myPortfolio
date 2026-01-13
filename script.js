// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    enableLightTheme();
  } else {
    enableDarkTheme();
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    if (body.classList.contains('light-theme')) {
      enableDarkTheme();
    } else {
      enableLightTheme();
    }
  });
  
  // Theme functions
  function enableLightTheme() {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    localStorage.setItem('portfolio-theme', 'light');
  }
  
  function enableDarkTheme() {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    localStorage.setItem('portfolio-theme', 'dark');
  }
  
  // Show home section immediately
  const homeSection = document.getElementById('home');
  if (homeSection) {
    homeSection.classList.add('show');
  }
  
  // Scroll reveal animation for other sections
  const revealElements = document.querySelectorAll('.reveal:not(#home)');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100; // Lower value = reveals earlier
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('show');
      }
    });
  }
  
  // Check immediately on load and on scroll
  checkReveal();
  window.addEventListener('scroll', checkReveal);
  
  // Active navigation
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
  
  // Smooth scrolling for navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });
});