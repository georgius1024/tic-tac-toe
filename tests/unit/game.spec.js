import Game from '../../src/Game'
describe('The Game class', () => {
  it('can be created', () => {
    const x = new Game()
    expect(x).toBeInstanceOf(Game)
  })

  it('can save valid turn', () => {
    const x = new Game()
    x.turn(1)
    x.turn(2)
    x.turn(3)
    expect(x.history).toEqual('123')
  })
  it('can not save invalid turn', () => {
    const x = new Game()
    try {
      x.turn('q')
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError)
    }
    try {
      x.turn(-9)
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError)
    }
    try {
      x.turn(30)
    } catch (error) {
      expect(error).toBeInstanceOf(RangeError)
    }
  })

  it('knows which plyers turn is now', () => {
    const x = new Game()
    expect(x.currentPlayer()).toEqual(0)
    x.turn(1)
    expect(x.currentPlayer()).toEqual(1)
    x.turn(2)
    expect(x.currentPlayer()).toEqual(0)
    x.turn(3)
    expect(x.currentPlayer()).toEqual(1)
  })

  it('can make random turns', () => {
    const x = new Game()
    for (let i = 0; i < 9; i++) {
      x.turn(x.randomTurn())
    }
    expect(x.history).toHaveLength(9)
  })

  it('can analyze position', () => {
    const x = new Game()
    x.history = '467038'
    expect(x.analyze()).toMatchObject({
      winner: -1,
      strike: [],
      winning: [['5', '1'], []]
    })
    x.history = '4670385'
    expect(x.analyze()).toMatchObject({ winner: 0, strike: ['3', '4', '5'] })

    x.history = '1680'
    expect(x.analyze()).toMatchObject({ winner: -1, winning: [[], ['3']] })

    x.history = '168074'
    expect(x.analyze()).toMatchObject({
      winner: -1,
      winning: [[], ['3', '2']]
    })

    x.history = '16807432'
    expect(x.analyze()).toMatchObject({ winner: 1, strike: ['2', '4', '6'] })

    x.history = '432758'
    expect(x.analyze()).toMatchObject({ winner: -1, winning: [['6'], ['6']] })

    x.history = '4670'
    expect(x.analyze()).toMatchObject({
      winner: -1,
      winning: [['1'], ['3']],
      perspective: [['3'], ['1']]
    })
    x.history = '467031'
    expect(x.analyze()).toMatchObject({
      winner: -1,
      winning: [['5'], ['2']],
      perspective: [[], []]
    })
    x.history = '4170'
    expect(x.analyze()).toMatchObject({
      winner: -1,
      winning: [[], ['2']],
      perspective: [['3', '6', '2'], ['3']]
    })
  })

  it('can play with himself', () => {
    const x = new Game()
    let winner = -1
    for (let i; i < 9; i++) {
      x.turn(x.randomTurn())
      const data = x.analyze()
      winner = data.winner
      if (winner !== -1) {
        break
      }
    }
    expect(x.history.length).toBeLessThanOrEqual(9)
  })

  it('can play smart', () => {
    const empty = { winner: -1, strike: [], winning: [[], []] }
    const x = new Game()
    let t, a
    t = x.nextTurn()
    expect(t).toEqual(4)
    x.turn(t)
    a = x.analyze()
    expect(a).toMatchObject(empty)

    t = x.nextTurn()
    expect([0, 2, 6, 8]).toContain(x.nextTurn())
    x.turn(t)
    a = x.analyze()
    expect(a).toMatchObject(empty)

    x.history = '012345678'
    t = x.nextTurn()
    expect(t).toBe(-1)
  })

  it('can calculate turn', () => {
    const x = new Game()
    x.history = '012345678'
    let t
    t = x.calculateTurn()
    expect(t).toBe(-1)

    x.history = '4170'
    t = x.calculateTurn()
    expect(t).toBe('2')

    x.history = '4526'
    t = +x.calculateTurn()
    expect([0, 1]).toContain(t)

    x.history = ''
    x.calculateTurn()

    x.history = '4'
    x.calculateTurn()

    x.history = '1'
    t = +x.nextTurn()
    expect(t).toBe(4)
  })

  it('can use game history', () => {
    const games = [
      {
        history: '4281',
        winner: 0
      },
      {
        history: '4567',
        winner: 1
      }
    ]
    const x = new Game()
    let t
    x.history = '4'
    t = x.searchHistory(games)
    expect(t).toBe(5)

    x.history = '42'
    t = x.searchHistory(games)
    expect(t).toBe(8)

    t = x.searchHistory(101)
    expect(t).toBe(-1)

    x.history = ''
    t = x.searchHistory(games)
    expect(t).toBe(-1)

    x.history = '0'
    t = x.searchHistory(games)
    expect(t).toBe(-1)
  })
})
