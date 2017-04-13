/**
 * Created by Полина on 13.04.2017.
 */

/**
 * Конструктор яблока
 */
function Apple () { //конструктор яблока
    this.position = new Block(10, 10);
}

/**
 * Отрисовка яблока
 */
Apple.prototype.draw = function () {
    this.position.drawCircle("LimeGreen");
};

/**
 * Назначает координаты яблока и проверяет, чтобы они не совпали с коррдинатами змейки
 */
Apple.prototype.getPosition = function () {
    var randomCol = generateRandomCoordinates(widthInBlocks);
    var randomRow = generateRandomCoordinates(heightInBlocks);

    for (var i = 0, len = snake.segments.length; i < len; i++) {
        if (randomCol == snake.segments[i].col) {
            randomCol = generateRandomCoordinates(widthInBlocks);
        }
        if (randomRow == snake.segments[i].row) {
            randomRow = generateRandomCoordinates(widthInBlocks);
        }
    }

    this.position = new Block(randomCol, randomRow);
};