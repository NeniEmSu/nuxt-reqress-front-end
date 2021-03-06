import axios from 'axios'
require('dotenv').config()
export default {
  mode: 'universal',

  target: 'server',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['sweetalert2/dist/sweetalert2.min.css'],

  plugins: [
    '~/plugins/vue-placeholders.js',
    '~/plugins/vuelidate.js',
    '~/plugins/bootstrap-vue-icon',
  ],
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    'vue-sweetalert2/nuxt',
  ],

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${process.env.BACKEND_ENDPOINT}/api/login`,
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: `${process.env.BACKEND_ENDPOINT}/api/logout`,
            method: 'post',
          },
          user: {
            url: `${process.env.BACKEND_ENDPOINT}/api/login`,
            method: 'post',
            propertyName: 'email',
          },
        },
        tokenRequired: true,
        tokenType: '',
        globalToken: true,
        autoFetchUser: true,
      },
    },
  },

  axios: {
    proxy: false,
  },
  robots: () => {
    return {
      Sitemap: '/sitemap.xml',
    }
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    cacheTime: 1000 * 60 * 15,
  },

  generate: {
    routes() {
      const userRoute = axios
        .get(`${process.env.BACKEND_ENDPOINT}`)
        .then((res) => {
          return res.data.data.map((user) => {
            return `/users/${user.id}`
          })
        })
      return Promise.all([userRoute]).then((values) => {
        return values.join().split(',')
      })
    },
  },
  build: {
    extend(config, ctx) {},
  },
}
