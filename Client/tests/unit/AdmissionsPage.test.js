// Admissions Page View -- Unit Tests
// Import Dependencies
import { shallowMount } from '@vue/test-utils'
// Import view
import AdmissionsPage from '../../src/views/AdmissionsPage.vue'
// Describe the test
describe('AdmissionsPage ', () => {
// Declare wrapper for this scope...
let wrapper
// ...but re-render it between each spec to prevent data leak
beforeEach(() => {
wrapper = shallowMount(AdmissionsPage)
})
// Start actual tests
// ***HTML Testing***
it('Should display basic (non component) content', async () => {
expect(wrapper.find('h2').text()).toBe('Student Admissions')
expect(wrapper.find('h3').text()).toBe('IMPORTANT INFORMATION FOR PARENTS/GUARDIANS')
})
//***JAVASCRIPT Testing***

})