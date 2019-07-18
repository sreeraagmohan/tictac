/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

let grid = [];
let gameOver = false;
let turn = 'X';
const GRID_LENGTH = 3;


function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
    renderMainGrid();
}

function resetGrid() {
    grid = [];
    document.getElementById('reset-btn').style.visibility = 'hidden';
    gameOver = false;
    turn = 'X';
    initializeGrid();
    addClickHandlers();
    renderStatusIndicator();
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function renderStatusIndicator(winner) {
    if (winner) {
        const status = document.getElementById('status-indicator');
        switch(winner) {
            case 1:
                status.innerHTML = "You won!"
                break;
            case 2:
                status.innerHTML = "Computer won!"
                break;
            case 3:
                status.innerHTML = "It's a tie!";
                break;
        }
        gameOver = true;
        document.getElementById('reset-btn').style.visibility = 'visible';
    } else {
        const status = document.getElementById('status-indicator');
        status.innerHTML = "Player " + turn + "'s turn."
    }
}

function calculateWinner(grid) {
    const wins = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]],
    ];
    for (let i = 0; i < wins.length; i++) {
      const [a, b, c] = wins[i];
      if (grid[a[0]][a[1]] && grid[a[0]][a[1]] === grid[b[0]][b[1]] && grid[a[0]][a[1]] === grid[c[0]][c[1]]) {
        renderStatusIndicator(grid[a[0]][a[1]]);
      }
    }
    return null;
}


// Check for free slots, computer chooses a random slot from available options.
function simulateComputerMove(grid) {
    let options = [];
    for (let i=0; i < GRID_LENGTH; i++) {
        for(let j=0; j < GRID_LENGTH; j++) {
            if (grid[i][j] === 0) {
                options.push([i,j]);
            }
        }
    }
    if (options.length !== 0) {
        let selectOpt = options[Math.floor(Math.random() * options.length)];
        grid[selectOpt[0]][selectOpt[1]] = 2;
        turn = 'X';
    } else {
        renderStatusIndicator(3);
    }
    calculateWinner(grid);
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");

    // Check if the grid does not have value in it
    if (grid[colIdx][rowIdx] === 0 && !gameOver) {
        // Set Grid And Swap Turn
        if (turn === 'X') {
            grid[colIdx][rowIdx] = 1;
            turn = 'O';
            simulateComputerMove(grid);
        } 
    }

    renderMainGrid();
    addClickHandlers();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
addClickHandlers();
renderStatusIndicator();