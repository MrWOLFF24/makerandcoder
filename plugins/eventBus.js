import Vue from 'vue'

const EventBus = {}

EventBus.install = (Vue) => {
  Vue.prototype.$ebus = new Vue()
}

Vue.use(EventBus)
