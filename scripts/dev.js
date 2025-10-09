import { build } from "vite";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { createConfig } from "./createConfig.js";
import { generateBuildReport } from "./buildInfo.js";

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

const buildWatchHandler = () => {
  console.log("🚀 开始监听模式构建...");
  
  const buildConfig = loadBuildConfig()
  console.log("📦 正在构建以下组件/页面:");
  buildConfig.forEach((item) => {
    console.log(`   - ${item.name}`);
  });
  console.log("");

  const buildPromises = buildConfig.map((buildItem) => {
    const config = createConfig(buildItem, true);
    return build({
      ...config,
      configFile: false, // 明确指定不使用根目录的vite.config.js
      build: {
        ...config.build,
        minify: false,
        watch: true,
      },
    });
  });

  // 监听构建完成事件
  Promise.all(buildPromises).then(() => {
    console.log("✅ 初始构建完成，开始监听文件变化...");
    // 生成初始构建报告
    setTimeout(() => {
      console.log("\n📊 生成构建报告...");
      generateBuildReport();
    }, 1000); // 延迟1秒确保所有文件都写入完成
  }).catch((error) => {
    console.error("❌ 构建失败:", error);
  });
};

buildWatchHandler();
