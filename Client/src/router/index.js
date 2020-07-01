//first import all components needed including home page and subject content model

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import contentModel from '../models';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },

  {
    path: '/syllabus',
    name: 'Syllabus',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "subjects" */ '../views/SyllabusPage.vue'),
    props: { models: contentModel }
  },
]

//look in routes folder
const router = new VueRouter({
  routes
})


export default router
