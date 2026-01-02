// slideshow.js — simple, auto-rotating slideshow with controls
let slideIndex = 1;
let autoAdvanceInterval = 5000; // milliseconds
let autoTimer = null;

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  if (!slides || slides.length === 0) return;
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function startAutoAdvance() {
  stopAutoAdvance();
  autoTimer = setInterval(() => { plusSlides(1); }, autoAdvanceInterval);
}

function stopAutoAdvance() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
}

// wire up controls once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // initialize
  showSlides(slideIndex);
  startAutoAdvance();

  // prev/next buttons
  document.querySelectorAll('.slideshow-container [data-action="prev"]').forEach(btn => {
    btn.addEventListener('click', function (e) { e.preventDefault(); plusSlides(-1); startAutoAdvance(); });
  });
  document.querySelectorAll('.slideshow-container [data-action="next"]').forEach(btn => {
    btn.addEventListener('click', function (e) { e.preventDefault(); plusSlides(1); startAutoAdvance(); });
  });

  // dots
  document.querySelectorAll('.dot').forEach((dot, idx) => {
    dot.addEventListener('click', function () { currentSlide(idx + 1); startAutoAdvance(); });
  });

  // pause on hover
  const container = document.querySelector('.slideshow-container');
  if (container) {
    container.addEventListener('mouseenter', stopAutoAdvance);
    container.addEventListener('mouseleave', startAutoAdvance);
  }
});

// expose methods for future dynamic additions
window.slideshow = { showSlides, plusSlides, currentSlide, startAutoAdvance, stopAutoAdvance };
