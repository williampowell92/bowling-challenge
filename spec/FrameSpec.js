describe('Frame', function () {
  var frame

  var firstBowl = {
    count: function () {}
  }

  var secondBowl = {
    count: function () {}
  }

  function addBowls (firstScore, secondScore) {
    firstBowl = { count: firstScore }
    secondBowl = { count: secondScore }
    frame.addBowl(firstBowl)
    frame.addBowl(secondBowl)
  }

  beforeEach(function () {
    frame = new Frame()
  })

  describe('addBowl', function () {
    it('stores the first bowl', function () {
      frame.addBowl(firstBowl)
      expect(frame.firstBowl).toEqual(firstBowl)
    })

    it('stores the second bowl', function () {
      frame.addBowl(firstBowl)
      frame.addBowl(secondBowl)
      expect(frame.secondBowl).toEqual(secondBowl)
    })

    it('does not overwrite the first bowl', function () {
      frame.addBowl(firstBowl)
      frame.addBowl(secondBowl)
      expect(frame.firstBowl).toEqual(firstBowl)
    })
  })

  describe('isOpen', function () {
    it('returns true for all open frame permutations', function () {
      for (var i = 0; i < 10; i++) {
        for (var y = 0; y < 10 - i; y++) {
          frame = new Frame()
          firstBowl = { count: i }
          secondBowl = { count: y }
          frame.addBowl(firstBowl)
          frame.addBowl(secondBowl)
          expect(frame.isOpen()).toBeTruthy()
        }
      }
    })

    it('returns false for all spare frame permutations', function () {
      for (var i = 0; i < 10; i++) {
        frame = new Frame()
        firstBowl = { count: i }
        secondBowl = { count: 10 - i }
        frame.addBowl(firstBowl)
        frame.addBowl(secondBowl)
        expect(frame.isOpen()).toBeFalsy()
      }
    })

    it('returns false for a strike frame', function () {
      firstBowl = { count: 10 }
      secondBowl = { count: 0 }
      frame.addBowl(firstBowl)
      frame.addBowl(secondBowl)
      expect(frame.isOpen()).toBeFalsy()
    })
  })

  describe('isSpare', function () {
    it('returns true for all spare permutations', function () {
      for (var i = 0; i < 10; i++) {
        frame = new Frame()
        firstBowl = { count: i }
        secondBowl = { count: 10 - i }
        frame.addBowl(firstBowl)
        frame.addBowl(secondBowl)
        expect(frame.isSpare()).toBeTruthy()
      }
    })

    it('returns false for all open permutations', function () {
      for (var i = 0; i < 10; i++) {
        for (var y = 0; y < 10 - i; y++) {
          frame = new Frame()
          firstBowl = { count: i }
          secondBowl = { count: y }
          frame.addBowl(firstBowl)
          frame.addBowl(secondBowl)
          expect(frame.isSpare()).toBeFalsy()
        }
      }
    })

    it('returns false for a strike frame', function () {
      firstBowl = { count: 10 }
      secondBowl = { count: 0 }
      frame.addBowl(firstBowl)
      frame.addBowl(secondBowl)
      expect(frame.isSpare()).toBeFalsy()
    })
  })

  describe('isStrike', function () {
    it('returns false for all open frame permutations', function () {
      for (var i = 0; i < 10; i++) {
        for (var y = 0; y < 10 - i; y++) {
          frame = new Frame()
          firstBowl = { count: i }
          secondBowl = { count: y }
          frame.addBowl(firstBowl)
          frame.addBowl(secondBowl)
          expect(frame.isStrike()).toBeFalsy()
        }
      }
    })

    it('returns false for all spare frame permutations', function () {
      for (var i = 0; i < 10; i++) {
        frame = new Frame()
        firstBowl = { count: i }
        secondBowl = { count: 10 - i }
        frame.addBowl(firstBowl)
        frame.addBowl(secondBowl)
        expect(frame.isStrike()).toBeFalsy()
      }
    })

    it('returns true for a strike frame', function () {
      firstBowl = { count: 10 }
      secondBowl = { count: 0 }
      frame.addBowl(firstBowl)
      frame.addBowl(secondBowl)
      expect(frame.isStrike()).toBeTruthy()
    })
  })

  describe('bonusScore', function () {
    it('is created with a bonus score of 0', function () {
      expect(frame.bonusScore).toEqual(0)
    })
  })

  describe('addBonus', function () {
    it('adds a bowls count to bonus', function () {
      var bonusBowl = { count: 5 }
      frame.addBonusBowl(bonusBowl)
      expect(frame.bonusScore).toEqual(5)
    })

    it('reduces remaining bonuses by one', function () {
      frame.remainingBonuses = 2
      frame.addBonusBowl({ count: 5 })
      expect(frame.remainingBonuses).toEqual(1)
    })
  })

  describe('score', function () {
    it('scores open frame correctly', function () {
      addBowls(5, 3)
      expect(frame.score()).toEqual(8)
    })

    it('scores a spare frame correctly', function () {
      addBowls(5, 5)
      var bonusBowl = { count: 5 }
      frame.addBonusBowl(bonusBowl)
      expect(frame.score()).toEqual(15)
    })

    it('scores a strike frame correctly', function () {
      addBowls(10, 0)
      frame.addBonusBowl({ count: 5 })
      frame.addBonusBowl({ count: 4 })
      expect(frame.score()).toEqual(19)
    })
  })

  describe('addRemainingBonusRolls', function () {
    it('does not add bonus roll count for open frame', function () {
      addBowls(4, 4)
      expect(frame.remainingBonuses).toEqual(0)
    })

    it('adds one bonus roll count for a spare frame', function () {
      addBowls(4, 6)
      expect(frame.remainingBonuses).toEqual(1)
    })

    it('adds two bonus roll counts for a strike frame', function () {
      addBowls(10, 0)
      expect(frame.remainingBonuses).toEqual(2)
    })
  })

  describe('isComplete', function () {
    it('is false if no bowls are rolled', function () {
      expect(frame.isComplete()).toBeFalsy()
    })

    it('is false if one non-strike is rolled', function () {
      frame.addBowl({ count: 5 })
      expect(frame.isComplete()).toBeFalsy()
    })

    it('is true if two bowls are rolled', function () {
      addBowls(5, 5)
      expect(frame.isComplete()).toBeTruthy()
    })

    it('is true if a strike is rolled', function () {
      frame.addBowl({ count: 10 })
      expect(frame.isComplete()).toBeTruthy()
    })
  })
})
