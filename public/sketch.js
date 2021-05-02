function openFullscreen(elem) {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) { /* Safari */
		elem.webkitRequestFullscreen();
	}
}

let elem;

function setup() {
	// canvas //
	w = windowWidth;
  h = windowHeight;
	createCanvas(w, h);
	elem = document.getElementById("defaultCanvas0");
}	

function draw() {
	background(0);
	ellipse(mouseX, mouseY, 30, 30);
	fill(color(0,255,0));


}

function mousePressed() {
 openFullscreen(elem);
}