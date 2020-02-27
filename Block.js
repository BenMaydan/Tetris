var blockBlueprints = 
  [
    [
      [true, true],
      [true, true]
    ],
    [
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false],
      [false, false, false, false],
    ],
    [
      [true, false, false],
      [true, true, true],
      [false, false, false]
    ],
    [
      [false, false, true],
      [true, true, true],
      [false, false, false]
    ],
    [
      [false, true, true],
      [true, true, false],
      [false, false, false]
    ],
    [
      [false, true, false],
      [true, true, true],
      [false, false, false]
    ],
    [
      [true, true, false],
      [false, true, true],
      [false, false, false]
    ],
  ];




class Block {
  constructor(c, grid) {
    this.drawX = null;
    this.drawY = null;
    this.gridX = null;
    this.gridY = null;
    this.color = c;
    this.flashingColor = color(red(c)+50, green(c)+50, blue(c)+50);
    this.highlightColor = color(red(c), green(c), blue(c));
    this.highlightColor.setAlpha(55);
    this.grid = [...grid];

    this.mergeDelayFrames = 30;
    this.frameCountBeforeMerge = null;
  }

  allowedToFinalizeMerge() {
    if (this.frameCountBeforeMerge === null)
      return false;
    return frameCount == this.frameCountBeforeMerge + this.mergeDelayFrames;
  }

  moveLeft() {
    for (i = 0; i < this.grid.length; i++)
      for (ii = 0; ii < this.grid[i].length; ii++)
        if (this.grid[i][ii] && (this.gridX + ii - 1 < 0 || grid.grid[this.gridY + i][this.gridX + ii - 1][0]))
          return;

    this.gridX--;
    this.drawX = grid.x + blockWidth * fallingBlock.gridX;
    if (!grid.shouldMerge(this))
      this.frameCountBeforeMerge = null;
  }

  moveRight() {
    for (i = 0; i < this.grid.length; i++)
      for (ii = 0; ii < this.grid[i].length; ii++)
        if (this.grid[i][ii] && (this.gridX + ii + 1 >= gridWidth || grid.grid[this.gridY + i][this.gridX + ii + 1][0]))
          return;
          
    this.gridX++;
    this.drawX = grid.x + blockWidth * this.gridX;
    if (!grid.shouldMerge(this))
      this.frameCountBeforeMerge = null;
  }

  rotateLeft() {
    if (this.gridX < 0 || this.gridX + this.grid[0].length > gridWidth || this.gridY < 0 || this.gridY + this.grid.length > gridHeight)
      return;
    var N = this.grid.length - 1;
    var newGrid = this.grid.map((row, i) =>
      row.map((val, j) => this.grid[N - j][i])
    );
    // Make sure rotating does not collide with another block already on the grid
    for (i = 0; i < newGrid.length; i++)
      for (ii = 0; ii < newGrid[i].length; ii++)
        if (grid.grid[this.gridY + i][this.gridX + ii][0] && newGrid[i][ii])
          return;

    this.grid = [...newGrid];
  }

  lowestBlock(x) {
    for (i = this.grid.length - 1; i >= 0; i--)
      if (this.grid[i][x])
        return this.gridY + i;
    return -1;
  }

  overallLowestBlock() {
    for (i = this.grid.length - 1; i >= 0; i--)
      for (ii = 0; ii < this.grid[i].length; ii++)
        if (this.grid[i][ii])
          return [this.gridX + ii, this.gridY + i];
    return [-1, -1];
  }

  show(fillColor, strokeColor) {
    if (this.frameCountBeforeMerge == null)
      fill(this.color);
    else if (frameCount % 5 == 0)
      fill(this.flashingColor);
    stroke(gridLineColor);
    for (i = 0; i < this.grid.length; i++)
      for (ii = 0; ii < this.grid[i].length; ii++)
        if (this.grid[i][ii])
          rect(this.drawX + blockWidth * ii, this.drawY + blockHeight * i, blockWidth, blockHeight);
  }
}
