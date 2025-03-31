let quadtree;
let boundary;
let capacity = 5;
let quadnum = 100;


let bgCanvas;

let molds = []; let num = 100;
let d; 

function setup() {
    bgCanvas = createCanvas(windowWidth, windowHeight);
	bgCanvas.parent('p5-container'); // Attach the canvas to the HTML div
    bgCanvas.style('position', 'fixed');
    bgCanvas.style('top', '0');
    bgCanvas.style('left', '0');
    bgCanvas.style('z-index', '-1'); // Ensures it stays behind everything
    bgCanvas.style('display', 'block');



	  stroke(255,0,0);
	  background(0);
	
	  angleMode(DEGREES);
	  d = pixelDensity();

	  for (let i=0; i<num; i++) {
		molds[i] = new Mold();
	  } 

	  
	boundary = new Rect(width/2, height/2, width/2, height/2);

	quadtree = new QuadTree(boundary, capacity);

	for (let i = 0; i < quadnum; i++){
		let p = new Point(random(width), random(height))
		quadtree.insert(p);
	};
}


function draw() {
  background(0, 10);

//   let fps = frameRate();  // Get the current frame rate
//     fill(255);  // Set text color to white
//     textSize(100);  // Set text size
//     textAlign(RIGHT, TOP);  // Align text at the top-right corner
//     if (fps < 20){
//         text(Math.round(fps), width - 50, 50); 
//     }
  loadPixels();



//   let range = new Rect(mouseX, mouseY, 40, 40);
//   noFill();
//   stroke(0,255,0);
//   rect(range.x,range.y,range.w *2, range.h * 2)

// let foundPoints = [];
//   quadtree.query(range, foundPoints);
//   quadtree.display();
//   for (let i=0; i<foundPoints.length; i++) {
//     noStroke();
//     fill(255, 255, 0);
//     ellipse(foundPoints[i].x, foundPoints[i].y, 10, 10);
//   }

 
	quadtree.clearQuadtree();

	for (let i=0; i<num; i++) {
		
	let p = new Point(molds[i].x, molds[i].y, molds[i]);
	quadtree.insert(p);
	}
	
	for (let i = 0; i < num; i++) {
	let neighbors = [];
	let range = new Circle(molds[i].x, molds[i].y, molds[i].sensorDist);
	quadtree.query(range, neighbors);


    // if (neighbors.length > 0) {
    //     let avgX = 0;
    //     let avgY = 0;
    //     for (let n of neighbors) {
    //         avgX += n.x;
    //         avgY += n.y;
    //     }
    //     avgX /= neighbors.length;
    //     avgY /= neighbors.length;

    //     let angleToNeighbors = atan2(avgY - molds[i].y, avgX - molds[i].x);
    //     molds[i].heading = lerp(molds[i].heading, angleToNeighbors, 0.05); // Smooth movement
    // }

	molds[i].update(neighbors);
	molds[i].display();
	}

  
}

function initializeMolds() {

	// Create new molds with random positions (can customize further)
	for (let i = 0; i < num; i++) {
		let mold = new Mold(random(width /2), random(height / 2));
		molds.push(mold);
		molds[i].x = random(windowWidth / 2);
		molds[i].y = random(windowHeight / 2);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);  // Adjust canvas size to window size
	initializeMolds();  // Reinitialize molds with new dimensions
	background(0);
}