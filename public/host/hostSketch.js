let cardbackImgs = [];
let titleFont;
let numberOfCards = 2;
let cards = [];
let stage;
let colors = ["#976391","#6a994e","#40798c","#e09f3e","#32292f", "#d9594c", "#000000"];
let players = [];
let playedCards = [];
let title = "Fifty Six";

function preload() {
  titleFont = loadFont('../resources/fonts/AlfaSlabOne-Regular.ttf');
  cardbackImgs[0] = loadImage('../resources/images/cardback-blue.png');
  cardbackImgs[1] = loadImage('../resources/images/cardback-red.png');
	QR = loadImage('../resources/images/QR.png')
	
}

function setup() {
	// canvas //
	w = windowWidth;
  h = windowHeight;
	createCanvas(w, h);
	pixelDensity(1)  // avoids mobile slowdowns

	// sockets /////////////////////////////////
  socket = io.connect('192.168.1.67:3000');
	socket.emit("new host", "hello");
	socket
		.on("update players", (data) => {
		players = data.players;
		playedCards = data.playedCards;
		})

		.on("host stage", (data) => {
			stage = data;
		})

		.on("restart", (data) => {
			console.log("socket restart");
			stage = data;
		});

///////////////////////////////////////////////

// restart button
restartButton = createButton("restart game");
restartButton
	.id("restartButton")
	.position(w-80, 30)
	.mousePressed(() => {
		socket.emit("restart", "restart");
	});


//initialize cardback images
	let col;
	imageMode(CENTER)
	for (let i = 0; i < numberOfCards; i++) {
		let x = 0;
    let width = 210;
		let y = (i*width)%h;
    let speed = 1.5;
    if (i%2 == 0) {
			col = 0;
			speed = -speed;
			x = width;
		} else {
			col = 1;
			x = w - width;
		}
    cards.push(new Cardback(x, y, width, speed, cardbackImgs[col], h));
  }
	QR.resize(w/4, 0);
	stage = "wait for players";
  angleMode(DEGREES);
  angles = [10, -9, 20, 9, -17, -2];
}	

function draw() {
	background(240);
	switch (stage) {
    // Main stages

    case "wait for players":
			// cards
			for (let i = 0; i < cards.length; i++) {
				cards[i].update();
			}
		
			imageMode(CENTER)
			image(QR, w/2, 3*h/5);
			

			// Fifty Six text
			textFont(titleFont);
			textAlign(CENTER);
			textSize(170);
      fill(color(0,0,0,230));
			text(title, w/2-3, h/5+3);
			fill(color(colors[players.length]));
			text(title, w/2, h/5);
      break;
		// end wait for players

    case "players joining":
      // Fifty Six text
			textFont(titleFont);
			textAlign(CENTER);
			textSize(170);
      if (players.length < 6) {
        fill(color(0,0,0,230));
			  text(title, w/2-3, h/5+3);
      }
			fill(color(colors[players.length]));
			text(title, w/2, h/5);
      
      // QR
      imageMode(CENTER);
			image(QR, w/4, 3*h/5);
      textSize(45);
      textAlign(LEFT);
      cardbackImgs[0].resize(100,0);
      cardbackImgs[1].resize(100,0);
      for (i = 0; i < players.length; i++){
        if (i%2 == 0) {
          push();
          translate(w/2+20, h/2 + 50*i-5);
          rotate(angles[i]);
          image(cardbackImgs[0], 0, 0);
          pop();
        } else {
          push();
          translate(w/2+20, h/2 + 50*i-5);
          rotate(angles[i]);
          image(cardbackImgs[1], 0, 0);
          pop();
        }
        fill(color(colors[i]));
        text(`${players[i]} has joined!`, w/2 + 100, h/2+50*i);
      }

      break;
    // end players joining

		case "restart":
			stage = "wait for players";
			location.reload();
      break;
		// end restart

	}

}
