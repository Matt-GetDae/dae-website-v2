
export default defineNuxtConfig({
  srcDir: 'app',
  devtools: { enabled: false },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: false,
      failOnError: false,
    }
  },

  css: [
    "swiper/css/bundle",
    '~/assets/css/video.css',
    '~/assets/css/uni-core.min.css',
    '~/assets/css/fonts.css',
    '~/assets/css/unicons.min.css',
    '~/assets/css/prettify.min.css',
    '~/assets/css/magic-cursor.min.css',
    '~/assets/css/rk-style.css',
    '~/assets/css/theme/main.purge.css',
  ],

})
