import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders when mounted', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.html()).toMatch('main')
    wrapper.vm.currentPlayer = 1
    wrapper.vm.humanPlayer = 1
    expect(wrapper.html()).toMatch('Restart')
    expect(wrapper.html()).toMatch('Make your turn')
  })

  it('can startGame', () => {
    const wrapper = shallowMount(App)
    wrapper.vm.startGame(1)
    expect(wrapper.vm.humanPlayer).toBe(1)
    expect(wrapper.vm.currentPlayer).toBe(0)
    expect(wrapper.vm.winner).toBe(-1)
    expect(wrapper.vm.finished).toBeFalsy()
  })

  it('can resetGame', () => {
    const wrapper = shallowMount(App)
    wrapper.vm.resetGame()
    expect(wrapper.vm.humanPlayer).toBe(-1)
    expect(wrapper.vm.currentPlayer).toBe(0)
    expect(wrapper.vm.winner).toBe(-1)
    expect(wrapper.vm.finished).toBeFalsy()
  })

  it('can report', () => {
    const wrapper = shallowMount(App)
    wrapper.vm.humanPlayer = 0
    wrapper.vm.winner = -1
    expect(wrapper.vm.report()).toBe('No one wins')
    wrapper.vm.winner = 1
    expect(wrapper.vm.report()).toBe('Computer wins')
    wrapper.vm.winner = 0
    expect(wrapper.vm.report()).toBe('You wins')
  })

  it('can finish game when necessary', () => {
    const wrapper = shallowMount(App)
    wrapper.vm.input('481726')
    expect(wrapper.vm.winner).toBe(1)
    expect(wrapper.vm.finished).toBeTruthy()
    expect(wrapper.vm.strike).toEqual([6, 7, 8])
  })

  it('can make delayed input', () => {
    jest.useFakeTimers()
    const wrapper = shallowMount(App)
    wrapper.vm.humanPlayer = 1
    wrapper.vm.analyze()
    wrapper.vm.act()
    jest.runAllTimers()
    expect(wrapper.vm.history).toBe('4')
  })
})
