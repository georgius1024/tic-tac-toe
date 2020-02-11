<template>
  <div id="app">
    <Board v-model="history" :disabled="outcome.finished" @reset="reset" :path="outcome.path" />
    <div class="outcome">
      <transition-group name="fade">
        <span v-show="outcome.winner === 0" v-text="'X wins'" :key="0" />
        <span v-show="outcome.winner === 1" v-text="'Y wins'" :key="1" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Board from './components/Board'

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
      return {
        finished,
        winner,
        path
      }
    }
  },
  methods: {
    reset() {
      this.history = ''
    }
  },
  components: {
    Board
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
