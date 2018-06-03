<template>
    <div class="user-new-post-page">
        <hero-head title="Ajouter un nouveau Tutoriel"/>
        <section class="new-tuto-form">
            <UserPostForm @submit="onSubmitted" />
        </section>
    </div>
</template>

<script>
import HeroHead from '@/components/HomeComponents/HeroHead'
import UserPostForm from '@/components/User/UserPostForm'
import axios from 'axios'
export default {
    middleware: 'auth',
    components: {
        UserPostForm,
        HeroHead,
    },
    methods: {
        onSubmitted(postData) {
            postData.userId = this.$store.getters.isAuth.id
            axios({
                method: 'post',
                url: 'http://51.15.255.111:3000/tutoriel/postTutoriel',
                data: postData
            })
            .then(response => {
                if (response.data) {
                    this.$forceUpdate();
                    this.$ebus.$emit('message-from-app', {
                        txt: 'Votre article a été publié avec succès',
                        status: 'is-success',
                    })
                    this.$router.push('/dashboard')
                }
            }).catch(e => {
                console.log(e)
                this.$ebus.$emit('message-from-app', {
                    txt: 'Une erreur s\'est produite lors de l\'envoi',
                    status: 'is-warning',
                })
            })
        }
    }
}
</script>

<style scoped>
.new-tuto-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .new-tuto-form {
    width: 500px;
  }
}
</style>
