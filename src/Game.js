function Game () {
  this.frames = []
  this.score = 0
}

Game.prototype.addFrame = function (frame) {
  this.frames.push(frame)
}

Game.prototype.calculateCurrentScore = function () {
  this.frames.forEach(function (frame) {
    this.score += frame.score()
  }, this)
}

Game.prototype.bowl = function (count) {
  if (this._currentFrame() === undefined || this._currentFrame().isComplete()) {
    this.addFrame(new Frame())
  }

  this._currentFrame().addBowl(new Bowl(count))
}

Game.prototype._currentFrame = function () {
  return this.frames.slice(-1)[0]
}
