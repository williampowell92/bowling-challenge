function Frame() {
  this.bonusScore = 0
}

Frame.prototype.addBowl = function(bowl) {
  if (this.firstBowl) {
    return this.secondBowl = bowl
  } else {
    return this.firstBowl = bowl
  }
}

Frame.prototype.isOpen = function() {
  return this.firstBowl.count + this.secondBowl.count < 10
}

Frame.prototype.isSpare = function() {
  return !this.isStrike() && this.firstBowl.count + this.secondBowl.count === 10
}

Frame.prototype.isStrike = function() {
  return this.firstBowl.count === 10
}

Frame.prototype.addBonusBowl = function(bowl) {
  this.bonusScore += bowl.count
}
