'use strict'
const Player = (name, sign, currentPlayer, isWinner) => {
    return {
         name, sign, currentPlayer, isWinner
    }
}

const Bot = (name, sign, currentPlayer, isWinner) => {
    return {
         name, sign, currentPlayer, isWinner
    }
}


const easyBotAI = () => {
    console.log('I AM TERMINATOR')
} 

const gameBoard = (() => {
    const game = new Array(9).fill(null);
    const player1Score = document.getElementById('player1Score');
    const player2Score = document.getElementById('player2Score');
    const playerX = Player('Weibo', 'X', true, 0);
    const playerO = Bot('Computer', 'O', false, 0);
    const totalX = [];
    const totalO = [];
    let roundIsOver = false;
    let roundNumber = 1;

    
    const playRound = (e) => {
        setField(e.dataset.index, theCurrentPlayer().sign);
        checkWinner()
        checkStalemate();
        displayController.showField(e, theCurrentPlayer().sign);
    }


    const setField = (index, sign) => {
        if(index > game.length) {return};
        if(game[index] !== null) {return};
        sign === 'O' ? totalO.push(Number(index)) : totalX.push(Number(index));
        return game[index] = sign;
    }

    const switchPlayer = () => {
        if(theCurrentPlayer() === playerX) {
            playerX.currentPlayer = false;
            playerO.currentPlayer = true;
        } else {
            playerO.currentPlayer = false;
            playerX.currentPlayer = true;
        }
    }

    const theCurrentPlayer = () => {
        if(playerX.currentPlayer === true) {
            
            return playerX;
        } else {
            return playerO;
        }
    }


    const checkWinner = () => {

        const winningMoves = 
           [[0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]];
     
 

        winningMoves.forEach(el => {
            let countX = 0;
            let countO = 0;
            el.forEach(num => {
                if(totalX.includes(num)) {
                    countX++
                    if(countX === 3) {
                        roundOver(playerX);

                    }
                }
                if(totalO.includes(num)) {
                    countO++
                    if(countO === 3) {
                        roundOver(playerO);
                    }
                }
            })
        });
     
    
    }
  
    const checkStalemate = () => {
        if(!game.some(el => el === null)) {
            roundOver(false);
        }
    }
    const roundOver = (winner) => {
        roundIsOver = true;

        displayController.DOMplayer1.style.backgroundColor = '';
        displayController.DOMplayer2.style.backgroundColor = '';
        
        if(winner !== false) {
            console.log('----------------GAME OVER----------------');
            winner.isWinner++;
            displayController.display.textContent = winner.name + ' has won the round!';
        } else {
            console.log('----------------STALEMATE----------------');
            displayController.display.textContent = `There was no winner this round`;
        }

        player1Score.textContent = playerX.isWinner;
        player2Score.textContent = playerO.isWinner;
        if(playerX.isWinner === 3 || playerO.isWinner === 3) {
            gameOver();
        } 




   
    }

    const gameOver = () => {
        newGame.style.display = 'block'

        if(Number(playerX.isWinner) > Number(playerO.isWinner)) {
            displayController.display.textContent = playerX.name + ' is the winner!';
        } else {
            displayController.display.textContent = playerO.name + ' is the winner!';
        }
        displayController.gridContainer.removeEventListener('click',displayController.enableField);    


    }

    const displayWinner = () => {

    }

    const getRoundResult = () => {
        return roundIsOver;
    }

    const getRoundNumber = () => {
        return roundNumber;
    }

    const incrementRound = () => {
        roundNumber++;
        return roundNumber;
    }
    const resetRound = (e) => {
        for(let i = 0; i < game.length; i++) {
            game[i] = null;
        }
        totalO.length = 0;
        totalX.length = 0;
        roundIsOver = false;
        if(e.target === displayController.newGame) {
            resetRoundNumber();
            displayController.gridContainer.addEventListener('click', displayController.enableField);
            playerX.currentPlayer = true;
            playerO.currentPlayer = false;
            playerX.isWinner = 0;
            playerO.isWinner = 0;
            displayController.highlightCurrentPlayer();
            player1Score.textContent = playerX.isWinner;
            player2Score.textContent = playerO.isWinner;
            displayController.newGame.style.display = 'none'

        } else {
            playerX.currentPlayer = true;
            playerO.currentPlayer = false;
            displayController.highlightCurrentPlayer();
            incrementRound();
        }
    }

    const resetRoundNumber = () => {
        return roundNumber = 1;
    }



    return {game, playRound, getRoundNumber, player1Score, player2Score, getRoundResult, incrementRound, checkWinner, theCurrentPlayer, resetRound, playerX, switchPlayer,playerO}

    
})();

const displayController = (() => {
    const gridContainer = document.querySelector('.gridContainer');
    const DOMplayer1 = document.getElementById('player1');
    const DOMplayer2 = document.getElementById('player2');
    const display = document.querySelector('.display');
    const allFields = document.querySelectorAll('.field');
    const roundTextDisplay = document.querySelector('.round');
    const newGame = document.getElementById('newGame');


    
    const enableField = (e) => {
        if(e.target === gridContainer) return;
        if(gameBoard.getRoundResult() === true) {
            resetDisplay(e);
            return;
        }

        gameBoard.playRound(e.target);
    }

    const resetDisplay = (e) => {
        allFields.forEach(el => el.textContent = '');
        display.textContent = ''
        gameBoard.resetRound(e);
        roundTextDisplay.textContent = `ROUND: ${gameBoard.getRoundNumber()}`


    }

    
    const initalization = (() => {
        gridContainer.addEventListener('click', enableField);
        newGame.addEventListener('click', enableField)
        gameBoard.player1Score.textContent = gameBoard.playerX.isWinner;
        gameBoard.player2Score.textContent = gameBoard.playerO.isWinner;
        DOMplayer1.textContent = gameBoard.playerX.name;
        DOMplayer1.style.backgroundColor = 'pink';
        DOMplayer2.textContent = gameBoard.playerO.name;
    })()


    const highlightCurrentPlayer = () => {
        if(gameBoard.theCurrentPlayer().sign === 'X') {
            DOMplayer1.style.backgroundColor = 'pink';
            DOMplayer2.style.backgroundColor = '';
        } else {
            DOMplayer2.style.backgroundColor = 'pink';
            DOMplayer1.style.backgroundColor = '';
        }
 
    }

 
    const showField = (e, sign) => {
        if(e.textContent !== '') return;
        e.textContent = sign;

        if(gameBoard.getRoundResult() !== true) {
            gameBoard.switchPlayer();
            displayController.highlightCurrentPlayer();
        }
 

    }
    return {showField, highlightCurrentPlayer, newGame, resetDisplay, gridContainer, DOMplayer1, display, enableField, DOMplayer2}

})()







