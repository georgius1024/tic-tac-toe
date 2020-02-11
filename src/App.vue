<template>
  <div id="app">
    <Board
      :value="history"
      @input="input"
      :disabled="outcome.finished"
      @reset="reset"
      :path="outcome.path"
    />
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
      history: ''
    }
  },
  computed: {
    outcome() {
      let path = []
      function strike(list) {
        const cells = new Set(list)
        function test(c1, c2, c3) {
          if (cells.has(c1) && cells.has(c2) && cells.has(c3)) {
            path = [+c1, +c2, +c3]
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
      const winner = lists.findIndex(strike)
      const finished = winner !== -1 || this.history.length === 9
      const report =
        (winner === 1 && 'O wins') ||
        (winner === 0 && 'X wins') ||
        (finished && 'No one wins')
      return {
        finished,
        report,
        winner,
        path
      }
    }
  },
  methods: {
    input(value) {
      this.history = value
      this.$nextTick().then(() => {
        if (this.outcome.finished) {
          this.$refs.report.show(this.outcome.report)
        }
      })
    },
    reset() {
      this.history = ''
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
.outcome {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}
</style>
