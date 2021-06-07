document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const doodler = document.createElement('div');
	let doodlerLeftSpase = 50;
	let startPoint = 150;
	let doodlerBottomSpase = startPoint;
	let isGameOver = false;
	let platformsCount = 5;
	let platforms = [];
	let upTimerId;
	let downTimerId;
	let isJumping = true;
	let isGoingLeft = false;
	let isGoingRight = false;
	let leftTimerId;
	let rightTimerId;
	let score = 0;

	function createDoodler() {
		doodler.classList.add('doodler');
		grid.append(doodler);
		doodlerLeftSpase = platforms[0].left;
		doodler.style.left = `${doodlerLeftSpase}px`;
		doodler.style.bottom = `${doodlerBottomSpase}px`;
	}

	class Platform {
		constructor(newPlatBottom) {
			this.bottom = newPlatBottom;
			this.left = Math.random() * 315; // width grid(400) - width platform(85)
			this.visual = document.createElement('div');

			const visual = this.visual;
			visual.classList.add('platform');
			visual.style.left = `${this.left}px`;
			visual.style.bottom = `${this.bottom}px`;

			grid.append(visual);
		}
	}

	function createPlatforms() {
		for (let i = 0; i < platformsCount; i += 1) {
			let platGap = 600 / platformsCount;
			let newPlatBottom = 100 + i * platGap;
			let newPlatform = new Platform(newPlatBottom);
			platforms.push(newPlatform);
		}
	}

	function movePlatforms() {
		if (doodlerBottomSpase > 200) {
			platforms.forEach(platform => {
				platform.bottom -= 4;
				let visual = platform.visual;
				visual.style.bottom = `${platform.bottom}px`;

				if (platform.bottom < 10) {
					let firstPlatform = platforms[0].visual;
					firstPlatform.classList.remove('platform');
					platforms.shift();
					score += 1;
					let newPlatform = new Platform(600);
					platforms.push(newPlatform);
				}
			});
		}
	}

	function jump() {
		clearInterval(downTimerId);
		isJumping = true;
		upTimerId = setInterval(() => {
			doodlerBottomSpase += 20;
			doodler.style.bottom = `${doodlerBottomSpase}px`;
			if (doodlerBottomSpase > startPoint + 200) {
				fall();
			}
		}, 30);
	}

	function fall() {
		clearInterval(upTimerId);
		isJumping = false;
		downTimerId = setInterval(() => {
			doodlerBottomSpase -= 5;
			doodler.style.bottom = `${doodlerBottomSpase}px`;
			if (doodlerBottomSpase <= 0) {
				gameOver();
			}

			platforms.forEach(platform => {
				if (
					doodlerBottomSpase >= platform.bottom &&
					doodlerBottomSpase <= platform.bottom + 15 &&
					doodlerLeftSpase + 60 >= platform.left &&
					doodlerLeftSpase <= platform.left + 85 &&
					!isJumping
				) {
					startPoint = doodlerBottomSpase;
					jump();
				}
			});
		}, 30);
	}

	function gameOver() {
		isGameOver = true;
		while (grid.firstChild) {
			grid.removeChild(grid.firstChild);
		}
		grid.textContent = score;
		clearInterval(upTimerId);
		clearInterval(downTimerId);
		clearInterval(leftTimerId);
		clearInterval(rightTimerId);
	}

	function control(e) {
		if (e.key === 'ArrowLeft') {
			moveLeft();
		} else if (e.key === 'ArrowRight') {
			moveRight();
		} else if (e.key === 'ArrowUp') {
			moveStraight();
		}
	}

	function moveLeft() {
		if (isGoingRight) {
			clearInterval(rightTimerId);
			isGoingRight = false;
		}

		isGoingLeft = true;
		leftTimerId = setInterval(() => {
			if (doodlerLeftSpase >= 0) {
				doodlerLeftSpase -= 5;
				doodler.style.left = `${doodlerLeftSpase}px`;
			} else {
				moveRight();
			}
		}, 30);
	}

	function moveRight() {
		if (isGoingLeft) {
			clearInterval(leftTimerId);
			isGoingLeft = false;
		}

		isGoingRight = true;
		rightTimerId = setInterval(() => {
			if (doodlerLeftSpase <= 340) {
				doodlerLeftSpase += 5;
				doodler.style.left =`${doodlerLeftSpase}px`;
			} else {
				moveLeft();
			}
		}, 30);
	}

	function moveStraight() {
		isGoingLeft = false;
		isGoingRight = false;
		clearInterval(rightTimerId);
		clearInterval(leftTimerId);
	}

	function start() {
		if (!isGameOver) {
			createPlatforms();
			createDoodler();
			setInterval(movePlatforms, 30);
			jump();
			document.addEventListener('keyup', control);
		}
	}

	start();
});