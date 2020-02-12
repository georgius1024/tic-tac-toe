import { shallowMount } from '@vue/test-utils'
import Board from '@/components/Board.vue'

describe('Board.vue', () => {
  it('renders cells when passed', () => {
    const propsData = {
      value: '4321',
      disabled: true,
      path: [4, 3, 2]
    }
    const wrapper = shallowMount(Board, {
      propsData
    })
    expect(wrapper.vm.cells[0]).toEqual([
      { index: 0, owned: -1, win: false },
      { index: 1, owned: 1, win: false },
      { index: 2, owned: 0, win: true }
    ])
    expect(wrapper.html()).toMatch('board')
    expect(wrapper.html()).toMatch('row')
    expect(wrapper.html()).toMatch('cell')
  })

  it('emits events when clicked', () => {
    const propsData = {
      value: '4321',
      disabled: true,
      path: [4, 3, 2]
    }
    const wrapper = shallowMount(Board, {
      propsData
    })
    expect(wrapper.emitted().input).toBeUndefined()
    wrapper.vm.input(8)
    expect(wrapper.emitted().input).toEqual([['43218']])
    expect(wrapper.emitted().reset).toBeUndefined()
    wrapper.vm.reset()
    expect(wrapper.emitted().input).toHaveLength(1)
  })
})
