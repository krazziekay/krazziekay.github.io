(function() { 

	var intoRadian = Math.PI / 180; 
	var gameSpeed = 10;
	var asteroidMovementFactor = 0.1;
	var alienMovementFactor = 0.1;
	var bossMovementFactor = 0.1;
	var powerUpMovementFactor = 1;
	var laserShotSpeed = 3;
	var fireShotSpeed = 2;

	var asteroidRandomNumberFactor = 99;
	var alienFactor = 777;
	var sonicWaveFactor = 777;
	var alienShootingFactor = 555;
	var healthFactor = 999;
	var fireWorksFactor = 1111;
	
	var angle = 0;
	var themeSong;
	var sonicWavePowerHit;
	var laserCounter = 0;
	var asteroidCounter = 0;
	var asteroidArray = [];
	var alienArray = [];
	var alienLaserShotArray = [];
	var sonicWaveArray = [];
	var healthArray = [];
	var laserArray = [];
	var fireWorksArray = [];
	
	var cancelOutButton = false;
	var pause = false;
	var showScore = 0;
	var highScore = (window.localStorage.getItem("highScore") != null)?window.localStorage.getItem("highScore"):0;
	var showSonicWaves = 2;
	var showFireWorks = 0;

	var asteroidCapacity = 6;
	var alienCapacity = 1;
	var sonicWaveCapacity = 1;
	var fireWorksCapacity = 1;
	var healthCapacity = 1;

	var earthHealth = 10;
	var gameStart = true;
	var bossAlert = true;
	var mouseAngle = 1;
	var disableMouse = false;

	var boss, bossCreated;
	var bossDead = true;
	var fireShotAlert = true;
	var bossCounter = 0;
	var bossArrivalTime = 1111;
	var bossNumber = 1;

	var earthImage = "images/earth.png";
	var laserImage = "images/laser.png";
	var laserBlinkImage = "images/laser-1.png";
	var laserShotImage = "images/laser-shot.png";
	var alienImage = "images/switcher.png";
	var healthImage = "images/health.png";
	var healthExplosionImage = "images/nuclear-powerup-exploded.png";
	var sonicWaveImage = "images/nuclear-powerup.png";
	var sonicWaveExplosionImage = "images/nuclear-powerup-exploded.png";
	var fireworksImage = "images/fire-works.png";
	var fireworksExplosionImage = "images/nuclear-powerup-exploded.png";
	var asteroidImage = "images/asteroid-2.png";
	var explosionImage = "images/explosion.png";
	var zapImage = "images/zap.png";
	var zappedLaserImage = "images/zapped-laser.png";
	
	var boss1Image = "images/death-star.png";
	var boss1DamagedImage = "images/death-star-damaged.png";
	var boss1DamagedImageTwo = "images/death-star-damaged-too.png";
	var boss2Image = "images/switcher.png";
	var boss2DamagedImage = "images/switcher.png";
	var boss2DamagedImageTwo = "images/explosion.png";
	
	var gameArea = {
		canvas : document.createElement("canvas"),
		setup: function() {
			this.context = this.canvas.getContext("2d");
			this.canvas.style.height = "600px";
			// this.canvas.style.width = "1000px";
			this.canvas.style.width = "75%";
			this.canvas.style.left = "12%";
			this.canvas.style.position = "absolute";
			this.canvas.style.cursor = "crosshair";
			this.canvas.style.backgroundImage = "url('images/bg-stars.png')";
			this.canvas.width = 1000;
			this.canvas.height = 600;
			document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		},
		start : function() {
			this.interval = setInterval(updateGameArea, gameSpeed);
		},
		clear : function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	};

	function Earth() {
		this.radius = 80;    
		this.x = gameArea.canvas.width / 2;
		this.y = gameArea.canvas.height / 2;   
		this.health = earthHealth;
		this.update = function() {
			ctx = gameArea.context;
			ctx.beginPath();
			// ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); 
			// ctx.fillStyle = "yellow";
			// ctx.fill();
			this.image = new Image();
			this.image.src = earthImage;
			ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
			ctx.closePath();
		}
	}

	function Score() {
		this.x = 10;
		this.y = 40;
		this.ctx;
		var that = this;
		this.draw = function(text) {		
			that.ctx = gameArea.context;
			that.ctx.font = "30px Arial";
			that.ctx.fillStyle = "#ffffff";
			that.ctx.fillText("Highscore : " + highScore, this.x, this.y);
			that.ctx.font = "20px Arial";
			that.ctx.fillText(text, this.x, this.y + 30);
		}

		this.update = function() {
			this.text="SCORE: " + showScore;
			that.draw(this.text);
		}
	}

	function Options() {
		var that =this;
		this.draw = function(position) {		
			this.ctx = gameArea.context;

			this.livesImage = new Image();
			this.livesImage.src = healthImage;
			this.liveImageX = position.x;
			this.liveImageY = position.y;
			for(var i = 0; i < earth.health; i++) {
				that.ctx.drawImage(this.livesImage, this.liveImageX - i * 30, this.liveImageY , 25, 25);
			}
			
			this.ctx.font = "15px Arial";
			this.ctx.fillStyle = "#9e9e9e";
			this.ctx.fillText("Sonic Waves : " + showSonicWaves, position.x - (0.1 * gameArea.canvas.width), position.y + (0.08 * gameArea.canvas.height));
			
			this.ctx.font = "10px Arial";
			this.ctx.fillStyle = "#ffffff";
			this.ctx.fillText("Pause : P", position.x - (0.04 * gameArea.canvas.width), position.y + (0.91 * gameArea.canvas.height));
			this.ctx.fillText("Sound : S", position.x - (0.04 * gameArea.canvas.width), position.y + (0.93 * gameArea.canvas.height));
			this.ctx.fillText("Restart : R", position.x - (0.04 * gameArea.canvas.width), position.y + (0.95 * gameArea.canvas.height));
			
		}

		this.update = function() {	
			this.x = gameArea.canvas.width * 0.97;
			this.y = gameArea.canvas.height * 0.03;
			that.draw(this);
		}
	}

	function Message(message) {
		this.ctx = gameArea.context;
		this.ctx.font = "40px Calibri";
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillText(message.title.text, message.title.x, message.title.y);
		this.ctx.font = "20px sans-serif";
		this.ctx.fillStyle = "#87fffd";
		this.ctx.fillText(message.part1.text, message.part1.x, message.part1.y);
		if(message.part2) {
			this.ctx.fillText(message.part2.text, message.part2.x, message.part2.y);
		}
		this.ctx.closePath();
	}

	function GameOver() {
		this.x = 350;
		this.y = 300;
		this.ctx = gameArea.context;
		this.ctx.font = "50px Arial";
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillText("GAME OVER!!", this.x, this.y);
		this.ctx.font = "20px Arial";
		this.ctx.fillText("You failed!", this.x+85, this.y+30);
		this.ctx.closePath();		
	}

	function Laser() {
		// this.x = 550;
		// this.y = 200;
		this.x = gameArea.canvas.width / 2 + 50;
		this.y = gameArea.canvas.height / 2 - 100;   
		this.angle = (1 / 1000);
		this.radius = 20;
		this.ctx;
		var that = this;
		this.draw = function() {		
			that.ctx = gameArea.context;
			that.ctx.beginPath();
			that.image = new Image();
			if(disableMouse){
				if(asteroidFlag % 2 == 0) {	
					that.image.src = zappedLaserImage;
				}
				else {
					that.image.src = laserImage;
				}
			}
			else if(showFireWorks > 0) {
				if(asteroidFlag % 2 == 0) {	
					that.image.src = laserBlinkImage;
				}
				else {
					that.image.src = laserImage;
				}
			}
			else {
				that.image.src = laserImage;
			}
			that.ctx.save();
			that.ctx.translate(that.x - that.radius / 4, that.y - that.radius / 4);
			that.ctx.rotate(mouseAngle + Math.PI * 1.15);
			that.ctx.drawImage(that.image, -that.radius , -that.radius , that.radius * 2, that.radius *  2);
			that.ctx.restore();
			that.ctx.closePath();
		}
		this.update = function() {
			that.ctx = gameArea.context;
			that.x = earth.x + Math.cos(mouseAngle) * distanceFromEarthToLaser;
			that.y = earth.y + Math.sin(mouseAngle) * distanceFromEarthToLaser;
			that.draw();
		}
	}

	function LaserShot(laser) {
		laserCounter++;
		this.name = laserCounter;
		this.x = laser.x ;
		this.y = laser.y ;
		this.angle = (1 / 1000);
		if(laser.boss) {
			this.boss = laser.boss;
			this.radius = 5;
		}
		else {
			this.radius = 2;
		}
		var that = this;	
		this.draw = function(laser) {
			that.ctx = gameArea.context;
			that.ctx.beginPath();
			that.ctx.arc(laser.x , laser.y, laser.radius, 0, 2 * Math.PI);
			that.image = new Image();
			if(laser.boss) {
				that.image.src = zapImage;
			}
			else {
				that.image.src = laserShotImage;
			}
			that.ctx.drawImage(that.image, laser.x - laser.radius, laser.y - laser.radius, laser.radius * 10, laser.radius * 10);
			that.ctx.closePath();		
		}
		this.draw(this);

		this.update = function(shooter) {
			if(shooter.alienShot) {
				shooter.x +=  laserShotSpeed * Math.cos ( utils.getAngle(shooter, earth) );
				shooter.y += laserShotSpeed * Math.sin ( utils.getAngle(shooter,  earth) );
			}
			else if(shooter.bossShot) {
				shooter.x +=  laserShotSpeed * Math.cos ( utils.getAngle(shooter, earth) );
				shooter.y += laserShotSpeed * Math.sin ( utils.getAngle(shooter,  earth) );
			}
			else {
				shooter.x -=  laserShotSpeed * Math.cos ( utils.getAngle(shooter, earth) );
				shooter.y -= laserShotSpeed * Math.sin ( utils.getAngle(shooter,  earth) );
			}
			that.draw(shooter);
		}
	}

	function Alien() {
		var randomPosition = randomizePowerupPosition();
		this.positionFlag = randomPosition.position;
		this.x = randomPosition.x;
		this.y = randomPosition.y;
		this.initialX = this.x;
		this.initialY = this.y;
		this.shootingTime = 0;
		this.radius = 20;	
		this.movementFactor = alienMovementFactor;
		this.imageName =  alienImage;
		this.destroyedCounter = 0;
		this.ctx;

		var that = this;
		this.draw = function(alien) {		
			that.ctx = gameArea.context;
			that.ctx.beginPath();
			that.ctx.arc(alien.x , alien.y, alien.radius, 0, 2 * Math.PI);
			that.image = new Image();
			that.image.src = alien.imageName;
			that.ctx.drawImage(that.image, alien.x - alien.radius, alien.y - alien.radius, alien.radius * 2, alien.radius * 2);		
			that.ctx.closePath();
		}
		this.draw(this);
		this.update = function(alien) {
			that.ctx = gameArea.context;
			this.newPosition = moveAroundEarth(alien);
			alien.x = this.newPosition.x;
			alien.y = this.newPosition.y;
			that.draw(alien);
		}
	}

	function Boss(boss) {
		var randomPosition = randomizePowerupPosition();
		this.positionFlag = randomPosition.position;
		this.x = randomPosition.x;
		this.y = randomPosition.y;
		this.shootingTimeFactor = boss.shootingTimeFactor;
		this.shootingTimeCounter = boss.shootingTimeCounter;
		this.boss = true;
		this.movementFactor = bossMovementFactor;
		this.radius = boss.radius;	
		this.imageName =  boss.imageName;
		this.damagedImage = boss.damagedImage;
		this.damagedImageTwo = boss.damagedImageTwo;
		this.health = boss.health;
		this.killed = boss.killed;
		this.hit = false;
		this.destroyedCounter = boss.destroyedCounter;
		this.ctx;
		var that = this;
		this.draw = function(boss) {		
			that.ctx = gameArea.context;
			that.ctx.beginPath();
			that.image = new Image();
			if(boss.health > 0 && boss.health <= 100 ) {
				that.image.src = boss.damagedImageTwo;
			}
			else if(boss.health > 100 && boss.health <= 300 ) {
				that.image.src = boss.damagedImage;
			}
			else {
				that.image.src = boss.imageName;
			}
			that.ctx.drawImage(that.image, boss.x - boss.radius, boss.y - boss.radius, boss.radius * 2, boss.radius * 2);		
			that.ctx.closePath();
		}
		this.draw(this);
		this.update = function(boss) {
			that.ctx = gameArea.context;
			this.newPosition = moveAroundEarth(boss);
			boss.x = this.newPosition.x;
			boss.y = this.newPosition.y;
			that.draw(boss);
		}
	}

	function Health() {
		this.health = true;
		var randomPosition = randomizePowerupPosition();
		this.positionFlag = randomPosition.position;
		this.x = randomPosition.x;
		this.y = randomPosition.y;
		this.initialX = this.x;
		this.initialY = this.y;
		this.radius = 20;	
		this.imageName =  healthImage;
		this.destroyedCounter = 0;
		this.ctx;

		var that = this;
		this.draw = function(health) {		
			that.ctx = gameArea.context;
			that.ctx.beginPath();
			that.ctx.arc(health.x , health.y, health.radius, 0, 2 * Math.PI);
			that.image = new Image();
			that.image.src = health.imageName;
			that.ctx.drawImage(that.image, health.x - health.radius, health.y - health.radius, health.radius * 2, health.radius * 2);		
			that.ctx.closePath();
		}
		this.draw(this);
		this.update = function(health) {
			that.ctx = gameArea.context;
			this.newPosition = moveAroundRandomly(health);
			health.x = this.newPosition.x;
			health.y = this.newPosition.y;
			that.draw(health);
		}
	}

	function FireWorks() {
		this.fireWorks = true;
		var randomPosition = randomizePowerupPosition();
		this.positionFlag = randomPosition.position;
		this.x = randomPosition.x;
		this.y = randomPosition.y;
		this.initialX = this.x;
		this.initialY = this.y;
		this.radius = 20;	
		this.imageName =  fireworksImage;
		this.destroyedCounter = 0;
		this.ctx;

		var that = this;
		this.draw = function(fireWorks) {		
			that.ctx = gameArea.context;
			that.ctx.beginPath();
			that.ctx.arc(fireWorks.x , fireWorks.y, fireWorks.radius, 0, 2 * Math.PI);
			that.image = new Image();
			that.image.src = fireWorks.imageName;
			that.ctx.drawImage(that.image, fireWorks.x - fireWorks.radius, fireWorks.y - fireWorks.radius, fireWorks.radius * 2, fireWorks.radius * 2);		
			that.ctx.closePath();
		}
		this.draw(this);
		this.update = function(fireWorks) {
			that.ctx = gameArea.context;
			this.newPosition = moveAroundRandomly(fireWorks);
			fireWorks.x = this.newPosition.x;
			fireWorks.y = this.newPosition.y;
			that.draw(fireWorks);
		}
	}

	function SonicWave() {
		this.sonicWave = true;
		var randomPosition = randomizePowerupPosition();
		this.positionFlag = randomPosition.position;
		this.x = randomPosition.x;
		this.y = randomPosition.y;
		this.initialX = this.x;
		this.initialY = this.y;
		this.radius = 20;	
		this.imageName =  sonicWaveImage;
		this.destroyedCounter = 0;
		this.ctx;

		var that = this;
		this.draw = function(sonicWave) {		
			that.ctx = gameArea.context;
			that.ctx.beginPath();
			that.ctx.arc(sonicWave.x , sonicWave.y, sonicWave.radius, 0, 2 * Math.PI);
			that.image = new Image();
			that.image.src = sonicWave.imageName;
			that.ctx.drawImage(that.image, sonicWave.x - sonicWave.radius, sonicWave.y - sonicWave.radius, sonicWave.radius * 2, sonicWave.radius * 2);		
			that.ctx.closePath();
		}
		this.draw(this);
		this.update = function(sonicWave) {
			that.ctx = gameArea.context;
			this.newPosition = moveAroundRandomly(sonicWave);
			sonicWave.x = this.newPosition.x;
			sonicWave.y = this.newPosition.y;
			that.draw(sonicWave);
		}
	}

	function SonicWavePower() {
		this.x = 500;
		this.y = 300;
		this.radius = 12;
		this.ctx;
		var that = this;
		this.draw = function() {		
			that.ctx = gameArea.context;
			that.ctx.beginPath();
			that.ctx.arc(that.x , that.y, that.radius, 0, 2 * Math.PI);
			if(asteroidFlag % 2 == 0) {
				that.ctx.strokeStyle = "#d3d422";
				that.ctx.fillStyle = "rgba(227, 0, 0, 0.39)";
			}
			else {
				that.ctx.strokeStyle = "#779e11";
				that.ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
			}
			that.ctx.lineWidth = 5;
			that.ctx.stroke();
			that.ctx.fill();
			that.ctx.closePath();
		}
		this.draw();
		this.update = function() {
			that.ctx = gameArea.context;
			that.radius += 2;
			that.draw();
		}
	}

	function Asteroid(miniAsteroid) {
		if(miniAsteroid) {
			this.x = miniAsteroid.x;
			this.y = miniAsteroid.y;
			this.radius = miniAsteroid.radius;	
		}
		else{
			var randomPosition = randomizeAsteroidPosition();
			this.positionFlag = randomPosition.position;
			this.x = randomPosition.x;
			this.y = randomPosition.y;
			this.radius = utils.getRandom(40,80);
		}
		this.imageName =  asteroidImage;
		this.movementFactor = asteroidMovementFactor;
		this.destroyedCounter = 0;
		this.ctx;

		var that = this;
		this.draw = function(asteroid) {		
			that.ctx = gameArea.context;
			that.ctx.beginPath();
			that.ctx.arc(asteroid.x , asteroid.y, asteroid.radius, 0, 2 * Math.PI);
			that.image = new Image();
			that.image.src = asteroid.imageName;
			that.ctx.drawImage(asteroid.image, asteroid.x - asteroid.radius, asteroid.y - asteroid.radius, asteroid.radius * 2, asteroid.radius * 2);		
			that.ctx.closePath();
		}
		this.draw(this);
		this.update = function(asteroid) {
			that.ctx = gameArea.context;
			this.newPosition = moveAroundEarth(asteroid);
			asteroid.x = this.newPosition.x;
			asteroid.y = this.newPosition.y;
			that.draw(asteroid);
		}
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function randomizeAsteroidPosition() {
		this.position = utils.getRandom(1, 4);
		if(this.position == 1) {
			this.x = utils.getRandom(0, gameArea.canvas.width);
			this.y = 0;
		}
		else if (this.position == 2) {
			this.x = gameArea.canvas.width;
			this.y = utils.getRandom(0, gameArea.canvas.width);
		}
		else if (this.position == 3) {
			this.x = utils.getRandom(0, gameArea.canvas.width);
			this.y = gameArea.canvas.height;
		}
		else if (this.position == 4) {
			this.x = 0;
			this.y = utils.getRandom(0, gameArea.canvas.height);
		}
		return {
			position: this.position,
			x: this.x,
			y: this.y
		};
	}

	function randomizePowerupPosition() {
		this.position = utils.getRandom(1, 4);
		if(this.position == 1) {
			// console.log("First left corner");
			this.x = 0.05 * gameArea.canvas.width;
			this.y = 0.05 * gameArea.canvas.height;
		}
		else if (this.position == 2) {
			// console.log("First right corner");
			this.x =  0.95 * gameArea.canvas.width;
			this.y =  0.05 * gameArea.canvas.height;
		}
		else if (this.position == 3) {
			// console.log("Bottom left corner");
			this.x = 0.15 * gameArea.canvas.width;
			this.y = 0.95 * gameArea.canvas.height;
		}
		else if (this.position == 4) {
			// console.log("Bottom right corner");
			this.x = 0.15 * gameArea.canvas.width;
			this.y =0.95 * gameArea.canvas.height;
		}
		return {
			position: this.position,
			x: this.x,
			y: this.y
		};
	}

	function moveAroundEarth(movingObject) {
		if(movingObject.radius <= 90) {
			movingObject.moveMentFactor = 0.3;
		}
		if(movingObject.x >= 0 && movingObject.y < gameArea.canvas.height / 2) {
			if(movingObject.x < gameArea.canvas.width / 2 ) {	
				this.x = movingObject.x + movingObject.movementFactor;
				this.y = movingObject.y + movingObject.movementFactor;
			}
			else if(movingObject.x > gameArea.canvas.width / 2 ) {	
				this.x = movingObject.x - movingObject.movementFactor;
				this.y = movingObject.y + movingObject.movementFactor;
			}
			else {
				this.x = movingObject.x;
				this.y = movingObject.y + movingObject.movementFactor;
			}
		}
		else if(movingObject.x >= 0 && movingObject.y > gameArea.canvas.height / 2) {
			if(movingObject.x < gameArea.canvas.width / 2 ) {	
				this.x = movingObject.x + movingObject.movementFactor;
				this.y = movingObject.y - movingObject.movementFactor;
			}
			else if(movingObject.x > gameArea.canvas.width / 2 ) {	
				this.x = movingObject.x - movingObject.movementFactor;
				this.y = movingObject.y - movingObject.movementFactor;
			}
			else {
				this.x = movingObject.x;
				this.y = movingObject.y - movingObject.movementFactor;
			}
		}
		else if (movingObject.x == 0 && movingObject.y == 0) {
			this.x = movingObject.x + movingObject.movementFactor;
			this.y = movingObject.y + movingObject.movementFactor;
		}
		else if (movingObject.x >= 0 && movingObject.y == gameArea.canvas.height / 2) {
			if(movingObject.x < gameArea.canvas.width / 2) {
				this.x = movingObject.x + movingObject.movementFactor;
				this.y = movingObject.y;			
			}
			if(movingObject.x > gameArea.canvas.width / 2) {
				this.x = movingObject.x - movingObject.movementFactor;
				this.y = movingObject.y;			
			}
		}
		else if (movingObject.x == 0 && movingObject.y == gameArea.canvas.height) {
			this.x = movingObject.x + movingObject.movementFactor;
			this.y = movingObject.y - movingObject.movementFactor;
		}
		else if (movingObject.x == gameArea.canvas.width && movingObject.y == 0) {
			this.x = movingObject.x - movingObject.movementFactor;
			this.y = movingObject.y + movingObject.movementFactor;
		}
		else if (movingObject.x == gameArea.canvas.width  && movingObject.y == gameArea.canvas.height / 2) {
			this.x = movingObject.x - movingObject.movementFactor;
			this.y = movingObject.y;
		}
		else if (movingObject.x == gameArea.canvas.width && movingObject.y == gameArea.canvas.height) {
			this.x = movingObject.x - movingObject.movementFactor;
			this.y = movingObject.y - movingObject.movementFactor;
		}

		return {
			x: this.x,
			y: this.y
		};
	}

	function moveAroundRandomly(bonus) {
		if(bonus.initialX >= 0 && bonus.initialY < gameArea.canvas.height / 2) {
			if(bonus.initialX < gameArea.canvas.width / 2 ) {	
				this.x = bonus.x + powerUpMovementFactor;
				this.y = bonus.y;
			}
			else if(bonus.initialX > gameArea.canvas.width / 2 ) {	
				this.x = bonus.x - powerUpMovementFactor;
				this.y = bonus.y;
			}
			else {
				this.x = 0;
				this.y = 0;
			}
		}
		else if(bonus.initialX >= 0 && bonus.initialY > gameArea.canvas.height / 2) {
			if(bonus.initialX < gameArea.canvas.width / 2 ) {	
				this.x = bonus.x + powerUpMovementFactor;
				this.y = bonus.y;
			}
			else if(bonus.initialX > gameArea.canvas.width / 2 ) {	
				this.x = bonus.x - powerUpMovementFactor;
				this.y = bonus.y;
			}
			else {
				this.x =0;
				this.y = 0;
			}
		}
		return {
			x: this.x,
			y: this.y
		};
	}

	function checkBoundaries(gameObject) {
		for(var i = 0; i < gameObject.length; i++) { 
			gameObject[i].update(gameObject[i]);
			if(gameObject[i].x < gameArea.canvas.offsetWidth && gameObject[i].y <= 0) {
				gameObject.splice(i, 1);
			}
			else if(gameObject[i].x >= gameArea.canvas.offsetWidth && gameObject[i].y <= gameArea.canvas.offsetHeight) {
				gameObject.splice(i, 1);
			}
			else if(gameObject[i].x <= gameArea.canvas.offsetWidth && gameObject[i].y >= gameArea.canvas.offsetHeight) {
				gameObject.splice(i, 1);
			}
			else if(gameObject[i].x <= 0 && gameObject[i].y <= gameArea.canvas.offsetHeight) {
				gameObject.splice(i, 1);
			}
		}
	}

	function checkBoundaryForSonicWave() {
		sonicWavePowerHit.update();
		if(sonicWavePowerHit.radius >= gameArea.canvas.offsetWidth) {
			sonicWavePowerHit = null;
		}
	}

	function splitAsteroid(asteroid) {
		if(asteroid.radius <= 60) {
			return;
		}

		var explosion = {
			radius: asteroid.radius,
			x: asteroid.x,
			y: asteroid.y,
			explosion: true
		};
		var asteroid1 = {
			radius: 0,
			x: 0, 
			y: 0
		};
		var asteroid2 = {
			radius: 0, 
			x: 0, 
			y: 0
		};
		var asteroid3 = {
			radius: 0, 
			x: 0, 
			y: 0
		};
		asteroid1.radius = asteroid.radius / 3;
		asteroid2.radius = asteroid.radius / 3;
		asteroid3.radius = asteroid.radius / 3;
		if(asteroid.x >= 0 && asteroid.y < gameArea.canvas.offsetHeight / 2) {
			asteroid1.x = asteroid.x - 40;
			asteroid1.y = asteroid.y - 40;
			asteroid2.x = asteroid.x + 40;
			asteroid2.y = asteroid.y - 40;
			asteroid3.x = asteroid.x;
			asteroid3.y = asteroid.y - 60;
		}
		else if(asteroid.x >= 0 && asteroid.y > gameArea.canvas.offsetHeight / 2) {
			asteroid1.x = asteroid.x - 40;
			asteroid1.y = asteroid.y + 40;
			asteroid2.x = asteroid.x + 40;
			asteroid2.y = asteroid.y + 40;
			asteroid3.x = asteroid.x;
			asteroid3.y = asteroid.y + 60;
		}
		else if (asteroid.x >= 0 && asteroid.y == gameArea.canvas.offsetHeight / 2) {
			if(asteroid.x < gameArea.canvas.offsetWidth / 2) {
				asteroid1.x = asteroid.x - 40;
				asteroid1.y = asteroid.y;
				asteroid2.x = asteroid.x;
				asteroid2.y = asteroid.y + 40;
				asteroid3.x = asteroid.x;
				asteroid3.y = asteroid.y - 40;
			}
			else {
				asteroid1.x = asteroid.x + 40;
				asteroid1.y = asteroid.y;
				asteroid2.x = asteroid.x;
				asteroid2.y = asteroid.y + 40;
				asteroid3.x = asteroid.x;
				asteroid3.y = asteroid.y - 40;
			}
		}

		var miniAsteroid1 = new Asteroid(asteroid1);
		var miniAsteroid2 = new Asteroid(asteroid2);
		var miniAsteroid3 = new Asteroid(asteroid3);
		asteroidArray.push(miniAsteroid1);
		asteroidArray.push(miniAsteroid2);
		asteroidArray.push(miniAsteroid3);
	}

	function checkLaserHit(objectArray) {
		for(var i = 0; i < laserArray.length; i++) {
			for(var j = 0; j < objectArray.length; j++) {
				if ( laserArray[i] && utils.getDistance(objectArray[j], laserArray[i]) < (laserArray[i].radius + objectArray[j].radius) )  {
					(new Audio('assets/sounds/explosion.mp3')).play();
					if(objectArray[j].sonicWave) {	
						objectArray[j].imageName = sonicWaveExplosionImage;
						sonicWaveFactor *= 2;
					}
					else if(objectArray[j].health) {
						objectArray[j].imageName = sonicWaveExplosionImage;
						healthFactor *= 2;
					}
					else if(objectArray[j].fireWorks) {
						objectArray[j].imageName = fireworksExplosionImage;
						fireWorksFactor *= 2;
						if(fireShotAlert) {
							bossAlert = messageDisplayingGap({
								title: {
									text: "Full of energy",
									x: 420,
									y: 100
								},
								part1:  {
									text: "Press F to release the laser blaster!",
									x: 380,
									y: 140
								}
							}, 2000, bossAlert);
							fireShotAlert = false;
						}
					}
					else {
						objectArray[j].imageName = explosionImage;
					}
					objectArray[j].destroyedCounter++;
					laserArray.splice(i, 1);
				}
			}
		}
	}

	function checkLaserHittingBoss(boss) {
		for(var i = 0; i < laserArray.length; i++) {
			if ( laserArray[i] && utils.getDistance(boss, laserArray[i]) < (laserArray[i].radius + boss.radius) )  {
				if (boss.health <= 0) {
					(new Audio('assets/sounds/explosion.mp3')).play();	
					boss.imageName = explosionImage;
					boss.destroyedCounter++;				
				}
				else {
					boss.health -= 50;
				}
				
				laserArray.splice(i, 1);
			}
		}
		return boss;
	}

	function checkLaserHitByAlien() {
		for(var i = 0; i < alienLaserShotArray.length; i++) {
			if ( utils.getDistance(earth, alienLaserShotArray[i]) < (alienLaserShotArray[i].radius + earth.radius) )  {
				alienLaserShotArray.splice(i, 1);
				earth.health -= 1;					
			}
		}
		for(var i = 0; i < bossLaserArray.length; i++) {
			if ( utils.getDistance(earth, bossLaserArray[i]) < (bossLaserArray[i].radius + earth.radius) )  {
				bossLaserArray.splice(i, 1);
				earth.health -= 1;
				disableMouse = true;
				setTimeout( function() {
					disableMouse = false;
				}, 2000);
			}
		}
	}

	function sonicBoom() {
		for(var j = 0; j < asteroidArray.length; j++) {
			if ( utils.getDistance(asteroidArray[j], sonicWavePowerHit) < (asteroidArray[j].radius + sonicWavePowerHit.radius) ) {
				// (new Audio('assets/sounds/explosion.mp3')).play();
				asteroidArray[j].imageName = "images/explosion.png";
				asteroidArray[j].destroyedCounter++;
			}
		}
		for(var j = 0; j < alienArray.length; j++) {
			if ( utils.getDistance(alienArray[j], sonicWavePowerHit) < (alienArray[j].radius + sonicWavePowerHit.radius) ) {
				// (new Audio('assets/sounds/explosion.mp3')).play();
				alienArray[j].imageName = "images/explosion.png";
				alienArray[j].destroyedCounter++;
			}
		}
	}

	function checkSonicBoomHittingBoss(boss) {
		if ( sonicWavePowerHit && utils.getDistance(boss, sonicWavePowerHit) < (boss.radius + sonicWavePowerHit.radius) ) {
			// (new Audio('assets/sounds/explosion.mp3')).play();
			if (boss.health < 0) {
				(new Audio('assets/sounds/explosion.mp3')).play();	
				boss.imageName = explosionImage;
				boss.destroyedCounter++;					
			}
			else {
				boss.health -= 0.5;
			}
		}
		return boss;
	}

	function fireWorkShower(objectArray) {
		for(var j = 0; j < objectArray.length; j++) {
			if( laser.x < gameArea.canvas.width / 2 ) {
				for(var i = 0; i < 10; i++) {
					if(i % 2 == 0){
						laserArray.push( new LaserShot({
							x: laser.x - i * 2,
							y: laser.y - i * 5
						}) );
					}
					else {
						laserArray.push( new LaserShot({
							x: laser.x - i * 2,
							y: laser.y + i * 5
						}) );
					}
				}
			}
			if ( laser.x > gameArea.canvas.width / 2 ){
				for(var i = 0; i < 10; i++) {
					if(i % 2 == 0){
						laserArray.push( new LaserShot({
							x: laser.x + i * 2,
							y: laser.y - i * 5
						}) );
					}
					else {
						laserArray.push( new LaserShot({
							x: laser.x + i * 2,
							y: laser.y + i * 5
						}) );
					}
				}
			} 
			if ( (gameArea.canvas.width / 2 - 150) <= laser.x && (gameArea.canvas.width / 2 + 150) >= laser.x  ) {
				for(var i = 0; i < 10; i++) {
					if(i % 2 == 0){
						laserArray.push( new LaserShot({
							x: laser.x + i * 5,
							y: laser.y
						}) );
					}
					else {
						laserArray.push( new LaserShot({
							x: laser.x - i * 5,
							y: laser.y
						}) );
					}
				}
			}
		}	
	}

	function bossDying(boss) {
		if(boss.destroyedCounter !=0) {
			boss.destroyedCounter++;
			if(boss.destroyedCounter > 50) {
				boss.killed = true;
				bossDead = true;
				return boss;
			}
		} 
		return boss;
	}

	function checkCollision(body) {
		for(var j = 0; j < asteroidArray.length; j++) {
			if ( utils.getDistance(asteroidArray[j], body) < (body.radius + asteroidArray[j].radius) ) {
				gameOver();
			}
		}
		for(var j = 0; j < alienArray.length; j++) {
			if ( utils.getDistance(alienArray[j], body) < (body.radius + alienArray[j].radius) ) {
				gameOver();
			}
		}
		if(bossCreated) {
			if ( utils.getDistance(boss, body) < (body.radius + boss.radius) ) {
				gameOver();
			}
		}
	}

	function animateExplosion(gameObject) {
		for(var i = 0; i < gameObject.length; i++) {
			gameObject[i].update(gameObject[i]);
			if(gameObject[i].destroyedCounter !=0) {
				gameObject[i].destroyedCounter++;
				if(gameObject[i].destroyedCounter > 50) {
					if(gameObject[i].sonicWave) {
						showSonicWaves++;
					}
					if(gameObject[i].health) {
						earth.health = 10;
					}
					if(gameObject[i].fireWorks) {
						showFireWorks++;
					}
					splitAsteroid(gameObject[i]);
					gameObject.splice(i, 1);	

				}
			}
		} 
	}

	function checkEarthHealth() {
		if(earth.health == 0) {
			gameOver();
		}
	}

	function backgroundThemeSong() {
		themeSong = new Audio('assets/sounds/theme-song.wav'); 
		themeSong.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
		themeSong.play();
	}

	function createBoss(boss) {
		this.bossInstance;
		if(bossAlert) {			
			bossAlert = messageDisplayingGap({
				title: {
					text: "Here comes the Boss",
					x: 380,
					y: 100
				},
				part1:  {
					text: "Kill him quick, he can stun your laser!",
					x: 380,
					y: 140
				}
			}, 2000, bossAlert);
		}
		this.bossInstance = new Boss(boss);
		bossNumber++;
		return this.bossInstance;
	}

	function bossUpdate(boss) {
		if (!boss.killed) {
			boss.update(boss);
			boss.shootingTimeCounter++;
			if(boss.shootingTimeCounter % boss.shootingTimeFactor == 0) {
				var bossLaser = new LaserShot(boss);
				bossLaser.bossShot = true;
				bossLaserArray.push(bossLaser);
			}
			this.newBoss = checkLaserHittingBoss(boss);
			this.newBoss = checkSonicBoomHittingBoss(this.newBoss);
			this.newBoss = bossDying(this.newBoss);
		}
		return this.newBoss;
	}

	//Used Promise to return the value from a setTimeout
	function messageDisplayingGap(message, timeGap, checkFlag) {
		gameArea.clear();
		clearInterval(gameArea.interval);
		cancelOutButton = true;
		new Message(message);
	   	var messagePromise = new Promise(function(resolve, reject) {
	   	 	setTimeout(function() {
	   	    	gameArea.interval = setInterval(updateGameArea, gameSpeed);
				resolve(false);
				cancelOutButton = false;
	    	}, timeGap);
	   	});
	   	if(messagePromise) {
			messagePromise.then( function(resolvedValue) {
				return resolvedValue;
			}).catch( function(rejectedValu) {
				return true;
			});	
		}
	}

	function gameSpeedSettings() {
		if(showScore > 25) {//increase asteroid movement to toughen game 
			asteroid.moveMentFactor = 0.2;
			asteroidCapacity = 7;
			alienShootingFactor = 333;
		}
		else if(showScore > 50) {
			asteroid.moveMentFactor = 0.3;
			alienShootingFactor = 111;
			asteroidCapacity = 8;
			alienCapacity = 2;
		}
		else if(showScore > 75) {
			asteroid.moveMentFactor = 0.5;
			asteroidCapacity = 9;
			alienShootingFactor = 111;
			alienCapacity = 3;
		}
		else if(showScore > 100) {
			asteroidCapacity = 10;
			asteroid.moveMentFactor = 1;
			alienShootingFactor = 99;
			alienCapacity = 4;
		}
	}

	//Game Over Condition
	function gameOver() {
		var gameOver = new GameOver();
		themeSong.pause();
		sonicWavePowerHit = null;
		laserArray = [];
		if(showScore > highScore) {//Saving the highscore in localStorage
			window.localStorage.setItem("highScore", showScore);
		}
		clearInterval(gameArea.interval);
	}
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	gameArea.setup();
	var score = new Score();
	var options = new Options();
	var earth = new Earth();
	var laser  = new Laser();
	var utils = new Util();
	var evtHandlers = new EventHandler();
	var distanceFromEarthToLaser = utils.getDistance(laser, earth); 
	var bossLaserArray = [];
	
	window.addEventListener('keyup', evtHandlers.moveSelection);
	window.addEventListener('click', evtHandlers.clickShoot);
	window.addEventListener('mousemove', evtHandlers.getMousePosition);	
	
	gameArea.start();

	var asteroidFlag = 0;

	backgroundThemeSong();


	function updateGameArea() {
		asteroidFlag++;

		gameSpeedSettings();
		gameArea.clear();

		if(gameStart) {	
			gameStart = messageDisplayingGap({
				title: {
						text: "Get Ready to Save Your Planet from the asteroids!",
						x: 100,
						y: 300
					},
				part1:  {
						text: "Use the mouse to move and click to fire!",
						x: 350,
						y: 340
					},
				part2:  {
						text: "Press spacebar to release the wave, be sure to save them!",
						x: 270,
						y: 375
					}
			}, 2000, gameStart);
		}

		//create new asteroid and move it as per the "asteroidRandomNumberFactor"
		if(asteroidFlag % asteroidRandomNumberFactor == 0) { 
			if(asteroidArray.length <= asteroidCapacity) {
				asteroid = new Asteroid();
				asteroidArray.push(asteroid);
			}
		}
		if(asteroidFlag % alienFactor == 0) {
			if(alienArray.length <= alienCapacity) {
				var alien = new Alien(); 	 	 
				alienArray.push(alien);
			}	
		}
		if(asteroidFlag % sonicWaveFactor == 0) {
			if(sonicWaveArray.length <= sonicWaveCapacity) {
				var sonicWave = new SonicWave(); 	 	 
				sonicWaveArray.push(sonicWave);
			}	
		}
		if(asteroidFlag % healthFactor == 0) {
			if(healthArray.length <= healthCapacity) {
				var healthUp = new Health(); 	 	 
				healthArray.push(healthUp);
			}	
		}
		if(asteroidFlag % fireWorksFactor == 0) {
			if(fireWorksArray.length <= fireWorksCapacity) {
				var fireWork = new FireWorks(); 	 	 
				fireWorksArray.push(fireWork);
			}	
		}

		if(!bossDead){
			bossCounter = 0;
		}
		else {
			bossCounter++;
			if(bossCounter % bossArrivalTime == 0) {
				bossDead = false;
				boss = {
					radius: 75,
					imageName: (bossNumber % 2 == 0)?boss1Image:boss2Image,
					damagedImage: (bossNumber % 2 == 0)?boss1DamagedImage:boss2DamagedImage,
					damagedImageTwo: (bossNumber % 2 == 0)?boss1DamagedImageTwo:boss2DamagedImageTwo,
					health:  (bossNumber % 2 == 0)?(1000 * bossNumber):(500 * bossNumber), 
					destroyedCounter: 0,
					killed: false,
					shootingTimeFactor: (bossNumber % 2 == 0)?444:555,
					shootingTimeCounter: 0
				}
				bossCreated = new createBoss(boss);		
				bossArrivalTime *= 2;
			}
		}
		if(bossCreated) {
			boss = bossUpdate(bossCreated);
		}

		for(var i = 0; i < bossLaserArray.length; i++) {// For the positon of the shots shot by the alien UFO
			bossLaserArray[i].update(bossLaserArray[i]);
		}
		
		earth.update();	//Refreshing the earth 
		laser.update(); //Refreshing the position of laser
		
		for(var i = 0; i < alienArray.length; i++) {
			alienArray[i].update(alienArray[i]);
			alienArray[i].shootingTime++;//causes the alien to shoot
			if(alienArray[i].shootingTime % alienShootingFactor == 0) {
				var alienShot = new LaserShot(alienArray[i]);
				alienShot.alienShot = true;
				alienLaserShotArray.push(alienShot);
			}
		}

		for(var i = 0; i < alienLaserShotArray.length; i++) {// For the positon of the shots shot by the alien UFO
			alienLaserShotArray[i].update(alienLaserShotArray[i]);
		}

		checkCollision(laser);
		checkCollision(earth);

		checkLaserHit(asteroidArray);
		checkLaserHit(alienArray);
		checkLaserHit(sonicWaveArray);
		checkLaserHit(healthArray);
		checkLaserHit(fireWorksArray);
		checkLaserHitByAlien();
		
		checkBoundaries(laserArray);
		checkBoundaries(sonicWaveArray);
		checkBoundaries(healthArray);
		checkBoundaries(fireWorksArray);
		checkEarthHealth();

		if(sonicWavePowerHit) {
			sonicBoom();
			checkBoundaryForSonicWave();
		}

		animateExplosion(alienArray);
		animateExplosion(asteroidArray);
		animateExplosion(sonicWaveArray);
		animateExplosion(healthArray);
		animateExplosion(fireWorksArray);

		if(asteroidFlag % 99 == 0) {
			showScore++;
		}
		score.update();
		options.update(); 
	}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Helper Functions, mathematical
	function Util() {

		this.getDistance = function (body1, body2) {
			return Math.sqrt( Math.pow( (body2.y - body1.y), 2) + Math.pow( (body2.x - body1.x), 2 ) );
		}

		this.getAngle = function (body1, body2) {
			return Math.atan2( (body2.y - body1.y) , (body2.x - body1.x) ) ;
		}

		this.getRandom = function (min, max) {
			return Math.floor(Math.random()*(max-min+1)+min);
		}
	}

	function EventHandler() {
		this.moveSelection = function (evt) {
			evt.preventDefault();
			if (evt.keyCode == 70) { // Fire in the hole
				if(cancelOutButton){
					return;
				}
				
				if(showFireWorks > 0) {					
					showFireWorks = 0;
					fireWorkShower(asteroidArray);
					fireWorkShower(alienArray);
				}
			}
			if (evt.keyCode == 80) {//Pause
				if(cancelOutButton){
					return;
				}
				if(pause) {
					gameArea.interval = setInterval(updateGameArea, gameSpeed);
					pause = false;
				}
				else {
					clearInterval(gameArea.interval);
					themeSong.pause();
					pause = true;
				}
			}
			if (evt.keyCode == 82) {//Restart
				if(cancelOutButton){
					return;
				}
				window.location.reload();
			}
			if(evt.keyCode == 83) {//Sound
				if(cancelOutButton){
					return;
				}
				if(themeSong.paused) {
					themeSong.play();
				}
				else {
					themeSong.pause();
				}
			}
			// if(evt.keyCode == 13) {
			if(evt.keyCode == 32) { //Powerup
				if(cancelOutButton){
					return;
				}
				if(showSonicWaves > 0) {
					sonicWavePowerHit = new SonicWavePower();
					showSonicWaves--;
				}
			}
		}

		this.getMousePosition = function (evt) {
		    var rect = gameArea.canvas.getBoundingClientRect();
		    var mousePoints = { 
		    	x: evt.clientX - rect.left,
		    	y: evt.clientY - rect.top,
		    };
		    if(!disableMouse) {
			    mouseAngle = utils.getAngle(earth, mousePoints);
		    }
	  	}

	  	this.clickShoot = function() {
	  		if(!disableMouse) {  			
		  		laserShot = new LaserShot(laser);
				(new Audio('assets/sounds/shot.mp3')).play();
				laserArray.push(laserShot);
	  		}
	  	}
	}
	
})();
