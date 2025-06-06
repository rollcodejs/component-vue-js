import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
// 好像不需要这两个？
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
    assetsInclude: [
      // '**/*.png',
      // '**/*.jpg',
      // '**/*.jpeg',
      // '**/*.gif',
      // '**/*.svg',
    ], // 匹配你不想被Vite处理的图片类型
    assetInlineLimit: 0, // 将此值设置为0可以阻止所有资源被内联，从而作为普通静态资源处理
    build: {
      ssr: false,
      emptyOutDir: true,
      outDir: `dist/${name}`,
      watch: needsWatch ? {} : null,
      lib: {
        name,
        entry: join(__dirname, '..', path),
        fileName: () => `${name}.js`,
        formats: ['umd']
      },
      rollupOptions: {
        entryFileNames: 'js/[name].js',
        external: ['vue']
      }
    }
  });
};
