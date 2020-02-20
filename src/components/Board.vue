<template>
  <div class="board">
    <div v-for="(row, index) in cells" :key="index" class="row">
      <Cell
        v-for="(cell, index) in row"
        :key="index"
        :index="cell.index"
        :owned="cell.owned"
        :highlight="cell.highlight"
        :disabled="disabled"
        @input="input"
        @reset="reset"
      />
    </div>
  </div>
</template>
<script>
import Cell from './Cell'
export default {
  name: 'Board',
  components: {
    Cell
  },
  props: {
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    strike: {
      type: Array,
      required: true
    }
  },
  computed: {
    cells() {
      const result = [[], [], []]
      for (let index = 0; index < 9; index++) {
        const owned = this.value.indexOf(index)
        const cell = {
          index,
          owned: owned === -1 ? owned : owned % 2,
          highlight: this.strike.indexOf(index) !== -1
        }
        result[Math.floor(index / 3)].push(cell)
      }
      return result
    }
  },
  methods: {
    input(index) {
      this.$emit('input', this.value + index)
    },
    reset() {
      this.$emit('reset')
    }
  }
}
</script>
<style  scoped>
.board {
  display: inline;
  border: 4px solid #8b9b9b;
  background-color: #fff;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
}
.board .row {
  display: flex;
  flex-direction: row;
}
</style>