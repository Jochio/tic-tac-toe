window.onload = function() {

	// Tic-Tac-Toe board to track progress displayed on the user interface
	var board = [];

	// Stores the current turn, X or O
	var turn;

	// Keeps track of whether or not the current game is over
	var gameOver;

	// p element to display error and informational messages
	var message = document.getElementById("message");

	// Event listener to update the user interface when it is clicked on
	document.getElementById("grid").addEventListener("click", function(e) {
		// Determine which div in the grid was clicked on 
		var id = e.path[0].id;
		// Ids in HTML are formatted 'br-c' where r = row and c = column
		// Get the row from the second character of the id
		var row = id[1];
		// Get column from the fourth character of the id
		var col = id[3];
		updateBoard(row, col);
	});

	// Event listener to reset the game when the 'New Game' button is clicked
	document.getElementById("new").addEventListener("click", function(){ 
		setNewGame();
	});

	function updateBoard(row, col) {
		if (isMoveValid(row, col)) {
			message.style.opacity = 0;
			// Update the user interface based on the row, column, and current player
			document.getElementById("b"+row+"-"+col).innerText = turn;
			// Update the board array to track the results
			board[row][col] = turn;
			if (hasPlayerWon(turn)) {
				gameOver = true;
				showEndMessage("Congratulations! Player " + turn + " has won!");
			} else if (isDraw()) {
				gameOver = true;
				showEndMessage("It's a draw!");
			} else {
				changeTurns();
			}
		} else {
			if (gameOver) {
				showErrorMessage("This game is over.");
			} else {
				showErrorMessage("Invalid move.");
			}
		}
	}

	// Displays custom error message with red color scheme
	function showErrorMessage(error) {
		message.innerHTML = "Error! " + error;
		message.style.opacity = 1;
		message.style.backgroundColor = "#ffcccc";
		message.style.color = "#cc0000";
		message.style.border = "1px solid #cc0000";
	}

	// Displays a custom message about a victory or a draw with a green color scheme
	function showEndMessage(msg) {
		message.innerHTML = msg;
		message.style.opacity = 1;
		message.style.backgroundColor = "#bfff80";
		message.style.color = "#336600";
		message.style.border = "1px solid #336600";
	}

	// Determines valid move based on the row and column in the board
	function isMoveValid(row, col) {
		// Move is not valid if the game is over
		if (gameOver) {
			return false;
		}
		// Move is valid if that space is free
		if (board[row][col] === ' ') {
			return true;
		}
		// Otherwise, move is not valid
		return false;
	}

	/* Determines if player has won by searching for their character (X or O) 
	 * in a row of three on the board */
	function hasPlayerWon(char) {
		// Check horizontal
		for (var r = 0; r <= 2; r++) {
			if (board[r][0] == char && board[r][1] == char && board[r][2] == char) {
				return true;
			}
		}
		// Check vertical
		for (var c = 0; c <= 2; c++) {
			if (board[0][c] == char && board[1][c] == char && board[2][c] == char) {
				return true;
			}
		}
		// Check diagonal
		if (board[0][0] == char && board[1][1] == char && board[2][2] == char) {
			return true;
		} else if (board[0][2] == char && board[1][1] == char && board[2][0] == char) {
			return true;
		}
		return false;
	}

	// Checks if there has been a draw
	function isDraw() {
		// Loops through the board array to check for empty spaces
		for (var r = 0; r <= 2; r++) {
			for (var c = 0; c <= 2; c++) {
				if (board[r][c] === ' ') {
					// If there is an empty space, it's not a draw
					return false;
				}
			}
		}
		// If no spaces are empty, it's a draw
		return true;
	}

	function changeTurns() {
		if (turn === 'X') {
			turn = 'O';
		} else {
			turn = 'X';
		}
		document.getElementById("turn").innerText = turn;
	}

	function setNewGame() {
		// If the board array has been populated, indicating a previous game...
		if (board.length > 0) {
			// ...clear the user interface so that divs no longer contain X's and O's
			for (var r = 0; r <= 2; r++) {
				for (var c = 0; c <= 2; c++) {
					document.getElementById("b"+r+"-"+c).innerText = ' ';
				}
			}
		}

		// Set the board array to empty
		board = [
			[' ', ' ', ' '],
			[' ', ' ', ' '],
			[' ', ' ', ' '],
		];

		// Player X starts by default
		turn = 'X';

		gameOver = false;

		// Display the initial instructions in a neutral color scheme
		message.innerText = "Click on a square to make your move!";
		message.style.opacity = 1;
		message.style.backgroundColor = "#ffd899";
		message.style.color = "#cc7e00";
		message.style.border = "1px solid #cc7e00";
	}

	setNewGame();

};
