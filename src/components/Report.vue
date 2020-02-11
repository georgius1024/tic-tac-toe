<template>
  <transition name="fade">
    <div class="wrapper" v-show="visible" @click="hide">
      <div class="report">
        <div class="close" href="#" @click="hide">&times;</div>
        {{message}}
        <button class="cta" @click="hide">Restart game</button>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Report',
  data() {
    return {
      message: '',
      visible: false
    }
  },
  mounted() {
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  },
  methods: {
    show(message) {
      this.message = message
      this.visible = true
    },
    hide() {
      this.visible = false
      this.$emit('close')
    },
    keydown(e) {
      if (e.code === 'Escape' && this.visible) {
        this.hide()
      }
    }
  }
}
</script>
<style scoped>
.wrapper {
  position: fixed;
  background: rgba(0, 0, 0, 0.1);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.report {
  border: 1ps solid #ddd;
  background: #fff;
  box-shadow: 4px 4px 5px;
  font-size: 120%;
  padding: 32px 48px;
  cursor: default;
  position: relative;
  display: flex;
  flex-direction: column;
}
.close {
  font-size: 32px;
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 10px;
}
.cta {
  background-color: #ddd;
  border: 1px solid #ddd;
  margin-top: 32px;
  padding: 16px;
  font-size: 16px;
  cursor: pointer;
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
