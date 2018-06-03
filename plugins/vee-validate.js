import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import fr from 'vee-validate/dist/locale/fr'

Vue.use(VeeValidate, {
  inject: true
})

Validator.localize('fr', fr)
