// 定义每行有多少个方块
var XLEN = 30;
var YLEN = 30;

// 定义每个方块大小
var SQUAREWIDTH = 20;

// 定义游戏位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 200;

// 定义蛇的移动时间
var INTERVAL = 200;


// 定义方块
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}

Square.prototype.upDate = function(x, y) {
    this.x = x;
    this.y = y;
}



var Floor = tool.extends(Square);
var Stone = tool.extends(Square);
var Food = tool.single(Square);
var SnakeHead = tool.single(Square);
var SnakeBody = tool.extends(Square);
var Snake = tool.single();
var Ground = tool.single(Square);
var Game = tool.single();


var STRATEGYMESSAGEENUMERATE = {
    MOVE: 'move',
    DIE: 'die',
    EAT: 'eat',
    HEAD: 'head'
}