import { build } from "vite";
import buildConfig from "../build.config.js";
import { createConfig } from "./createConfig.js";
import { generateBuildReport } from "./buildInfo.js";

const buildWatchHandler = () => {
  console.log("🚀 开始监听模式构建...");
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
