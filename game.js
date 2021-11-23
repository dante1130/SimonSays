const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let gameStarted = false;

const playSound = (name) => {
	const audio = new Audio(`sounds/${name}.mp3`);
	audio.play();
}

const randNum = () => {
	return Math.floor(Math.random() * 4);
}

const animateFlash = (currentColour) => {
	$(`#${currentColour}`).addClass('flash');

	setTimeout(() => {
		$(`#${currentColour}`).removeClass('flash');
	}, 1000);
}

const animatePress = (currentColour) => {
	$(`#${currentColour}`).addClass('pressed');

	setTimeout(() => {
		$(`#${currentColour}`).removeClass('pressed');
	}, 100);
}

const nextSequence = () => {
	userClickedPattern = [];

	let randomChosenColour = buttonColours[randNum()];
	animateFlash(randomChosenColour);

	gamePattern.push(randomChosenColour);

	++level;

	$('#level-title').text(`Level ${level}`);

	playSound(randomChosenColour);
}

const startOver = () => {
	gamePattern = [];
	userClickedPattern = [];
	level = 0;
	gameStarted = false;
}

const checkAnswer = (currentLevel) => {
	return userClickedPattern[currentLevel] === gamePattern[currentLevel]
};

$(document).ready(() => {
	$(document).on('keypress', () => {
		if (!gameStarted) {
			gameStarted = true;
			nextSequence();
		}
	});


	$('.btn').on('click', (e) => {
		if (gameStarted) {
			userClickedPattern.push(e.target.id);

			animatePress(e.target.id);

			playSound(e.target.id);

			if (checkAnswer(userClickedPattern.length - 1)) {
				if (userClickedPattern.length === gamePattern.length) {
					setTimeout(() => {
						nextSequence();
					}, 1000);
				}
			} else {
				playSound('wrong');

				$('body').addClass('game-over');

				setTimeout(() => {
					$('body').removeClass('game-over');
				}, 200);

				$('#level-title').text('Game Over, Press Any Key to Restart');

				startOver();
			}
		}
		
	});
});