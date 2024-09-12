import { game } from './game.js'; //import = importar variavel para este arquivo

//exibir new game na tela
const newGameButtonElem = document.getElementById('new-game');
const inputElem = document.getElementById('word');
const errorElem = document.getElementById('error');
const streakElem = document.getElementById('streak');

newGameButtonElem.addEventListener('click', function () {
    game.newGame();

    //exibir na tela
    const lettersElem = document.querySelectorAll('.square'); //seleciona todos o elementos classe square
    for (let i = 0; i < lettersElem.length; i++) {
        lettersElem[i].innerHTML = game.letters[i].toUpperCase();
    }

    //Ativando o input, limpando e focus
    inputElem.disabled = false;
    inputElem.value = '';
    inputElem.focus();


    //escondendo a msg de erro
    errorElem.style.visibility = 'hidden'
})

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault(); //interrompe o evento padrao do form

    const formData = new FormData(event.target);
    const word = formData.get('word');

    const isWordValid = await game.validateWord(word);

    if (isWordValid) { 
        streakElem.innerHTML = game.streak;
        errorElem.style.visibility = 'hidden';
    } else {
        errorElem.style.visibility = 'visible';
    }
})