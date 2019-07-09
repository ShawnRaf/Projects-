
let scores, roundScores, activePlayer, gamePlaying;

init(); 



//you can use either queryselector or getbyid here 
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //once someone clicks the button.. you need
       // 1. a random Number
        let dice = (Math.floor(Math.random() * 6) + 1);
   
    
        //2. display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        //3.  Update the round score IF the rolled number was NOT a 1 
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});
    
   
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
         //Add current score to global score
        scores[activePlayer] += roundScore;
   
        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    
        //check if player won the game 
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')  //adding the class winner thats's styled in css
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
            gamePlaying = false;
        //next player
        } else {
            nextPlayer();
        };
    };
});
                                                     
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;         
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
             
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
         
     //Toggle allows for dynamic usage here. It continually shifts from one user to another once they hit 1. using add/remove doesn't allow for dynamic changes.
     
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init); //passing it through, not calling it - calling would include ()

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true; 
    document.querySelector('.dice').style.display = 'none';  //rewriting css dice property
    

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
             
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};
