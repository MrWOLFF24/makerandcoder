<template>
  <div class="wrap">
    <navbar></navbar>
    <AppMessage/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import AppMessage from '~/components/AppMessages/AppMessages'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default {
  components: {
    AppMessage,
    Navbar,
    Footer,
  },
}
</script>


<style>
html {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
