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

// RSVP logic - show venue after YES
function rsvp(isYes) {
    // Hide RSVP section and show venue section
    document.getElementById("rsvp-section").style.display = "none";
    document.getElementById("venue-section").style.display = "block";
    
    if (isYes) {
        confetti();
    }
}

// Show secret code access button
function showSecretAccess() {
    document.getElementById("venue-section").style.display = "none";
    document.getElementById("secret-section").style.display = "block";
}

// Verify secret code for dress code reveal
function verifySecretCode() {
    const code = document.getElementById("secret-code").value;
    const secretCode = "glamorous"; // Change this to your desired secret code
    
    if (code === secretCode) {
        document.getElementById("secret-message").textContent = "🎊 Code Accepted! Welcome to the Inner Circle 🎊";
        document.getElementById("secret-message").style.display = "block";
        document.getElementById("secret-message").style.color = "#00ff00";
        document.getElementById("dress-code-section").style.display = "block";
        document.getElementById("secret-code").style.display = "none";
        document.querySelector("button[onclick='verifySecretCode()']").style.display = "none";
        confetti();
    } else {
        document.getElementById("secret-message").textContent = "❌ Incorrect code. Try again!";
        document.getElementById("secret-message").style.display = "block";
        document.getElementById("secret-message").style.color = "#ff0000";
    }
}
