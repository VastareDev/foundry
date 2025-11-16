import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Foundry Documentation',
  description: 'Vastare\'s Design Foundation',
  outDir: "../public",
  themeConfig: {
    logo: {
      light: "/img/symbol-blue.png",
      dark: "/img/symbol-white.png"
    },
    nav: [
      { text: 'Getting Started', link: '/' },
      { text: 'Usage', link: '/usage/' },
      { text: 'API', link: '/reference/' }
    ],
    sidebar: {
      '/': [
        {
          text: "Introduction",
          items: [
            { text: "What is Foundry?", link: "/usage/" }
          ]
        }
      ]
    }
  }
});
