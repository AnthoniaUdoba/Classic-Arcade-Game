// Enemies our player must avoid
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 100 + Math.floor(Math.random() * 400);
    // The image/sprite for our enemies
    this.sprite = "images/enemy-bug.png";
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    //every enemy has differnet speed
    this.x += this.speed * dt;
    if (this.x > 550) {
      this.x = -100;
    }
    if (
      this.x < player.x + 50 &&
      this.x > player.x - 50 &&
      this.y < player.y + 30 &&
      this.y > player.y - 30
    ) {
      player.x = 200;
      player.y = 400;
    }
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = "images/char-horn-girl.png";
  }
  reset() {
    this.x = 200;
    this.y = 400;
  }
  handleInput(move) {
    if (move == "right" && this.x < 400) {
      this.x += 100;
    }
    if (move == "left" && this.x >= 100) {
      this.x -= 100;
    }
    if (move == "up" && this.y > 1) {
      this.y -= 83;
    }
    if (move == "down" && this.y < 400) {
      this.y += 83;
    }
  }
  update() {
    //collisioncheck
    allEnemies.forEach((enemy) => {
      if (
        this.y === enemy.y &&
        enemy.x + 50 > this.x &&
        enemy.x < this.x + 50
      ) {
        this.reset();
      }
    });
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(0, 67), new Enemy(0, 150), new Enemy(0, 233)];
let player = new Player(210, 400);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
