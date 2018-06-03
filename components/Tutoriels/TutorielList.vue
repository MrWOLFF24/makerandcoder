<template>
    <section class="featured-posts">
        <tutoriel-preview
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :is-admin="isAdmin"
        :thumbnail="post.image"
        :title="post.title"
        :previewText="post.description"
        />
    </section>
</template>

<script>
import TutorielPreview from '@/components/Tutoriels/TutorielPreview'
export default {
  components: {
    TutorielPreview,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>


<style scoped>
.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

