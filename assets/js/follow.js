let character; // The character object
let directionFrames = {}; // Object to hold arrays of frames for each direction

function preload() {
  // Load images into direction arrays
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  for (let dir of directions) {
    directionFrames[dir] = loadImagesFromFolder(dir); // Load images into corresponding direction array
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  character = new Character(width / 2, height / 2);
}

function draw() {
  background(220);

  character.update();
  character.display();
}

function loadImagesFromFolder(folderName) {
  // This function assumes you have image files named frame1.png, frame2.png, etc.
  let frames = [];
  let i = 1;
  while (true) {
    let img = loadImage(`images/${folderName}/frame${i}.png`, (image) => {
      frames.push(image);
    }, (err) => {
      // Stop loading if there are no more images
      if (i === 1) {
        console.error(`No images found in ${folderName}!`);
      }
    });
    if (!img) break;
    i++;
  }
  return frames;
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.vx = 0;
    this.vy = 0;
    this.direction = 'E'; // Default direction
    this.currentFrame = 0;
  }

  update() {
    // Calculate direction based on mouse position
    let mouseXDist = mouseX - this.x;
    let mouseYDist = mouseY - this.y;

    // Determine direction (based on mouse position)
    if (mouseXDist > 0 && mouseYDist < 0) {
      this.direction = 'NE';
    } else if (mouseXDist > 0 && mouseYDist > 0) {
      this.direction = 'SE';
    } else if (mouseXDist < 0 && mouseYDist > 0) {
      this.direction = 'SW';
    } else if (mouseXDist < 0 && mouseYDist < 0) {
      this.direction = 'NW';
    } else if (mouseXDist > 0) {
      this.direction = 'E';
    } else if (mouseXDist < 0) {
      this.direction = 'W';
    } else if (mouseYDist > 0) {
      this.direction = 'S';
    } else {
      this.direction = 'N';
    }

    // Update velocity towards the mouse
    let angle = atan2(mouseY - this.y, mouseX - this.x);
    this.vx = cos(angle) * this.speed;
    this.vy = sin(angle) * this.speed;

    // Move the character
    this.x += this.vx;
    this.y += this.vy;

    // Animate based on direction
    this.currentFrame = (this.currentFrame + 1) % directionFrames[this.direction].length;
  }

  display() {
    // Display the current frame in the corresponding direction
    image(directionFrames[this.direction][this.currentFrame], this.x, this.y);
  }
}
