import { build } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { createConfig } from './createConfig.js'

export const buildHandler = (needsWatch) => {
	buildConfig.forEach((buildItem) => {
		const config = createConfig(buildItem, needsWatch)
		build(config)
	})
}

buildHandler(false)
