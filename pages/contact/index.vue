<template>
  <section class="section is-medium">
    <hero-head title="Contactez nous"/>
    <div class="container">
      <form id="contactForm">
        <div class="field">
          <label class="label">Nom</label>
          <div class="control has-icons-left has-icons-right">
            <input :class="{'is-danger': errors.has('nom') }" v-model="name" class="input" name="nom" type="text" placeholder="Votre nom d'utilisateur ou votre Nom" v-validate="'required'" autofocus>
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check" :class="{'fa-exclamation-triangle': errors.has('nom') }"></i>
            </span>
          </div>
          <p class="help is-danger" v-show="errors.has('nom')">{{ errors.first('nom') }}</p>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input :class="{'is-danger': errors.has('email') }" v-model="email" v-validate="'required|email'" name="email" class="input" type="email" placeholder="Votre Email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check" :class="{'fa-exclamation-triangle': errors.has('email') }"></i>
            </span>
          </div>
          <p class="help is-danger" v-show="errors.has('email')">{{ errors.first('email') }}</p>
        </div>

        <div class="field">
          <label class="label">Message</label>
          <div class="control has-icons-left has-icons-right">
            <textarea class="textarea" v-model="message" v-validate="'required'" :class="{'is-danger': errors.has('message') }" name="message" placeholder="Textarea"></textarea>
            <span class="icon is-small is-right">
              <i class="fas fa-check" :class="{'fa-exclamation-triangle': errors.has('message') }"></i>
            </span>
          </div>
          <p class="help is-danger" v-show="errors.has('message')">{{ errors.first('message') }}</p>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button @click="validateBeforeSubmit" class="button is-link">Envoyer le message</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import HeroHead from '@/components/HomeComponents/HeroHead'
export default {
  components: {
    HeroHead,
  },
  methods: {
    validateBeforeSubmit(e) {
      e.preventDefault()
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://51.15.255.111:3000/contact/formContact',
            data: {
              name: this.name,
              email: this.email,
              message: this.message
            }
          }).then(response => {
            if (response.data) {
              this.$ebus.$emit('message-from-app', {
                txt: response.data,
                status: 'is-success',
              })
            }
          }).catch(err => {
            this.$ebus.$emit('message-from-app', {
              txt: err.data,
              status: 'is-danger',
            })
          })
        } else {
          this.$ebus.$emit('message-from-app', {
            txt: 'Veillez vérifier vos informations!',
            status: 'is-warning',
          })
        }
      }).catch(e => {
        console.log(e)
      })
    }
  },
  data () {
    return {
      title: 'Contact',
      name: null,
      email: null,
      message: null
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Page de contat' }
      ]
    }
  }
}
</script>

<style scoped>
.section.is-medium {padding-top: 0;}
.container {max-width: 800px;}
@media (max-width: 805px) {
  .container {
    padding: 15px;
  }
}
</style>
