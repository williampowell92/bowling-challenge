function Frame() {
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
