<template>
  <main>
    <div class="side-panel">
      <span v-show="humanPlayer === currentPlayer" v-text="'Make your turn'" />
    </div>
    <Board
      :value="history"
      :disabled="finished"
      :strike="strike"
      @input="input"
      @reset="resetGame"
    />
    <div class="side-panel">
      <button
        class="reset-button"
        v-show="humanPlayer !== -1 && !finished"
        @click="resetGame"
      >Restart</button>
    </div>
    <Setup ref="setup" @input="startGame" />
    <Report ref="report" @input="resetGame" />
  </main>
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
      humanPlayer: 0,
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
    this.resetGame()
  },
  methods: {
    initializeGame() {
      this.history = ''
      this.game.history = ''
      this.finished = false
      this.winner = -1
      this.strike = []
      this.currentPlayer = 0
      this.humanPlayer = -1
    },
    startGame(player) {
      this.humanPlayer = player
      this.act()
    },
    resetGame() {
      this.initializeGame()
      this.$refs.setup.show && this.$refs.setup.show()
    },
    stopGame() {
      if (!this.gamesPlayed.find(e => e.history === this.history)) {
        this.gamesPlayed.push({ history: this.history, winner: this.winner })
        localStorage.setItem(storageKey, JSON.stringify(this.gamesPlayed))
      }
      this.$refs.report.show && this.$refs.report.show(this.report())
    },
    report() {
      return (
        (this.winner === this.humanPlayer && 'You wins') ||
        (this.winner === -1 && 'No one wins') ||
        (this.winner !== this.humanPlayer && 'Computer wins')
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
      if (this.currentPlayer !== this.humanPlayer) {
        setTimeout(() => {
          this.input(this.history + this.game.nextTurn(this.gamesPlayed))
        }, 300)
      }
    },
    input(value) {
      this.history = value
      this.analyze()
      if (this.finished) {
        this.stopGame()
      } else {
        this.act()
      }
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
html,
body,
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  color: #333;
  background: #fff;
}
</style>
<style scoped>
main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('./assets/background.jpg');
  background-size: cover;
}
.side-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}
.reset-button {
  border: 1px solid #ccc;
  background-color: #ccc;
  padding: 4px 14px;
}
</style>
