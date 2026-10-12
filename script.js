const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = `${Math.min(i % 4, 2) * 90}ms`; observer.observe(el); });

document.getElementById('loveButton').addEventListener('click', () => {
  const secret = document.getElementById('secret');
  secret.classList.toggle('show');
});

const song = document.getElementById('ourSong');
document.querySelector('.sound-toggle').addEventListener('click', async (event) => {
  const on = event.currentTarget.getAttribute('aria-pressed') === 'true';
  if (on) {
    song.pause();
    event.currentTarget.setAttribute('aria-pressed', 'false');
    event.currentTarget.textContent = '♡ sound off';
    return;
  }
  try {
    await song.play();
    event.currentTarget.setAttribute('aria-pressed', 'true');
    event.currentTarget.textContent = '♡ sound on';
  } catch {
    event.currentTarget.textContent = '♡ add song first';
  }
});

const entry = document.getElementById('entry');
const envelope = document.getElementById('openLetter');
envelope.addEventListener('click', () => {
  envelope.classList.add('is-open');
  song.play().then(() => {
    const toggle = document.querySelector('.sound-toggle');
    toggle.setAttribute('aria-pressed', 'true');
    toggle.textContent = '♡ sound on';
  }).catch(() => {});
  window.setTimeout(() => entry.classList.add('open'), 700);
});
