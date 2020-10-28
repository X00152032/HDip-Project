//first import all components needed including home page and content models

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SubjectPage from '../views/SubjectPage.vue'
import AdmissionsPage from '../views/AdmissionsPage.vue'
import PolicyPage from '../views/PolicyPage.vue'
import ContactPage from '../views/ContactPage.vue'
import ContactFormPage from '../views/ContactFormPage.vue'
import CalendarPage from '../views/CalendarPage.vue'
import contentModel from '../models';
import userModel from '../models';
import assessmentModel from '../models';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },

  {
    path: '/Admissions',
    name: 'AdmissionsPage',
    component: AdmissionsPage
  },

  {
    path: '/Policy',
    name: '/PolicyPage',
    component: PolicyPage
  },

  {
    path: '/Contact',
    name: '/ContactPage',
    component: ContactPage
  },

  {
    path: '/ContactForm',
    name: '/ContactForm',
    component: ContactFormPage
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

  {
    path: '/Subject',
    name: 'Subject',
    component: SubjectPage
  },

  {
    path: '/Calendar',
    name: 'CalendarPage',
    component: CalendarPage
  },

  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserPage.vue'),
    props: { models: userModel }
  },

  {
    path: '/assessment',
    name: 'Assessment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AssessmentPage.vue'),
    props: { models: assessmentModel, userModel, contentModel}
  },
]

//look in routes folder
const router = new VueRouter({
  routes
})


export default router

