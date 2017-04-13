/**
 * Created by Полина on 13.04.2017.
 */

/**
 * Конструктор змейки
 */
function Snake () { //конструктор для создания объекта змейка
    this.segments = [ //массив сегментов, соответствующих сегментам змейки
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ];

    this.direction = "right";
    this.nextDirection = "right";
}

/**
 * Отрисовка змейки
 */
Snake.prototype.draw = function () { //создание змейки
    for (var i = 0, len = this.segments.length; i < len; i++) {
        var a;
        if ( (i % 2) == 0 && i !==0) {
            a = "Blue";
        } else if ((i % 2) !== 0){
            a = "Lightblue";
        } else {
            a = "Darkblue";
        }

        this.segments[i].drawSquare(a);
    }
};

/**
 * Отвечает за передвижение змейки по игровому полю
 */
Snake.prototype.move = function () {
    var head = this.segments[0]; //сохраняем первый элемент массива в head
    var newHead;

    this.direction = this.nextDirection; //direction будет обновляться 1 раз за 1 шаг анимации, св-во nextDirection меняет значение при нажатии клавиши

    if (this.direction === "right") {  //создаем новую змеиную голову и сохраняем в newHead
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }

    if (this.isCrash(newHead)) { //проверка, не врезалась ли змейка,
        gameOver();
        return;
    }

    this.segments.unshift(newHead); //пока змейка не столкнется, добавляем новую голову

    if (newHead.equal(apple.position)) { //сравнение позиций головы и яблока, если true, то змейка съела яблоко
        score++;
        animationTime *=0.95;
        apple.getPosition();
    } else{
        this.segments.pop(); //удаляет сегмент змеиного хвоста
    }
};

/**
 * Проверяет на столкновение со стеной или своим телом
 * @param head первый элемент тела змейки
 */
Snake.prototype.isCrash = function (head) { //проверка на столкновение со стеной или своим телом
    var leftCollision = (head.col === 0), //переменные = true, если голова примет эти координаты
        topCollision = (head.row === 0),
        rightCollision = (head.col === widthInBlocks - 1),
        bottomCollision = (head.row === heightInBlocks - 1);

    var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

    var selfCollision = false;
    // for (var i = 0, len = this.segments.length; i < len; i++) {
    //     if ((this.segments[0].col == this.segments[i].col) ||
    //         (this.segments[0].row == this.segments[i].row)) {
    //         selfCollision = true;
    //     }
    // }

    for (var j = 0, len = this.segments.length; j < len; j++) {
        if (head.equal(this.segments[j])) {
            selfCollision = true;
        }
    }

    return wallCollision || selfCollision;
};

/**
 * Проверяет на недопустимое напрвление змейки
 * @param newDirection новое направление змейки
 // * @returns {boolean}  */
Snake.prototype.setDirection = function (newDirection) { //проверка на недопустимое напрвление змейки
    if (this.direction === "up" && newDirection === "down") {
        return;
    } else if (this.direction === "right" && newDirection === "left") {
        return;
    } else if (this.direction === "down" && newDirection === "up") {
        return;
    } else if (this.direction === "left" && newDirection === "right") {
        return;
    }

    this.nextDirection = newDirection; //если направление допустимое - присваивается в св-во nextDir
};