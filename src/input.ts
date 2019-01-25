export class Input {
	static jumping: boolean = false;
	static dashing: boolean = false;

	static init() {
		document.onkeydown = e => {
			if (e.code === "Space" || e.code === "KeyW") {
				Input.jumping = true;
			}
			if (e.code === "KeyX") {
				Input.dashing = true;
			}
		};

		document.onkeyup = e => {
			if (e.code === "Space" || e.code === "KeyW") {
				Input.jumping = false;
			}
			if (e.code === "KeyX") {
				Input.dashing = false;
			}
		};
	}
}
