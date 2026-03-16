import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  // ön yüklemeyi devre dışı bırak
  typescript: {
    strict: true,
  },
  // devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
  },
  build: {
    transpile: ["vuetify"],
  },
  nitro: {
    preset: "vercel",
  },
  components: true,
  // Diğer yapılandırmalar
  app: {
    head: {
      titleTemplate: "Tuvalet Otomasyonu - %s",
      title: "Tuvalet Otomasyonu",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Tuvalet Otomasyonu" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/images/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/images/favicon-32x32.png",
        },
      ],
    },
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
  ],
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Modern SCSS compiler kullanılıyor
        },
      },
    },
    vue: { template: { transformAssetUrls } },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: false, // 👈 console.* silinir
          drop_debugger: true, // 👈 debugger silinir
        },
      },
    },
  },
  plugins: ["~/plugins/moment.ts"],

  css: [
    "~/assets/css/index.scss",
  ],

  alias: {
    "~/assets": "_nuxt/assets",
  },
  compatibilityDate: "2026-01-29",
});
