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

// Heart animation function
function createHearts() {
    const hearts = ['❤️', '💖', '💝', '💕', '💗'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-10px';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = `heartFall ${Math.random() * 2 + 2}s linear forwards`;
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3000);
    }
}

// Add heart animation keyframes to document
if (!document.getElementById('heartStyles')) {
    const style = document.createElement('style');
    style.id = 'heartStyles';
    style.innerHTML = `
        @keyframes heartFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Function to play BTS BUTTER using Web Audio API with synthesized celebration music
function playButter() {
    try {
        // Try to load from a CDN with proper CORS headers
        const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/18/audio_0e35c2c6de.mp3?filename=happy-celebration-140262.mp3');
        audio.crossOrigin = "anonymous";
        audio.volume = 0.5;
        
        // Add error handling and fallback
        audio.onerror = function() {
            console.log('Primary audio failed, trying fallback...');
            playFallbackMusic();
        };
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Audio autoplay prevented, trying fallback...');
                playFallbackMusic();
            });
        }
    } catch (e) {
        console.log('Error playing audio:', e);
        playFallbackMusic();
    }
}

// Fallback celebration sound using Web Audio API
function playFallbackMusic() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Play a celebratory tune
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        console.log('Fallback audio also failed:', e);
    }
}

// RSVP logic - play music and effects for BOTH YES responses
function rsvp(isYes) {
    // Play BTS BUTTER for both responses
    playButter();
    
    // Create heart animations for both responses
    createHearts();
    
    // Play confetti for both responses
    confetti();
    
    // Set consent for both Yes buttons
    sessionStorage.setItem('selindaConsent', 'yes');

    // Navigate to the details/map page where the secret input lives
    setTimeout(() => {
        window.location.href = 'details.html';
    }, 1500);
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
    const secretCode = "rachelisnotcool"; // Secret code for dress code reveal
    
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
        
        // Also create hearts when code is verified
        createHearts();
        
        // Play celebration sound on code unlock too
        playButter();
    } else {
        const msg = document.getElementById("secret-message");
        if (msg) {
            msg.textContent = "❌ Incorrect code. Try again!";
            msg.style.display = "block";
            msg.style.color = "#ff0000";
        }
    }
}
