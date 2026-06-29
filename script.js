// countdown to 4 July 2026
const eventDate = new Date("2026-07-04T00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = eventDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000*60*60));

    document.getElementById("countdown").innerHTML =
        `${days} days ${hours} hrs to go 🎉`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP logic - store consent and navigate to details page
function rsvp(isYes) {
    if (isYes) {
        // per-tab/session consent; switch to localStorage if you want persistence across browser restarts
        sessionStorage.setItem('selindaConsent', 'yes');
        confetti();
    } else {
        // optional: explicitly clear consent on a 'no' response
        sessionStorage.removeItem('selindaConsent');
    }

    // Navigate to the details/map page where the secret input lives
    window.location.href = 'details.html';
}

// Show secret code access button (unused in current flow but kept for compatibility)
function showSecretAccess() {
    const venue = document.getElementById('venue-section');
    const secret = document.getElementById('secret-section');
    if (venue) venue.style.display = 'none';
    if (secret) secret.style.display = 'block';
}

// Verify secret code for dress code reveal
function verifySecretCode() {
    const codeInput = document.getElementById("secret-code");
    const code = codeInput ? codeInput.value : '';
    const secretCode = "rachelisnotcool"; // Change this to your desired secret code
    
    if (code === secretCode) {
        const msg = document.getElementById("secret-message");
        if (msg) {
            msg.textContent = "🎊 Code Accepted! Welcome to the Inner Circle 🎊";
            msg.style.display = "block";
            msg.style.color = "#00ff00";
        }

        const dress = document.getElementById("dress-code-section");
        if (dress) dress.style.display = "block";

        if (codeInput) codeInput.style.display = "none";
        const btn = document.querySelector("button[onclick='verifySecretCode()']");
        if (btn) btn.style.display = "none";
        if (typeof confetti === 'function') confetti();
    } else {
        const msg = document.getElementById("secret-message");
        if (msg) {
            msg.textContent = "❌ Incorrect code. Try again!";
            msg.style.display = "block";
            msg.style.color = "#ff0000";
        }
    }
}
