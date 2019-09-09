var oGame = new Game();
oGame.timer = null;
oGame.score = 0;
oGame.starting = false;

oGame.init = function() {
    oGround.init();
    oSnake.init(oGround);
    createFood(oGround);
    document.onkeydown = function(e) {
        if (e.keyCode == 38 && oSnake.direction != DIRECTIONENUMERATE.DOWN) {
            oSnake.direction = DIRECTIONENUMERATE.UP
        } else if (e.keyCode == 37 && oSnake.direction != DIRECTIONENUMERATE.RIGHT) {
            oSnake.direction = DIRECTIONENUMERATE.LEFT;
        } else if (e.keyCode == 40 && oSnake.direction != DIRECTIONENUMERATE.UP) {
            oSnake.direction = DIRECTIONENUMERATE.DOWN;
        } else if (e.keyCode == 39 && oSnake.direction != DIRECTIONENUMERATE.LEFT) {
            oSnake.direction = DIRECTIONENUMERATE.RIGHT;
        }
    }

    var oBtn = document.getElementById('btn');
    oBtn.onclick = function() {
        oGame.start();
    }
}


oGame.start = function() {
    if (!this.starting) {
        this.timer = setInterval(function() {
            oSnake.move(oGround);
        }, INTERVAL)
    }
    this.starting = true;
}

oGame.over = function() {
    clearInterval(oGame.timer);
    this.starting = false;
    alert(this.score);
    this.init();
}

oGame.init();

function createFood(ground) {
    var x = null;
    var y = null;
    var flag = true;
    while (flag) {
        x = 1 + Math.floor(Math.random() * 28);
        y = 1 + Math.floor(Math.random() * 28);
        var ok = true;
        for (var node = oSnake.head; node; node = node.next) {
            if (x == node.x && y == node.y) {
                ok = false;
                break
            }
        }

        if (ok) {
            break
        }

    }

    var food = SquareFactory.create('Food', x, y, 'blue')

    ground.remove(x, y);
    ground.append(food);

}