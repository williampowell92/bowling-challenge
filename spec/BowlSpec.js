describe('Bowl', function () {
  var bowl

  beforeEach(function () {
    bowl = new Bowl(5)
  })

  it('can be created with a count', function () {
    expect(bowl.count).toEqual(5)
  })
})
