var player;
var speed = 600;
var keysDown = {};
var map;
var cam;

class Example extends Phaser.Scene {
	preload() {
		this.load.svg("tank", "public/assets/tank.svg");
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
		console.log(this.physics.world.bounds)
		player = this.physics.add.image(400, 400, "tank");
		player.setCollideWorldBounds(true);
		player.setOrigin(0.5, 0.62);
	}
	update() {
		if (37 in keysDown) {
			player.angle -= 3;
		}
		if (39 in keysDown) {
			player.angle += 3;
		}
		const angleRad = Phaser.Math.DegToRad(player.angle);
		if (38 in keysDown) {
			player.setVelocity(Math.sin(angleRad) * speed, Math.cos(angleRad) * -speed);
		} else {
			player.setVelocity(0, 0);
		}
	}
}
const config = {
	type: Phaser.AUTO,
	width: 900,
	height: 600,
	scene: Example,
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