
const CRYSTAL_SIZE = 350;
const SIDES = 6;

// layout
const MARGIN = CRYSTAL_SIZE / 2;
const COLUMNS = 1;
const ROWS = 1;
const GRIDBOX = CRYSTAL_SIZE ;
const START = (CRYSTAL_SIZE / 2) + MARGIN;

let PALETTE = [];
let ALL_CRYSTALS = [];


// test - partheitc.

function setup() {
  const totalX = START + GRIDBOX * COLUMNS;
  const totalY = START + GRIDBOX * ROWS;
  createCanvas(totalX, totalY, SVG); // height, width, and export type
  PALETTE = [
    color(255, 153, 255), //pink
    color(204, 255, 255), //blue
    color(255, 255, 153), //dustyyellow
    color(102, 255, 102) //green
  ];
  noLoop(); // only one render
  angleMode(DEGREES); // makes the correct rotate value
  rectMode(CENTER); // sets co-ordinates from centre, not from top left.
};

function draw() {
  // go to a point on teh screen and draw a crystal , continue to do this until we run out of room
  background(32,32,32);
  ALL_CRYSTALS = [];
  for (let x = 0; x < COLUMNS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const posX = START + (x * GRIDBOX);
      const posY = START + (y * GRIDBOX);
      const crystal = makeCrystal({x: posX,y: posY});
      console.log(crystal)
      ALL_CRYSTALS.push(crystal);
    };
  };
  
  ALL_CRYSTALS.forEach((crystal, i) =>{
    drawCrystal(crystal)
  })
  
};


