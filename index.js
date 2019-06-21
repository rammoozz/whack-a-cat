var app = function() {
	// TRY more moles
	var NUM_OF_MOLES = 9;

	var DIFFICULTY = { easy: 1000, medium: 500, hard: 250 };

	// 	TRY medium / hard
	const DEFAULT_DIFFICULTY = DIFFICULTY.easy;

	var molesContainerElem = document.getElementById("moles");
	var startBtn = document.getElementById("start-btn");
	var timerElem = document.getElementById("time");
	var endBtn = document.getElementById("end-btn");
	var restartBtn = document.getElementById("restart-btn");
	var scoreElem = document.getElementById("score");
	var moleTimer;
	var gameTimer
	var TIME_LIMIT = 20
	var score = 0;
	var moleInfo = [];
	var molesElem;
	var selectMole = function(index) {
		if (moleInfo[index] && moleInfo[index].isAboveGround) {
			score++;

			scoreElem.innerHTML = "Score: " + score;
			scoreElem.classList.add("bounce");
			setTimeout(function() {
				scoreElem.classList.remove("bounce");
			}, 1000);

			moleInfo[index].isAboveGround = false;
			molesElem[index].classList.remove("isAboveGround");
		}
	};
	
	var startTimer = function(){
		gameTimer = setInterval(function(){ 
			if(TIME_LIMIT === 0){
				endGame()
			}else{
		timerElem.innerHTML = "Time: " + (TIME_LIMIT-=1);		
			}
		
		}, 1000);

	}
	var attachHandlers = function(moles) {
		Array.from(molesElem).map(function(mole, index) {
			mole.addEventListener("click", selectMole.bind(null, index));
		});
	};
	var restartGame = function() {
		endGame();
		startGame();
	};
	var startGame = function() {
		score = 0;

		scoreElem.style.display = "block";
		scoreElem.innerHTML = "Score: " + score;
		timerElem.style.display = "block"
		timerElem.innerHTML = "Time: " + TIME_LIMIT
		startBtn.style.display = "none";
		restartBtn.style.display = "block";
		
		
		endBtn.style.display = "block";
		renderMoles();

		molesElem = document.querySelectorAll(".mole");
		attachHandlers();

		startTimer()
		
		moleTimer = setInterval(function() {
			var randomMole = Math.floor(Math.random() * 8) + 1;
			var randomTime = Math.floor(Math.random() * 2000) + 500;
			moleInfo[randomMole] = {};
			moleInfo[randomMole].isAboveGround = true;
			molesElem[randomMole].classList.add("isAboveGround");
			// 	random mole up time
			setTimeout(function() {
				moleInfo[randomMole].isAboveGround = false;
				molesElem[randomMole].classList.remove("isAboveGround");
			}, randomTime);
		}, DEFAULT_DIFFICULTY);
	};
	var deleteMoles = function() {
		molesContainerElem.innerHTML = "";
	};
	var endGame = function() {
		clearInterval(moleTimer);
		clearInterval(gameTimer)
		deleteMoles();
		endBtn.style.display = "none";
		timerElem.style.display = "none"
		scoreElem.style.display = "none";
		restartBtn.style.display = "none"
		startBtn.style.display = "block";
	};

	startBtn.addEventListener("click", startGame);
	restartBtn.addEventListener("click", restartGame);
	endBtn.addEventListener("click", endGame);

	var renderMoles = function() {
		for (var i = 0; i < NUM_OF_MOLES; i++) {
			moles.insertAdjacentHTML(
				"beforeend",
				`<div class="mole"><img src="http://placekitten.com/g/50/50" /><span class="ground"/></div>`
			);
		}
	};
};

app();
