<template>
  <section class="section">
    <div class="content">
      <div class="single-post-page">
        <article class="post">
          <h1 class="post-title">{{ loadedPost.title }}</h1>
          <div class="post-details">
            <div class="post-detail">Last update on {{ loadedPost.post_date }}</div>
            <div class="post-detail">Written by {{ loadedPost.author }}</div>
          </div>
          <div class="tags is-marginless is-centered">
            <span class="tag is-rounded is-info">mySQL</span>
            <span class="tag is-rounded is-info">Node.js</span>
            <span class="tag is-rounded is-info">Nuxt.js</span>
          </div>
          <div class="post-content content" v-html="loadedPost.content"></div>
        </article>
        <hr>
        <section class="post-feedback">
          <p>let me know about you ...</p>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  asyncData(context, clbk) {
    return axios({
      method: 'get',
      url: 'http://51.15.255.111:3000/tutoriel/getTutoriel/' + context.params.id
    }).then(response => {
        moment.locale('fr');
        const postDate = moment(response.data[0].post_date).format('L')
        response.data[0].post_date = postDate
        clbk(null, { loadedPost:response.data[0] })
    }).catch(error => {
      context.error(error)
    })
  },
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}
.post-content {
  padding-top: 30px;
}
.post {
  width: 100%;
}
.tags {
  padding-top: 20px;
}
@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}
.post-title {
  margin: 0;
  color: tomato;
}
.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}
.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}
.post-feedback a {
  color: red;
  text-decoration: none;
}
.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
