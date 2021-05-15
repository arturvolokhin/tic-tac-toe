let game = document.querySelector('.content');
let boxes = document.querySelectorAll('.content__item');
let congratulationAudio = new Audio('src/audio/congratulation.mp3');
let zeroAudio = new Audio('src/audio/zero.mp3');
let crossAudio = new Audio('src/audio/cross.mp3');
let count = 0;


function paintZero() {
    return `<svg class="content__zero">
                <circle r='40' cx='58' cy='58' stroke='yellow'
                stroke-width='7' fill='none' stroke-linecap='round'></circle>
            </svg>`;
}

function paintCross() {
    return `<svg class="content__cross">
                <line class="content__cross-line" x1='25' y1='25' x2='95' y2='95'
                    stroke='red' stroke-width='8' stroke-linecap='round'></line>
                <line class="content__cross-line content__cross-line--second" x1='95' y1='25' x2='25' y2='95'
                    stroke='red' stroke-width='8' stroke-linecap='round'></line>
            </svg>`;
}

function stepZero(target) {
    target.insertAdjacentHTML('afterbegin', paintZero());
    target.classList.add('circle');
    zeroAudio.play();
}

function stepCross(target) {
    target.insertAdjacentHTML('afterbegin', paintCross());
    target.classList.add('cross');
    crossAudio.play();
}

function init(e) {
    if(e.target.closest('.content__item').children.length === 0) {
        if (count % 2 === 0) {
            stepZero(e.target)
        } else {
            stepCross(e.target);
        }
        count++;
        checkVictory();
    }
}

function getWinner(text) {
    document.body.insertAdjacentHTML('afterbegin', text);
    congratulationAudio.play();
}    

function checkVictory() {
    
    let combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    for (i = 0; i < combinations.length; i++ ) {
        if (boxes[`${combinations[i][0]}`].classList.contains('cross') &&
            boxes[`${combinations[i][1]}`].classList.contains('cross') &&
            boxes[`${combinations[i][2]}`].classList.contains('cross')) {

                    boxes[`${combinations[i][0]}`].classList.add('active');
                    boxes[`${combinations[i][1]}`].classList.add('active');
                    boxes[`${combinations[i][2]}`].classList.add('active');
                    getWinner('<h1 class="game__winner">Выиграли крестики!</h1>');
                    game.removeEventListener('click', init);
                    
                  

        } else if (boxes[`${combinations[i][0]}`].classList.contains('circle') &&
                    boxes[`${combinations[i][1]}`].classList.contains('circle') &&
                    boxes[`${combinations[i][2]}`].classList.contains('circle')) {
                    
                        boxes[`${combinations[i][0]}`].classList.add('active');
                        boxes[`${combinations[i][1]}`].classList.add('active');
                        boxes[`${combinations[i][2]}`].classList.add('active');
                        getWinner('<h1 class="game__winner">Выиграли нолики!</h1>');
                        game.removeEventListener('click', init);
                        
        }
    } 

    if (count === 9 && !document.querySelector('.game__winner')) {
        getWinner('<h1 class="game__winner">Ничья!</h1>');
    } 

}

game.addEventListener('click', init);