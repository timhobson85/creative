const hexagon = (posX, posY, radius) => {
  const rotAngle = 360 / 6;
  beginShape();
  for (let i = 0; i < 6; i++) {
    const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle);
    vertex(thisVertex.x, thisVertex.y);    
  };
  endShape(CLOSE);
};

const pointOnCircle = (posX, posY, radius, angle) => {
  const x = posX + radius * cos(angle);
  const y = posY + radius * sin(angle);
  return createVector(x, y);
};

const randomSelectTwo = () => {
  const rando = random(1);
  let numShapes;
  if (rando > 0.5) {
    return true;  
  } else {
    return false;
  };
};

const getRandomFromPalette = () => {
  const rando2 = floor(random(0, PALETTE.length));
  return PALETTE[rando2]
};

const testLines = (state) => {
  state.numShapes = randomSelectTwo() ? SIDES : SIDES * 2;
  state.angle = 360 / state.numShapes
  const strokeColor = getRandomFromPalette();
  
  return({
    name: 'testLines',
    state,
    render: () => {
      stroke(strokeColor);
      noFill(0);
      push(); 
        if (state.lines) {
          for (let i = 0; i < 360 - 0.1; i+= state.angle) {
            line(0,0,0,state.CRYSTAL_SIZE/2)
            rotate(state.angle);
          }
        }
        if (state.circle) {
          ellipse(0,0, state.CRYSTAL_SIZE, state.CRYSTAL_SIZE)
        }
      pop();
    }
  })
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
    init: (props) => outlineShape({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'CenteredShape',
    init: (props) => centeredShape({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'Circles',
    init: (props) => circles({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'SimpleLines',
    init: (props) => simpleLines({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'DottedLines',
    init: (props) => dottedLines({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'RingOfShapes',
    init: (props) => ringOfShapes({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'SteppedHexagons',
    init: (props) => steppedHexagons({
      ...props,
      ...setState(state)
    }),
    weight: 0.7
  },
  {
    name: 'TestLines',
    init: (props) => testLines({
      lines:false,
      circle:false,
      ...props,
      ...setState(state)
    }),
    weight: 1
  }
];

const makeCrystal = (pos) =>{
  const layers = layerConstructors.map(lcon => {
    let picker = random(1);
    const draw = picker > lcon.weight
      return lcon.init({
        pos,
        draw
      });
  });
  return layers;
};

const drawCrystal = (crystal) =>{
  crystal.forEach(layer => {
    if (layer.state.draw) {
      push();
      translate(layer.state.pos.x, layer.state.pos.y);
      layer.render();
      pop();
    }
  })
}