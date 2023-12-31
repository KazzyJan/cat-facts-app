import Vue from 'vue'
import VueRouter from 'vue-router'
import RecordsList from '../components/RecordsList.vue'
import Record from '../components/Record.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/records' },
  { path: '/records', component: RecordsList },
  { path: '/record/:id', component: Record }
]

const router = new VueRouter({
  routes
})

export default router