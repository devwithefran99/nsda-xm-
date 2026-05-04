// Navbar scroll shadow effect
const navbar = document.getElementById('main-navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('#main-navbar .nav-link');

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(function (section) {
  sectionObserver.observe(section);
});

// Appointment button click feedback
const submitBtn = document.getElementById('contact-submit-btn');
if (submitBtn) {
  submitBtn.addEventListener('click', function () {
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Request Sent!';
    submitBtn.style.backgroundColor = '#064e4e';
    setTimeout(function () {
      submitBtn.textContent = originalText;
      submitBtn.style.backgroundColor = '';
    }, 2500);
  });
}

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll(
  '.mv-card, .service-card, .feedback-card, #about-img-wrapper, #about-badge'
);

const fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.style.transform.replace('translateY(20px)', 'translateY(0)');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeElements.forEach(function (el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  fadeObserver.observe(el);
});

// Simple JS to log when sections are in view (Future-ready for animations)
window.onscroll = function() {
    let sections = ['personal-info-section', 'education-section', 'experience-section'];
    
    sections.forEach(function(id) {
        let element = document.getElementById(id);
        let position = element.getBoundingClientRect();

        // Agar section screen e thake, tahole console e bolbe (testing)
        if(position.top < window.innerHeight && position.bottom >= 0) {
            console.log(id + " is now visible!");
            // Ekhane animation class add kora jay
        }
    });
};

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Elements
    const name = document.getElementById('userName');
    const email = document.getElementById('userEmail');
    const message = document.getElementById('userMessage');
    const successMsg = document.getElementById('success-msg');

    // Simple Flag
    let isValid = true;

  

    // Email Validation (Basic Regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        document.getElementById('emailError').classList.remove('d-none');
        isValid = false;
    } else {
        document.getElementById('emailError').classList.add('d-none');
    }

    // Message Validation
    if (message.value.trim() === "") {
        document.getElementById('messageError').classList.remove('d-none');
        isValid = false;
    } else {
        document.getElementById('messageError').classList.add('d-none');
    }

    // Success Action
    if (isValid) {
        successMsg.classList.remove('d-none');
        this.reset(); // Form clear hobe
        console.log("Form Submitted Successfully!");
        
        // Message auto-hide hobe 3 second por
        setTimeout(() => {
            successMsg.classList.add('d-none');
        }, 3000);
    }
});