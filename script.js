const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');

const setHeaderState = () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
};

const closeNav = () => {
  nav?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
};

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
  document.body.classList.toggle('nav-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll('[data-year]').forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const copyButton = document.querySelector('[data-copy-address]');
const copyStatus = document.querySelector('[data-copy-status]');
const mailingAddress = 'HOOD Community Land Trust\nPO Box 10502\nBurbank, CA 91510';

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(mailingAddress);
    copyStatus.textContent = 'Mailing address copied.';
  } catch {
    copyStatus.textContent = 'Please select and copy the address above.';
  }
});
