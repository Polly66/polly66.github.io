/**
 * Created by Полина on 13.04.2017.
 */

/**
 * Конструктор блоков
 * @param col координата по оси Ох
 * @param row координата по оси Оу
 */
function Block(col, row) {
    this.col = col;
    this.row = row;
}

/**
 * Отрисовка квадратов с заданным цветом
 * @param color требуемый цвет
 */
Block.prototype.drawSquare = function(color){  //рисует квадрат в позиции,заданной св-вами col и row
    var x = this.col * blockSize;
    var y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};

/**
 * Отрисовка окружности с заданным цветом
 * @param color требуемый цвет
 */
Block.prototype.drawCircle = function(color){ //рисует круг
    var centerX = this.col * blockSize + blockSize / 2;
    var centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true)
};

Block.prototype.equal = function (otherBlock) { //проверка нахождения объектов ячейки в одной позиции
    return this.col === otherBlock.col && this.row === otherBlock.row;
};