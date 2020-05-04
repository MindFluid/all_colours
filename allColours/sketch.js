// Created by Harrison Marley 01.05.2020

// Using a backtracking algorithm, deposit unique rgb() colours along a random path
// displaying each colour only once

let colours = [];
let width = 256;
let height = 128;

let grid = [];
let current;

let stack = []; //for backtracking algorithm

let button;

//setup() is a p5.js function which runs only once when the page is loaded
function setup() {
	createCanvas(width, height);
	background(0);

	button = createButton('generate');
	button.mousePressed(generate);
}

//draw() is a p5.js function that loops continuously
function draw() {
	updatePixels();
}

//each pixel has one instance of the Cell object, which controls and contains the tracing and information of that cell.
function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.filled = false;

	//trace() draws the path through the grid
	this.trace = function () {
		var x = this.i;
		var y = this.j;

		//if there are still colours to be drawn and this cell is unfilled, trace a step
		if (colours.length > 0 && !this.filled) {
			let colour = colours.pop();
			set(x, y, colour);
			this.filled = true;
		}
	};

	//Check neighbours for next movement options
	//valid neighbours are pixels that have not been filled
	this.checkNeighbours = function () {
		let neighbours = [];

		let top = grid[index(i, j - 1)];
		let right = grid[index(i + 1, j)];
		let bottom = grid[index(i, j + 1)];
		let left = grid[index(i - 1, j)];
		var topRight = grid[index(i + 1, j - 1)];
		var topLeft = grid[index(i - 1, j - 1)];
		var bottomRight = grid[index(i + 1, j + 1)];
		var bottomLeft = grid[index(i - 1, j + 1)];

		if (top && !top.filled) {
			neighbours.push(top);
		}
		if (right && !right.filled) {
			neighbours.push(right);
		}
		if (bottom && !bottom.filled) {
			neighbours.push(bottom);
		}
		if (left && !left.filled) {
			neighbours.push(left);
		}
		if (topRight && !topRight.filled) {
			neighbours.push(topRight);
		}
		if (topLeft && !topLeft.filled) {
			neighbours.push(topLeft);
		}
		if (bottomRight && !bottomRight.filled) {
			neighbours.push(bottomRight);
		}
		if (bottomLeft && !bottomLeft.filled) {
			neighbours.push(bottomLeft);
		}

		if (neighbours.length > 0) {
			let r = floor(random(0, neighbours.length));
			return neighbours[r];
		} else {
			return undefined;
		}
	};

	function index(i, j) {
		if (i < 0 || j < 0 || i > width - 1 || j > height - 1) {
			return -1;
		}
		return i + j * width;
	}
}

function generate() {
	clear();

	console.log("generate() has been summoned!");
	//iterate over rows and columns and construct a grid[] containing Cell objects
	for (let j = 0; j < height; j++) {
		for (let i = 0; i < width; i++) {
			grid.push(new Cell(i, j));
		}
	}

	//iterate over RGB values and construct an array of all rgb permutations
	for (var r = 0; r < 255; r += 8) {
		for (var g = 0; g < 255; g += 8) {
			for (var b = 0; b < 255; b += 8) {
				colours.push(color(r, g, b));
			}
		}
	}

	//set current to a random starting point to begin tracing a path from
	current = grid[floor(random(0, grid.length))];

	//if there are still colours to be deposited, keep going
	while (colours.length > 0) {
		current.trace();

		var next = current.checkNeighbours();
		if (next) {
			//if there is an available neighbour, get to it!
			stack.push(current);

			current = next;
		} else if (stack.length > 0) {
			//if no available neighbour, jump back a step
			current = stack.pop(); //backtracking!
		}
	}
	
	grid = [];
	colours = [];
}

function doubleClicked() {
	save("allcolours_.png");
}
