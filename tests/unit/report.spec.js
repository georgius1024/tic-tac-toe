import { shallowMount } from '@vue/test-utils'
import Report from '@/components/Report.vue'

describe('Report.vue', () => {
  it('renders when mounted', async () => {
    const wrapper = shallowMount(Report)
    expect(wrapper.html()).toMatch('wrapper')
    expect(wrapper.html()).toMatch('report')
    wrapper.vm.show('report message')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatch('report message')
    expect(wrapper.vm.visible).toBeTruthy()
  })

  it('emits events when clicked', async () => {
    const wrapper = shallowMount(Report)

    expect(wrapper.emitted().input).toBeUndefined()
    wrapper.vm.hide()
    expect(wrapper.emitted().input).toHaveLength(1)

    wrapper.vm.show('report message')
    wrapper.vm.keydown({})
    expect(wrapper.emitted().input).toHaveLength(1)

    wrapper.vm.keydown({ code: 'Escape' })
    expect(wrapper.emitted().input).toHaveLength(2)
    expect(wrapper.vm.visible).toBeFalsy()
    wrapper.destroy()
  })
})
