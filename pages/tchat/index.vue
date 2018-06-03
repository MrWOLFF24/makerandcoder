<template>
  <section class="section">
    <hero-head title="Bienvenue sur le tchat"/>
    <article class="message is-dark">
      <div class="message-body has-text-centered">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut efficitur.
      </div>
    </article>
    <section class="section">
      <Tchat/>
    </section>
  </section>
</template>

<script>
import HeroHead from '@/components/HomeComponents/HeroHead'
import Tchat from '@/components/tchat/Tchat'
export default {
  middleware: 'auth',
  components: {
    HeroHead,
    Tchat,
  },
  data () {
    return {
      title: 'Tchat'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Page de tchat' }
      ]
    }
  }
}
</script>

<style scoped>
.section {
  padding-bottom: 0;
  padding-top: 0;
}
</style>

