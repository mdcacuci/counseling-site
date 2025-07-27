const phrases = [
  "College Counseling",
  "SAT/ACT Tutoring",
  "Essay Review",
  "Athletic Recruiting",
  "Med School Admissions",
  "Law School Admissions",
];

const el = document.getElementById("changing-text");
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
let delay = 500;

function type() {
  const fullText = phrases[currentPhrase];
  if (isDeleting) {
    currentChar--;
  } else {
    currentChar++;
  }

  el.textContent = fullText.substring(0, currentChar);

  if (!isDeleting && currentChar === fullText.length) {
    delay = 3000;
    isDeleting = true;
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentPhrase = (currentPhrase + 1) % phrases.length;
    delay = 600;
  } else {
    delay = isDeleting ? 50 : 100;
  }

  setTimeout(type, delay);
}

type();