/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


	VERSION 4 GOALS
	-> Refactoring
	-> Working on the hold button	
*/

var scores, roundScore, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';

document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function(){
	let dice = Math.floor(Math.random() * 6) + 1;
	let diceDOM = document.querySelector('.dice');

	// Display result
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';

	// Update round score if rolled num !== 1
	if(dice !== 1){
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	} else {
		// Next player
		nextPlayer();
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	// Add current score to global score
	scores[activePlayer] += roundScore;
	// Update UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	
	// Check if player won the game
	if (scores[activePlayer] >= 20){
		document.querySelector('#name-' + activePlayer).textContent = 'WINNER!...';
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.	querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	} else {
		nextPlayer();
	}
});

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	
	document.querySelector('.dice').style.display = 'none';
};


