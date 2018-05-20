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
