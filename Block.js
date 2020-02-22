var i;
var ii;
var blockBlueprints = [
                 [
                  [true]
                 ],
                 [
                  [true],
                  [true]
                 ],
                 [
                  [true],
                  [true],
                  [true]
                 ],
                 [
                  [true],
                  [true],
                  [true],
                  [true]
                 ],
                 [
                  [false, true],
                  [true, true]
                 ],
                 [
                  [false, true],
                  [false, true],
                  [true, true]
                 ],
                 [
                  [true, false],
                  [true, true],
                  [false, true]
                 ],
                 [
                  [true, false],
                  [true, true],
                  [true, false]
                 ],
                 [
                  [true, true],
                  [true, true],
                 ],
                 [
                  [false, true, false],
                  [true, true, true],
                  [false, true, false]
                 ],
                 [
                  [false, true, true],
                  [false, true, false],
                  [true, true, false]
                 ],
                 [
                  [true, true],
                  [false, true],
                  [true, true]
                 ],
                 [
                  [true, false],
                  [true, true],
                  [true, false],
                  [true, false]
                 ],
                 [
                  [false, true, false],
                  [true, true, false],
                  [false, true, true]
                 ],
             ];




class Block {
  constructor(color, grid) {
    this.drawX = null;
    this.drawY = null;
    this.gridX = null;
    this.gridY = null;
    this.color = color;
    this.grid = [...grid];
  }
  
  moveLeft() {
    if (this.gridX-1 >= 0) {
      this.gridX--;
      this.drawX = grid.x+blockWidth*fallingBlock.gridX;
    }
  }
  
  moveRight() {
    if (this.gridX+1+this.grid[0].length <= gridWidth) {
      this.gridX++;
      this.drawX = grid.x+blockWidth*this.gridX;
    }
  }
  
  lowestBlock() {
    for (i = this.grid.length-1; i >= 0; i--)
      for (ii = 0; ii < this.grid[i].length; ii++)
        if (!this.grid[i][ii])
          return ii, i;
  }
  
  rotateLeft() {
    var newGrid = [];
    for (i = 0; i < this.grid.length; i++) {
      newGrid.push([]);
      for (ii = 0; ii < this.grid[i].length; ii++)
        newGrid[i].push(false);
    }
    for (i = 0; i < this.grid.length; i++) {
      for (ii = 0; ii < this.grid[i].length; ii++)
        newGrid[this.grid.length-ii-1][i] = this.grid[i][ii];
    }
    this.grid = [...newGrid];
    
    var highestY;
    nested:
    for (i = 0; i < this.grid.length; i++)
      for (ii = 0; ii < this.grid[i].length; ii++)
        if (!this.grid[i][ii]) {
          highestY = i;
          break nested;
        }
    print("highest y: " + highestY);
    print("grid y: " + this.gridY);
    this.gridY -= highestY+1;
    if (this.gridY < 0)
      this.gridY = 0;
    this.drawY = grid.y+blockHeight*this.gridY
  }
  
  show() {
    rectMode(CORNER);
    stroke(gridLineColor);
    fill(this.color);
    for (i = 0; i < this.grid.length; i++)
      for (ii = 0; ii < this.grid[i].length; ii++)
        if (this.grid[i][ii])
          rect(this.drawX+blockWidth*ii, this.drawY+blockHeight*i, blockWidth, blockHeight);
  }
}
