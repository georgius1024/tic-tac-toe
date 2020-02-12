<template>
  <div id="app">
    <Board :value="history" @input="input" :disabled="finished" @reset="reset" :path="strike" />
    <div class="your-turn">
      <span v-show="humanPlayer === currentPlayer" v-text="'Make your turn'" />
    </div>
    <Report ref="report" @close="reset" />
  </div>
</template>

<script>
import Board from './components/Board'
import Report from './components/Report'
import Game from './Game'
export default {
  name: 'App',
  data() {
    return {
      history: '',
      humanPlayer: 0,
      finished: false,
      currentPlayer: -1,
      winner: -1,
      strike: []
    }
  },
  created() {
    this.game = new Game()
  },
  mounted() {
    this.analyze()
    this.act()
  },
  methods: {
    report() {
      return (
        (this.winner === 1 && 'O wins') ||
        (this.winner === 0 && 'X wins') ||
        (this.finished && 'No one wins')
      )
    },
    analyze() {
      this.game.history = this.history
      const data = this.game.analyze()
      this.finished = data.finished
      this.winner = data.winner
      this.strike = data.strike
      this.currentPlayer = this.game.currentPlayer()
    },
    act() {
      if (this.currentPlayer !== this.humanPlayer && !this.finished) {
        this.input(this.history + this.game.nextTurn())
      }
      if (this.finished) {
        this.$refs.report.show(this.report())
      }
    },
    input(value) {
      this.history = value
      this.analyze()
      this.act()
    },
    reset() {
      this.input('')
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
