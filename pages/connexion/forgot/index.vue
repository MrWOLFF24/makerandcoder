<template>
    <section class="section">
        <hero-head title="Vous avez perdu ou oublié votre mot de passe"/>
        <article class="message is-dark">
            <div class="message-body">
                Saisissez l'adresse e-mail liée à votre compte, puis validez. Vous recevrez ensuite un lien par e-mail ; cliquez sur ce lien pour réinitialiser votre mot de passe.
            </div>
        </article>
        <div class="hero-body">
            <form id="forgot-form">
                <div class="field is-grouped">
                    <div class="control is-expanded has-icons-left has-icons-right">
                        <input class="input" type="email" placeholder="Votre email">
                        <span class="icon is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </div>
                    <p class="control">
                        <button class="button is-info">Envoyer</button>
                    </p>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import HeroHead from '@/components/HomeComponents/HeroHead'
export default {
  middleware: 'isAuth',
  components: {
    HeroHead,
  },
  data () {
    return {
      title: 'Mot de passe oublié'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Page mot de passe oublié' }
      ]
    }
  }
}
</script>

<style scoped>
.section {padding-top: 0;}
.field.is-grouped {
    max-width: 460px;
    margin: 0 auto;
}
</style>

