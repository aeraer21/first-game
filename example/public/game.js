var player1, player2;
var speed = 600;
var keysDown = {};
var map;
var cam;
var tankSVG;

class Player {
	constructor(p, c, w, a, s, d) {
		this.p = p;
		this.p.setCollideWorldBounds(true);
		this.p.setOrigin(0.5, 0.62);
		this.c = c;
		this.keys = {w: w, a: a, s: s, d: d};
	}
	move() {
		if (this.keys.a in keysDown) {
			this.p.angle -= 3;
		}
		if (this.keys.d in keysDown) {
			this.p.angle += 3;
		}
		const angleRad = Phaser.Math.DegToRad(this.p.angle);
		if (this.keys.w in keysDown) {
			this.p.setVelocity(Math.sin(angleRad) * speed, Math.cos(angleRad) * -speed);
		} else if (this.keys.s in keysDown) {
			this.p.setVelocity(Math.sin(angleRad) * -speed, Math.cos(angleRad) * speed);
		} else {
			this.p.setVelocity(0, 0);
		}
	}
}

class Example extends Phaser.Scene {
	preload() {
		this.load.svg('tank1', 'public/assets/tank1.svg');
		this.load.svg('tank2', 'public/assets/tank2.svg');
	}
	create () {
		this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
		cam = this.cameras.main;
		cam.zoom = 0.5;
		
		const centerX = this.physics.world.bounds.centerX;
		const centerY = this.physics.world.bounds.centerY;
		const newWidth = 900 / cam.zoom;
		const newHeight = 600 / cam.zoom;
		this.physics.world.setBounds(centerX - newWidth / 2, centerY - newHeight / 2, this.scale.width / cam.zoom, this.scale.height / cam.zoom);
		player1 = new Player(this.physics.add.image(400, 300, 'tank1'), "red", 38, 37, 40, 39);
		player2 = new Player(this.physics.add.image(400, 300, 'tank2'), "blue", 87, 65, 83, 68);
	}
	update() {
		player1.move();
		player2.move();
	}
}
const config = {
	type: Phaser.AUTO,
	width: 900,
	height: 600,
	scene: Example,
	backgroundColor: '#ffffff',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	}
};

addEventListener('keydown', function(event) { keysDown[event.keyCode] = true; });
addEventListener('keyup', function(event) { delete keysDown[event.keyCode]; });
const game = new Phaser.Game(config);