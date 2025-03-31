const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let currentSource = null; // For tracking the currently playing sound
let currentGainNode = null; // For tracking the current GainNode (volume)

// Function to load and play the sound with fade in/out
async function loadAndPlaySound(soundUrl) {
    const response = await fetch(soundUrl);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Stop the previous sound and gain node (if any)
    if (currentSource) {
        currentSource.stop();
        currentGainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start fade-out
    }
    
    // Create a new source for the new sound
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    
    // Create a GainNode for volume control (fading)
    const gainNode = audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Fade-in the sound (ramp volume from 0 to 1)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);  // Start at 0 amplitude
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.5); // Ramp to 1 over 100ms
    
    source.loop = true; // Loop the sound
    source.start();
    
    currentSource = source;
    currentGainNode = gainNode; // Set the current gain node for later fade-out
}

// Loop through images and set event listeners for hover
document.querySelectorAll(".music-grid img").forEach(img => {
    img.addEventListener("mouseenter", () => {
        const soundUrl = img.getAttribute("data-sound");
        loadAndPlaySound(soundUrl);
    });

    img.addEventListener("mouseleave", () => {
        // Fade out the sound when the mouse leaves
        if (currentSource && currentGainNode) {
            currentGainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.25); // Ramp to 0 over 100ms
            currentSource.stop(audioContext.currentTime + 0.05); // Stop after the fade-out duration
            currentSource = null; // Reset current source
            currentGainNode = null; // Reset gain node
        }
    });
});

// Unlock audio context on first user interaction (click)
document.addEventListener("click", () => {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
});

const navbar = document.getElementById("navbar");

function openMenu(){
	navbar.classList.add("show");
}

function closeMenu(){
	navbar.classList.remove("show");
}

const cursorSmall = document.querySelector('.cursor');

// Elements to trigger the cursor change
const hoverElements = document.querySelectorAll('a, button, .nav, .music-grid img');

const positionElement = (e) => {
  cursorSmall.style.left = `${e.clientX}px`;
  cursorSmall.style.top = `${e.clientY}px`;
};

const setCursorToHover = () => {
  cursorSmall.style.backgroundImage = "url('images/cursorselect.gif')";  // Change to the hover cursor
};

const setCursorToIdle = () => {
  cursorSmall.style.backgroundImage = "url('images/cursoridle.gif')";  // Change back to the default cursor
};

// Track mouse movement
window.addEventListener('mousemove', positionElement);

// Change cursor when hovering over elements
hoverElements.forEach((el) => {
  el.addEventListener('mouseenter', setCursorToHover);  // Change to hover cursor when mouse enters
  el.addEventListener('mouseleave', setCursorToIdle);   // Revert to idle cursor when mouse leaves
});