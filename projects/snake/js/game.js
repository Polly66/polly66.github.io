// настройка холста
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height,

//вычисление ширины и высоты поля в ячейках
    blockSize = 10, //размер ячейки поля
    widthInBlocks = width / blockSize, //ширина холста в ячейках
    heightInBlocks = height / blockSize,//высота холста в ячеках

//устанавливаем счет в 0
    score = 0,
    gamePaused = false,
    gameStarted = false,
    timerId,
    animationTime = 100;

var keyMapping = {
    ENTER : 13,
    SPACE: 32,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40
};

var direction = { //объект для преобразования кодов клавиш-стрелок в строки
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};

var snake = new Snake();
var apple= new Apple();

drawFirstScreen();

/**
 * Отрисовка приветственного окна
 */
function drawFirstScreen() {
    drawBorder();
    ctx.font = "bold 25px Courier"; //размер и семейство шрифта
    ctx.fillStyle = "Green"; //цвет шрифта
    ctx.textAlign = "center"; //выравнивание по центру
    ctx.textBaseline = "middle"; // выравнивание по высоте посередине
    ctx.fillText("Для начала игры нажмите Enter", width / 2, height / 2); // текст и координаты
}

/**
 * Отрисовка рамки вокруг холста
  */
function drawBorder () {
    ctx.fillStyle = "Gray"; //цвет рамки
    ctx.fillRect(0, 0, width, blockSize); //верхняя рамка
    ctx.fillRect(0, height - blockSize, width, blockSize); //нижняя рамка
    ctx.fillRect(0, 0, blockSize, height); // левая рамка
    ctx.fillRect(width - blockSize, 0,  blockSize, height); // правая рамка
}

/**
 * Отображение счета игры
 */
function drawScore () { //отображение счета игры
    ctx.font = "20px Courier"; //размер и семейство шрифта
    ctx.fillStyle = "Black"; //цвет шрифта
    ctx.textAlign = "left"; //выравнивание по левому краю от точки
    ctx.textBaseline = "top"; // выравнивание по высоте - внизу точки
    ctx.fillText("Счет: " + score, blockSize, blockSize); // текст и координаты точки
}

/**
 * Функция, вызываемая при врезания змейки в себя или края игрового поля
 */
function gameOver () {
    clearTimeout(timerId);
    ctx.font = "bold 50px Courier"; //размер и семейство шрифта
    ctx.fillStyle = "Red"; //цвет шрифта
    ctx.textAlign = "center"; //выравнивание по центру
    ctx.textBaseline = "middle"; // выравнивание по высоте посередине
    ctx.fillText("Конец игры", width / 2, height / 2); // текст и координаты точки
    document.removeEventListener('keydown', reactOnKeydown, false);
}


/**
 * Отрисовка круга
 * @param x координата центра окружности по оси Ox
 * @param y координата центра окружности по оси Oy
 * @param radius радиус окружности
 * @param fillCircle булево значение: true - не заливать окружность цветом, false - нет
 */
function circle (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

/**
 * Генератор рандомных координат
 * @param a размер оси в блоках
 */
function generateRandomCoordinates (a){
    return Math.floor(Math.random() * (a - 2)) + 1;
}

/**
 * Шаг игры
 */
var gameLoop = function () {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.draw();
    snake.move();
    apple.draw();
    drawBorder();

    timerId = setTimeout(gameLoop, animationTime);
};


document.addEventListener('keydown', reactOnKeydown, false);

/**
 * Обработывает событие
 * @param event событие
 */
function reactOnKeydown(event) {
    var newDirection = direction[event.keyCode];
    if (newDirection !== undefined && gameStarted && !gamePaused) {
        snake.setDirection(newDirection);
    } else if (event.keyCode == keyMapping.SPACE) { //Pause
        if (gamePaused = !gamePaused) {
            clearTimeout(timerId);
        } else {
            gameLoop();
        }
    } else if (event.keyCode == keyMapping.ENTER) { //Game start
        gameStarted = true;
        gameLoop();

    }
}