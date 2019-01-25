import { Block } from "./block";

export class BlockSpawner {
	lastSpawn = 0;

	spawnIfUnlucky(dt: number, time: number) {
		if (time > 200 + this.lastSpawn) {
			this.lastSpawn = time;
			if (Math.random() > 0.7) {
				return new Block(700, 350, 20, 100);
			}
		}
	}
}
