import { Input } from "./input";

const gravity = 1.5;
export class Player {
	x = 0;
	y = 0;
	grounded = false;
	dashing = false;
	dashedDuringJump = false;
	vy = 0;
	health = "♥️♥️♥️";
	score = 0;
	dashTime = 0;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	update(dt: number) {
		if (!this.grounded) {
			// fall
			if (this.dashing) {
				this.dashTime -= dt;
				if (this.dashTime <= 0) {
					this.dashing = false;
					this.vy = 0;
				}
			} else {
				this.y += dt * this.vy;
				this.y += dt * gravity;
				this.vy *= 0.96;
				if (Input.dashing && !this.dashedDuringJump) {
					this.dashing = true;
					this.dashedDuringJump = true;
					this.dashTime = 400;
				}
			}
		}
		if (this.y >= 400) {
			this.grounded = true;
			this.vy = 0;
			this.y = 400;
		}
		if (Input.jumping && this.grounded) {
			this.dashedDuringJump = false;
			this.grounded = false;
			this.vy = -3;
		}
	}

	hit() {
		this.health = this.health.slice(0, -1);
		console.log(this.health);
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.fillStyle = this.dashing ? "green" : "orange";
		ctx.rect(this.x, this.y, 32, 32);
		ctx.fill();
		ctx.closePath();
	}
}
