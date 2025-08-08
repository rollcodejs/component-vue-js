import { build } from 'vite'
import buildConfig from '../build.config.js'
import { createConfig } from './createConfig.js'
import { generateBuildReport } from './buildInfo.js'

export const buildHandler = async (needsWatch) => {
	console.log('🚀 开始构建...')
	
	const buildPromises = buildConfig.map((buildItem) => {
		const config = createConfig(buildItem, needsWatch)
		return build({
			...config,
			configFile: false, // 明确指定不使用根目录的vite.config.js
		})
	})

	try {
		await Promise.all(buildPromises)
		console.log('✅ 构建完成!')
		
		// 生成构建报告
		if (!needsWatch) {
			console.log('\n📊 生成构建报告...')
			generateBuildReport()
		}
	} catch (error) {
		console.error('❌ 构建失败:', error)
		process.exit(1)
	}
}

buildHandler(false)
