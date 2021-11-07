/////////////////
/// variables ///
/////////////////
let socket;  // socket app
let stage = "name"; // stage variable


//images
let cardbackImgs = [];

// stage: "name"
let nameInput; // name input dom
let nameSubmit; // name submit button
let player;


//////////////
// preload //
/////////////
function preload() {
  titleFont = loadFont('../resources/fonts/AlfaSlabOne-Regular.ttf');
  cardbackImgs[0] = loadImage('../resources/images/cardback-blue.png');
	cardbackImgs[1] = loadImage('../resources/images/cardback-red.png');
}

//////////////////
///// SETUP //////
//////////////////
function setup() {
  // canvas //
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);
  pixelDensity(1);  // avoids mobile slowdowns

  // socket
  socket = io.connect('192.168.1.67:3000');
  
  // update player object
  socket
  .on("update player", (data) => {
      console.log(data);
      player = new Player(
        data.name, 
        data.number, 
        data.team, 
        data.color, 
        data.cards, 
        data.isTurn
      );
    })
    
    // update stage in state machine
    .on("stage", (data) => {
      stage = data;
    });

  player = new Player(" ");
  // name input
  nameInputDom(true);
  showCards = true;

	imageMode(CENTER)
}	


////////////////////
////// DRAW ////////
///////////////////
function draw() {
  background(0);

  switch (stage) {
    // Main stages

    case "name":  
    // name inputting stage //
      // render cardbacks
      cardbackOffet = 60;
      image(cardbackImgs[0], cardbackOffet, cardbackOffet);
      image(cardbackImgs[1], w-cardbackOffet, cardbackOffet);
      image(cardbackImgs[1], cardbackOffet, h-cardbackOffet);
      image(cardbackImgs[0], w-cardbackOffet, h-cardbackOffet);

      // Fifty Six text
      textFont(titleFont);
      textAlign(CENTER)
      textSize(160);
      fill(color(255));
      text('Fifty Six', w/2, h/3);

      // enter name text
      textSize(45);
      text("Enter your name:", w/2, h/2 - 120);

    // end stage: name

    case "waitingForHost":  // joined the game, now waiting for host and other players
      // render cardbacks
      rectMode(CENTER);
      c = color(player.color)
      fill(color(c));
      rect(w/2, 45, w, 120);
      textSize(45);
      fill(color(255, 255, 255, 210));
      text(player.name, w/2, 70);

      if (showCards) {
        image(cardbackImgs[0], cardbackOffet, cardbackOffet);
        image(cardbackImgs[1], w-cardbackOffet, cardbackOffet);
        image(cardbackImgs[1], cardbackOffet, h-cardbackOffet);
        image(cardbackImgs[0], w-cardbackOffet, h-cardbackOffet);

        // move cardbacks
        if (cardbackOffet > -500) {
          cardbackOffet -= 6;
        } else {
          showCards = false;
        }
      }

      // Fifty Six text
      textFont(titleFont);
      textAlign(CENTER)
      textSize(160);
      fill(color(255));
      text('Fifty Six', w/2, h/3);

  }
}


////////////////////////////
////// FUNCTIONS ///////////
///////////////////////////

// STAGE 1: NAME INPUTTING
// Name input and submit
function nameInputDom(show) {
  if (show) {
    size = 3/8*w;
    nameInput = createInput('');
    nameInput
      .id('nameInput')
      .position(w/2 - size/2, h/2-60)
      .size(size)
      .attribute('autocomplete', 'off');

    nameSubmit = createButton("submit");
    nameSubmit
      .id("nameSubmit")
      .position(w/2, h/2 + 60)
      .mousePressed(() => {
        if (nameInput.value() != "") {
          socket.emit('new player', nameInput.value());
          nameInputDom(false);
        }
      });
  } else {
    nameInput.hide();
    nameSubmit.hide();
  }
}

// Classes
class Player {
  constructor(
    name, number=0, team="", color="#000000", cards=[], isTurn=false
    ) {
    this.name = name;
    this.number = number;
    this.team = team;
    this.color = color;
    this.cards = cards;
    this.isTurn = isTurn;
  }
}