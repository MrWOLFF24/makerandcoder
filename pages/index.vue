<template>
  <div class="home-page">
    <carousel/>
    <hero-head title="Nouveau Tutoriel"/>
    <article v-if="!loadedlastPosts" class="message is-warning">
      <div class="message-body has-text-centered">
        une erreur s'est produite lors du chargement des tutoriels, veuillez nous excuser pour ce désagrément.
      </div>
    </article>
    <TutorielList v-else :posts="loadedlastPosts"/>
    <hero-head title="Simplicité, Partage, Convivialité"/>
    <cards/>
    <hero-head title="CODER&amp;MAKER ?"/>
    <presentation/>
  </div>
</template>

<script>
import TutorielList from '@/components/Tutoriels/TutorielList'
import Presentation from '@/components/HomeComponents/Presentation'
import HeroHead from '@/components/HomeComponents/HeroHead'
import Carousel from '@/components/HomeComponents/Carousel'
import Cards from '@/components/HomeComponents/Cards'
import axios from 'axios'
export default {
  components: {
    TutorielList,
    Presentation,
    HeroHead,
    Carousel,
    Cards,
  },
  asyncData (context, clbk) {
    axios({
          method: 'get',
          url: 'http://51.15.255.111:3000/tutoriel/getLastTutoriels'
    }).then(response => {
      clbk(null, { loadedlastPosts: response.data })
    }).catch(error => {
      console.error(error);
    });
  }
}
</script>
