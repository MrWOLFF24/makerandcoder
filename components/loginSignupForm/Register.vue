<template>
    <div id="login">
        <div class="login-card">

            <div class="card-title">
            <h1>Créer un nouveau compte</h1>
            </div>

            <div class="content">
            <form id="login-form" autocomplete="on">

				        <input id="username" v-model="username" type="text" v-validate="'required'" name="nom utilisatur" title="username" placeholder="Nom de l'utilisatur" :class="{'isdanger': errors.has('nom utilisatur') }" required autofocus>
                <p class="help is-danger" v-show="errors.has('nom utilisatur')">{{ errors.first('nom utilisatur') }}</p>

                <input id="email" v-model="email" type="email" v-validate="'required|email'" name="email" title="email" placeholder="Votre adresse email" :class="{'isdanger': errors.has('email') }" required>
                <p class="help is-danger" v-show="errors.has('email')">{{ errors.first('email') }}</p>

                <input id="password" v-model="password" autocomplete="off" v-validate="'required'" type="password" name="mot de passe" title="password" :class="{'isdanger': errors.has('mot de passe') }" placeholder="Créer un mot de passe" required>
                <p class="help is-danger" v-show="errors.has('mot de passe')">{{ errors.first('mot de passe') }}</p>

                <input id="confirmPassword" autocomplete="off" v-validate="'required|confirmed:mot de passe'" type="password" name="confirmer mot de passe" title="password" :class="{'isdanger': errors.has('confirmer mot de passe') }" data-vv-as="mot de passe" placeholder="Confirmer votre mot de passe" required>
                <p class="help is-danger" v-show="errors.has('confirmer mot de passe')">{{ errors.first('confirmer mot de passe') }}</p>

                <div class="level options">
				        <div class="checkbox level-left"></div>

                <nuxt-link class="btn btn-link level-right" to="/connexion/forgot">Mot de passe oublié ?</nuxt-link>
                </div>

                <button type="submit" class="btn btn-primary" @click="createUser($event)">Créer mon compte</button>
            </form>
			          <nuxt-link class="btn btn-link level-item has-text-centered" to="/connexion">Vous avez déjà un compte ?</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      title: "S'inscrire",
      username: null,
      email: null,
      password: null
    }
  },
  methods: {
    createUser(e) {
      e.preventDefault()
      this.$validator.validateAll().then(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://51.15.255.111:3000/user/register',
            data: {
              username: this.username,
              email: this.email,
              password: this.password,
            },
          }).then(response => {
            if (!response.data.error) {
              this.$ebus.$emit('message-from-app', {
                txt: response.data.message,
                status: 'is-success',
              })
              window.setTimeout(() => {
                this.$router.push('/')
              }, 2000)
            } else {
							this.$ebus.$emit('message-from-app', {
            		txt: response.data.message,
            		status: 'is-warning',
          		})
						}
          }).catch(error => {
            this.$ebus.$emit('message-from-app', {
              txt: error.response.data,
              status: 'is-warning',
            })
          })
        } else {
          this.$ebus.$emit('message-from-app', {
            txt: 'Veillez vérifier vos informations!',
            status: 'is-warning',
          })
        }
      })
    },
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Page s\'enregistrer' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$primary:      hsl(171, 100%, 41%);
$grey-darker:  hsl(0, 0%, 21%);
$grey-dark:    hsl(0, 0%, 29%);
$grey:         hsl(0, 0%, 48%);
$grey-light:   hsl(0, 0%, 71%);
$grey-lighter: hsl(0, 0%, 86%);

#login {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: #fff;

	.login-card {
		background: #fff;
		width: 24rem;
		box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.11);

		.card-title {
			background-color: darken($primary, 5%);
			padding: 2rem;

			h1 {
				color: #fff;
				text-align: center;
				font-size: 1.2rem;
			}
		}

		.content {
			padding: 3rem 2.5rem 3rem;
		}

		#email, #password, #username, #confirmPassword {
			display: block;
			width: 100%;
			font-size: 1rem;
			margin-bottom: 1.75rem;
			padding: 0.25rem 0;
			border: none;
			border-bottom: 1px solid $grey-lighter;
			transition: all .5s;

			&:hover {
				border-color: $grey;
			}

      &.isdanger {
				border-color: hsl(348, 100%, 61%);
			}

			&:active, &:focus {
				border-color: $primary;
			}
		}

		.checkbox {
			color: $grey-light;
			font-size: 0.8rem;

			span {
				margin-left: 0.5rem;
			}
		}

		a {
			font-size: 0.8rem;
		}

		.options {
			color: $grey-light;
			margin-bottom: 1.5rem;
		}

		button {
			cursor: pointer;
			font-size: 1.2rem;
			color: $primary;
			border-radius: 4rem;
			display: block;
			width: 100%;
			background: transparent;
			border: 2px solid $primary;
			padding: 0.9rem 0 1.1rem;
			transition: color .5s, border-color .5s;

			&:hover, &:focus {
				color: darken($primary, 10%);
				border-color: darken($primary, 10%);
			}

			&:active {
				transform: translateY(1px);
			}
		}
	}
}

label {
	cursor: pointer;
}

.regular-checkbox {
	display: none;
}

.regular-checkbox + label {
	background-color: #fafafa;
	border: 1px solid $grey-lighter;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05);
	padding: 7px;
	border-radius: 3px;
	display: inline-block;
	position: relative;
}

.regular-checkbox:checked + label {
	background-color: #e9ecee;
}

.regular-checkbox:checked + label:after {
	content: '\2714';
	font-size: 11px;
	position: absolute;
	top: 0;
	left: 3px;
	color: $grey-light;
}

.level-item.has-text-centered {
	padding-top: 2rem;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
	outline: none;
}
</style>
