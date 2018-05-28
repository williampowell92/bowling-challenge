describe('Game', function () {
  var game
  var frame
  var bowl

  beforeEach(function () {
    game = new Game()
    frame = new Frame()
    bowl = new Bowl()
  })

  it('is created with an empty frame array', function () {
    expect(game.frames).toEqual([])
  })

  it('is created with a score of 0', function () {
    expect(game.score).toEqual(0)
  })

  describe('addFrame', function () {
    it('adds a frame to the frames array', function () {
      game.addFrame(frame)
      expect(game.frames).toEqual([frame])
    })

    it('adds multiple frames to the frames array', function () {
      game.addFrame(frame)
      game.addFrame(frame)
      expect(game.frames).toEqual([frame, frame])
    })
  })

  describe('calculateCurrentScore', function () {
    it('scores a gutter game correctly', function () {
      for (i = 0; i < 10; i++) {
        var frame = new Frame()
        frame.addBowl({ count: 0 })
        frame.addBowl({ count: 0 })
        game.addFrame(frame)
      }
      game.calculateCurrentScore()
      expect(game.score).toEqual(0)
    })

    it('scores an open game correctly', function () {
      for (i = 0; i < 10; i++) {
        var frame = new Frame()
        frame.addBowl({ count: 4 })
        frame.addBowl({ count: 4 })
        game.addFrame(frame)
      }
      game.calculateCurrentScore()
      expect(game.score).toEqual(80)
    })

    xit('scores a game with a spare correctly', function () {
      var frame = new Frame()
      frame.addBowl({ count: 5 })
      frame.addBowl({ count: 5 })
      game.addFrame(frame)
      for (i = 0; i < 9; i++) {
        frame = new Frame()
        frame.addBowl({ count: 4 })
        frame.addBowl({ count: 4 })
        game.addFrame(frame)
      }
      game.calculateCurrentScore()
      expect(game.score).toEqual(86)
    })
  })

  describe('bowl', function () {
    it('creates a frame if none exists', function () {
      game.bowl(5)
      expect(game._currentFrame()).toBeTruthy()
    })

    describe('open frame', function () {
      it('adds a bowl to the current frame', function () {
        game.bowl(5)
        expect(game._currentFrame().firstBowl.count).toEqual(5)
      })

      it('adds a second bowl to the current frame', function () {
        game.bowl(5)
        game.bowl(4)
        expect(game._currentFrame().secondBowl.count).toEqual(4)
      })

      it('creates another frame after the second bowl', function () {
        game.bowl(5)
        game.bowl(4)
        game.bowl(3)
        expect(game._currentFrame().firstBowl.count).toEqual(3)
      })
    })

    describe('strike frame', function () {
      it('creates another frame after a strike', function () {
        game.bowl(10)
        game.bowl(5)
        expect(game._currentFrame().firstBowl.count).toEqual(5)
      })
    })
  })
})
