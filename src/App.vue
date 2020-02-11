<template>
  <div id="app">
    <Board v-model="history"/>
  </div>
</template>

<script>
import Board from './components/Board'

export default {
  name: 'App',
  data () {
    return {
      history: ''
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
}
</style>
