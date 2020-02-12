<template>
  <div id="app">
    <Board :value="history" @input="input" :disabled="finished" @reset="reset" :path="strike" />
    <div class="your-turn">
      <span v-show="playerTurn" v-text="'Make your turn'" />
    </div>
    <Report ref="report" @close="reset" />
  </div>
</template>

<script>
import Board from './components/Board'
import Report from './components/Report'
export default {
  name: 'App',
  data() {
    return {
      history: '',
      winner: -1,
      finished: false,
      strike: [],
      report: ''
    }
  },
  computed: {
    playerTurn() {
      return !this.finished && this.history.length % 2 === 0
    }
  },
  methods: {
    analyze() {
      this.strike = []
      const testLines = list => {
        const cells = new Set(list)
        const test = (c1, c2, c3) => {
          if (cells.has(c1) && cells.has(c2) && cells.has(c3)) {
            this.strike = [+c1, +c2, +c3]
            return true
          }
        }
        return (
          test('0', '1', '2') ||
          test('3', '4', '5') ||
          test('6', '7', '8') ||
          test('0', '3', '6') ||
          test('1', '4', '7') ||
          test('2', '5', '8') ||
          test('0', '4', '8') ||
          test('2', '4', '6')
        )
      }
      const lists = [[], []]
      for (let i = 0; i < this.history.length; i++) {
        const player = i % 2
        lists[player].push(this.history[i])
      }
      this.winner = lists.findIndex(testLines)
      this.finished = this.winner !== -1 || this.history.length === 9
      this.report =
        (this.winner === 1 && 'O wins') ||
        (this.winner === 0 && 'X wins') ||
        (this.finished && 'No one wins')
    },

    input(value) {
      this.history = value
      this.analyze()
      this.$nextTick().then(() => {
        if (this.finished) {
          this.$refs.report.show(this.report)
        } else if (!this.playerTurn) {
          this.computerTurn()
        }
      })
    },
    computerTurn() {
      const freeCells = []
      for (let cell = 0; cell < 9; cell++) {
        if (!this.history.includes(cell)) {
          freeCells.push(cell)
        }
      }
      this.history += freeCells[Math.floor(Math.random() * freeCells.length)]
    },
    reset() {
      this.history = ''
      this.winner = -1
      this.finished = false
      this.report = ''
    }
  },
  components: {
    Board,
    Report
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.your-turn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}
</style>
