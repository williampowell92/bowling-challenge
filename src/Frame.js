function Frame () {
  this.bonusScore = 0
}

Frame.prototype.addBowl = function (bowl) {
  if (this.firstBowl) {
    this.secondBowl = bowl
    this._addRemainingBonusRolls()
  } else {
    this.firstBowl = bowl
    if (this.isStrike()) {
      this._addRemainingBonusRolls()
    }
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
  if (this.isStrike()) {
    this.remainingBonuses = 2
  } else if (this.isSpare()) {
    this.remainingBonuses = 1
  } else if (this.isOpen()) {
    this.remainingBonuses = 0
  }
}

Frame.prototype.isComplete = function () {
  if (this.secondBowl) {
    return true
  } else if (this.firstBowl) {
    if (this.firstBowl.count === 10) {
      return true
    } else {
      return false
    }
  }
}
