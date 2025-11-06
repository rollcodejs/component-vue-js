import { build } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { createConfig, buildInfoCollector } from './createConfig.js'
import { generateBuildReport } from './buildInfo.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 从 discovered.json 加载构建配置
const loadBuildConfig = () => {
  const discoveredPath = path.join(__dirname, '..', 'dist', 'discovered.json')
  
  if (!fs.existsSync(discoveredPath)) {
    console.error('❌ 未找到 discovered.json 文件，请先运行 npm run discover')
    process.exit(1)
  }
  
  try {
    const discoveredData = JSON.parse(fs.readFileSync(discoveredPath, 'utf8'))
    const buildConfig = []
    
    // 处理组件
    if (discoveredData.components) {
      discoveredData.components.forEach(component => {
        buildConfig.push({
          name: component.name,
          path: `${component.path}/index.ts`
        })
      })
    }
    
    // 处理页面
    if (discoveredData.pages) {
      discoveredData.pages.forEach(page => {
        buildConfig.push({
          name: page.name,
          path: `${page.path}/index.ts`
        })
      })
    }
    
    return buildConfig
  } catch (error) {
    console.error('❌ 解析 discovered.json 失败:', error.message)
    process.exit(1)
  }
}

export const buildHandler = async (needsWatch) => {
	console.log('🚀 开始构建...')
	
	// 清空构建信息收集器
	buildInfoCollector.clear()
	
	const buildConfig = loadBuildConfig()
	console.log(`📦 发现 ${buildConfig.length} 个构建项`)
	
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
			const buildInfos = buildInfoCollector.getAllInfos()
			
			// 为每个信息添加实际文件大小
			const distDir = path.join(__dirname, '..', 'dist')
			buildInfos.forEach(buildInfo => {
				const jsFile = path.join(distDir, buildInfo.name, `${buildInfo.name}.js`)
				if (fs.existsSync(jsFile)) {
					const stats = fs.statSync(jsFile)
					buildInfo.output.actualSize = stats.size
				}
			})
			
			generateBuildReport(buildInfos)
		}
	} catch (error) {
		console.error('❌ 构建失败:', error)
		process.exit(1)
	}
}

buildHandler(false)
