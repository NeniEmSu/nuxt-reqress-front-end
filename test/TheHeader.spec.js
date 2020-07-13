import { mount } from '@vue/test-utils'
import TheHeader from '@/components/TheHeader.vue'

describe('TheHeader is mounted properly', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(TheHeader)
    expect(wrapper.vm).toBeTruthy()
  })
})
