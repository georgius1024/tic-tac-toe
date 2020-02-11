<template>
  <div class="board">
    <div v-for="(row, index) in cells" :key="index" class="row">
      <Cell
        v-for="(cell, index) in row"
        :key="index"
        :index="cell.index"
        :owned="cell.owned"
        :win="cell.win"
        :disabled="disabled"
        @click="click"
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
    path: {
      type: Array
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
          win: this.path.indexOf(index) !== -1
        }
        result[Math.floor(index / 3)].push(cell)
      }
      return result
    }
  },
  methods: {
    click(index) {
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
  border: 1px solid #eee;
}
.board .row {
  display: flex;
  flex-direction: row;
}
</style>