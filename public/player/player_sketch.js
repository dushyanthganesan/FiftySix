////////////////
// variables //
///////////////
let socket;  // socket app
let stage; // stages

//images
let cardbackImgs = [];

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

////////////
// setup //
///////////
function setup() {
  // canvas //
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);

  // socket
  socket = io.connect('http://localhost:3000');

  // name input
  stage = "name" // set starting stage: get name
  nameInputDom(true);

	imageMode(CENTER)
}	


//////////
// draw //
//////////
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
      tint(255, 127);

      // Fifty Six text
      textFont(titleFont);
      textAlign(CENTER)
      textSize(170);
      fill(color(255));
      text('Fifty Six', w/2, h/4);

      // enter name text
      textSize(30);
      text("Enter your name:", w/2, h/2 - 60);

    // end stage: name

    case "waitingForHost":  // joined the game, now waiting for host and other players

  }

}

// Name input and submit
function nameInputDom(show) {
  if (show) {
    size = w/3;
    nameInput = createInput('');
    nameInput.id('nameInput')
    nameInput.position(w/2 - size/2 - 30, h/2);
    nameInput.size(size);

    nameSubmit = createButton("submit");
    nameSubmit.id("nameSubmit");
    nameSubmit.position(w/2 + size/2 + 10, h/2);

  } else {
    nameInput.hide();
  }
}