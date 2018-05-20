describe('Frame', function () {
  var frame
  var bowl

  var firstBowl = {
    count: function () {}
  }

  var secondBowl = {
    count: function () {}
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
  })

  describe('score', function () {
    function addBowls (firstScore, secondScore) {
      firstBowl = { count: firstScore }
      secondBowl = { count: secondScore }
      frame.addBowl(firstBowl)
      frame.addBowl(secondBowl)
    }

    function addBonuses (firstBonus, secondBonus) {
      if (secondBonus) {
        firstBonus = { count: firstBonus }
      }
    }

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
})
