let numberOfCards = 8;
let phone = false;
let cards = [];
let cardbackImgs = [];
let col;

function preload() {
	titleFont = loadFont('resources/fonts/AlfaSlabOne-Regular.ttf');
	cardbackImgs[0] = loadImage('resources/pictures/cardback-blue.png');
	cardbackImgs[1] = loadImage('resources/pictures/cardback-red.png');
}

function setup() {
	// canvas //
	w = windowWidth;
  h = windowHeight;
	createCanvas(w, h);
	showButtons();

	if (h > w) {
		phone = true;
		numberOfCards = 2;
	}

	imageMode(CENTER)

	for (let i = 0; i < numberOfCards; i++) {
    let x = random(w);
    let y = random(h);
    let width = random(200, 220);
    let speed = random(0.7, 1.8);
		if (phone) {
			col = i;
			width = 400;
		} else {
    	col = floor(random(0, 2));
		}
		if (col == 0) {speed = -speed;}
    cards.push(new Cardback(x, y, width, speed, cardbackImgs[col], h));
  }

}	

function draw() {
	background(255);

	// cards
	for (let i = 0; i < cards.length; i++) {
		cards[i].move();
		cards[i].show();
	}

	// Fifty Six text
	textFont(titleFont);
	textAlign(CENTER)
	textSize(170);
	fill(color(0))
	text('Fifty Six', w/2, h/4);

}

function buttonMaker(label, posx, posy, buttonw, buttonh) {
	let button = createButton(label);
	button.position(posx-buttonw/2, posy-buttonh/2);
	button.size(buttonw, buttonh);
	
	return button;
}

function showButtons(){
  hostButton = buttonMaker('Host', w-150 , h-70, 150, 70);
  hostButton.id('hostButton');
  hostButton.class('fade-in');
	document.getElementById('hostButton').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/host';
  });
  
  playerButton = buttonMaker('New Player', w/2, 5*h/8, 500, 100);
  playerButton.id('playerButton');
  playerButton.class('fade-in'); 
	document.getElementById('playerButton').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/player';
  });
}