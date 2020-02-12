import { shallowMount } from '@vue/test-utils'
import Cell from '@/components/Cell.vue'

describe('Cell.vue', () => {
  it('renders props when passed', () => {
    const propsData = {
      index: 1,
      owned: 0,
      disabled: true,
      win: true
    }
    const wrapper = shallowMount(Cell, {
      propsData
    })
    expect(wrapper.html()).toMatch('X')
    expect(wrapper.html()).toMatch('disabled')
    expect(wrapper.html()).toMatch('win')
  })
  it('clicks emit event when not disabled and not owned', () => {
    const propsData = {
      index: 1,
      owned: 0,
      disabled: true,
      win: true
    }
    let wrapper = shallowMount(Cell, {
      propsData
    })

    wrapper.trigger('click')
    expect(wrapper.emitted().reset).toHaveLength(1)
    expect(wrapper.emitted().input).toBeUndefined()
    propsData.disabled = false
    wrapper = shallowMount(Cell, {
      propsData
    })
    wrapper.trigger('click')
    expect(wrapper.emitted().input).toBeUndefined()
    propsData.owned = -1
    wrapper = shallowMount(Cell, {
      propsData
    })
    wrapper.trigger('click')
    expect(wrapper.emitted().input).toHaveLength(1)
  })
})
