document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	const doodler = document.createElement('div');
	let doodlerLeftSpase = 50;
	let doodlerBottomSpase = 150;
	let isGameOver = false;

	function createDoodler() {
		doodler.classList.add('doodler');
		grid.append(doodler);
		doodler.style.left = `${doodlerLeftSpase}px`;
		doodler.style.bottom = `${doodlerBottomSpase}px`;
	}

	function start() {
		if (!isGameOver) {
			createDoodler();
		}
	}

	start();
});