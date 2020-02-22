var blockColors;
var gridColor;
var gridLineColor;

var fallingBlock;

var grid;
var gridWidth = 10;
var gridHeight = 20;
var blockWidth;
var blockHeight;
var widthSpacing = 10;
var heightSpacing = 10;




function setup() {
  createCanvas(800, 800);
  rectMode(CORNER);
  blockColors = [
    color(250, 15, 46),
    color(15, 250, 97),
    color(15, 176, 250),
    color(255, 156, 18),
    color(198, 95, 250),
    color(221, 227, 57),
    color(255, 79, 205),
  ];
  gridColor = color(0);
  gridLineColor = color(207);

  blockHeight = (height - 2 * heightSpacing) / gridHeight;
  blockWidth = blockHeight;
  widthSpacing = (width - gridWidth * blockWidth) / 2;
  grid = new Grid(widthSpacing, heightSpacing, gridWidth, gridHeight, blockWidth, blockHeight);
  
  var randomFirstBlock = blockBlueprints[int(random(0, blockBlueprints.length))]
  fallingBlock = new Block(color(0, 120, 0), randomFirstBlock);
  fallingBlock.gridX = int(random(randomFirstBlock[0].length-1, gridWidth-randomFirstBlock[0].length+1));
  fallingBlock.gridY = 0;
  fallingBlock.drawX = grid.x+blockWidth*fallingBlock.gridX;
  fallingBlock.drawY = grid.y+blockHeight*fallingBlock.gridY;
}

function keyPressed() {
  var lowestBlock = fallingBlock.lowestBlock();
  if (keyCode == LEFT_ARROW)
    fallingBlock.moveLeft();
  if (keyCode == RIGHT_ARROW)
    fallingBlock.moveRight();
  if (keyCode == UP_ARROW)
    fallingBlock.rotateLeft();
  if (keyCode == DOWN_ARROW) {
    grid.fall(fallingBlock);
    fallingBlock.gridY--;
    fallingBlock.drawY = grid.y+blockHeight*fallingBlock.gridY;
  }
}

function draw() {
  background(225);
  grid.show();
  if (fallingBlock != null)
    fallingBlock.show();
}
