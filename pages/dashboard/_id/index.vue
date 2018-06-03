<template>
    <div class="admin-post-page">
        <hero-head title="Modifier le Tutoriel"/>
        <section class="update-form">
            <UserPostForm :post="loadedTuto" @submit="onSubmitted" />
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
    asyncData(context) {
        return axios({
            method: 'get',
            url: 'http://51.15.255.111:3000/tutoriel/getTutoriel/' + context.params.id
        }).then(response => {
            return {
                loadedTuto: response.data[0]
            }
        }).catch(err => {
            context.error(err)
        })
    },
    methods: {
        onSubmitted(editedPost) {
            editedPost.userId = this.$store.getters.isAuth.id
            axios({
                method: 'put',
                url: 'http://51.15.255.111:3000/tutoriel/updateTutoriel/' + this.$route.params.id,
                data: editedPost
            }).then(response => {
                if (response.data) {
                    this.$forceUpdate();
                    this.$ebus.$emit('message-from-app', {
                        txt: 'Votre article a été mises à jour avec succès',
                        status: 'is-success',
                    })
                    this.$router.push('/dashboard')
                }
            }).catch(err => {
                context.error(err)
                this.$ebus.$emit('message-from-app', {
                    txt: 'Une erreur s\'est produite lors de la mises à jour',
                    status: 'is-warning',
                })
            })
        }
    }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
