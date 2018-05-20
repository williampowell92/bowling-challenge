describe('Game', function () {
  var game

  beforeEach(function () {
    game = new Game()
  })

  it('is created with an empty frame array', function () {
    expect(game.frames).toEqual([])
  })
})
