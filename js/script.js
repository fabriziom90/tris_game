


const {
    createApp
} = Vue

createApp({
    data() {
        return {
            marker: '',
            selectionMarker: false,
            gameBoard: false,
            board: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            countMoves: 9,
            gameOver: false,
            winner: null,
        }

    },
    methods: {
        //FUNZIONE E FA COMINCIARE LA PARTITA
        startGame() {
            this.gameBoard = false;
            this.selectionMarker = true;
        },
        //FUNZIONE CHE IMPOSTA LE CLASSI PER I BORDI DELLA TAVOLA DI GIOCO
        setBorder(index) {
            return `cell-${index}`;
        },
        //FUNZIONE CHE DISEGNA LA TAVOLA
        drawBoard() {
            if (this.marker == '') {
                alert('Devi selezionare prima il simbolo che vuoi usare');
            }
            else {
                this.selectionMarker = false;
                this.gameBoard = true;

                setTimeout(() => {
                    if (this.marker == 'O') {
                        this.computerMove();
                    }

                }, 250);
            }
        },
        //FUNZIONE CHE AGGIUNGE IL SEGNO NELLA GAME BOARD
        addSign(rowIndex, colIndex) {
            let boxesList = document.querySelectorAll('.cell');

            if (this.board[rowIndex][colIndex] === '') {

                this.board[rowIndex][colIndex] = this.marker;

                //RENDO L'ARRAY MULTIDIMENSIONALE UNIDIMENSIONALE PER FACILITA' DI UTILIZZO E TROVO L'INDICE IN CUI AGGIUNGERE IL SEGNO
                let flatSchema = this.board.flat();
                let flatIndex = rowIndex * 3 + colIndex;

                boxesList[flatIndex].innerHTML = this.marker == 'X' ? '<div class="mark x">&#10060;</div>' : '<div class="mark o">O</div>';
                boxesList[flatIndex].attributes.disabled = true;
                let flag = false;
                //DECREMENTO IL NUMERO TOTALE DI MOSSE PER VERIFICARE SE LA PARTITA E' FINITA O MENO
                this.countMoves--;

                this.checkWinner();
                // TROVO L'INDICE RANDOMICO. SE E' GIA' STATO TROVATO, VUOL DIRE CHE E' STATO MESSO IL SEGNAPOSTO SULLO SCHEMA.ALTRIMENTI LO INSERISCO ED ESCO DAL CICLO
                while (!flag && this.countMoves > 0) {
                    let randomIndex = Math.floor(Math.random() * flatSchema.length);
                    let pcRow = Math.floor(randomIndex / 3);
                    let pcCol = randomIndex % 3;


                    if (this.board[pcRow][pcCol] === '') {
                        this.board[pcRow][pcCol] = this.marker == 'X' ? 'O' : 'X';
                        flag = true;


                        boxesList[randomIndex].innerHTML = this.marker == 'X' ? '<div class="mark o">O</div>' : '<div class="mark x">&#10060;</div>';
                        this.countMoves--;
                        this.checkWinner();
                        // boxesList[randomIndex].innerHTML = '<div class="mark o"></div>';
                    }
                }
            }
        },
        //FUNZIONE CHE ESEGUE LA PRIMA MOSSA NEL CASO COMINCI IL COMPUTER
        computerMove() {
            let flatSchema = this.board.flat();
            let randomIndex = Math.floor(Math.random() * flatSchema.length);
            let pcRow = Math.floor(randomIndex / 3);
            let pcCol = randomIndex % 3;
            this.board[pcRow][pcCol] = 'X';

            let boxesList = document.querySelectorAll('.cell');

            boxesList[randomIndex].innerHTML = this.marker == 'X' ? '<div class="mark o">O</div>' : '<div class="mark x">&#10060;</div>';
        },
        //FUNZIONE CHE CONTROLLA IL VINCITORE
        checkWinner() {

            const combinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            combinations.forEach((elem) => {

                let boxesList = document.querySelectorAll('.cell');

                let flatSchema = this.board.flat();

                let box1 = flatSchema[elem[0]];
                let box2 = flatSchema[elem[1]];
                let box3 = flatSchema[elem[2]];

                if (box1 != '' | box2 != '' | box3 != '') {



                    if (box1 == box2 && box2 == box3) {
                        this.gameOver = true;
                        if (box1 == this.marker) {
                            this.winner = 1;
                            boxesList[elem[0]].classList.add('win');
                            boxesList[elem[1]].classList.add('win');
                            boxesList[elem[2]].classList.add('win');
                        }
                        else {
                            this.winner = 2;
                            boxesList[elem[0]].classList.add('lost');
                            boxesList[elem[1]].classList.add('lost');
                            boxesList[elem[2]].classList.add('lost');
                        }
                        console.log(box1, box2, box3);
                    }

                    else if (!flatSchema.includes('') && boxesList[0]) {
                        this.gameOver = true;
                        this.winner = 3;
                        console.log(box1, box2, box3);
                    }
                }
            })

        },
        //FUNZIONE CHE FA RICOMINCIARE LA PARTITA REINIZIALIZZANDO LE VARIABILE NEL DATA
        restartGame() {
            this.gameOver = false;
            this.winner = null;
            this.marker = '';
            this.selectionMarker = true;
            this.gameBoard = false;
            this.board = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            this.countMoves = 9;
        }
    }
}).mount('#app')
