describe("Frame", function() {
  var frame;
  var bowl;

  firstBowl = {
    count: function() {}
  }

  secondBowl = {
    count: function() {}
  }

  beforeEach(function() {
    frame = new Frame()
  });

  describe("addBowl", function() {
    it("stores the first bowl", function() {
      frame.addBowl(firstBowl)
      expect(frame.firstBowl).toEqual(firstBowl)
    });

    it("stores the second bowl", function() {
      frame.addBowl(firstBowl)
      frame.addBowl(secondBowl)
      expect(frame.secondBowl).toEqual(secondBowl)
    });

    it("does not overwrite the first bowl", function() {
      frame.addBowl(firstBowl)
      frame.addBowl(secondBowl)
      expect(frame.firstBowl).toEqual(firstBowl)
    });
  });

  describe("isOpen", function() {
    it("returns true for all open frame permutations", function() {
      for(i = 0; i < 10; i++) {
        for(y = 0; y < 10 - i; y++) {
          frame = new Frame()
          firstBowl = { count: i }
          secondBowl = { count: y }
          frame.addBowl(firstBowl)
          frame.addBowl(secondBowl)
          expect(frame.isOpen()).toBeTruthy()
        }
      }
    });

    it("returns false for all spare frame permutations", function() {
      for(i = 0; i < 10; i++) {
        frame = new Frame()
        firstBowl = { count: i }
        secondBowl = { count: 10 - i }
        frame.addBowl(firstBowl)
        frame.addBowl(secondBowl)
        expect(frame.isOpen()).toBeFalsy()
      }
    });

    it("returns false for a strike frame", function() {
      firstBowl = { count: 10 }
      secondBowl = { count: 0 }
      frame.addBowl(firstBowl)
      frame.addBowl(secondBowl)
      expect(frame.isOpen()).toBeFalsy()
    })
  });
});
