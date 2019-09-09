var oSnake = new Snake();
oSnake.head = null;
oSnake.tail = null;

var DIRECTIONENUMERATE = {
    UP: {
        x: 0,
        y: -1
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    DOWN: {
        x: 0,
        y: 1
    },
    LEFT: {
        x: -1,
        y: 0
    }
}


oSnake.init = function(ground) {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');
    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);
    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);
    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    this.head = snakeHead;
    this.tail = snakeBody2;

    // 链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;
    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;
    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    this.direction = DIRECTIONENUMERATE.RIGHT;
}

oSnake.strategies = {
    move: function(snake, square, ground, fromEat) {
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');
        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        newBody.next = snake.head.next;
        newBody.next.last = newBody;
        newBody.last = null;

        // 新建蛇头位置

        var newHead = SquareFactory.create('SnakeBody', square.x, square.y, 'deeppink');
        ground.remove(square.x, square.y);
        ground.append(newHead);

        newHead.next = newBody;
        newBody.last = null;
        snake.head = newHead;

        // 删除蛇尾
        if (!fromEat) {
            var newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange')

            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            snake.tail = snake.tail.last;
            snake.tail.next = null;

        }

    },
    eat: function(snake, square, ground) {
        this.move(snake, square, ground, true);
        createFood(oGround)
        oGame.score++;
    },
    die: function() {
        oGame.over();
    }
}


oSnake.move = function(ground) {
    var nextSquare = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if (typeof nextSquare.touch == 'function') {
        this.strategies[nextSquare.touch()](this, nextSquare, ground);
    }
}

