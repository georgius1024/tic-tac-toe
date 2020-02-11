<template>
  <div :class="{cell: true, disabled, win}" @click="click">
    <transition-group name="fade">
      <span v-show="owned === 0" v-text="'X'" :key="0" />
      <span v-show="owned === 1" v-text="'O'" :key="1" />
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
    disabled: {
      type: Boolean,
      default: false
    },
    win: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click() {
      if (this.disabled) {
        this.$emit('reset')
      } else if (this.owned === -1) {
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
.cell.win {
  color: yellowgreen;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>