import { build } from 'vite'
import buildConfig from '../build.config.js'
import { createConfig } from './createConfig.js'

export const buildHandler = (needsWatch) => {
	buildConfig.forEach((buildItem) => {
		const config = createConfig(buildItem, needsWatch)
		build({
			...config,
			configFile: false, // 明确指定不使用根目录的vite.config.js
		})
	})
}

buildHandler(false)
