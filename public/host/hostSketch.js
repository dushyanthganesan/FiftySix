function setup() {
	// canvas //
	w = windowWidth;
  h = windowHeight;
	createCanvas(w, h);
}	

function draw() {
	background(0);
	ellipse(mouseX, mouseY, 30, 30);
	fill(color(0,255,0));


}

