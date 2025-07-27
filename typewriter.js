// Typewriter effect with blinking cursor that:
// - Blinks at all times while typing/deleting or when empty
// - Disappears when a phrase is fully typed and paused
// - Cursor sits close to the text

const phrases = [
  "College Counseling",
  "SAT/ACT Tutoring",
  "Essay Review",
  "Athletic Recruiting",
  "Med School Admissions",
  "Law School Admissions",
];

const el = document.getElementById("changing-text");

// Create a blinking cursor span and insert after the changing text
let cursor = document.createElement("span");
cursor.id = "typewriter-cursor";
cursor.textContent = "|";
el.after(cursor);

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
let delay = 500;
let pauseTimeout = null;

function type() {
  const fullText = phrases[currentPhrase];

  // Typing or deleting characters
  if (isDeleting) {
    currentChar--;
  } else {
    currentChar++;
  }

  // Update the displayed text
  el.textContent = fullText.substring(0, currentChar);


  // If finished typing, pause, then hide cursor and start deleting
  if (!isDeleting && currentChar === fullText.length) {
    delay = 3000;
    // Hide cursor during pause after typing
    pauseTimeout = setTimeout(() => {
      isDeleting = true;
      setTimeout(type, 200); // Small delay before deleting starts
    }, delay);
    return; // Exit so we don't call type() again immediately
  }

  // If finished deleting, move to next phrase
  if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentPhrase = (currentPhrase + 1) % phrases.length;
    delay = 600;
    // Ensure cursor is visible when empty
  } else {
    // Normal typing/deleting speed
    delay = isDeleting ? 50 : 100;
  }

  setTimeout(type, delay);
}

// Add CSS for blinking animation if not already present
(function addBlinkStyle() {
  if (!document.getElementById("typewriter-blink-style")) {
    const style = document.createElement("style");
    style.id = "typewriter-blink-style";
    style.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      #typewriter-cursor {
        animation: blink 1.2s infinite;
      }
    `;
    document.head.appendChild(style);
  }
})();

// Start the typewriter
type();