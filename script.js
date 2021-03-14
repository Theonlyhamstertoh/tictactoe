const cardContainer = document.querySelector('.cardContainer');
let previousTarget = null;

cardContainer.addEventListener('click', (e) => {
    if(e.target.id === 'player') {
        e.target.nextElementSibling.style.color = 'black';
        e.target.classList.add('addBoxShadow');
        e.target.style.color = 'red';
        if(e.target.nextElementSibling.classList.contains('addBoxShadow')) {
            e.target.nextElementSibling.classList.remove('addBoxShadow');
            e.target.nextElementSibling.style.color = 'black';
        }
      
    } else if(e.target.id ==='bot') {
        console.log(e.target.previousElementSibling)
        e.target.classList.add('addBoxShadow');
        e.target.style.color = 'red';
        if(e.target.previousElementSibling.classList.contains('addBoxShadow')) {
            e.target.previousElementSibling.classList.remove('addBoxShadow');
            e.target.previousElementSibling.style.color = 'black';
        }
  
    }
})

    // if(e.target.id === 'player') {
    //     if(previousTarget !== null) {
    //         previousTarget.classList.remove('addBoxShadow');
    //         previousTarget.style.color = 'black';

    //     }
    //     e.target.classList.add('addBoxShadow');
    //     e.target.style.color = 'red';
    //     previousTarget = e.target;
    // } else if(e.target.id === 'bot') {
    //     if(previousTarget !== null) {
    //         previousTarget.classList.remove('addBoxShadow');
    //         previousTarget.style.color = 'black';

    //     }
    //     e.target.classList.add('addBoxShadow');
    //     e.target.style.color = 'red'
    //     previousTarget = e.target;
    // }