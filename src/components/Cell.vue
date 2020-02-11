<template>
  <div class="cell" v-text="display" @click="click" />
</template>
<script>
export default {
  name: 'Cell',
  props: {
    index: {
      type: Number,
      required: true
    },
    owned: {
      type: Number,
      required: true
    },
  },
  computed: {
    display () {
      if (this.owned === -1) {
        return ''
      } else {
        return this.owned  ? 'O' : 'X'
      }
      
    }
  },
  methods: {
    click() {
      if (this.owned === -1) {
        this.$emit('click', this.index)
      }
    }
  }
}
</script>
<style scoped>
  .cell {
    font-family: 'Architects Daughter', cursive;
    font-size: 64px;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 80px;
    height: 80px;
    border: 1px inset #eee;
    cursor: pointer;
  }
</style>