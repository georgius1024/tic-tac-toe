import { shallowMount } from '@vue/test-utils'
import Setup from '@/components/Setup.vue'

describe('Setup.vue', () => {
  it('renders when mounted', () => {
    const wrapper = shallowMount(Setup)
    expect(wrapper.html()).toMatch('wrapper')
    expect(wrapper.html()).toMatch('modal')
    expect(wrapper.html()).toMatch('body')
    wrapper.vm.show()
    expect(wrapper.vm.visible).toBeTruthy()
  })

  it('emits events when clicked', () => {
    const wrapper = shallowMount(Setup)
    expect(wrapper.emitted().input).toBeUndefined()
    wrapper.vm.close(0)
    expect(wrapper.emitted().input).toEqual([[0]])
    wrapper.vm.close(1)
    expect(wrapper.emitted().input).toEqual([[0], [1]])
    wrapper.vm.show()
    expect(wrapper.vm.visible).toBeTruthy()
  })
})
