/* 
Filename: ComplexCode.js
Description: This complex code implements a web-based game where users can play a game of Tic Tac Toe against an AI opponent.
*/

// Game board object
const board = {
  // Initialize an empty 3x3 game board
  cells: ['', '', '', '', '', '', '', '', ''],
  
  // Display the game board on the console
  displayBoard() {
    let output = '';
    for (let i = 0; i < this.cells.length; i++) {
      output += this.cells[i] + ' ';
      if ((i + 1) % 3 === 0) {
        output += '\n';
      }
    }
    console.log(output);
  },
  
  // Reset the game board
  resetBoard() {
    this.cells = ['', '', '', '', '', '', '', '', ''];
  },
  
  // Check if a player has won the game
  checkWin(player) {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.cells[i * 3] === player &&
        this.cells[i * 3 + 1] === player &&
        this.cells[i * 3 + 2] === player
      ) {
        return true;
      }
    }
    
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.cells[i] === player &&
        this.cells[i + 3] === player &&
        this.cells[i + 6] === player
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      (this.cells[0] === player && this.cells[4] === player && this.cells[8] === player) ||
      (this.cells[2] === player && this.cells[4] === player && this.cells[6] === player)
    ) {
      return true;
    }

    return false;
  },
};

// Player object
const player = {
  // Initialize a player with a given symbol (X or O)
  init(symbol) {
    this.symbol = symbol;
  },
};

// AI opponent object
const ai = {
  // Initialize the AI opponent
  init() {
    this.symbol = 'O'; // AI uses 'O' symbol
    this.opponentSymbol = 'X'; // Player uses 'X' symbol
  },
  
  // Make a move by selecting a random available cell
  makeMove() {
    let availableCells = [];
    for (let i = 0; i < board.cells.length; i++) {
      if (board.cells[i] === '') {
        availableCells.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    board.cells[availableCells[randomIndex]] = this.symbol;
  },
  
  // Check if there's a winning move for the AI
  winningMove() {
    for (let i = 0; i < board.cells.length; i++) {
      if (board.cells[i] === '') {
        board.cells[i] = this.symbol;
        if (board.checkWin(this.symbol)) {
          board.cells[i] = '';
          return true;
        } else {
          board.cells[i] = '';
        }
      }
    }
    return false;
  },
  
  // Block the player's winning move if possible
  blockPlayerMove() {
    for (let i = 0; i < board.cells.length; i++) {
      if (board.cells[i] === '') {
        board.cells[i] = this.opponentSymbol;
        if (board.checkWin(this.opponentSymbol)) {
          board.cells[i] = this.symbol;
          return true;
        } else {
          board.cells[i] = '';
        }
      }
    }
    return false;
  },
  
  // Make a move by selecting the best available move
  makeBestMove() {
    if (board.cells[4] === '') {
      board.cells[4] = this.symbol;
    } else if (this.winningMove()) {
      // Make winning move if available
    } else if (this.blockPlayerMove()) {
      // Block player's winning move if available
    } else {
      this.makeMove();
    }
  },
};

// Main game controller
const gameController = {
  // Start a new game
  startNewGame() {
    console.log('Welcome to Tic Tac Toe!');

    // Initialize the player and AI objects
    player.init('X');
    ai.init();

    // Game loop
    while (true) {
      board.displayBoard();
      
      // Player's turn
      while (true) {
        const position = parseInt(prompt('Enter your move (0-8):'));
        if (isNaN(position) || position < 0 || position > 8 || board.cells[position] !== '') {
          console.log('Invalid move! Please try again.');
        } else {
          board.cells[position] = player.symbol;
          break;
        }
      }

      if (board.checkWin(player.symbol)) {
        board.displayBoard();
        console.log('Congratulations! You won!');
        break;
      } else if (!board.cells.includes('')) {
        board.displayBoard();
        console.log('It\'s a tie!');
        break;
      }

      // AI's turn
      ai.makeBestMove();

      if (board.checkWin(ai.symbol)) {
        board.displayBoard();
        console.log('AI wins! Better luck next time.');
        break;
      }
    }

    // Ask if the player wants to play again
    const playAgain = confirm('Do you want to play again?');
    if (playAgain) {
      board.resetBoard();
      this.startNewGame();
    } else {
      console.log('Game over. Goodbye!');
    }
  },
};

// Start the game
gameController.startNewGame();