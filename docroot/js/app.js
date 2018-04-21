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
  const heartOne = document.querySelector('.heart-one');
  const heartTwo = document.querySelector('.heart-two');
  const heartThree = document.querySelector('.heart-three');
  const scoreChange = document.querySelector('.score');
  const allHearts = document.querySelectorAll('.far');
  scoreChange.innerHTML = `score: ${player.score}`;

  if (collision < player.r + this.r) {
    player.x = 202;
    player.y = 405;
    player.life -= 1;
    if (player.score > 0) {
      player.score -= 50;
    }
    if (player.life === 2) {
      heartThree.classList.replace('fas', 'far');
    }
    if (player.life === 1) {
      heartTwo.classList.replace('fas', 'far');
    }
    if (player.life === 0) {
      // heartOne.classList.remove('fas');
      // heartOne.classList.add('far');
      confirm(`your score is ${player.score}`);
      player.life = 3;
      player.score = 0;
      allHearts.forEach((element) => {
        element.classList.remove('far');
        element.classList.add('fas');
      });
    }
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
    this.life = 3;
    this.score = 0;
    this.canUpdate = true;
    this.player = 'images/char-cartman-fat.png'
  }
  update() {
    if (this.canUpdate === true && this.y < 0) {
      this.canUpdate = false;
      setTimeout(() => {
        this.x = 202;
        this.y = 405;
        this.score += 100;
        this.canUpdate = true;
      }, 500);
    }

  }
  render() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
  }

  handleInput(key) {
    if (player.canUpdate === true) {
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
}


const enemyLocationY = [63, 147, 230];
const player = new Player(202, 410);
const allEnemies = enemyLocationY.map(locationY => new Enemy(0, locationY, 150));


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
