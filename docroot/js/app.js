// Enemies our player must avoid
var Enemy = function (x, y, v) {
  this.x = x;
  this.y = y;
  this.v = v;
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  this.v = Math.floor((Math.random() * 500) + 100);
  this.x += this.v * dt;
  if (this.x > 505) {
    this.x = -100;
  }


  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-cartman-fat.png'
  }
  update() {

  }
  render() {
      ctx.drawImage(Resources.get(this.player), this.x, this.y);
  }

  handleInput(key) {
    if(key === 'right' && this.x < 405) {
      this.x += 102;
    }
    if(key === 'left' && this.x > 0) {
      this.x -= 102;
    }
    if(key === 'up' && this.y > 0) {
      this.y -= 83;
    }
    if(key === 'down' && this.y < 405) {
      this.y += 83;
    }
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
const enemyLocationY = [63, 147, 230];
const player = new Player(202, 410);

enemyLocationY.forEach(locationY => {
 let enemy = new Enemy (0, locationY, 150);
  allEnemies.push(enemy);
})


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
