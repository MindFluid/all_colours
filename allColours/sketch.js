let colours = [];
let width = 256;
let height = 128;

let grid = [];
let current;

let stack = []; //for backtracking algorithm

function setup() {
  createCanvas(width, height);
  background(0);

  loadPixels();

  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      grid.push(new Cell(i, j));
    }
  }

  for (var r = 0; r < 255; r += 8) {
    for (var g = 0; g < 255; g += 8) {
      for (var b = 0; b < 255; b += 8) {
        colours.push(color(r, g, b));
      }
    }
  }

  current = grid[0];

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
}

function draw() {
  updatePixels();
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.filled = false;

  this.trace = function () {
    var x = this.i;
    var y = this.j;

    if (colours.length > 0 && !this.filled) {
      let colour = colours.pop();
      set(x, y, colour);
      this.filled = true;
    }
  };

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

function doubleClicked() {
  save("allcolours_.png");
}
