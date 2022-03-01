import colors from 'vuetify/es5/util/colors'

const isDev = process.env.NODE_ENV === 'development'




// Content and description

const title = 'DeepNotes'
const description = ''




export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/external/highlight', mode: 'client' },
    { src: '~/plugins/external/quill-editor', mode: 'client' },
    { src: '~/plugins/external/syncedstore' },
    
    { src: '~/plugins/static/static' },

    { src: '~/plugins/app/app' },
    { src: '~/plugins/app/mixin' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: isDev ? 'http://localhost:21733' : 'https://app-server.deepnotes.app/',
  },

  router: {
    middleware: ['auth']
  },

  auth: {
    cookie: {
      options: {
        domain: isDev ? null : 'deepnotes.app',
      },
    },
    redirect: {
      login: isDev ? 'http://localhost:60379/login' : 'https://deepnotes.app/login',
      callback: isDev ? 'http://localhost:60379/login' : 'https://deepnotes.app/login',
      home: '/',
      logout: isDev ? 'http://localhost:60379' : 'https://deepnotes.app/',
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          user: { url: '/auth/user', method: 'post' },
          logout: false,
        },
        token: {
          property: 'token',
          // global: true, // Default: true
          // name: 'Authorization', // Default: 'Authorization'
          // required: true, // Default: true
          // type: 'Bearer', // Default: 'Bearer'
          // maxAge: 60 * 30, // Default: 60 * 30
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken', // Default: 'refresh_token'
          // maxAge: 60 * 60 * 24 * 30, // Default: 60 * 60 * 24 * 30
          // required: true, // Default: true
          // tokenRequired: false, // Default: false
        },
        user: {
          property: 'user',
          // autoFetch: true, // Default: true
        },
        // autoLogout: false, // Default: false

        scheme: 'refresh',
      },
    },
  },


  pwa: {
    icon: {
      fileName: 'pwa-icon.png',
    },
    meta: {
      name: title,
    },
    manifest: {
      name: title,
      short_name: title,
      description: description,
      background_color: '#272727',
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      config.resolve.extensions.push('ts', 'tsx')
    },
  },

  server: {
    host: '0.0.0.0',
    port: 24579,
  },
}
