import { build } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { createConfig } from './createConfig.js'
import { collectBuildInfo, generateBuildReport } from './buildInfo.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 从 discovered.json 加载构建配置
const loadBuildConfig = () => {
  const discoveredPath = path.join(__dirname, '..', 'public', 'discovered.json')
  
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

// 复制构建文件到 public 目录
const copyBuildFilesToPublic = () => {
  const distOutputDir = path.join(__dirname, '..', 'dist', 'output')
  const publicOutputDir = path.join(__dirname, '..', 'public', 'output')
  
  if (!fs.existsSync(distOutputDir)) {
    console.log('📁 dist/output 目录不存在，跳过复制')
    return
  }
  
  // 确保 public/output 目录存在
  if (!fs.existsSync(publicOutputDir)) {
    fs.mkdirSync(publicOutputDir, { recursive: true })
  }
  
  // 复制所有构建文件到 public/output
  const items = fs.readdirSync(distOutputDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  
  items.forEach(itemName => {
    const sourceDir = path.join(distOutputDir, itemName)
    const targetDir = path.join(publicOutputDir, itemName)
    
    // 确保目标目录存在
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }
    
    // 复制文件
    const files = fs.readdirSync(sourceDir)
    files.forEach(file => {
      const sourceFile = path.join(sourceDir, file)
      const targetFile = path.join(targetDir, file)
      fs.copyFileSync(sourceFile, targetFile)
    })
    
    console.log(`📋 已复制 ${itemName} 到 public/output/`)
  })
}

export const buildHandler = async (needsWatch) => {
	console.log('🚀 开始构建...')
	
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
		
		// 复制构建文件到 public 目录
		copyBuildFilesToPublic()
		
		// 生成构建报告
		if (!needsWatch) {
			console.log('\n📊 生成构建报告...')
			const buildInfos = collectBuildInfo()
			generateBuildReport(buildInfos)
		}
	} catch (error) {
		console.error('❌ 构建失败:', error)
		process.exit(1)
	}
}

buildHandler(false)
