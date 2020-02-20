<template>
  <div class="wrapper" v-show="visible">
    <transition name="slide-up">
      <div class="modal" v-show="visible">
        <div class="header">Choose your side</div>
        <div class="body">
          <button @click="close(0)">X</button>
          <button @click="close(1)">O</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Setup',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    close(result) {
      this.visible = false
      this.$emit('input', result)
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
.modal {
  border: 1ps solid #8b9b9b;
  background: #ccc;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  padding: 32px;
  display: flex;
  flex-direction: column;
}
.modal .header {
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
}
.modal .body {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.modal .body button {
  font-family: 'Architects Daughter', cursive;
  font-size: 64px;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 94px;
  height: 94px;
  border: 1px solid #999;
  background-color: #999;
  cursor: pointer;
  color: #333;
  margin: 0 32px 28px;
}

.slide-up-enter-active {
  transition: all 0.3s ease;
}
.slide-up-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(500px);
  opacity: 0;
}
</style>
