'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


/*-----------------------------------*\
  #CINEMATIC ENHANCEMENTS
  Preloader, gold-dust particles, cursor glow,
  scroll reveal, skill-bar fill, card tilt.
  Purely additive — does not touch existing logic above.
\*-----------------------------------*/

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- preloader ---------- */
  const preloader = document.getElementById('site-preloader');
  const finishPreload = function () {
    if (!preloader) return;
    preloader.classList.add('loaded');
    setTimeout(function () { preloader.remove(); }, 800);
  };
  if (document.readyState === 'complete') {
    setTimeout(finishPreload, 400);
  } else {
    window.addEventListener('load', function () { setTimeout(finishPreload, 400); });
    // fail-safe in case load event is delayed by large media
    setTimeout(finishPreload, 2500);
  }

  /* ---------- gold-dust particle canvas ---------- */
  const canvas = document.getElementById('particles-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let width, height, particles;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = function () {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const initParticles = function () {
      const count = Math.min(90, Math.floor((width * height) / 22000));
      particles = new Array(count).fill(0).map(function () {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.6 + 0.4,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          a: Math.random() * 0.5 + 0.15
        };
      });
    };

    const draw = function () {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(45, 100%, 72%,' + p.a + ')';
        ctx.fill();
      }
      if (!reduceMotion) requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();
    window.addEventListener('resize', function () { resize(); initParticles(); });
  }

  /* ---------- cursor spotlight glow (desktop only) ---------- */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      cursorGlow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      cursorGlow.classList.add('active');
    });
    document.addEventListener('mouseleave', function () { cursorGlow.classList.remove('active'); });
  }

  /* ---------- scroll reveal ---------- */
  const revealSelectors = [
    '.about-text p',
    '.service-item',
    '.timeline-item',
    '.skills-item',
    '.gallery-post-item',
    '.content-card'
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(','));
  revealEls.forEach(function (el) { el.classList.add('reveal-up'); });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });

    /* ---------- animate skill bars once visible ---------- */
    const skillFills = document.querySelectorAll('.skill-progress-fill');
    const skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('filled');
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillFills.forEach(function (el) { skillObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
    document.querySelectorAll('.skill-progress-fill').forEach(function (el) { el.classList.add('filled'); });
  }

  /* ---------- subtle 3D tilt on cards (desktop only) ---------- */
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tiltEls = document.querySelectorAll('.service-item, .content-card');
    tiltEls.forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = 'perspective(700px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg) translateZ(0)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg)';
      });
    });
  }

  /* ---------- re-run skill bar fill + reveal when switching nav pages ---------- */
  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setTimeout(function () {
        document.querySelectorAll('.reveal-up:not(.in-view)').forEach(function (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight) el.classList.add('in-view');
        });
        document.querySelectorAll('.skill-progress-fill:not(.filled)').forEach(function (el) {
          el.classList.add('filled');
        });
      }, 100);
    });
  });

});
