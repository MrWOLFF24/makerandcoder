<template>
  <div class="wrap">
    <hero-head title="Tutoriels"/>
    <article v-if="!loadedPosts" class="message is-warning">
      <div class="message-body has-text-centered">
        une erreur s'est produite lors du chargement des tutoriels, veuillez nous excuser pour ce désagrément.
      </div>
    </article>
    <TutorielList v-else :posts="loadedPosts"/>
  </div>
</template>

<script>
import TutorielList from '@/components/Tutoriels/TutorielList'
import HeroHead from '@/components/HomeComponents/HeroHead'
import axios from 'axios'
export default {
  components: {
    TutorielList,
    HeroHead,
  },
  asyncData (context, clbk) {
    axios({
          method: 'get',
          url: 'http://51.15.255.111:3000/tutoriel/getTutoriels'
    }).then(response => {
      clbk(null, { loadedPosts: response.data })
    }).catch(error => {
      console.error(error);
    });
  },
  data () {
    return {
      title: 'Tutoriels'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Page de tutoriels' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
