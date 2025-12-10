// ===============================
// Enter content reveal
// ===============================
const enterBtn = document.getElementById('enterBtn');
const overlay = document.getElementById("welcomeOverlay");
const content = document.getElementById('content');
enterBtn.addEventListener('click', () => {
  overlay.style.display = "none";
   document.body.style.transition = 'background 2.5s ease';
   document.body.style.filter = 'brightness(0.85)';
    setTimeout(() => {
    document.body.style.filter = 'brightness(1)';
  }, 1500);
  content.classList.remove('hidden');
  window.scrollTo({ top: content.offsetTop, behavior: 'smooth' });
});

// ===============================
// Music controls
// ===============================
const playBtn = document.getElementById('playBtn');
const song = document.getElementById('song');

playBtn.addEventListener('click', async () => {
  try {
    if (song.paused) {
      await song.play();
      playBtn.textContent = 'Pause';
    } else {
      song.pause();
      playBtn.textContent = 'Play our song';
    }
  } catch (e) {
    playBtn.textContent = 'Tap again to play';
  }
});

// ===============================
// Starry background
// ===============================
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let w, h, stars;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  stars = Array.from({ length: Math.min(200, Math.floor(w * h / 8000)) }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.2 + 0.2,
    s: Math.random() * 0.8 + 0.2
  }));
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  const isNight = document.body.classList.contains('night');
  ctx.fillStyle = isNight ? '#0b1020' : '#f2f2f7';
  ctx.fillRect(0, 0, w, h);
  for (const st of stars) {
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(199,210,254,${Math.random() * 0.9})`;
    ctx.fill();
    st.x += (Math.random() - 0.5) * st.s;
    st.y += (Math.random() - 0.5) * st.s;
  }
  requestAnimationFrame(draw);
}

resize();
draw();
window.addEventListener('resize', resize);


// ===============================
// Animated love letter typing
// ===============================
const letterText = `My love, I’m sorry for the hurt.
You are kind, strong, and so adorable.
I’m learning to be better.
If you’ll let me, I’ll spend each day earning your smile.`;

const loveLetter = document.getElementById('loveLetter');
let i = 0;

function typeLetter() {
  if (i < letterText.length) {
    loveLetter.textContent += letterText.charAt(i);
    i++;
    setTimeout(typeLetter, 60);
  }
}
window.addEventListener('load', typeLetter);

// ===============================
// Auto-scroll timeline carousel
// ===============================
const carousel = document.querySelector('.carousel');

function autoScrollCarousel() {
  if (!carousel) return;
  let scrollAmount = 0;
  const slideWidth = carousel.querySelector('.slide').offsetWidth + 16;

  setInterval(() => {
    carousel.scrollBy({ left: slideWidth, behavior: 'smooth' });
    scrollAmount += slideWidth;

    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
      scrollAmount = 0;
    }
  }, 4000);
}

window.addEventListener('load', autoScrollCarousel);

// ===============================
// Fade-in effect for slides
// ===============================
const slides = document.querySelectorAll('.slide');

function checkVisibleSlides() {
  slides.forEach(slide => {
    const rect = slide.getBoundingClientRect();
    const inView = rect.left >= 0 && rect.right <= window.innerWidth + 100;
    if (inView) {
      slide.classList.add('visible');
    } else {
      slide.classList.remove('visible');
    }
  });
}

document.querySelector('.carousel').addEventListener('scroll', checkVisibleSlides);
window.addEventListener('load', checkVisibleSlides);

// ===============================
// Floating Love Notes
// ===============================
const loveNotesContainer = document.getElementById('loveNotes');
const messages = [
  { short: "I love you 💖", secret: "You are my forever, my heart, my home." },
  { short: "Forgive me ✨", secret: "Even in the darkest sky, you shine brightest." },
  { short: "Forever yours 🌹", secret: "No matter what, I’ll always choose you." },
  { short: "Sorry Jaan ☀️", secret: "You light up every corner of my soul." },
  { short: "You melt me 💕", secret: "Your smile is the sweetest magic I know." }
];

function spawnNote() {
  const note = document.createElement('div');
  note.className = 'note';

  const msg = messages[Math.floor(Math.random() * messages.length)];
  note.textContent = msg.short;

  note.style.left = Math.random() * window.innerWidth + 'px';
  note.style.bottom = '0px';

  // click to reveal secret with sparkles
note.addEventListener('click', () => {
  note.classList.add('expanded');
  note.textContent = msg.secret;

  // sparkle burst
  for (let i = 0; i < 12; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = note.offsetLeft + note.offsetWidth / 2 + 'px';
    sparkle.style.top = note.offsetTop + note.offsetHeight / 2 + 'px';

    // random direction
    const angle = Math.random() * 2 * Math.PI;
    const distance = 60 + Math.random() * 40;
    sparkle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
    sparkle.style.setProperty('--y', Math.sin(angle) * distance + 'px');

    loveNotesContainer.appendChild(sparkle);

    // remove after animation
    setTimeout(() => {
      if (sparkle.parentNode) sparkle.remove();
    }, 800);
  }

  setTimeout(() => {
    if (note.parentNode) loveNotesContainer.removeChild(note);
  }, 4000);
});

  loveNotesContainer.appendChild(note);

  // auto-remove if not clicked
  setTimeout(() => {
    if (note.parentNode && !note.classList.contains('expanded')) {
      loveNotesContainer.removeChild(note);
    }
  }, 6000);
}

setInterval(spawnNote, 3000);

// ===============================
// Memory Spark (auto-changing with fade)
// ===============================
const sparks = [
  "Remember that rainy day we laughed?",
  "Your smile melts me every time.",
  "You are my forever.",
  "Our first trip together 💕"
];

const sparkEl = document.getElementById('spark');

function showRandomSpark() {
  const randomMsg = sparks[Math.floor(Math.random() * sparks.length)];
  
  // fade out
  sparkEl.classList.remove('show');
  
  setTimeout(() => {
    sparkEl.textContent = randomMsg;
    // fade in
    sparkEl.classList.add('show');
  }, 500); // wait for fade-out before changing text
}

// show one immediately
showRandomSpark();

// change every 5 seconds
setInterval(showRandomSpark, 5000);

// Day/Night Theme Toggle + Auto Mode
const toggleBtn = document.getElementById('themeToggle');

function setTheme(isNight) {
  if (isNight) {
    document.body.classList.add('night');
    toggleBtn.textContent = "Switch Mood 🌙➡🌞";
  } else {
    document.body.classList.remove('night');
    toggleBtn.textContent = "Switch Mood 🌞➡🌙";
  }
}

// Auto-detect based on local time
function autoTheme() {
  const hour = new Date().getHours();
  const isNight = (hour >= 19 || hour < 6); // 7pm–6am
  setTheme(isNight);
}

autoTheme();

toggleBtn.addEventListener('click', () => {
  const isNight = !document.body.classList.contains('night');
  setTheme(isNight);
});

setTimeout(() => {
  const sky = document.getElementById('skyName');
  if (sky) sky.classList.add('show');
}, 4000);

document.querySelectorAll('.promise').forEach(promise => {
  promise.addEventListener('click', () => {
    promise.classList.toggle('sealed');
  });
});

const finalBtn = document.getElementById('finalBtn');
const finalMessage = document.getElementById('finalMessage');

finalBtn.addEventListener('click', () => {
  finalMessage.classList.remove('hidden');
  
  // force reflow for transition
  finalMessage.offsetHeight;

  finalMessage.classList.add('show');
});

document.addEventListener('click', e => {
  const heart = document.createElement('div');
  heart.textContent = '💖';
  heart.style.position = 'fixed';
  heart.style.left = e.clientX + 'px';
  heart.style.top = e.clientY + 'px';
  heart.style.pointerEvents = 'none';
  heart.style.animation = 'fadeHeart 1s ease forwards';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
});

document.addEventListener('DOMContentLoaded', () => {
  const finalBtn = document.getElementById('finalBtn');
  const finalMessage = document.getElementById('finalMessage');
  if (finalBtn && finalMessage) {
    finalBtn.addEventListener('click', () => finalMessage.classList.add('show'));
  }
});






