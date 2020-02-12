<template>
  <div class="wrapper" v-show="visible" @click="hide">
    <transition name="slide">
      <div class="report" v-show="visible">
        <div class="close" href="#" @click="hide">&times;</div>
        <div class="message">{{message}}</div>
        <p class="cta">Click to restart game</p>
      </div>
    </transition>
  </div>
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
      this.$emit('input')
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
}

.report {
  position: absolute;
  top: 12px;
  width: 50vw;
  margin: auto;
  border: 1ps solid #ddd;
  background: #fff;
  box-shadow: 4px 4px 5px;
  padding: 16px 16px 0;
  cursor: default;
  position: relative;
  display: flex;
  flex-direction: column;
}

@media (max-width: 600px) {
  .report {
    width: 75vw;
  }
}

.message {
  font-size: 120%;
  margin: 36px 24px 16px;
}

.close {
  font-size: 32px;
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 10px;
}

.cta {
  font-size: 80%;
  cursor: pointer;
}

.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-300px);
  opacity: 0;
}
</style>
