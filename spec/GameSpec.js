describe('Game', function () {
  var game
  var frame

  beforeEach(function () {
    game = new Game()
    frame = new Frame()
  })

  it('is created with an empty frame array', function () {
    expect(game.frames).toEqual([])
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

  // it('scores a gutter game correctly', function () {
  //   game.frames
  // })
})
