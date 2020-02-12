<template>
  <div id="app">
    <Board :value="history" @input="input" :disabled="finished" @reset="resetGame" :path="strike" />
    <div class="your-turn">
      <span v-show="humanPlayer === currentPlayer" v-text="'Make your turn'" />
    </div>
    <button @click="resetGame">Restart</button>
    <Report ref="report" @input="resetGame" />
    <Setup ref="setup" @input="startGame" />
  </div>
</template>

<script>
import Board from './components/Board'
import Report from './components/Report'
import Setup from './components/Setup'
import Game from './Game'
const storageKey = 'games-played'
export default {
  name: 'App',
  data() {
    return {
      history: '',
      humanPlayer: -1,
      finished: false,
      currentPlayer: -1,
      winner: -1,
      strike: [],
      gamesPlayed: []
    }
  },
  created() {
    this.game = new Game()
    this.gamesPlayed = JSON.parse(localStorage.getItem(storageKey) || '[]')
  },
  mounted() {
    this.setupGame()
  },
  methods: {
    setupGame() {
      this.$refs.setup.show()
    },
    startGame(player) {
      this.humanPlayer = player
      this.act()
    },
    resetGame() {
      this.input('')
      this.setupGame()
    },
    stopGame() {
      if (!this.gamesPlayed.find(e => e.history === this.history)) {
        this.gamesPlayed.push({ history: this.history, winner: this.winner })
        localStorage.setItem(storageKey, JSON.stringify(this.gamesPlayed))
        this.$refs.report.show(this.report())
      }
    },
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
        this.input(this.history + this.game.nextTurn(this.gamesPlayed))
      }
      if (this.finished) {
        this.stopGame()
      }
    },
    input(value) {
      this.history = value
      this.analyze()
      this.act()
    }
  },
  components: {
    Setup,
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
