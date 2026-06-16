/**
 * app.js — Criminal Official Store
 * Landing page (index.html) carousel logic.
 */

(function () {
  'use strict';

  const track  = document.getElementById('ctrack');
  const dotsEl = document.getElementById('cdots');
  if (!track || !dotsEl) return;

  const slides = track.querySelectorAll('.c-slide');
  const N = slides.length;
  if (!N) return;

  let cur = 0;
  let tmr;

  // Build dots
  for (let i = 0; i < N; i++) {
    const btn = document.createElement('button');
    btn.className = 'c-dot' + (i === 0 ? ' on' : '');
    btn.setAttribute('aria-label', 'Slide ' + (i + 1));
    btn.addEventListener('click', function () { go(i); reset(); });
    dotsEl.appendChild(btn);
  }

  function go(i) {
    cur = (i + N) % N;
    track.style.transform = 'translateX(-' + cur * 100 + '%)';
    dotsEl.querySelectorAll('.c-dot').forEach(function (d, j) {
      d.classList.toggle('on', j === cur);
    });
  }

  function reset() {
    clearInterval(tmr);
    tmr = setInterval(function () { go(cur + 1); }, 4000);
  }

  // Touch swipe
  const wrap = track.parentElement;
  let startX = 0;
  wrap.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });
  wrap.addEventListener('touchend', function (e) {
    const dx = startX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) { go(cur + (dx > 0 ? 1 : -1)); reset(); }
  });

  // Pause on hover
  wrap.addEventListener('mouseenter', function () { clearInterval(tmr); });
  wrap.addEventListener('mouseleave', reset);

  reset();
})();
