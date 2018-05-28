function Frame () {
  this.bonusScore = 0
}

Frame.prototype.addBowl = function (bowl) {
  if (this.firstBowl) {
    this.secondBowl = bowl
    this._addRemainingBonusRolls()
  } else {
    this.firstBowl = bowl
  }
}

Frame.prototype.isOpen = function () {
  return this.firstBowl.count + this.secondBowl.count < 10
}

Frame.prototype.isSpare = function () {
  return !this.isStrike() && this.firstBowl.count + this.secondBowl.count === 10
}

Frame.prototype.isStrike = function () {
  return this.firstBowl.count === 10
}

Frame.prototype.addBonusBowl = function (bowl) {
  this.bonusScore += bowl.count
  this.reduceRemainingBonusRolls()
}

Frame.prototype.reduceRemainingBonusRolls = function () {
  this.remainingBonuses--
}

Frame.prototype.score = function () {
  return this.firstBowl.count + this.secondBowl.count + this.bonusScore
}

Frame.prototype._addRemainingBonusRolls = function () {
  if (this.isOpen()) {
    this.remainingBonuses = 0
  } else if (this.isSpare()) {
    this.remainingBonuses = 1
  } else if (this.isStrike()) {
    this.remainingBonuses = 2
  }
}

Frame.prototype.isComplete = function () {
  return this.remainingBonuses === 0
}
