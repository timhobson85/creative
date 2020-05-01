
const CRYSTAL_SIZE = 500;
const SIDES = 6;
let PALETTE = [];

const layers = [];


function setup() {
  createCanvas(550, 550, SVG); // height, width, and export type
  PALETTE = [
    color(255, 52, 154), //pink
    color(4, 0, 152) //blue
  ]
  noLoop(); // only one render
  angleMode(DEGREES); // makes the correct rotate value
  rectMode(CENTER); // sets co-ordinates from centre, not from top left.
}

function draw() {

  layerConstructors.forEach(lcon => {
    let picker = random(1);
    if (picker > lcon.weight) {
      layers.push(lcon.init());
    };
  });

  console.log(layers)

  layers.forEach(layer => {
    layer.render();
  });

};
