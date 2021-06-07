document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const doodler = document.createElement('div');
	let doodlerLeftSpase = 50;
	let doodlerBottomSpase = 150;
	let isGameOver = false;
	let platformsCount = 5;
	let platforms = [];

	function createDoodler() {
		doodler.classList.add('doodler');
		grid.append(doodler);
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
			});
		}
	}

	function jump() {
		
	}

	function start() {
		if (!isGameOver) {
			createDoodler();
			createPlatforms();
			setInterval(movePlatforms, 30);
			jump();
		}
	}

	start();
});