
const loadingScreen = (() => {


    const cardplayer = document.querySelectorAll('.player');
    const cardbot = document.querySelectorAll('.bot');
    const iframe1 = document.getElementById('iframe1');
    const iframe2 = document.getElementById('iframe2');
    const humanGif = "https://giphy.com/embed/l41lGnxllmN3YqOyI";
    const botGif = "https://giphy.com/embed/xT77XUw1XMVGIxgove";

    //button animations for loading screen
    for(let i = 0; i < 2; i++) {
        cardplayer[i].addEventListener('click', (e) => {
            e.target.classList.add('keepTransition');
            chosenPlayer(i, e.target.classList[1]);
            
            if(cardbot[i].classList.contains('keepTransition')) {
                cardbot[i].classList.remove('keepTransition');
                cardbot[i].classList.add('endTransition');
                window.setTimeout(() => cardbot[i].classList.remove('endTransition'), 300)
            }
        })
    
        cardbot[i].addEventListener('click', (e) => {
            e.target.classList.add('keepTransition')
            chosenPlayer(i, e.target.classList[1]);
            if(cardplayer[i].classList.contains('keepTransition')) {
                cardplayer[i].classList.remove('keepTransition');
                cardplayer[i].classList.add('endTransition');
                window.setTimeout(() => cardplayer[i].classList.remove('endTransition'), 300)
            }
        })
    }

    let chosenPlayer1 = null;
    let chosenPlayer2 = null;
    const chosenPlayer = (cardNumber, choice) =>{
   
        Number(cardNumber) === 0 ? chosenPlayer1 = choice : chosenPlayer2 = choice;

        console.log(chosenPlayer1, chosenPlayer2)
    }

    const changeGif = (cardNumber, choice) => {
        
    }

    

   

})()
