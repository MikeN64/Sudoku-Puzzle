module.exports = class Sudoku {
	constructor(board) {
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
};