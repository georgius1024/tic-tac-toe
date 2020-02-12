import Game from '../../src/Game'
describe('The Game class', () => {
  it('can be created', () => {
    const x = new Game()
    expect(x).toBeInstanceOf(Game)
  })
})
