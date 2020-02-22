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
  
  fall(block) {
    var lowestBlock = block.lowestBlock();
    if (lowestBlock[1] == 0) {
      this.mergeBlock(block);
      return false;
    }
    else if (!this.grid[lowestBlock[1]+1][lowestBlock[0]])
      return true;
    return false;
  }
  
  mergeBlock(block) {
    for (i = block.gridY; i < block.grid.length; i++)
      for (ii = block.gridX; ii < block.grid[i].length; ii++)
        this.grid[y][x] = [block.grid[y][x], block.color];
  }
  
  show() {
    strokeWeight(1);
    fill(gridColor);
    rect(this.x, this.y, this.blockWidth*this.gridWidth, this.blockHeight*this.gridHeight);
    stroke(gridLineColor);
    for (i = 0; i < this.gridHeight; i++)
      line(this.x, this.y+i*this.blockHeight, this.x+this.blockWidth*this.gridWidth, this.y+i*this.blockHeight)
    for (i = 0; i < this.gridWidth; i++)
      line(this.x+i*this.blockWidth, this.y, this.x+i*this.blockWidth, this.y+this.blockHeight*this.gridHeight)
    
    for (i = 0; i < this.gridHeight; i++)
      for (ii = 0; ii < this.gridWidth; ii++)
        if (this.grid[i][ii][0]) {
          fill(this.grid[i][ii][1]);
          rect(this.x+ii*this.blockWidth, this.y+i*this.blockHeight, this.blockWidth, this.blockHeight);
        }
  }
}
