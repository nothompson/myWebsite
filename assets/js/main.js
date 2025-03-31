/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('#nav a, .scrolly').scrolly({
			speed: 1000,
			offset: function() { return $nav.height(); }
		});

})(jQuery);

const dialogueTree = {
	start: {
		text: "Hi! I’m Noah, (you may know me by my producer pseudonym, g0bln). I am a sound designer, producer, animator, and audio programmer based in California. What’s up? ",
		options: [
			{ text: "About", next: "about" },
			{ text: "Work", next: "portfolio" },
			{ text: "Music", next: "music"},
			{ text: "Shop", next: "shop"},
			{ text: "Contact", next: "email"}
		]
	},
	back: {
		text: "Anything else I can help you with?",
		options: [
			{ text: "About", next: "about" },
			{ text: "Work", next: "portfolio" },
			{ text: "Music", next: "music"},
			{ text: "Shop", next: "shop"},
			{ text: "Contact", next: "email"}
		]
	},
	about: {
		text: "I'm Noah Thompson, a multidisciplinary audio-visual artist and video game dork currently pursuing a bachelor's degree in Media Arts Technology at University of California, Santa Barbara...",
		options: [
			{ text: "Back", next: "back" },
			{ text: "Next", next: "next1"}
		]
	},
	next1: {
		text: "I have been experimenting with digital sound since 2020, and mixed media visuals since 2022. Since then, I have amassed production credits with over a million plays, done commission work for music videos, raised over $1000 for charity, and met tons of cool folks across the music industry.",
		options: [
			{text: "Back", next: "about"},
			{text: "Next", next: "back"}
		]
	}

};

function typeText(text, callback) {
    let i = 0;
    const speed = 15; // Typing speed in ms
    const box = document.getElementById("dialogueBox");
    let buffer = '';  // Use a buffer to build the text
    const batchSize = 1;  // Number of characters to add in each update (adjust for balance)

    function type() {
        // Add a batch of characters at once
        const end = Math.min(i + batchSize, text.length);
        buffer += text.slice(i, end);
        box.textContent = buffer;  // Use textContent instead of innerHTML

        i = end;

        if (i < text.length) {
            setTimeout(type, speed);  // Continue typing
        } else {
            if (callback) callback();
            box.scrollTop = box.scrollHeight;  // Scroll to the bottom after typing is done
        }
    }

    type(); // Start typing
}



function displayDialogue(nodeKey) {
    const node = dialogueTree[nodeKey];
    typeText(node.text, () => {
        const optionsDiv = document.getElementById("dialogueOptions");
        optionsDiv.innerHTML = "";  // Clear previous options

        node.options.forEach(option => {
            let btn = document.createElement("button");
            btn.className = "option";
            btn.innerText = option.text;

            if (dialogueTree[option.next]) {
                // If the next node exists in the dialogueTree, navigate to it
                btn.onclick = () => displayDialogue(option.next);
            } else {
                // If it's an external page, navigate to that page
                let pageMap = {
                    "Work": "portfolio.html",
                    "Music": "music.html",
                    "Shop": "shop.html",
                    "Contact": "contact.html"
                };

                if (pageMap[option.text]) {
                    btn.onclick = () => window.location.href = pageMap[option.text];
                }
            }

            optionsDiv.appendChild(btn);
        });
    });
}
// displayDialogue("sleep");
// let startbool = false;
// let idlebool = false;
function setup(){

}

function toggleBoombox(element) {
    const pngImage = '/website/images/boombox.png';
    const gifImage = "/website/images/boombox.gif";
    const currentBackground = window.getComputedStyle(element).backgroundImage;

    if (currentBackground.includes(pngImage)) {
        element.style.backgroundImage = `url(${gifImage})`;
    } else {
        element.style.backgroundImage = `url(${pngImage})`;
    }
	if (audio.paused) {
		playSong(currentSongIndex);
	  } else {
		audio.pause();
	  }
}

const songs = [
	'/website/sounds/molds.mp3',
	'/website/sounds/bummer.mp3',
	'/website/sounds/itsOkay.mp3',
	'/website/sounds/snowfall.mp3',
	'/website/sounds/squirmFrequency.mp3',
	'/website/sounds/theMachine.mp3',
  ];
  
  let currentSongIndex = Math.floor(Math.random() * songs.length);
  const audio = new Audio();
  
  function updateMarquee(text) {
	const scrollTrack = document.getElementById('scrollTrack');
	if (scrollTrack) {
	  // Clear existing content
	  scrollTrack.innerHTML = '';
	  // Create two <p> elements for seamless scrolling
	  for (let i = 0; i < 2; i++) {
		const p = document.createElement('p');
		p.textContent = text;
		scrollTrack.appendChild(p);
	  }
	}
  }
  
  function playSong(index) {
	const track = songs[index];
	audio.src = track;
	audio.play();
  
	const fileName = track.split('/').pop();
	updateMarquee("Now Playing: " + fileName);
  }
  
  audio.addEventListener('pause', function() {
	updateMarquee("Now Playing: ____________");
  });
  
  function nextSong(autoTriggered = false) {
	currentSongIndex = (currentSongIndex + 1) % songs.length;
	if (autoTriggered || !audio.paused) {
	  playSong(currentSongIndex);
	}
  }
  
  function previousSong() {
	currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
	if (!audio.paused) {
	  playSong(currentSongIndex);
	}
  }
  
  audio.addEventListener('ended', function() {
	nextSong(true);
  });
  
  document.addEventListener('DOMContentLoaded', function() {
	updateMarquee("Now Playing: ____________");
  });
  

function draw(){

}
const waveVideo = document.getElementById('characterVideo');
const sleepGif = document.getElementById('characterGif');
const idleVideo = document.getElementById('idleVideo');
let startbool = false;
let idlebool = false;
let videoPlayed = false; // Track if the video has already played

// Ensure the idle video is shown when the wave video ends
waveVideo.addEventListener('ended', function() {
    videoPlayed = true; // Mark video as played
    idleVideo.style.display = "block"; // Show idle video
    idleVideo.play(); // Start playing idle video
    waveVideo.style.display = "none"; // Hide wave video
}, { once: true }); // `{ once: true }` ensures this runs only once

document.getElementById('viewport').addEventListener('click', function() {
    if (!startbool) {
        startbool = true;
        setTimeout(function() {
			displayDialogue("start");
		}, 1000);
    }

    // If the idle video is playing, do nothing
    if (videoPlayed && idleVideo.style.display === "block") {
        return; // Prevent any changes if idle video is already showing
    }

    // If the video has NOT played yet, show wave video and hide idle video
    sleepGif.style.display = "none";  // Hide sleeping GIF
    waveVideo.style.display = "block"; // Show wave video
    waveVideo.play(); // Play the wave video only once
});

// function goIdle() {
// 	sleepGif.style.display = "block"; // Show idle GIF
//     waveVideo.style.display = "none"; // Hide video
// }

document.getElementById('viewport').addEventListener('click', function() {
    if (!startbool) {
        startbool = true;
        idlebool = true;
        displayDialogue("start");
		sleepGif.style.display = "none";
		waveVideo.style.display = "block";
		waveVideo.play(); // Play the video only once
    }

    // if (videoPlayed) {
    //     // If the video has already played, keep the idle GIF visible
    //     waveVideo.style.display = "none";
    //     sleepGif.style.display = "block";
    //     return; // Exit function to prevent video from playing again
    // }

    // If video has NOT played yet, show video and hide GIF
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
const hoverElements = document.querySelectorAll('a, button, .nav, .boombox, .dialogue-options, .controls, .character-viewport');

const positionElement = (e) => {
  cursorSmall.style.left = `${e.clientX}px`;
  cursorSmall.style.top = `${e.clientY}px`;
};

const setCursorToHover = () => {
  cursorSmall.style.backgroundImage = "url('/website/images/cursorselect.gif')";  // Change to the hover cursor
};

const setCursorToIdle = () => {
  cursorSmall.style.backgroundImage = "url('/website/images/cursoridle.gif')";  // Change back to the default cursor
};

// Track mouse movement
window.addEventListener('mousemove', positionElement);

// Change cursor when hovering over elements
hoverElements.forEach((el) => {
  el.addEventListener('mouseenter', setCursorToHover);  // Change to hover cursor when mouse enters
  el.addEventListener('mouseleave', setCursorToIdle);   // Revert to idle cursor when mouse leaves
});