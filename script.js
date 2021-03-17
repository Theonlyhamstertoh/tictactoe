const titleScreen = (() => {
    const startbutton = document.querySelector('.startGame')
    const cardplayer = document.querySelectorAll('.player');
    const cardbot = document.querySelectorAll('.bot');
    const iframe1 = document.getElementById('iframe1');
    const iframe2 = document.getElementById('iframe2');
    const humanGif = "https://giphy.com/embed/l41lGnxllmN3YqOyI";
    const botGif = "https://giphy.com/embed/xT77XUw1XMVGIxgove";
    const vs = document.querySelector('.vs');
    const titleContainer = document.querySelector('.titleScreen')
    const header = document.querySelector('header');

    //button animations for loading screen
    for(let i = 0; i < 2; i++) {
        cardplayer[i].addEventListener('click', (e) => {
            e.target.classList.add('keepTransition');
            chosenPlayer(i, e.target.classList[1], e.target.textContent);
            changeGif(i)
            showStartbutton()
            if(cardbot[i].classList.contains('keepTransition')) {
                cardbot[i].classList.remove('keepTransition');
                cardbot[i].classList.add('endTransition');
                window.setTimeout(() => cardbot[i].classList.remove('endTransition'), 300)
            }
        })
    
        cardbot[i].addEventListener('click', (e) => {
            e.target.classList.add('keepTransition');
            botType(e, cardplayer[i].classList.contains('keepTransition'))
            chosenPlayer(i, e.target.classList[1], e.target.textContent);
            changeGif(i)
            showStartbutton()
            if(cardplayer[i].classList.contains('keepTransition')) {
                cardplayer[i].classList.remove('keepTransition');
                cardplayer[i].classList.add('endTransition');
                window.setTimeout(() => cardplayer[i].classList.remove('endTransition'), 300)
            }
        })
    }

    const botType = (e, checkIfFirstSwitch) => {
        
        if(checkIfFirstSwitch === true) {
            if(e.target.textContent === 'Bot') {
                return e.target.textContent = 'Easy';
            }
            return;
        } else {
            changeBotDifficulty(e);
        }
  
    }

    const changeBotDifficulty = (e) => {
        switch(e.target.textContent) {
            case 'Easy':
                return e.target.textContent = 'Hard';
            case 'Hard':
               return e.target.textContent = 'Impossible';
            case 'Impossible':
               return e.target.textContent = 'Easy';
            default:
               return e.target.textContent = 'Easy';
        }
    }
    let chosenPlayer1 = null;
    let chosenPlayer2 = null;
    const chosenPlayer = (cardNumber, choice, botType) => {
        if(choice === 'bot') {
            if(cardNumber === 0) {
                 return chosenPlayer1 = botType;
            } else {
                 return chosenPlayer2 = botType;
            }
        } 

        if(Number(cardNumber) === 0) {
            return chosenPlayer1 = choice 
        } else {
            return chosenPlayer2 = choice;
        }
            
    }

    const getPlayer = (number) => {
        if(chosenPlayer1 === null || chosenPlayer2 === null) return;
        return number === 0 ? chosenPlayer1 : chosenPlayer2;
    }

    const showStartbutton = () => {
        if(chosenPlayer1 !== null && chosenPlayer2 !== null) {
            vs.classList.add('shrink');
            window.setTimeout(() => startbutton.style.display = 'inline-block', 500)
            
        }
    }
    const changeGif = (cardNumber) => {
        switch(cardNumber) {
            case 0:
                if(chosenPlayer1 === null) return
                if(chosenPlayer1 !== 'player') {
                    if(iframe1.src === botGif) return;
                    iframe1.src = botGif;
                } else {
                    if(iframe1.src === humanGif) return;
                    iframe1.src = humanGif;

                }

            case 1:
                if(chosenPlayer2 === null) return
                if(chosenPlayer2 !== 'player') {
                    if(iframe2.src === botGif) return;
                    iframe2.src = botGif;
                } else {
                    if(iframe2.src === humanGif) return;
                    iframe2.src = humanGif;

                }
        }
    }

    startbutton.addEventListener('click', (e) => {
        gameBoard.updatePlayer(0, chosenPlayer1);
        gameBoard.updatePlayer(1, chosenPlayer2);
        titleContainer.classList.add('fadeOut');
        header.classList.add('fadeOut');
        window.setTimeout(() => {
            titleContainer.style.display = 'none'
            header.style.display = 'none'
        }, 1000);
        window.setTimeout(() => loadingScreen.beginAnimation(chosenPlayer1, chosenPlayer2), 2000);
    })
   return {getPlayer}
})()


const loadingScreen = (() => {
    const loadingDisplay = document.querySelector('.loadingScreen');
    const contestant1 = document.querySelector('.contestant1');
    const contestant = document.querySelector('.contestant');
    const contestantVS = document.querySelector('.contestantVS');
    const contestant2 = document.querySelector('.contestant2');
    const countDown = document.querySelector('.timeCounter')

    const beginAnimation = (player1, player2) => {
        contestant1.textContent = player1;
        contestant2.textContent = player2;
        if(player1 !== 'player') {
            contestant1.textContent = 'bot'
        } 
        if(player2 !== 'player') {
            contestant2.textContent = 'bot'
        } 

        contestant1.classList.add('increaseFont');
        window.setTimeout(() => {contestantVS.classList.add('increaseFont')}, 1000);
        window.setTimeout(() => {contestant2.classList.add('increaseFont')}, 2000);
        window.setTimeout(() => theCountDown(), 3000)
        window.setTimeout(() => theCountDown(3), 4000 )
        window.setTimeout(() => theCountDown(2), 5000 )
        window.setTimeout(() => theCountDown(1), 6000 )
        window.setTimeout(() => theCountDown('Start Game'), 7000 )
        window.setTimeout(() => {contestant.classList.add('fadeOut');}, 7500);
        window.setTimeout(() => loadingDisplay.style.display = 'none', 8500)
        window.setTimeout(() => , 8500)
        

    }

    const theCountDown = (count) => {
        if(count !== undefined) {
            countDown.classList.add('addTropicalFont')
            if(typeof(count) === 'string' ) { 
                countDown.classList.remove('addTropicalFont')
                countDown.style.fontSize = '1.5em';
                countDown.style.textDecoration = 'underline'
            }   
            countDown.textContent = count;
        }
        countDown.classList.add('quickIncrease')
        countDown.classList.remove('quickFadeOut')
        window.setTimeout(() =>{ 
            countDown.classList.remove('quickIncrease')
            countDown.classList.add('quickFadeOut')
        }, 500)
    }
    return {beginAnimation}
})()

const Player = (sign, playerType) => {
    const getSign = () => {
        return sign;
    }

    let roundWinCount = 0;
    const getWinCount = () => {
        return roundWinCount;
    }

    const returnType = () => {
        return playerType;
    }

    const updateType = (type) => {
        return playerType = type;
    }
    const incrementWin = () => {
        return roundWinCount++;
    }
    return {
        getSign,
        getWinCount,
        incrementWin,
        updateType,
        returnType
    }
}
const gameBoard = (() => {
    const playerX = Player('X')
    const playerO = Player('O')

    const updatePlayer = (number, type) => {
        return number === 0 ? playerX.updateType(type) : playerO.updateType(type)
    }

    const getPlayer = (number) => {
        return number === 0 ? playerX : playerO;
    }

    return { 
        updatePlayer, getPlayer
    }
})()

const displayController = () => {

}


// loadingDisplay.style.display = 'block'
// contestant1.classList.add('showText');
// window.setTimeout(() => contestantVS.classList.add('showText'), 1000)
// window.setTimeout(() => contestant2.classList.add('showText'), 2000)
// window.setTimeout(() => {
//     firstText.style.display = 'block';
//     firstText.classList.add('showText');
// }, 3000)
// window.setTimeout(() => {
//     firstText.classList.add('unshowText');
//     firstText.classList.remove('showText');
// }, 4000)

// window.setTimeout(() => {
//     firstText.style.display = 'none';
//     countDown.style.display = 'block';
// }, 5000)
// window.setTimeout(() => timeCountDown(), 5000)
// window.setTimeout(() => timeCountDown(), 6000)
// window.setTimeout(() => timeCountDown(), 7000)
// window.setTimeout(() => timeCountDown(), 8000)
// window.setTimeout(() => {
//     startText.style.display = 'block'
//     startText.classList.add('showText');
// }, 8000)

// }

// let count = 3;
// const timeCountDown = () => {
// if(count === 0) {
//     countDown.style.display = 'none';
// };
// countDown.textContent = count--;
// countDown.classList.add('showText');
// window.setTimeout(() => {
//     countDown.classList.add('unshowText');
//     countDown.classList.remove('showText');
// }, 500);
// window.setTimeout(()=> countDown.classList.remove('unshowText'))
// }
// const addEffects = () => {
// countDown.classList.add('unshowText');

// }
