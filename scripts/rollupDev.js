import { rollup } from 'rollup'
import buildConfig from '../build.config.js'
import { createConfig } from './createRollupConfig.js'

export const buildHandler = (needsWatch) => {
	buildConfig.forEach((buildItem) => {
		const config = createConfig(buildItem, needsWatch)
		build(config)
	})
}

buildHandler(false)

async function build(config) {
	let bundle
	let buildFailed = false
	try {
		// 启动一次打包
		bundle = await rollup(config)
    console.log(bundle)

		await bundle.generate(config.output)
	} catch (error) {
		buildFailed = true
		// 进行一些错误报告
		console.error(error)
	}
	if (bundle) {
		// 关闭打包过程
		await bundle.close()
	}
	process.exit(buildFailed ? 1 : 0)
}
