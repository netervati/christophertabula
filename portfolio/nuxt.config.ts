// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  aos: {
    duration: 600,
    easing: 'ease-in-out-cubic',
    once: true
  },
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs'
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            "I'm a software engineer with a passion for crafting solid and scalable digital products.",
        },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
        }
      ],
      script: [
        {
          src: 'https://kit.fontawesome.com/2ab03e82f6.js',
          crossorigin: 'anonymous'
        }
      ],
      title: 'Christopher I. Tabula',
    },
  },
  colorMode: {
    preference: 'light'
  },
  content: {
    highlight: {
      langs: [
        'rb',
      ],
      theme: 'github-light'
    }
  },
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    'nuxt-aos',
    '@nuxt/image',
    'nuxt-simple-robots',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      messageApiUrl: process.env.MESSAGE_API_URL,
      logRocket: {
        id: process.env.LOG_ROCKET_ID,
        dev: false,
        enablePinia: true,
        config: {}
      }
    },
  },
  site: {
    url: process.env.BASE_URL
  },
  sitemap: {
    strictNuxtContentPaths: true
  }
});
