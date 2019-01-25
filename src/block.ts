import { Player } from "./player";

export class Block {
	x = 0;
	y = 0;
	w = 0;
	h = 0;
	hit = false;
	scored = false;

	constructor(x: number, y: number, w: number, h: number) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	update(player: Player, dt: number) {
		this.checkCollisions(player);
		this.x -= 0.5 * (1 + +player.dashing) * dt;
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.fillStyle = this.hit ? "grey" : "red";
		ctx.rect(this.x, this.y, this.w, this.h);
		ctx.fill();
		ctx.closePath();
	}

	checkCollisions(player: Player) {
		if (
			!this.hit &&
			!player.dashing &&
			player.x + 32 >= this.x &&
			player.x <= this.x + this.w &&
			player.y + 32 >= this.y
		) {
			player.hit();
			this.hit = true;
		}

		if (!this.scored && !this.hit && player.x > this.x + this.w) {
			player.score++;
			this.scored = true;
		}
	}
}
