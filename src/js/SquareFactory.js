function SquareFactory() {};

SquareFactory.create = function(type, x, y, color) {
    if (typeof(SquareFactory.prototype[type]) == 'undefined') {
        throw 'no this type';
    }

    if (SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    };

    var newSquare = new SquareFactory.prototype[type](x, y, color);

    return newSquare;

}

SquareFactory.prototype.init = function(Square, color, ms) {
    Square.viewContent.style.position = 'absolute';
    Square.viewContent.style.width = Square.width + 'px';
    Square.viewContent.style.height = Square.height + 'px';
    Square.viewContent.style.left = Square.x * SQUAREWIDTH + 'px';
    Square.viewContent.style.top = Square.y * SQUAREWIDTH + 'px';
    Square.viewContent.style.backgroundColor = color;
    Square.touch = function() {
        return ms
    }
}

SquareFactory.prototype.Floor = function(x, y, color) {
    var oFloor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oFloor, color, STRATEGYMESSAGEENUMERATE.MOVE);
    return oFloor;
}

SquareFactory.prototype.Stone = function(x, y, color) {
    var oStone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oStone, color, STRATEGYMESSAGEENUMERATE.DIE);
    return oStone;
}

SquareFactory.prototype.Food = function(x, y, color) {
    var oFood = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    oFood.upDate(x, y);
    this.init(oFood, color, STRATEGYMESSAGEENUMERATE.EAT);
    return oFood;
}

SquareFactory.prototype.SnakeHead = function(x, y, color) {
    var oSnakeHead = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    oSnakeHead.upDate(x, y);
    this.init(oSnakeHead, color, STRATEGYMESSAGEENUMERATE.HEAD);
    return oSnakeHead;
}

SquareFactory.prototype.SnakeBody = function(x, y, color) {
    var oSnakeBody = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(oSnakeBody, color, STRATEGYMESSAGEENUMERATE.DIE);
    return oSnakeBody;
}