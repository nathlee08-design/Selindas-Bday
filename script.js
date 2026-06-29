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

// RSVP logic + password gate
function rsvp(isYes) {
    const code = prompt("Enter invite code:");

    if (code !== "rachelisnotcool") {
        alert("Sorry, invite only ✨");
        return;
    }

    if (isYes) {
        confetti();
        window.location.href = "details.html";
    } else {
        alert("You still said yes 😌");
        window.location.href = "details.html";
    }
}
