import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import autoprefixer from "autoprefixer";
import tailwindcss from 'tailwindcss';
import apply from 'postcss-apply';
import extend from 'postcss-extend';
import postcssimport from 'postcss-import'
import nesting from 'tailwindcss/nesting'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    /**
     * Include preset to use Tailwind3's JIT compiler with Vite's included CSS
     * configuration while autoprefixing as needed.
     */
    postcss: {
      plugins: [
        extend(),
        nesting(),
        tailwindcss(),
        // autoprefixer(),
        apply(),
        postcssimport()
      ],
    }
  }
})
