/**
 * @file Vite Configuration for @vastare/foundry.
 * @description
 * Builds the Foundry design system as a modular ES library.
 * Includes per element entry points for tree-shakable components.
 * 
 * This file defines:
 * - Root library entry. (index)
 * - Element level entries. (e.g. elements/paragraph)
 * - Custom Rollup output naming for CSS and JS files.
 * 
 * @see https://vitejs.dev/config/
 */

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      /**
       * Define multiple entry points so consumers can import either:
       * - the root package:     @vastare/foundry
       * - a specific element:   @vastare/foundry/elements/body
       */
      entry: {
        index: resolve(__dirname, "src/index.ts"),

        "elements/anchor": resolve(
          __dirname,
          "src/elements/anchor/anchor.ts"
        ),
        "elements/paragraph": resolve(
          __dirname,
          "src/elements/paragraph/paragraph.ts"
        )
      },

      // Outputs as ES modules only.
      formats: ["es"],

      /**
       * @function fileName
       * @description Custom file naming for each library entry.
       * @param {string} _format - The output format. (ESM Only Here) 
       * @param {string} entryName - Entry key from the entry object. 
       * @returns {string} Path for the output JS file.
       */
      fileName: (_format, entryName) => {
        if (entryName === "index") {
          return "index.js";
        }

        if (entryName.startsWith("elements/")) {
          const base = entryName.split("/").pop();
          return `${entryName}/${base}.js`
        }

        // Fallback for any future entires.
        return `${entryName}.js`;
      }
    },
    rollupOptions: {
      external: [],
      output: {
        // Name non entry chuncks in predictable way and move them out of root.
        chunkFileNames: "chunks/[name].js"
      }
    },
    // Generate source maps for easier debugging in consuming apps.
    sourcemap: true
  }
});
