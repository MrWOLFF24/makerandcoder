<template>
    <nuxt-link class="post-preview" :to="postLink">
        <article>
            <div class="post-thumbnail"
            :style="{backgroundImage: 'url('+ thumbnail +')'}"
            ></div>
            <div class="post-content">
            <h1>{{ title }}</h1>
            <div class="tags is-marginless is-centered">
                <span class="tag is-rounded is-info">mySQL</span>
                <span class="tag is-rounded is-info">Node.js</span>
                <span class="tag is-rounded is-info">Nuxt.js</span>
            </div>
            <p>{{ previewText }}</p>
            </div>
        </article>
    </nuxt-link>
</template>

<script>
export default {
    name: 'TutorielPreview',
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        previewText: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        postLink () {
            return this.isAdmin ? '/dashboard/' + this.id : '/tutoriels/' + this.id
        }
    }
}
</script>

<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}
h1 {
    text-transform: uppercase;
    font-size: 1.5rem;
    color: tomato;
}
a {
  text-decoration: none;
  color: black;
}
p {
  width: auto;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}
@media (max-width: 850px) {
  .post-preview {
    margin-bottom: 20px
  }
}
.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding: 10px;
  height: 150px;
  text-align: center;
}
a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>

