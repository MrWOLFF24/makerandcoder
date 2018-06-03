<template>
    <form @submit.prevent="onSave">
        <div class="field">
            <label class="label">Nom de l'auteur</label>
            <div class="control has-icons-right">
                <input class="input" v-model="editedPost.author" name="nom" type="text" v-validate="'required'" :class="{'is-danger': errors.has('nom') }" placeholder="Entrer le nom de l'auteur">
                <span class="icon is-small is-right">
                    <i class="fas fa-check" :class="{'fa-exclamation-triangle': errors.has('nom') }"></i>
                </span>
            </div>
            <p class="help is-danger">{{ errors.first('nom') }}</p>
        </div>

        <div class="field">
            <label class="label">Titre de l'article</label>
            <div class="control has-icons-right">
                <input class="input" v-model="editedPost.title" type="text" name="titre" v-validate="'required'" :class="{'is-danger': errors.has('titre') }" placeholder="Entrer le titre de votre article">
                <span class="icon is-small is-right">
                    <i class="fas fa-check" :class="{'fa-exclamation-triangle': errors.has('titre') }"></i>
                </span>
            </div>
            <p class="help is-danger">{{ errors.first('titre') }}</p>
        </div>

        <div class="field">
            <label class="label">Description de l'article</label>
            <div class="control has-icons-right">
                <input class="input" v-model="editedPost.description" type="text" name="description" v-validate="'required'" :class="{'is-danger': errors.has('description') }" placeholder="Entrer le description de votre article (225 caractere max)">
                <span class="icon is-small is-right">
                    <i class="fas fa-check" :class="{'fa-exclamation-triangle': errors.has('description') }"></i>
                </span>
            </div>
            <p class="help is-danger">{{ errors.first('description') }}</p>
        </div>

        <label class="label">Tags (mot clé pour votre article)</label>
        <no-ssr>
        <vue-tags-input
            v-model="editedPost.tag"
            :tags="editedPost.tags"
            placeholder="Entrer les tags pour votre article ex: Arduino"
            @tags-changed="newTags => tags = newTags" />
        </no-ssr>

        <div class="field">
            <label class="label">Lien de l'image (url)</label>
            <div class="control has-icons-right">
                <input class="input" v-model="editedPost.image" type="url" name="url" v-validate="'required|url'" :class="{'is-danger': errors.has('url') }" placeholder="Entrer le lien d'image pour votre article">
                <span class="icon is-small is-right">
                    <i class="fas fa-check" :class="{'fa-exclamation-triangle': errors.has('url') }"></i>
                </span>
            </div>
            <p class="help is-danger">{{ errors.first('url') }}</p>
        </div>

        <div class="field">
            <label class="label">Contenu de l'article</label>
            <div class="control has-icons-right">
                <textarea class="textarea" v-model="editedPost.content" name="content" v-validate="'required'" :class="{'is-danger': errors.has('content') }" placeholder="Le contenu de votre article"></textarea>
                <span class="icon is-small is-right">
                    <i class="fas fa-check" :class="{'fa-exclamation-triangle': errors.has('content') }"></i>
                </span>
            </div>
            <p class="help is-danger">{{ errors.first('content') }}</p>
        </div>

        <AppButton btn-style="is-primary is-outlined" type="submit">Sauvegarder</AppButton>

        <AppButton
            type="button"
            style="margin-left: 10px"
            btn-style="is-danger is-outlined"
            @click="onCancel">Annuler</AppButton>
    </form>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
import AppButton from '@/components/UI/AppButton'
export default {
    components: {
        VueTagsInput,
        AppButton,
    },
    props: {
        post: {
            type: Object,
            required: false,
        }
    },
    data () {
        return {
            editedPost: this.post ? { ...this.post } : {
                author: '',
                title: '',
                description: '',
                image: '',
                content: '',
            },
            tag: '',
            tags: [],
        }
    },
    methods: {
        onSave() {
            const arr = this.tags.map(el => el.text);
            this.$validator.validateAll().then(valid => {
                if (valid) {
                    // Save the post
                    this.editedPost.tags = arr
                    this.$emit('submit', this.editedPost)
                } else {
                    this.$ebus.$emit('message-from-app', {
                        txt: "Veuillez vérifier vos informations",
                        status: 'is-warning',
                    })
                }
            }).catch(e => {
                console.log(e)
            })

        },
        onCancel () {
            this.$router.push('/dashboard');
        }
    }
}
</script>

<style scoped>
.input-control {
  margin: 10px 0;
}
.input-control label {
  display: block;
  font-weight: bold;
}
.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
}
.input-control input:focus,
.input-control textarea:focus {
  background-color: #eee;
  outline: none;
}
</style>
