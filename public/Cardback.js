class Cardback {
  constructor(x, y, w, speed, img, windowHeight) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = 1.39 * w;
    this.speed = speed;
    this.wh = windowHeight;
    this.card = img;
  }

  move() {
    this.y -= this.speed;
    if (this.y <= -this.h && this.speed > 0) {
      this.y = this.wh + this.h / 2;
    }
    if (this.y >= this.wh + this.h && this.speed < 0) {
      this.y = -this.h / 2;
    }
  }

  show() {
    image(this.card, this.x, this.y, this.w, this.h);
  }

  update() {
    this.move();
    this.show();
  }
}
