'use strict'
const Player = (name, sign, currentPlayer, isWinner) => {
    return {
         name, sign, currentPlayer, isWinner
    }
}

const gameBoard = (() => {
    const game = new Array(9).fill(null);
    const playerX = Player('Weibo', 'X', false, 0);
    const playerO = Player('Phil Knight', 'O', false, 0);
    const totalX = [];
    const totalO = [];
    let gameIsOver = false;
    let round = 1;
    
    const playRound = (e) => {
        setField(e.dataset.index, currentPlayer().sign);
        displayController.showField(e, currentPlayer().sign);
        checkWinner()
        if(gameIsOver === false) {
            switchPlayer();
            displayController.highlightCurrentPlayer();
        }
    }

    const setField = (index, sign) => {
        if(index > game.length) {return};
        if(game[index] !== null) {return};
        sign === 'O' ? totalO.push(Number(index)) : totalX.push(Number(index));
        return game[index] = sign;
    }

    const switchPlayer = () => {
        if(currentPlayer() === playerX) {
            playerX.currentPlayer = false;
            playerO.currentPlayer = true;
        } else {
            playerO.currentPlayer = false;
            playerX.currentPlayer = true;
        }
    }

    const currentPlayer = () => {
        if(playerX.currentPlayer === true) {
            
            return playerX;
        } else {
            return playerO;
        }
    }

    const checkIfEmpty = (() => {
        if(game.every(el => el === null)) {
            playerX.currentPlayer = true; 
            playerO.currentPlayer = false;
        }
    })()

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
     
        console.log(totalX, totalO)
 

        winningMoves.forEach(el => {
            let countX = 0;
            let countO = 0;
            el.forEach(num => {
                if(totalX.includes(num)) {
                    countX++
                    if(countX === 3) {
                        gameOver(playerX);

                    }
                }
                if(totalO.includes(num)) {
                    countO++
                    if(countO === 3) {
                        gameOver(playerO);
                    }
                }
            })
        });
     

    }
  
    const gameOver = (winner) => {
        gameIsOver = true
        console.log('----------------GAME OVER----------------');
        winner.isWinner++;
        displayController.display.textContent = winner.name + ' has won the game!';
        displayController.gridContainer.removeEventListener('click', displayController.enableField);
        resetGame();
   
    }

    const resetGame = () => {
        displayController.resetDisplay();
 
    }
    
    return {game, playRound, checkWinner, currentPlayer, round, playerX, switchPlayer,playerO}

    
})();

const displayController = (() => {
    const gridContainer = document.querySelector('.gridContainer');
    const DOMplayer1 = document.getElementById('player1');
    const DOMplayer2 = document.getElementById('player2');
    const display = document.querySelector('.display')

    const initalization = (() => {
        display.textContent = `It is ${gameBoard.playerX.name}'s turn!`
        DOMplayer1.textContent = gameBoard.playerX.name;
        DOMplayer1.style.backgroundColor = 'pink';
        DOMplayer2.textContent = gameBoard.playerO.name;
    })()
   
    const enableField = (e) => {
        if(e.target === gridContainer) return;
        gameBoard.playRound(e.target);
    }

    gridContainer.addEventListener('click', enableField)


    const highlightCurrentPlayer = (e) => {
        display.textContent = `It is ${gameBoard.currentPlayer().name}'s turn!`
        if(gameBoard.currentPlayer().sign === 'X') {
            DOMplayer1.style.backgroundColor = 'pink';
            DOMplayer2.style.backgroundColor = '';
        } else {
            console.log(gameBoard.currentPlayer().name)
            DOMplayer2.style.backgroundColor = 'pink';
            DOMplayer1.style.backgroundColor = '';
        }
 
    }

    const resetDisplay = () => {
        
    }

    const showField = (e, sign) => {
        if(e.textContent !== '') return;
            e.textContent = sign;

    }
    return {showField, highlightCurrentPlayer, resetDisplay, gridContainer, DOMplayer1, display, enableField, DOMplayer2}

})()







