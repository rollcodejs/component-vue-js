import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import buildConfig from '../build.config.js'
import url from '@rollup/plugin-url'
// import vueJsx from '@vitejs/plugin-vue-jsx'
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
export const createConfig = (buildItem, needsWatch) => {
	const { name, path } = buildItem
	return {
		input: join(__dirname, '..', path),
		output: {
			file: `dist/${name}.js`,
			format: 'es',
		},
		external: ['vue'],
		plugins: [vue(), url()],
	}
}

export default (needsWatch) => {
	return buildConfig.map((buildItem) => {
		return createConfig(buildItem, needsWatch)
	})
}
