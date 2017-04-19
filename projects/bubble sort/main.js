var numberArray = createRandomArray(10); //сортируемый массив
var argQueue = []; //массив аргументов функций для анимации

drawArray(numberArray, ".before"); //отрисовка массива до сортировки
drawRandomArray (numberArray); //отрисовка массива для анимации в виде шариков
sortArray(numberArray); //сортировка массива
drawArray(numberArray, ".after"); //отрисовка сортированного массива

$( ".btn-info" ).click(function() {
   $('.bubbleContainer').dequeue('myQueue');
}); //вызов очереди анимации по кнопке


/**
 * Отсортировывает массив в виде таблицы
 * @param {object} arr - Массив для отрисовки
 * @param {string} ContainerSelector - Селектор элемента-обертки сгенерированной таблицы
 */
function drawArray (arr, ContainerSelector) {
   var table = $('<div class="">').appendTo(ContainerSelector);
   var row = $('<div class="tableRow">').appendTo(table);
   for (var g = 0, cellCount = arr.length; g < cellCount; g++) {
      $('<div class="tableCell text-center">' + arr[g].value + '</div>').appendTo(row);
   }
}

/**
 * Возвращает массив из случайных чисел
 * @param {number} arraySize - Желаемое число сортируемых объектов
 * @return (object)
 */
function createRandomArray (arraySize) {
   var arr = [];
   var randomNumber;

   for (var i = 0; i < arraySize; i++) {
      randomNumber = generateNumber();

      arr[i] = {};
      arr[i].value = randomNumber;
   }
   return arr;
}

/**
 * Генерирует случайное число
 * @return (number)
 */
function generateNumber () {
   return Math.floor( Math.random()*100 );
}

/**
 * Отрисовывает массив для анимации
 * @param {object} arr - Массив для отрисовки
 */
function drawRandomArray (arr) {
   for (var k = 0, lng = arr.length; k < lng; k++) {
      el = $("<div class='bubble text-center' id='bubble" + k + "'>"+arr[k].value+"</div>")
         .appendTo(".bubbleContainer")
         .css('left', (k + 1)*100);
      arr[k].bubbleId = 'bubble'+k;
   }
}

/**
 * Отсортировывает массив
 * @param {object} arr - Массив для сортировки
 */
function sortArray(arr) {
   var numberCount = arr.length;
   for (var n = 1; n < numberCount; n++) {
      sortStep(n, arr);
   }
}

/**
 * Обрабатывает 1 цикл сортировки массива
 * @param {number} n - Счетчик циклов - с каждой итерацией увеличивается, т.к. уменьшается длина цикладля сортировки
 * @param {object} arr - Массив для сортировки
 */
function sortStep(n, arr) {
   var tmp;
   for (var h = 0, partOfArray = arr.length - n; h < partOfArray; h++) {

      animateSort("markPairs", arr, h);

      if (arr[h].value > arr[h + 1].value) {
         tmp = arr[h + 1];
         arr[h + 1] = arr[h];
         arr[h] = tmp;

         animateSort("movebubble", arr, h);
      }
   }
}

/**
 * Добавляет блок анимации в очередь
 * @param {string} action - Вариант анимации
 * @param {object} arr - Массив для сортировки
 * @param {number} h - Числовой ключ для обращения к элементу массива
 */
function animateSort(action, arr, h) {
   argQueue.push({ //добавляем аргументы фукнций для очереди анимации
      leftBubbleId:  arr[h].bubbleId,
      rightBubbleId: arr[h + 1].bubbleId
   });

   if (action == "markPairs") { //Подсветить текущие сравниваемые пары
      $('.bubbleContainer')
         .queue('myQueue', function (next) { //добавляем анимацию в очередь jQuery
            arguments = argQueue.shift();

            $("#" + arguments.leftBubbleId).animate(
               {
                  backgroundColor: "#E0867A;",
                  borderColor: "#E0867A;"
               },
               {
                  duration: 500,
                  queue: true
               }
            );
            $("#" + arguments.rightBubbleId).animate(
               {
                  backgroundColor: "#E0867A;",
                  borderColor: "#E0867A;"
               },
               {
                  duration: 500,
                  queue: true
               }
            );
            $("#" + arguments.leftBubbleId).animate(
               {
                  backgroundColor: "#6ABAE0;",
                  borderColor: "#6ABAE0;"
               },
               {
                  duration: 500,
                  queue: true
               }
            );
            $("#" + arguments.rightBubbleId).animate(
               {
                  backgroundColor: "#6ABAE0;",
                  borderColor: "#6ABAE0;"
               },
               {
                  duration: 500,
                  queue: true,
                  complete: next //вызываем следующий элемент очереди по завершению анимации
               }
            )
         })
      ;
   } else if (action == "movebubble") { //Обмен пузырьков местами
      $('.bubbleContainer')
         .queue('myQueue', function (next) { //добавляем анимацию в очередь jQuery
            arguments = argQueue.shift();

            $("#" + arguments.leftBubbleId).animate(
               {left: '-=100'},
               {
                  duration: 1000,
                  queue: false
               }
            );
            $("#" + arguments.rightBubbleId).animate(
               {left: '+=100'},
               {
                  duration: 1000,
                  queue: false,
                  complete: next //вызываем следующий элемент очереди по завершению анимации
               }
            )
         })
      ;
   }
}