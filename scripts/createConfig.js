import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
export const createConfig = (buildItem, needsWatch) => {
	const { name, path } = buildItem
	return {
		plugins: [vue(), vueJsx(), cssInjectedByJsPlugin()],
		assetsInclude: [
			// '**/*.png',
			// '**/*.jpg',
			// '**/*.jpeg',
			// '**/*.gif',
			// '**/*.svg',
		], // 匹配你不想被Vite处理的图片类型
		assetInlineLimit: 0, // 将此值设置为0可以阻止所有资源被内联，从而作为普通静态资源处理
		define: {
			vue: 'window.Vue',
		},
		build: {
			emptyOutDir: true,
			outDir: `dist/${name}`,
			watch: needsWatch ? {} : null,
			lib: {
				name,
				entry: join(__dirname, '..', path),
				fileName: 'index',
				formats: ['es'],
			},
			rollupOptions: {
				external: ['vue'],
				entryFileNames: 'js/[name].js',
				output: {
					globals: {
						vue: 'window.Vue',
					},
				},
			},
		},
	}
}
