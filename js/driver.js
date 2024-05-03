/* QUICK AND DIRTY */

var audio = new Audio('mp3/fire.mp3');
var currentSong = 0; 
var intervalID = [];

window.onload = function() { 
	createTiles();
	relabelAll();
	
	/* Allows for templates to be switched out, possibly through the GUI? Make this inside constants.json now that we have it? -E*/
	var colors = ["246B61", "6BA099", "43857C", "0D5047", "00352E", "2D4671", "051838", "152C55", "4D658D", "7689A9", "408E2F", "0C4700", "216A12", "68B159", "9AD58E"];
	var choices = document.querySelectorAll('.choice');
	for (var i = 0; i < choices.length; i++) {
		var randoColor = '#'+colors[dieRoller(colors.length)];
		choices[i].style.backgroundColor = randoColor;
	}

	/* There is a better way to do this, quick and dirty solution below */
	document.querySelector('.spin').onclick = spin;
	document.querySelector('.stop').onclick = stop;
	document.querySelector('.popup').onclick = hidePopup;
	document.querySelector('.relabel').onclick = relabelAll;
	document.querySelector('.play').onclick = play;
	document.querySelector('.pause').onclick = pause;
	document.querySelector('.restart').onclick = restart;
	document.querySelector('.slowDown').onclick = slowDown;
	document.querySelector('.speedUp').onclick = speedUp;
	document.querySelector('.loop').onclick = loop;
	document.querySelector('.normalize').onclick = normalize;
	document.querySelector('.newSong').onclick = newSong;
};

function createTiles() { 
	var leftWrapper = document.querySelector('.left-wrapper');

	for (var i = 0; i < constants.GAMES.length; i++) { 
		var container = document.createElement('div');
		var label = document.createElement('span');
		var counter = document.createElement('span');
		var counterInit = document.createTextNode("0");

		container.classList.add('choice');
		label.classList.add('label');
		counter.classList.add('counter');

		container.appendChild(label);
		container.appendChild(counter);
		counter.appendChild(counterInit);

		leftWrapper.appendChild(container);
	}
}

function dieRoller(length) { 
	return Math.floor(Math.random()*length);
}

function displayPopup(text, color) { 
	var popup = document.querySelector('.popup');
	popup.innerHTML = text;
	popup.classList.add('display');

	var body = document.body;
	popup.style.height = body.offsetHeight;
	popup.style.width = body.offsetWidth;
	popup.style.lineHeight = body.offsetHeight + "px";
	popup.style.backgroundColor = color; 
	popup.style.opacity = 0.95;
}

function hidePopup() { 
	document.querySelector('.popup').classList.remove('display'); 
}

function randomSelection() { 
	var choices = $('.choice');
	choices.removeClass('selected');

	/* IMPORTANT: REMOVE JQUERY */
	//Actual selection
	var index = dieRoller(choices.length);
	$(choices[index]).addClass('selected');

	//Sound
	var snd = new Audio("wav/fwep.wav"); 
	snd.play();
}

function relabelAll() { 
	var choices = document.querySelectorAll('.choice');
	var gamesList = constants.GAMES;
	knuthShuffle(gamesList);
	constants.GAMES = gamesList;
	for (var i = 0; i < choices.length; i++) { 
		choices[i].children[0].innerText = gamesList[i];
	}

	var roygbiv = ["#d10000", "#ff6622", "#ffda21", "#33dd00", "#1133cc", "#220066", "#330044", "#d10000", "#ff6622", "#ffda21"];

	//animate here (failed lol)
	var span = document.querySelectorAll('.full-span span');
	recolour();

	function recolour() { 
		for (var i = 0; i < span.length; i++) { 
			span[i].style.color = roygbiv[i];
		}
	}
}

function spin() { 
	intervalID.push(window.setInterval(randomSelection, 75));
}

function stop() { 
	for (var i = 0; i < intervalID.length; i++) { 
		window.clearInterval(intervalID[i]);
	}

	var current = document.querySelector('.selected');
	var counter = current.children[1];
	counter.innerHTML = parseInt(counter.innerHTML, 10) + 1;
	
	displayPopup(current.children[0].innerText, current.style.backgroundColor);
	
	var snd = new Audio("wav/zeldawin.wav"); 
	snd.play();
}

//START AUDIO FUNCTIONS

function loop() { 
	if (!audio.loop) { 
		displayPopup("Now looping");
		audio.loop = true; 
	} else { 
		displayPopup("No longer looping");
		audio.loop = false;
	}
}

function newSong() { 
	audio.pause();

	if (currentSong == constants.MP3.length - 1) {
		currentSong = 0;
	} else {
		currentSong++;
	}

	audio = new Audio('mp3/'+constants.MP3[currentSong]);

	normalize();
}

function normalize() {
	audio.playbackRate = 1;
	document.querySelector('.readout').children[0].innerText = audio.playbackRate;
}

function pause() { 
	audio.pause();
}

function play() { 
	audio.play();
}

function restart() { 
	audio.currentTime = 0;
}

function slowDown() { 
	if ( audio.playbackRate > 0.5) { 
		audio.playbackRate -= 0.05;
		//Taking care of floating point math
		audio.playbackRate = audio.playbackRate.toPrecision(3);
	}

	document.querySelector('.readout').children[0].innerText = audio.playbackRate;
}

function speedUp() { 
	if ( audio.playbackRate < 4) { 
		audio.playbackRate += 0.05;
		//Taking care of floating point math
		audio.playbackRate = audio.playbackRate.toPrecision(3);
	}

	document.querySelector('.readout').children[0].innerText = audio.playbackRate;
}
//END AUDIO FUNCTIONS

/* https://bost.ocks.org/mike/shuffle/ example of Knuth Shuffle */ 
function knuthShuffle(array) { 
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}