<template>
  <header>
    <div class="container is-fullhd">
      <nav class="navbar is-2" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="~/assets/images/logo.png" alt="Coder and Maker logo" width="30" height="30">
            MAKER&amp;CODER
          </a>
          <a role="button" class="navbar-burger" @click="toggleNavBar">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div class="navbar-menu" id="nav-menu">
          <div class="navbar-end">
              <nuxt-link class="navbar-item" to="/">Home</nuxt-link>
              <nuxt-link class="navbar-item" to="/tutoriels">Tutoriels</nuxt-link>
              <nuxt-link class="navbar-item" to="/tchat">Tchat</nuxt-link>
              <nuxt-link class="navbar-item" to="/contact">Contact</nuxt-link>
              <div v-if="!$store.state.authUser" class="navbar-item field">
                <nuxt-link class="button is-primary is-rounded" to="/connexion">
                  <span class="icon">
                    <i tag="i" class="fas fa-sign-in-alt"></i>
                  </span>
                  <span>Se Connecter</span>
                </nuxt-link>
              </div>
              <div v-else @click="mouseOver" id="droped" class="navbar-item has-dropdown">
                <a class="navbar-link">
                  Bienvenue {{ $store.state.authUser.username }}
                </a>

                <div class="navbar-dropdown is-right">
                  <nuxt-link to="/dashboard" class="navbar-item">
                    Dashboard
                  </nuxt-link>
                  <hr class="navbar-divider">
                  <div @click="logout" class="navbar-item pointer">
                    Se déconnecter
                  </div>
                </div>
              </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import axios from 'axios'
export default {
  mounted() {
    this.navMenu = this.$el.querySelector('#nav-menu')
    this.toggleBtn = this.$el.querySelector('.navbar-burger')
    this.activeDrop = this.$el.querySelector("#droped")
  },
  data() {
    return {
      toggleBtn: null,
      navMenu: null,
      activeDrop: null,
    }
  },
  methods: {
    toggleNavBar() {
      this.toggleBtn.classList.toggle('is-active')
      this.navMenu.classList.toggle('is-active')
    },
    mouseOver() {
      this.activeDrop.classList.toggle('is-active')
    },
    logout() {
      try {
        this.$store.dispatch('logout')
        this.$forceUpdate();
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  },
}
</script>


<style scoped>
.pointer {
  cursor: pointer;
}
.is-2 {
  padding: 0 3rem;
}
.navbar {
  border-bottom: 3px solid transparent;
  -moz-border-image: -moz-linear-gradient(top, #ffe600 0%, #ff6666 100%);
  -webkit-border-image: -webkit-linear-gradient(top, #ffe600 0%, #ff6666 100%);
  border-image: linear-gradient(to left, #ffe600 0%, #ff6666 100%);
  border-image-slice: 1;
}
.button.is-primary {
  background: #FD015B;
}
@media screen and (max-width: 1023px) {
  .is-2 {
    padding: 0;
  }
}
</style>
