module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'MAKER&CODER || Bienvenue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'a simple community web site' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v2' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Code+Pro:400,700' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css', integrity: 'sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp', crossorigin: 'anonymous' },
    ],
  },

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    '~/plugins/eventBus.js',
    { src: '~plugins/vee-validate.js', ssr: true },
    { src: '~/plugins/vue-tags-input.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma'
  ],

  /*
  ** Build configuration
  */
  build: {
    vendor: ['@johmun/vue-tags-input'],
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            customProperties: false
          }
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev, isClient }) {
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
