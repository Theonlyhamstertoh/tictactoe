
const titleScreen = (() => {
    const startbutton = document.querySelector('.startGame')
    const cardplayer = document.querySelectorAll('.player');
    const cardbot = document.querySelectorAll('.bot');
    const iframe1 = document.getElementById('iframe1');
    const iframe2 = document.getElementById('iframe2');
    const humanGif = "https://giphy.com/embed/l41lGnxllmN3YqOyI";
    const botGif = "https://giphy.com/embed/xT77XUw1XMVGIxgove";
    const vs = document.querySelector('.vs')

    //button animations for loading screen
    for(let i = 0; i < 2; i++) {
        cardplayer[i].addEventListener('click', (e) => {
            e.target.classList.add('keepTransition');
            chosenPlayer(i, e.target.classList[1]);
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
            botType(e)
            chosenPlayer(i, e.target.classList[1]);
            changeGif(i)
            showStartbutton()
            if(cardplayer[i].classList.contains('keepTransition')) {
                cardplayer[i].classList.remove('keepTransition');
                cardplayer[i].classList.add('endTransition');
                window.setTimeout(() => cardplayer[i].classList.remove('endTransition'), 300)
            }
        })
    }

    const botType = (e) => {
        switch(e.target.textContent) {
            case 'Easy':
                e.target.textContent = 'Hard';
                break;
            case 'Hard':
                e.target.textContent = 'Impossible';
                e.target.style.fontsize = '50px'
                break;
            case 'Impossible':
                e.target.textContent = 'Easy';
                break;
            default:
                e.target.textContent = 'Easy';
                break;
        }

    }
    let chosenPlayer1 = null;
    let chosenPlayer2 = null;
    const chosenPlayer = (cardNumber, choice) =>{
        return Number(cardNumber) === 0 ? chosenPlayer1 = choice : chosenPlayer2 = choice;
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
                if(chosenPlayer1 === 'bot') {
                    if(iframe1.src === botGif) return;
                    iframe1.src = botGif;
                } else {
                    if(iframe1.src === humanGif) return;
                    iframe1.src = humanGif;

                }

            case 1:
                if(chosenPlayer2 === null) return
                if(chosenPlayer2 === 'bot') {
                    if(iframe2.src === botGif) return;
                    iframe2.src = botGif;
                } else {
                    if(iframe2.src === humanGif) return;
                    iframe2.src = humanGif;

                }
        }
    }

    startbutton.addEventListener('click', (e) => {
        gameBoard()
    })
   return {getPlayer}
})()


const loadingScreen = () => {

}

const Player = (sign) => {
    const getSign = () => {
        return sign;
    }

    return {getSign}
}
const gameBoard = () => {

}

const displayController = () => {

}
