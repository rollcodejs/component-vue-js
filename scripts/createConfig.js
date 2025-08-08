import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
export const createConfig = (buildItem, needsWatch) => {
  const { name, path } = buildItem;
  return defineConfig({
    mode: 'production',
    define: {
      'process.env': {
        NODE_ENV: 'production'
      }
    },
    plugins: [commonjs(), resolve(), vue(), vueJsx(), libInjectCss()],
    build: {
      ssr: false,
      emptyOutDir: false,
      outDir: `dist/${name}`,
      watch: needsWatch ? {} : null,
      lib: {
        name,
        entry: join(__dirname, '..', path),
        fileName: () => `${name}.js`,
        formats: ['umd']
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  });
};
