const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelectorAll('.nav__links a');
const track = document.querySelector('.slider__track');
const cards = Array.from(document.querySelectorAll('.slider .card'));
const dotsContainer = document.querySelector('.slider__dots');
const prevBtn = document.querySelector('.slider__control--prev');
const nextBtn = document.querySelector('.slider__control--next');
const form = document.querySelector('.newsletter');
const emailInput = document.querySelector('#email');
const errorEl = document.querySelector('.newsletter__error');

let currentIndex = 0;

/* Mobile nav toggle */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Slider setup */
function buildDots() {
  cards.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to testimonial ${idx + 1}`);
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });
}

function updateSlider() {
  const width = cards[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * width}px)`;

  dotsContainer.querySelectorAll('button').forEach((dot, idx) => {
    dot.setAttribute('aria-current', idx === currentIndex ? 'true' : 'false');
  });
}

function goToSlide(idx) {
  const lastIndex = cards.length - 1;
  if (idx < 0) currentIndex = lastIndex;
  else if (idx > lastIndex) currentIndex = 0;
  else currentIndex = idx;
  updateSlider();
}

function handleResize() {
  // Re-apply transform when widths change.
  updateSlider();
}

buildDots();
updateSlider();
window.addEventListener('resize', handleResize);

prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

/* Email validation */
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = emailInput.value.trim();
  if (!value) {
    errorEl.textContent = 'Please add your email';
    emailInput.classList.add('invalid');
    return;
  }
  if (!isValidEmail(value)) {
    errorEl.textContent = 'Please enter a valid email';
    emailInput.classList.add('invalid');
    return;
  }

  errorEl.textContent = '';
  emailInput.classList.remove('invalid');
  form.reset();
});

