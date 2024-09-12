export const game = { //export = exportar variavel para outra pagina
    letters: [], //letras aleatorias
    word: '', //resposta
    error: false, //msg de erro
    streak: 0,
    inputWords: [],
    newGame: function () {
        this.letters = []; //limpa array
        this.inputWords = [];

        const alphabet = 'aabcdeefghiijlmnoopqrstuuvxz'; //alfabeto 

        //atribuindo letras para 'letters'
        this.letters = new Array(3).fill().map(function (letter) {
            const randomIndex = Math.floor(Math.random() * alphabet.length);// 'floor' arredonda pra cima, randm gera um numero aletorio de 0 ou 1
            return alphabet[randomIndex];
        });

        this.word = '';
        this.error = false;
        this.streak = 0;
    },
    validateWord: async function (word) {
        for (let i = 0; i < this.letters.length; i++) {
            if (!word.includes(this.letters[i])) {
                this.error = true;
                return false;
            }
        }
        if (this.inputWords.includes(word)) {
            return false;
        }


        const rawData = await fetch(`https://api.dicionario-aberto.net/word/${word}`);
        const data = await rawData.json();

        if (!data.length) {
            return false;
        }

        this.inputWords.push(word); //amazenar palavras
        this.streak++; //somar ponto
        return true;
    }
}

