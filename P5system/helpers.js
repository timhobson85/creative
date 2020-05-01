function hexagon(posX, posY, radius) {
  const rotAngle = 360 / 6;
  beginShape();
  for (let i = 0; i < 6; i++) {
    const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle);
    vertex(thisVertex.x, thisVertex.y);    
  };
  endShape(CLOSE);
};

function pointOnCircle(posX, posY, radius, angle) {
  const x = posX + radius * cos(angle);
  const y = posY + radius * sin(angle);
  return createVector(x, y);
};

function randomSelectTwo() {
  const rando = random(1);
  let numShapes;
  if (rando > 0.5) {
    return true;  
  } else {
    return false;
  };
};

function getRandomFromPalette() {
  const rando2 = floor(random(0, PALETTE.length));
  return PALETTE[rando2]
};

function testLines() {
  strokeWeight(3);
  let numShapes = randomSelectTwo() ? SIDES : SIDES * 2;

  const strokeColor = getRandomFromPalette();
  
  
  noFill(0);
  push(); // push pop only applies this transform/rotate to what's inside. then goes back
  translate(width/2, height/2); // this moves the x,y 0,0 to the centre(or whereever you set it)
  stroke(PALETTE[0]); 
    ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
    stroke(strokeColor);
    const angle = 360 / numShapes;
    for (let i = 0; i < numShapes; i++) {
      line(0, 0, 0, CRYSTAL_SIZE/2);
      rotate( angle );
    };
    pop();
};

function myTriangle(center, radius, direction) {
  if (direction) {
    beginShape();
    vertex(center + radius * cos(0), radius * sin(0));
    vertex(center + radius * cos(120), radius * sin(120));
    vertex(center + radius * cos(240), radius * sin(240));
    endShape(CLOSE);
  } else {
    beginShape();
    vertex(center + radius * cos(180), radius * sin(180));
    vertex(center + radius * cos(300), radius * sin(300));
    vertex(center + radius * cos(60), radius * sin(60));
    endShape(CLOSE);
  };
};

const layerConstructors = [
  {
    name: 'OutlineShape',
    init: () => new OutlineShape(),
    weight: 0.3
  },
  {
    name: 'CenteredShape',
    init: () => new CenteredShape(),
    weight: 0.3
  },
  {
    name: 'Circles',
    init: () => new Circles(),
    weight: 0.3
  },
  {
    name: 'SimpleLines',
    init: () => new SimpleLines(),
    weight: 0.3
  },
  {
    name: 'DottedLines',
    init: () => new DottedLines(),
    weight: 0.3
  },
  {
    name: 'RingOfShapes',
    init: () => new RingOfShapes(),
    weight: 0.3
  },
  {
    name: 'SteppedHexagons',
    init: () => new SteppedHexagons(),
    weight: 1
  },
  {
    name: 'TestLines',
    init: () => new TestLines(),
    weight: 1
  }
];