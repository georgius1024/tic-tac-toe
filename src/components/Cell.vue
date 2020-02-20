<template>
  <div :class="{cell: true, disabled, highlight}" @click="click">
    <transition-group name="fade">
      <span v-if="owned === 0" v-text="'X'" :key="0" />
      <span v-if="owned === 1" v-text="'O'" :key="1" />
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
    highlight: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click() {
      if (this.disabled) {
        this.$emit('reset')
      } else if (this.owned === -1) {
        this.$emit('input', this.index)
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
  width: 94px;
  height: 94px;
  color: #312603;
  border: 1px solid #8b9b9b;
  cursor: pointer;
}
.cell.highlight {
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