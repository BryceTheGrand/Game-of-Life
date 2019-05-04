var grid = [];
var res = 10;
var rows, cols;
var newGrid = [];
var looping = true;
var pauseButton;


function setup() {

    createCanvas(1000, 1000);

    rows = height / res;
    cols = width / res;

    for (let i = 0; i < rows; i++) {

        grid[i] = new Array(floor(cols));

    }

    for (let i = 0; i < rows; i++) {

        for (let j = 0; j < cols; j++) {

            grid[i][j] = new Cell(i, j, false);

        }

    }

    for (let i = 0; i < rows; i++) {

        newGrid[i] = new Array(floor(cols));

    }

    frameRate(5);

    pauseButton = createButton("Pause/Resume");
    pauseButton.mouseClicked(() => {
        if (looping) {
            looping = false;
        } else {
            looping = true;
        }
    });

}


function showCurrentState(toShow) {

    for (let i = 0; i < rows; i++) {

        for (let j = 0; j < cols; j++) {

            if (toShow[i][j].active)
                toShow[i][j].show();

        }

    }

}


function checkCells() {

    for (let i = 0; i < rows; i++) {

        for (let j = 0; j < cols; j++) {

            let neighbors = grid[i][j].checkNeighbors();

            if (grid[i][j].active) {

                if (neighbors.length < 2 || neighbors.length > 3) {
                    newGrid[i][j].active = false;
                }

            } else {

                if (neighbors.length == 3) {

                    newGrid[i][j].active = true;

                }

            }

        }

    }

}


function draw() {

    if (looping) {

        background(0);

        for (let i = 0; i < rows; i++) {

            for (let j = 0; j < cols; j++) {

                newGrid[i][j] = grid[i][j].copy();

            }

        }

        checkCells();

        for (let i = 0; i < rows; i++) {

            for (let j = 0; j < cols; j++) {

                grid[i][j] = newGrid[i][j].copy();

            }

        }

        showCurrentState(grid);
        drawGridlines();

    }

}


function drawGridlines() {

    stroke(255, 50);

    for (let row = 0; row < rows; row++) {

        line(0, row * res, width, row * res)

    }

    for (let col = 0; col < cols; col++) {

        line(col * res, 0, col * res, height)

    }

    line(0, height - 1, width, height - 1);
    line(width - 1, 0, width - 1, height);

}


function mouseDragged() {

    let row = floor(mouseY / res);
    let col = floor(mouseX / res);

    if (row < rows && col < cols) {
        if (mouseButton == LEFT) {
            grid[row][col].active = true;
        }
    }

    showCurrentState(grid);

}


function mousePressed() {

    let row = floor(mouseY / res);
    let col = floor(mouseX / res);

    if (row < rows && col < cols) {
        if (mouseButton == LEFT) {
            grid[row][col].active = true;
        }
    }

    showCurrentState(grid);

}


function restartGame() {

    grid = [];
    newGrid = [];

    for (let i = 0; i < rows; i++) {

        grid[i] = new Array(floor(cols));

    }

    for (let i = 0; i < rows; i++) {

        for (let j = 0; j < cols; j++) {

            grid[i][j] = new Cell(i, j, false);

        }

    }

    for (let i = 0; i < rows; i++) {

        newGrid[i] = new Array(floor(cols));

    }

    showCurrentState(grid);

}


function keyPressed() {

    if (key == 'c') {
        restartGame();
    }

}