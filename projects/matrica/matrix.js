var matrixSize,
    matrix = [];

getSize();

function runApplication() {
    fillArray (matrix, matrixSize);
    drawArray (matrix, ".container1");
    matrix = rotateMatrix(matrix);
    drawArray (matrix, ".container2");
}

function getSize() {
    bootbox.prompt(
        "Напишите размер матрицы",
        function (result) {
            if (isValidValue(result)) {
                matrixSize = result;
                runApplication();
            } else {
                bootbox.alert(
                    "Некорректное значение. Повторите попытку",
                    getSize()
                );
            }
        }
    );
}

function isValidValue (n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && (n > 1) && ((n - Math.floor(n)) == 0)
}

function fillArray (arr, a) {
    var counter = 1;
    for (var i = 0; i < a; i++) {
        arr[i] = [];
        for (var j = 0; j < a; j++) {
            arr[i][j] = counter;
            counter++;
        }
    }
}

function drawArray (arr, tableContainerSelector) {
    var tableContainer = document.querySelector(tableContainerSelector);
    var table = document.createElement('div');
    table.className = "matrix-table";
    var row,
        cell;
    for (var i = 0, rowCount = arr.length; i < rowCount; i++) {
        row = document.createElement('div');
        for (var j = 0, colCount = arr[i].length; j < colCount; j++) {
            cell = document.createElement('div');
            cell.innerHTML = arr[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    tableContainer.appendChild(table);
}

var tmpArr = [];
function rotateMatrix (arr) {

    for (var i = 0, rowCount = matrixSize; i < rowCount; i++) {
        tmpArr[i] = [];
        for (var j = 0, colCount = matrixSize; j < colCount; j++) {
            tmpArr[i][matrixSize-j-1] = arr[j][i];
        }
    }
    return tmpArr;
}




