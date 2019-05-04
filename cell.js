class Cell {

    constructor(row, col, active) {
        this.row = row;
        this.col = col;
        this.w = res;
        if (active) {
            this.active = active;
        } else {
            this.active = false;
        }
    }

    show() {

        push();
        translate(this.col * this.w, this.row * this.w);
        rect(0, 0, this.w, this.w);
        pop();

    }

    checkNeighbors() {

        let neighbors = [];

        for (let i = -1; i <= 1; i++) {

            for (let j = -1; j <= 1; j++) {

                if (this.row > 0 && this.row < rows - 1 && this.col > 0 && this.col < cols - 1) {

                    if ((i != 0 || j != 0) && grid[this.row + i][this.col + j].active) {
                        neighbors.push(grid[i + this.row][j + this.col]);
                    }

                }

            }

        }

        return neighbors;

    }

    copy() {

        return new Cell(this.row, this.col, this.active);

    }

}