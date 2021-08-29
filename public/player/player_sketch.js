////////////////
// variables //
///////////////
let socket;  // socket app
let stages = []
stages[0] = 'name'
stages[1] = 'waitingForHost'
let stage; // stage variable

//images
let cardbackImgs = [];
let cardbackOffet;

// stage: enter name
let nameInput; // name input dom
let nameSubmit; // name submit button


//////////////
// preload //
/////////////
function preload() {
  titleFont = loadFont('../resources/fonts/AlfaSlabOne-Regular.ttf');
  cardbackImgs[0] = loadImage('../resources/pictures/cardback-blue.png');
	cardbackImgs[1] = loadImage('../resources/pictures/cardback-red.png');
}

//////////////////
///// SETUP //////
//////////////////
function setup() {
  // canvas //
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);
  pixelDensity(1)  // avoids mobile slowdowns

  // socket
  socket = io.connect('http://localhost:3000');

  // name input
  stage = stages[0] // set starting stage
  nameInputDom(true);

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
      text("Enter your name:", w/2, h/2 - 60);

    // end stage: name

    case "waitingForHost":  // joined the game, now waiting for host and other players
      // render cardbacks
      image(cardbackImgs[0], cardbackOffet, cardbackOffet);
      image(cardbackImgs[1], w-cardbackOffet, cardbackOffet);
      image(cardbackImgs[1], cardbackOffet, h-cardbackOffet);
      image(cardbackImgs[0], w-cardbackOffet, h-cardbackOffet);

      // move cardbacks
      if (cardbackOffet > -500) {
        cardbackOffet -= 6;
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

// STAGE 1: NAME IMPUTTING
// Name input and submit
function nameInputDom(show) {
  if (show) {
    size = 3/8*w;
    nameInput = createInput('');
    nameInput.id('nameInput')
    nameInput.position(w/2 - size/2, h/2);
    nameInput.size(size);
    nameInput.attribute('autocomplete', 'off')

    nameSubmit = createButton("submit");
    nameSubmit.id("nameSubmit");
    nameSubmit.position(w/2, h/2 + 120);
    nameSubmit.mousePressed(() => {
      if (nameInput.value() != "") {
        console.log(nameInput.value());
        nameInputDom(false);
      }
    })

  } else {
    nameInput.hide();
    nameSubmit.hide();
    stage = stages[1]
  }
}