function randomTake(list) {
  return list[Math.floor(Math.random() * list.length)]
}

class Game {
  constructor(history = '') {
    this.history = history
  }

  turn(cell) {
    if (cell < 0 || cell > 8) {
      throw new RangeError('Cell is number between 0 and 8')
    }
    this.history += cell
  }

  currentPlayer() {
    return this.history.length % 2
  }

  analyze() {
    const result = {
      finished: this.history.length === 9,
      winner: -1,
      strike: [],
      winning: [[], []],
      perspective: [[], []]
    }
    const owner = cell => {
      const index = this.history.indexOf(cell)
      if (index !== -1) {
        return index % 2
      } else {
        return index
      }
    }
    function analyzeLine(c1, c2, c3) {
      const map = {}
      const vector = [owner(c1), owner(c2), owner(c3)]
      vector.forEach(key => {
        map[key] = map[key] ? map[key] + 1 : 1
      })
      for (let owner = 0; owner <= 1; owner++) {
        const other = 1 - owner
        if (map[owner] === 3) {
          result.winner = owner
          result.strike = [+c1, +c2, +c3]
          result.finished = true
          throw result
        } else if (map[owner] === 2 && !map[other]) {
          const freeCell = +[c1, c2, c3][vector.indexOf(-1)]
          result.winning[owner].push(freeCell)
        } else if (map[owner] === 1 && !map[other]) {
          const freeCell = +[c1, c2, c3][vector.indexOf(-1)]
          result.perspective[owner].push(freeCell)
        }
      }
    }
    try {
      analyzeLine('0', '1', '2')
      analyzeLine('3', '4', '5')
      analyzeLine('6', '7', '8')
      analyzeLine('0', '3', '6')
      analyzeLine('1', '4', '7')
      analyzeLine('2', '5', '8')
      analyzeLine('0', '4', '8')
      analyzeLine('2', '4', '6')
    } catch (e) {
      if (e instanceof Error) {
        throw e
      } else {
        return result
      }
    }
    return result
  }

  nextTurn(games) {
    const match = this.searchHistory(games)
    if (match !== -1) {
      return match
    }
    const corners = [0, 2, 6, 8]
    if (this.history.length === 0) {
      return 4 // take center
    } else if (this.history.length === 1) {
      if (this.history[0] === '4') {
        // center has been taken
        // take one of the corners
        return randomTake(corners)
      } else {
        return 4 // take center
      }
    } else {
      return this.calculateTurn()
    }
  }

  calculateTurn() {
    const player = this.currentPlayer()
    const other = 1 - player
    const data = this.analyze()
    if (data.winner !== -1 || this.history.length === 9) {
      //  game is over
      return -1
    } else {
      if (data.winning[player].length) {
        // if can win
        return randomTake(data.winning[player])
      } else if (data.winning[other].length) {
        // if other can win
        return randomTake(data.winning[other])
      } else if (data.perspective[player].length) {
        // if have perspective
        return randomTake(data.perspective[player])
      } else if (data.perspective[other].length) {
        // if other has perspective
        return randomTake(data.perspective[other])
      } else {
        return this.randomTurn()
      }
    }
  }

  randomTurn() {
    const freeCells = []
    for (let cell = 0; cell < 9; cell++) {
      if (!this.history.includes(cell)) {
        freeCells.push(cell)
      }
    }
    return randomTake(freeCells)
  }

  searchHistory(games) {
    if (!Array.isArray(games) || !games.length || !this.history.length) {
      return -1
    }
    const player = this.currentPlayer()
    const matched = games
      .filter(e => e.history.indexOf(this.history) === 0)
      .filter(e => e.winner === player)
    if (matched.length) {
      return +matched[0].history[this.history.length]
    }
    return -1
  }
}

export default Game
