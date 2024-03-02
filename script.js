const GRIDSIDE = 600;
let rows = 16;
let cols = 16;
let isMouseDown = false;

const sketchArea = document.querySelector("#sketch-area");
sketchArea.style.width = `${GRIDSIDE}px`;
sketchArea.style.height = `${GRIDSIDE}px`;

const newGridBtn = document.getElementById("new-grid-btn");
const clearBtn = document.getElementById("clear-btn");
const randomColorBtn = document.getElementById("random-rgb-btn");

const sliderContainer = document.querySelector("#slider-container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");
sliderValue.textContent = `${slider.value} x ${slider.value} (Resolution)`;

newGridBtn.addEventListener("click", () => {
    const squaresPerSide = prompt("Enter the number of squares per side: (1-100) ");
    if (squaresPerSide <= 100 && squaresPerSide >= 1) {
        resetGrid(parseInt(squaresPerSide));
    } else {
        alert("Please enter a size between 1 and 100");
    }
});

clearBtn.addEventListener("click", () => {
    clearGrid();
});

randomColorBtn.addEventListener("click", () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        if (cell.style.backgroundColor === "black"){
            changeColor(cell);
        } 
    });
});

function createGridCells() {

    for (let i = 0; i < (rows * cols); i++) {
        const gridCell = document.createElement("div");
        gridCell.style.width = `${(GRIDSIDE / cols) - 2}px`;
        gridCell.style.height = `${(GRIDSIDE / rows) - 2}px`;
        gridCell.classList.add("cell");

        gridCell.addEventListener("mousedown", function() {
            isMouseDown = true;
            gridCell.style.backgroundColor = "black";
        });

        gridCell.addEventListener("mouseenter", function() {
            if (isMouseDown) {
                gridCell.style.backgroundColor = "black";
            }
        });

        gridCell.addEventListener("mouseup", function() {
            isMouseDown = false;
        });

        sketchArea.appendChild(gridCell);
    }
}

function resetGrid(squaresPerSide) {
    rows = squaresPerSide;
    cols = squaresPerSide;
    sketchArea.innerHTML = '';

    sketchArea.style.width = `${GRIDSIDE}px`;
    sketchArea.style.height = `${GRIDSIDE}px`;

    createGridCells();
}

function clearGrid() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = "white";
    });
}

function changeColor(cell) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    cell.style.backgroundColor = `rgb(${red},${green},${blue})`;
}

slider.oninput = function(){
    let txt = `${this.value} x ${this.value} (Resolution)`;
    sliderValue.innerHTML = txt;
    resetGrid(this.value);
}

createGridCells();
