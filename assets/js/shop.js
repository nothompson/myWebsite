

function mouseClicked() {

	molds = [];
	let numMolds = 1000;  // Number of molds to spawn

	// Create new molds with random positions (can customize further)
	for (let i = 0; i < numMolds; i++) {
		let mold = new Mold();
		mold.x = mouseX / 2;
		mold.y = mouseY / 2;
		molds.push(mold);
	}
  }

  const navbar = document.getElementById("navbar");

function openMenu(){
	navbar.classList.add("show");
}

function closeMenu(){
	navbar.classList.remove("show");
}

const cursorSmall = document.querySelector('.cursor');

// Elements to trigger the cursor change
const hoverElements = document.querySelectorAll('a, button, .nav ');

const positionElement = (e) => {
  cursorSmall.style.left = `${e.clientX}px`;
  cursorSmall.style.top = `${e.clientY}px`;
};

const setCursorToHover = () => {
  cursorSmall.style.backgroundImage = "url('/images/cursorselect.gif')";  // Change to the hover cursor
};

const setCursorToIdle = () => {
  cursorSmall.style.backgroundImage = "url('/images/cursoridle.gif')";  // Change back to the default cursor
};

// Track mouse movement
window.addEventListener('mousemove', positionElement);

// Change cursor when hovering over elements
hoverElements.forEach((el) => {
  el.addEventListener('mouseenter', setCursorToHover);  // Change to hover cursor when mouse enters
  el.addEventListener('mouseleave', setCursorToIdle);   // Revert to idle cursor when mouse leaves
});