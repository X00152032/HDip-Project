// All Tickets Page View -- Unit Tests
// Import Dependencies
import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import Vue from 'vue'
// Import view
import AllTicketsPage from '../../src/views/AllTicketsPage.vue'
// Describe the test
describe('AllTicketsPage ', () => {
// Declare wrapper for this scope...
let wrapper
// ...but re-render it between each spec to prevent data leak
beforeEach(() => {
wrapper = shallowMount(AllTicketsPage)
})
// Start actual tests
// ***HTML Testing***
it('Should display basic (non component) content', async () => {
expect(wrapper.find('h1').text()).toBe('All Tickets')
expect(wrapper.find('p').text()).toBe('Use the search box to find a student')
expect(wrapper.html().includes("<p>Click on a ticket for more information</p>")).toBe(true)
})
//***JAVASCRIPT Testing***
it("Should call axios and return data", async () => {
// Mock Axios GET and resolve to dummy data
jest.spyOn(axios, "get").mockImplementation(() => Promise.resolve({
data: {
ticketID: 0,
submitTime: 3000,
year: 7,
name: "Micheal Griffin",
userID: 1,
description: "MOCKED ALL TICKETS DESCRIPTION",
itNote: "MOCKED ALL TICKETS IT NOTE",
resolutionNote: "MOCKED ALL TICKETS RESOLUTION NOTE",
closed: 0,
creatorNote: "MOCKED ALL TICKETS CREATOR NOTE",
closeTime: 6000,
withdrawalNote: "N/A"
}
}));
await wrapper.vm.getTickets({ articleID: 0 });
expect(wrapper.vm.$data.tickets.ticketID).toBe(0)
expect(wrapper.vm.$data.tickets.submitTime).toBe(3000)
expect(wrapper.vm.$data.tickets.year).toBe(7)
expect(wrapper.vm.$data.tickets.name).toBe("Micheal Griffin")
expect(wrapper.vm.$data.tickets.userID).toBe(1)
expect(wrapper.vm.$data.tickets.description).toBe("MOCKED ALL TICKETS DESCRIPTION")
expect(wrapper.vm.$data.tickets.itNote).toBe("MOCKED ALL TICKETS IT NOTE")
expect(wrapper.vm.$data.tickets.closed).toBe(0)
expect(wrapper.vm.$data.tickets.creatorNote).toBe("MOCKED ALL TICKETS CREATOR NOTE")
expect(wrapper.vm.$data.tickets.closeTime).toBe(6000)
expect(wrapper.vm.$data.tickets.withdrawalNote).toBe("N/A")
})
it("Should handle unauthorized GET request", async () => {
// Mock Axios GETs and reject
jest.spyOn(axios, "get").mockImplementation(() => Promise.reject({ response: { status: 403 } }));
// Call function
await wrapper.vm.getTickets();
// Check values of data variables
await Vue.nextTick()
expect(wrapper.vm.$data.notAuthorized).toBe(true)
})
})