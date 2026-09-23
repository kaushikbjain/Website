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

// run the filter once on load so every project item gets an explicit
// active/inactive state up front — without this, any project-item that
// didn't already have "active" hardcoded in the HTML (.project-item is
// display:none by default) stayed permanently hidden until a filter
// button was clicked, which is why Portfolio looked blank on first load.
filterFunc("all");

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
      // Use textContent, not innerHTML: the ripple-effect listener below injects
      // a <span class="ripple-el"> into this button on "pointerdown" (which fires
      // before "click"), so by the time this handler runs, innerHTML is polluted
      // with that span's markup (e.g. 'portfolio<span class="ripple-el" ...>...')
      // and never matches a plain data-page value like "portfolio". That silent
      // mismatch made every click clear .active from every page/link without ever
      // setting it on the new one — which is why Portfolio/Gallery looked blank,
      // and why About eventually went blank too after the first click anywhere.
      if (this.textContent.trim().toLowerCase() === pages[i].dataset.page) {
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
  Intro morph, gold-dust particles, scroll reveal,
  skill-bar fill, card tilt.
  Purely additive — does not touch existing logic above.
\*-----------------------------------*/

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- #site-intro : pop-in, then slide into the real sidebar identity ----------
     Rebuilt on the Web Animations API so every stage is frame-accurate and the next
     stage only ever starts when animation.finished actually resolves — no arbitrary
     setTimeout guessing, no CSS-transition races, no random-increment counters. */
  const intro = document.getElementById('site-intro');
  const reduceMotionMQ = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = !!(reduceMotionMQ && reduceMotionMQ.matches);

  if (intro) {
    const finishIntro = function () {
      intro.classList.add('intro-done');
      document.body.classList.remove('intro-active');
      document.body.classList.remove('intro-revealing'); // real elements already at opacity:1 by now, class no longer needed
      const firstPage = document.querySelector('[data-page].active');
      if (firstPage) firstPage.classList.add('page-enter');
      setTimeout(function () { intro.remove(); }, 350);
    };

    if (prefersReducedMotion || typeof intro.animate !== 'function') {
      // skip the show entirely — jump straight to the finished state
      finishIntro();
    } else {
      document.body.classList.add('intro-active');

      const stage = document.querySelector('.intro-stage');
      const backdrop = document.querySelector('.intro-backdrop');
      const introAvatar = document.getElementById('intro-avatar');
      const introName = document.getElementById('intro-name');
      const introTagline = document.querySelector('.intro-tagline');
      const introProgress = document.querySelector('.intro-progress');
      const introFill = document.getElementById('intro-progress-fill');
      const introCount = document.getElementById('intro-count');
      const introPercentWrap = document.querySelector('.intro-percent');
      const targetAvatar = document.getElementById('sidebar-avatar-target');
      const targetName = document.getElementById('sidebar-name-target');

      const rootStyles = getComputedStyle(document.documentElement);
      const EASE_ENTER = (rootStyles.getPropertyValue('--ease-expo-out') || 'cubic-bezier(0.16, 1, 0.3, 1)').trim();
      const EASE_SLIDE = (rootStyles.getPropertyValue('--ease-slide') || 'cubic-bezier(0.65, 0, 0.35, 1)').trim();

      // fixed-duration promises stand in for "fire and forget" fades so we can
      // still Promise.all() them alongside real WAAPI animations below
      const fade = function (el, from, to, duration, delay) {
        if (!el) return Promise.resolve();
        return el.animate(
          [{ opacity: from }, { opacity: to }],
          { duration: duration, delay: delay || 0, easing: 'ease', fill: 'forwards' }
        ).finished.catch(function () {});
      };

      const runIntro = async function () {
        // --- stage 1: pop in (deterministic 620ms, subtle overshoot) ---
        const stageIn = stage.animate(
          [
            { opacity: 0, transform: 'scale(0.72)' },
            { opacity: 1, transform: 'scale(1.04)', offset: 0.7 },
            { opacity: 1, transform: 'scale(1)' }
          ],
          { duration: 620, easing: EASE_ENTER, fill: 'forwards' }
        ).finished.catch(function () {});

        // name + tagline + progress bar cascade in slightly staggered, all landing
        // well inside the pop-in window so nothing feels like a separate "wait"
        fade(introName, 0, 1, 360, 120);
        fade(introTagline, 0, 1, 360, 220);
        fade(introProgress, 0, 1, 300, 300);
        fade(introPercentWrap, 0, 1, 300, 300);

        await stageIn;

        // --- stage 2: fixed 620ms progress fill, perfectly synced to the visible bar ---
        if (introFill && introCount) {
          const fillDuration = 620;
          const fillAnim = introFill.animate(
            [{ width: '0%' }, { width: '100%' }],
            { duration: fillDuration, easing: 'ease-in-out', fill: 'forwards' }
          );
          const countStart = performance.now();
          await new Promise(function (resolve) {
            const tick = function (now) {
              const t = Math.min(1, (now - countStart) / fillDuration);
              introCount.textContent = Math.round(t * 100);
              if (t < 1) requestAnimationFrame(tick);
              else resolve();
            };
            requestAnimationFrame(tick);
          });
          await fillAnim.finished.catch(function () {});
        }

        // brief, intentional anticipation beat — not a stall, a breath before the slide
        await new Promise(function (resolve) { setTimeout(resolve, 160); });

        // --- stage 3: slide — clone glides to the sidebar, backdrop dissolves
        //     to reveal the real page arriving underneath it at the same time ---
        const flyOuts = [
          fade(introTagline, 1, 0, 200),
          fade(introProgress, 1, 0, 200),
          fade(introPercentWrap, 1, 0, 200)
        ];

        let avatarSlide = Promise.resolve();
        let nameSlide = Promise.resolve();

        if (introAvatar && targetAvatar && introName && targetName) {
          const fromAvatar = introAvatar.getBoundingClientRect();
          const toAvatar = targetAvatar.getBoundingClientRect();
          const fromName = introName.getBoundingClientRect();
          const toName = targetName.getBoundingClientRect();

          const avatarScale = Math.max(toAvatar.width / fromAvatar.width, 0.01);
          const avatarDX = (toAvatar.left + toAvatar.width / 2) - (fromAvatar.left + fromAvatar.width / 2);
          const avatarDY = (toAvatar.top + toAvatar.height / 2) - (fromAvatar.top + fromAvatar.height / 2);

          const nameScale = Math.max(toName.width / fromName.width, 0.01) * 0.72;
          const nameDX = (toName.left + toName.width / 2) - (fromName.left + fromName.width / 2);
          const nameDY = (toName.top + toName.height / 2) - (fromName.top + fromName.height / 2);

          // the clone stays fully opaque for almost the whole glide so it genuinely
          // reads as sliding into place, then blends out only in the final 12%
          // right as it lands pixel-perfectly on the real element underneath
          const slideDuration = 780;
          const slideDelay = 40;
          const crossfadeStart = slideDuration * 0.88; // matches the offset:0.88 keyframe below

          avatarSlide = introAvatar.animate(
            [
              { transform: 'translate(0,0) scale(1)', opacity: 1, offset: 0 },
              { transform: 'translate(' + (avatarDX * 0.88) + 'px,' + (avatarDY * 0.88) + 'px) scale(' + (1 + (avatarScale - 1) * 0.88) + ')', opacity: 1, offset: 0.88 },
              { transform: 'translate(' + avatarDX + 'px,' + avatarDY + 'px) scale(' + avatarScale + ')', opacity: 0, offset: 1 }
            ],
            { duration: slideDuration, easing: EASE_SLIDE, fill: 'forwards' }
          ).finished.catch(function () {});

          nameSlide = introName.animate(
            [
              { transform: 'translate(0,0) scale(1)', opacity: 1, offset: 0 },
              { transform: 'translate(' + (nameDX * 0.88) + 'px,' + (nameDY * 0.88) + 'px) scale(' + (1 + (nameScale - 1) * 0.88) + ')', opacity: 1, offset: 0.88 },
              { transform: 'translate(' + nameDX + 'px,' + nameDY + 'px) scale(' + nameScale + ')', opacity: 0, offset: 1 }
            ],
            { duration: slideDuration, easing: EASE_SLIDE, delay: slideDelay, fill: 'forwards' }
          ).finished.catch(function () {});

          // backdrop dissolves across the same window so the destination sidebar
          // is genuinely visible as the clone arrives — a true "slide into the
          // page" rather than a hard cut from black
          fade(backdrop, 1, 0, slideDuration - 140, 60);

          // crossfade the REAL sidebar identity in underneath the clone, timed to
          // the exact moment the clone starts blending out (the offset:0.88 mark
          // above) — this is what closes the gap and makes it feel like one
          // continuous slide instead of two animations meeting in the middle
          setTimeout(function () {
            document.body.classList.add('intro-revealing');
          }, crossfadeStart + slideDelay);
        } else {
          flyOuts.push(fade(introAvatar, 1, 0, 300), fade(introName, 1, 0, 300));
          document.body.classList.add('intro-revealing');
        }

        await Promise.all([avatarSlide, nameSlide, ...flyOuts]);

        // the clone has landed exactly on the real element — swap visibility in
        // the same frame so there is zero gap and zero double-flash
        finishIntro();
      };

      // fail-safe in case WAAPI throws for any reason (very old browser, etc.)
      runIntro().catch(function () { finishIntro(); });
      setTimeout(function () {
        if (document.body.classList.contains('intro-active')) finishIntro();
      }, 4500);
    }
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

  /* ---------- reveal + fill skill bars for the currently active page ----------
     Elements inside a hidden ([data-page] that isn't .active, since `article`
     defaults to display:none) never intersect the viewport, so the
     IntersectionObserver above can never fire for them and they were getting
     stuck permanently at opacity:0 — this is what made Portfolio/Gallery (and
     eventually About, once its items had already been unobserved) render
     blank. Instead of guessing from scroll geometry, just reveal everything
     inside whichever page is active right now, every time a page becomes
     active (including the very first page on load). */
  const revealActivePage = function () {
    const activePage = document.querySelector('[data-page].active');
    if (!activePage) return;
    activePage.querySelectorAll('.reveal-up').forEach(function (el) {
      el.classList.add('in-view');
    });
    activePage.querySelectorAll('.skill-progress-fill').forEach(function (el) {
      el.classList.add('filled');
    });
  };

  revealActivePage();

  const navLinks = document.querySelectorAll('[data-nav-link]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setTimeout(revealActivePage, 50);
    });
  });

});



/*-----------------------------------*\
  #GENZ CINEMATIC UPGRADE — JS
  Video bg handling, ambient toggle, back-to-top,
  magnetic buttons, tab-switch sweep, press ripples.
  Purely additive — does not touch existing logic above.
\*-----------------------------------*/

document.addEventListener('DOMContentLoaded', function () {

  const genzReduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- cinematic tab-switch: gold sweep + content settle-in ---------- */
  const tabSweep = document.getElementById('tab-sweep');
  const navLinksForSweep = document.querySelectorAll('[data-nav-link]');

  navLinksForSweep.forEach(function (link) {
    link.addEventListener('click', function () {
      link.classList.add('pressed');
      setTimeout(function () { link.classList.remove('pressed'); }, 350);

      if (genzReduceMotion) return;

      if (tabSweep) {
        tabSweep.classList.remove('playing');
        // force reflow so the animation can restart on rapid tab switches
        void tabSweep.offsetWidth;
        tabSweep.classList.add('playing');
      }

      // the nav-switch logic (earlier in this file) toggles [data-page].active
      // synchronously on click — by the time this runs, the newly active page
      // is already in the DOM. We replay its entrance animation by removing +
      // re-adding .page-enter across two animation frames (not one) so the
      // browser is guaranteed to commit the removal before the class returns —
      // a single rAF can get coalesced by the browser and silently no-op,
      // which is what was leaving pages stuck invisible after a tab switch.
      requestAnimationFrame(function () {
        const activePage = document.querySelector('[data-page].active');
        if (!activePage) return;
        activePage.classList.remove('page-enter');
        requestAnimationFrame(function () {
          activePage.classList.add('page-enter');
        });
      });
    });
  });

  /* ---------- tactile press ripple for key buttons (works on touch, no cursor needed) ---------- */
  const rippleTargets = document.querySelectorAll(
    '.navbar-link, .info_more-btn, .filter-select, [data-filter-btn], [data-select-item], #ambient-toggle, #back-to-top'
  );
  rippleTargets.forEach(function (el) {
    el.classList.add('ripple-btn');
    el.addEventListener('pointerdown', function (e) {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.4;
      const x = (e.clientX != null ? e.clientX - rect.left : rect.width / 2) - size / 2;
      const y = (e.clientY != null ? e.clientY - rect.top : rect.height / 2) - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-el';
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      el.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 620);
    });
  });

  /* ---------- video background: graceful fallback if asset missing ---------- */
  const bgVideo = document.getElementById('cinematic-video');
  const videoWrap = document.getElementById('video-bg-wrap');
  if (bgVideo) {
    bgVideo.addEventListener('error', function () {
      if (videoWrap) videoWrap.style.display = 'none';
    }, true);
    // if no sources resolve at all within a moment, hide the wrap so the gold/particle
    // atmosphere carries the background instead of a blank video box
    setTimeout(function () {
      if (bgVideo.readyState === 0 && bgVideo.networkState === 3) {
        videoWrap.style.display = 'none';
      }
    }, 1500);
  }

  /* ---------- ambient toggle: pause/resume the cinematic video ---------- */
  const ambientToggle = document.getElementById('ambient-toggle');
  if (ambientToggle && bgVideo) {
    ambientToggle.addEventListener('click', function () {
      const isOn = !document.body.classList.contains('video-off');
      if (isOn) {
        document.body.classList.add('video-off');
        bgVideo.pause();
        ambientToggle.setAttribute('aria-pressed', 'false');
      } else {
        document.body.classList.remove('video-off');
        bgVideo.play().catch(function () {});
        ambientToggle.setAttribute('aria-pressed', 'true');
      }
    });
  }

  /* ---------- back to top ---------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const activePage = document.querySelector('[data-page].active');
      if (activePage) activePage.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- magnetic hover on key CTAs ---------- */
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const magnetTargets = document.querySelectorAll('.info_more-btn, #ambient-toggle, #back-to-top');
    magnetTargets.forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
        el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = 'translate(0,0)';
      });
    });
  }

});

