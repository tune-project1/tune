import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";

const mdxOptions = {
  //remarkPlugins: [remarkToc],
  rehypePlugins: [rehypeSlug]
};

// https://astro.build/config
export default defineConfig({
  prefetch: {
    defaultStrategy: "viewport"
  },
  devToolbar: {
    enabled: false
  },
  site: "https://tune",
  server: {
    port: 3000
  },
  trailingSlash: "never",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          //additionalData: `@import "@tune/styles/_globals.scss";`,
          quietDeps: true
        }
      }
    }
  },
  markdown: {
    syntaxHighlight: false
  },
  integrations: [
    vue(),
    mdx(mdxOptions),
    sitemap({
      filter: (page) => {
        let excludes = [
          "https://tune/pitch",
          `https://tune/articles`,
          `https://tune/manual`,
          `https://tune/vs-logsnag`,
          `https://tune/vs-slack-telegram-discord`,
          `https://tune/styleguide`,
          `https://tune/manual`
        ];
        if (excludes.includes(page)) {
          console.log(`[EXCLUDED] ${page}`);
          return false;
        }
        console.log(`[INCLUDED] ${page}`);
        return true;
      }
    })
  ]
});
