import { Block } from "./block";
import { BlockSpawner } from "./blockSpawner";
import { Input } from "./input";
import { Player } from "./player";

class Game {
	timer = 0;
	ctx!: CanvasRenderingContext2D;
	blockSpawner: BlockSpawner = new BlockSpawner();
	player!: Player;
	blocks: Block[] = [];
	anim = 0;

	init() {
		this.ctx = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d")!;

		Input.init();

		this.player = new Player(50, 0);
	}

	start() {
		this.update(0);
	}

	update(time: number) {
		const dt = time - this.timer;
		console.log({ time, timer: this.timer });
		this.timer = time;
		if (this.player.health.length === 0) {
			this.restart();
			cancelAnimationFrame(this.anim);
			return;
		}
		this.player.update(dt);
		const block = this.blockSpawner.spawnIfUnlucky(dt, time);
		if (block) {
			this.blocks.push(block);
		}
		this.blocks.map(b => b.update(this.player, dt));

		this.blocks = this.blocks.filter(b => b.x >= -20);

		this.ctx.clearRect(0, 0, 800, 600);
		this.blocks.map(b => b.render(this.ctx));
		this.player.render(this.ctx);

		document.getElementById("score")!.innerHTML = `${this.player.score}`;
		document.getElementById("health")!.innerHTML = `${this.player.health}`;

		this.anim = requestAnimationFrame((timer: number) => this.update(timer));
	}

	restart() {
		setTimeout(() => {
			this.timer = 0;
			this.blockSpawner = new BlockSpawner();
			this.player = new Player(50, 0);
			this.blocks = [];
			this.start();
		}, 2000);
	}
}

const g = new Game();
g.init();
g.start();
