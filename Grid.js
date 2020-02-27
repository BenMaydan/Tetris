var i, ii;




class Grid {
  constructor(x, y, gw, gh, bw, bh) {
    this.x = x;
    this.y = y;
    this.gridWidth = gw;
    this.gridHeight = gh;
    this.blockWidth = bw;
    this.blockHeight = bh;
    this.grid = [];
    for (i = 0; i < this.gridHeight; i++) {
      this.grid.push([]);
      for (ii = 0; ii < this.gridWidth; ii++)
        this.grid[i].push([false, color(255)]);
    }
  }

  checkGameOver() {
    for (ii = 0; ii < this.grid[0].length; ii++)
      if (this.grid[0][ii][0])
        return true;
    return false;
  }

  emptyRows() {
    for (i = this.grid.length - 1; i > 0; i--)
      if (this.filled(i)) {
        score += 100 + int(random(0, 95));
        for (ii = 0; ii < this.grid[i].length; ii++) {
          // delete current piece
          this.grid[i][ii] = [false, color(255)];
          // move every piece above down one
          if (i > 0)
            for (var ry = i - 1; ry >= 0; ry--) {
              this.grid[ry + 1][ii] = this.grid[ry][ii];
              this.grid[ry][ii] = [false, color(255)];
            }
        }
      }
  }

  filled(y) {
    for (ii = 0; ii < this.grid[y].length; ii++)
      if (!this.grid[y][ii][0])
        return false;
    return true;
  }

  forceFall(block) {
    while (!this.shouldMerge(block))
      block.gridY++;
    block.drawY = this.y+blockHeight*block.gridY;
  }

  fall(block) {
    if (!this.shouldMerge(block) && !block.allowedToFinalizeMerge()) {
      fallingBlock.gridY++;
      fallingBlock.drawY = this.y + blockHeight * fallingBlock.gridY;
    }
  }

  shouldMerge(block) {
    if (block.overallLowestBlock()[1] == this.grid.length - 1)
      return true;
    for (var x = 0; x < block.grid[0].length; x++) {
      var lowest = int(block.lowestBlock(x));
      if (lowest > -1 && block.gridX + x >= 0 && block.gridX + x < gridWidth && this.grid[lowest+1][block.gridX+x][0])
        return true;
    }
    return false;
  }

  mergeBlock(block) {
    for (i = 0; i < block.grid.length; i++)
      for (ii = 0; ii < block.grid[i].length; ii++)
        if (block.grid[i][ii])
          this.grid[block.gridY + i][block.gridX + ii] = [block.grid[i][ii], block.color];
  }

  show() {
    // draw grid
    strokeWeight(1);
    fill(gridColor);
    rect(this.x, this.y, this.blockWidth * this.gridWidth, this.blockHeight * this.gridHeight);
    stroke(gridLineColor);
    for (i = 0; i < this.gridHeight; i++)
      line(this.x, this.y + i * this.blockHeight, this.x + this.blockWidth * this.gridWidth, this.y + i * this.blockHeight)
    for (i = 0; i < this.gridWidth; i++)
      line(this.x + i * this.blockWidth, this.y, this.x + i * this.blockWidth, this.y + this.blockHeight * this.gridHeight)

    // draw merged blocks
    for (i = 0; i < this.gridHeight; i++)
      for (ii = 0; ii < this.gridWidth; ii++)
        if (this.grid[i][ii][0]) {
          fill(this.grid[i][ii][1]);
          rect(this.x + ii * this.blockWidth, this.y + i * this.blockHeight, this.blockWidth, this.blockHeight);
        }

    // draw where the falling block will fall
    var originalGridY = int(str(fallingBlock.gridY));
    while (!this.shouldMerge(fallingBlock))
      fallingBlock.gridY++;
    fill(fallingBlock.highlightColor);
    stroke(fallingBlock.highlightColor);
    for (i = 0; i < fallingBlock.grid.length; i++)
      for (ii = 0; ii < fallingBlock.grid[i].length; ii++)
        if (fallingBlock.grid[i][ii])
          rect(fallingBlock.drawX+blockWidth*ii, (this.y+blockHeight*fallingBlock.gridY) + blockHeight * i, blockWidth, blockHeight);
    fallingBlock.gridY = originalGridY;
  }

  updateOnDraw() {
    if (fallingBlock.frameCountBeforeMerge == null && this.shouldMerge(fallingBlock))
      fallingBlock.frameCountBeforeMerge = int(str(frameCount));
    if (fallingBlock.allowedToFinalizeMerge()) {
      this.mergeBlock(fallingBlock);
      createNewFallingBlock();
    }
  }
}
