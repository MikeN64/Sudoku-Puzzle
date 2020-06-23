module.exports = class Sudoku {
	constructor(board=[[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "],[" "," "," "," "," "," "," "," "," "]]) {
		this.SIZE = 9;
		this.SUBBOX_SIZE = 3;
		this.DIGITS = new Set("123456789");
		this.board = board;
	}

	isPuzzleValid() {
		// Check if row or col contains duplicated digits
		let isLineRepeated = line => {
	        let checked = new Set();
	        
	        for (let digit of line) {
	            if (this.DIGITS.has(digit) && checked.has(digit)) {
	                return true;
	            }
	            checked.add(digit);
	        }
	        
	        return false;
    	}

    	// Check if sub-box of the Sudoku contains duplicated digits
    	let isSubBoxRepeated = box => {
	        let rowOffset = Math.floor(box / this.SUBBOX_SIZE) * this.SUBBOX_SIZE;
	        let colOffset = (box % this.SUBBOX_SIZE) * this.SUBBOX_SIZE;
	        let checked = new Set();
	        
	        for (let row=0; row<this.SUBBOX_SIZE; row++) {
	            for (let col=0; col<this.SUBBOX_SIZE; col++) {
	                let digit = this.board[rowOffset + row][colOffset + col]
	                if (this.DIGITS.has(digit) && checked.has(digit)) {
	                    return true;
	                }
	                checked.add(digit);
	            }
	        }
	        
	        return false;
	    }

	    // Check each row has unique digits
	    for (let row=0; row<this.SIZE; row++) {
	        if (isLineRepeated(this.board[row])) {
	            return false;
	        }
	    }
	    
	    // Check each col has unique digits
	    for (let col=0; col<this.SIZE; col++) {
	        let line = this.board.map(row => row[col]);
	        if (isLineRepeated(line)) {
	            return false;
	        }
	    }
	    
	    // Check each sub-box has unique digits
	    for (let box=0; box<this.SIZE; box++) {
	        if (isSubBoxRepeated(box)) {
	            return false;
	        }
	    }
	    
	    return true;
	}

	isDigitOnRowValid(row, digit) {
		for (let y=0; y<this.SIZE; y++) {
			if (this.board[row][y] == digit) {
				return false;
			}
		}

		return true;
	}

	isDigitOnColValid(col, digit) {
		for (let x=0; x<this.SIZE; x++) {
			if (this.board[x][col] == digit) {
				return false;
			}
		}

		return true;
	}

	isDigitOnSubBoxValid(row, col, digit) {
		let xOffset = Math.floor(row/this.SUBBOX_SIZE) * this.SUBBOX_SIZE;
		let yOffset = Math.floor(col/this.SUBBOX_SIZE) * this.SUBBOX_SIZE;
		for (let x=0; x<this.SUBBOX_SIZE; x++) {
			for (let y=0; y<this.SUBBOX_SIZE; y++) {
				if (this.board[xOffset + x][yOffset + y] == digit) {
					return false;
				}
			}
		}

		return true;
	}

	// Returns true if digit is not found in the specific row and col
	isDigitValid(row, col, digit) {
		let rowCond = this.isDigitOnRowValid(row, digit);
		let colCond = this.isDigitOnColValid(col, digit);
		let boxCond = this.isDigitOnSubBoxValid(row, col, digit);
		return [rowCond, colCond, boxCond].every(cond => cond);
	}

	// Returns true if it can solve the puzzle
	solvePuzzle() {
		for (let row=0; row<this.SIZE; row++) {
			for (let col=0; col<this.SIZE; col++) {
				let symbol = this.board[row][col];
				if (!this.DIGITS.has(symbol)) {
					for (let digit=1; digit<this.SIZE+1; digit++) {
						if (this.isDigitValid(row, col, digit)) {
							this.board[row][col] = String(digit);
							if (this.solvePuzzle()) {
								return true;
							}
							this.board[row][col] = symbol;
						}
					}
					return false;
				}
			}
		}

		return true;
	}

	clearBoard() {
		for (let row=0; row<this.SIZE; row++) {
			this.board[row].fill(" ");
		}
	}

	// Set the board to a new generated one based on the number of cells to be fill
	newBoard(numberOfCells) {
		let random_number = () => Math.floor(Math.random() * this.SIZE);

		this.clearBoard();
		while (numberOfCells > 0) {
			let row = random_number();
			let col = random_number();
			let cell = this.board[row][col];
			if (!this.DIGITS.has(cell)) {
				let digit = String(random_number() + 1);
				while (!this.isDigitValid(row, col, digit)) {
					digit = String(random_number() + 1);
				}
				this.board[row][col] = digit;
				numberOfCells--;
			}
		}
	}

	logBoard() {
		for (let row=0; row<this.SIZE; row++) {
			let cleanRow = JSON.stringify(this.board[row]);
			console.log(cleanRow);
		}
	}
};