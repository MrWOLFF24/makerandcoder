<template>
    <div class="admin-page">
      <section class="new-post">
          <button @click="$router.push('/dashboard/new-tutoriel')">Create post</button>
      </section>
      <hero-head title="Vos Tutoriels"/>
      <article v-if="!loadedPosts" class="message is-warning">
      <div class="message-body has-text-centered">
        une erreur s'est produite lors du chargement des tutoriels, veuillez nous excuser pour ce désagrément.
      </div>
    </article>
      <section v-else class="existing-posts">
        <tutoriel-list
        isAdmin
        :posts="loadedPosts"
        />
      </section>
    </div>
</template>

<script>
import TutorielList from '@/components/Tutoriels/TutorielList'
import HeroHead from '@/components/HomeComponents/HeroHead'
import axios from 'axios'
export default {
  middleware: 'auth',
  components: {
    TutorielList,
    HeroHead,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  asyncData (context, clbk) {
    axios({
          method: 'get',
          url: 'http://51.15.255.111:3000/tutoriel/userTutoriels/' + context.store.getters.isAuth.id
    }).then(response => {
      clbk(null, { loadedPosts: response.data })
    }).catch(error => {
      console.error(error);
    });
  },
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}
.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}
.existing-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.existing-posts h1 {
  text-align: center;
  display: inline-block;
}
</style>
