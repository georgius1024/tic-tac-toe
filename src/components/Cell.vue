<template>
  <div class="cell" @click="click">
    <transition-group name="fade">
      <span v-show="owned === 0" v-text="'X'" :key="0"/>
      <span v-show="owned === 1" v-text="'O'" :key="1"/>
    </transition-group>
  </div>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}  
</style>