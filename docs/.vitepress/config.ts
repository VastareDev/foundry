import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Foundry',
  description: 'Vastare Design Foundation',
  base: '/foundry/',
  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Usage', link: '/usage/' },
      { text: 'API', link: '/reference/' }
    ]
  }
});
