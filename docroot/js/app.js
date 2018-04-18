// Enemies our player must avoid
var Enemy = function (x, y, v, r) {
  this.x = x;
  this.y = y;
  this.v = Enemy.getRandomVelocity();
  this.r = 35;
  this.sprite = 'images/enemy-bug.png';
};

Enemy.getRandomVelocity = function getRandomVelocity() {
  return Math.floor(Math.random() * 500) + 200;
};

Enemy.prototype.update = function (dt) {
  this.x += this.v * dt;

  if (this.x > 505) {
    this.x = -100;
    this.v = Enemy.getRandomVelocity();
  }

  const collision = getDistance(this.x, this.y, player.x, player.y);

  if (collision < player.r + this.r) {
    player.x = 202;
    player.y = 405;
    if (player.score > 0) {
      player.score -= 100;
    }
    console.log(player.score)
  }
  if(player.y < 0) {
    player.x = 202;
    player.y = 405;
    player.score += 100;
    console.log(player.score)
  }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
  constructor(x, y, r, life, score) {
    this.x = x;
    this.y = y;
    this.r = 35;
    this.life = 5;
    this.score = 0;
    this.player = 'images/char-cartman-fat.png'
  }
  update() {

  }
  render() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
  }

  handleInput(key) {
    if (key === 'right' && this.x < 405) {
      this.x += 102;
    }
    if (key === 'left' && this.x > 0) {
      this.x -= 102;
    }
    if (key === 'up' && this.y > 0) {
      this.y -= 83;
    }
    if (key === 'down' && this.y < 405) {
      this.y += 83;
    }
  }
}


let allEnemies = [];
const enemyLocationY = [63, 147, 230];
const player = new Player(202, 410, 3, 0);
enemyLocationY.forEach(locationY => {

  let enemy = new Enemy(0, locationY, 150);
  allEnemies.push(enemy);
})


document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
