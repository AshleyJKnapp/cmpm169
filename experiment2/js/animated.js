class BouncingObj {
  constructor(img, startX, startY, minX, maxX, speed) {
    this.img = img;
    this.x = startX;
    this.y = startY;
    this.minX = minX;
    this.maxX = maxX;
    this.flipX = false;
    this.moveRate = speed;
    this.lastUpdate = 0;
    // this.img.resize(0.2 * this.img.width, 0.2 * this.img.height);
  }

  updateMovement(t) {
    let elapsed = (t - this.lastUpdate);
    this.lastUpdate = t;
    elapsed *= 100;
    // console.log(t);

    imageMode(CENTER);
    image(this.img, this.x, this.y);

    if (this.x > this.maxX){
      this.flipX = true;
    } else if (this.x <= this.minX){
      this.flipX = false;
    }
    
    if (this.flipX == false) {
      this.x += this.moveRate * elapsed;
    } else if(this.flipX == true){
      this.x -= this.moveRate * elapsed;
    }
  }
}
