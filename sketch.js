var blockColors;
var gridColor;
var gridLineColor;

var blockWidth;
var blockHeight;
var gridWidth = 10;
var gridHeight = 20;
var widthSpacing = 10;
var heightSpacing = 20;
var dmouseX = 0;
var pdmouseX = 0;
var score = 0;
var passiveScoreIncreaseDelay = 50;
var passiveScoreIncrease = 10;
var holdDownMovement = false;
var holdDownKeyDelay = 25;

var sizePreComputedBlocks = 1000;
var blockBag = [];
var nextBlocks = [];
var fallingBlock;
var grid;






function createBlockBag() {
  var bb = [];
  for (i = 0; i < blockBlueprints.length; i++)
    bb.push(i);
  return bb;
}

function populateNextBlocks() {
  var iBlock;
  var iBlockBag;
  for (i = 0; i < sizePreComputedBlocks; i++) {
    iBlockBag = int(random(0, blockBag.length));
    iBlock = blockBag[iBlockBag];
    blockBag.splice(iBlockBag, 1);
    if (blockBag.length == 0)
      blockBag = createBlockBag();
    nextBlocks.push(iBlock);
  }
}

function createNewFallingBlock() {
  var randomFirstBlock = blockBlueprints[nextBlocks[0]];
  fallingBlock = new Block(blockColors[nextBlocks[0]], randomFirstBlock);
  nextBlocks.shift();
  nextBlocks.push(int(random(0, blockBlueprints.length)));
  fallingBlock.gridX = int(random(randomFirstBlock[0].length - 1, gridWidth - randomFirstBlock[0].length + 1));
  var lowestY = fallingBlock.grid.length-1;
  for (var ii = 0; ii < fallingBlock.grid[0].length; ii++)
    for (var i = 0; i < fallingBlock.grid.length; i++)
      if (fallingBlock.grid[i][ii] && i < lowestY)
        lowestY = i;
      
  fallingBlock.gridY = -lowestY;
  fallingBlock.drawX = grid.x + blockWidth * fallingBlock.gridX;
  fallingBlock.drawY = grid.y + blockHeight * fallingBlock.gridY;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
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

  createBlockBag()
  populateNextBlocks();
  createNewFallingBlock();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  blockHeight = (height - 2 * heightSpacing) / gridHeight;
  blockWidth = blockHeight;
  widthSpacing = (width - gridWidth * blockWidth) / 2;
  grid.blockWidth = blockWidth;
  grid.blockHeight = blockHeight;
}

function mousePressed() {
  if (focused) {
    if (mouseButton == RIGHT)
      fallingBlock.rotateLeft();
    else if (mouseButton == LEFT)
      grid.forceFall(fallingBlock);
  }
}
function mouseMoved() {
  if (focused) {
    if (mouseX > grid.x && mouseX < grid.x+gridWidth*blockWidth && mouseY > grid.y && mouseY < grid.y+gridHeight*blockHeight) {
      dmouseX = round(mouseX/blockWidth)*blockWidth-blockWidth+blockWidth/2+widthSpacing;
      pdmouseX = round(pmouseX/blockWidth)*blockWidth-blockWidth+blockWidth/2+widthSpacing;
    }
    if (dmouseX < pdmouseX)
      fallingBlock.moveLeft();
    if (dmouseX > pdmouseX)
      fallingBlock.moveRight();
  }
  return false;
}
document.oncontextmenu = function() {
  return false;
}

var checkDown = 20;
function draw() {
  if (!grid.checkGameOver()) {
    if (focused) {
      background(255);
      fill(0);
      textAlign(CENTER, TOP);
      textSize(12);
      text("Score = " + score, width/2, 5);
      grid.show();
      fallingBlock.show(fallingBlock.color, gridLineColor);
      
      if (holdDownMovement && frameCount % holdDownKeyDelay == 0) {
        if (keyIsDown(LEFT_ARROW))
            fallingBlock.moveLeft();
        else if (keyIsDown(RIGHT_ARROW))
            fallingBlock.moveRight();
      }
      else if (!fallingBlock.allowedToFinalizeMerge()) {
        if (keyCode == LEFT_ARROW && !keyIsDown(LEFT_ARROW))
          fallingBlock.moveLeft();
        else if (keyCode == RIGHT_ARROW && !keyIsDown(RIGHT_ARROW))
          fallingBlock.moveRight();
        else if (keyCode == UP_ARROW && !keyIsDown(UP_ARROW))
          fallingBlock.rotateLeft();
        else if (key == " " && !keyIsDown(" "))
          grid.forceFall(fallingBlock);
      }

      if (frameCount % checkDown == 0) {
        if (keyIsDown(DOWN_ARROW)) {
          checkDown = 7;
          grid.fall(fallingBlock);
        }
        else {
          checkDown = 25;
          grid.fall(fallingBlock);
        }
        grid.emptyRows();
      }
      if (frameCount % passiveScoreIncreaseDelay == 0)
        score += passiveScoreIncrease + int(random(0, 9));
      
      // Update code
      grid.updateOnDraw();
    }
    else {
      background(255);
      fill(143, 173, 165);
      textAlign(CENTER, CENTER);
      textSize(48);
      text("GAME IS UNFOCUSED", width/2, height/2);
    }
  }
  else {
    background(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(0);
    text("Final Score = " + score, width/2, height/2);
  }
  
  key = undefined;
  keyCode = undefined;
}
