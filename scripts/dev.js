import { build } from "vite";
import buildConfig from "../build.config.js";
import { createConfig } from "./createConfig.js";

const buildWatchHandler = () => {
  console.log("🚀 开始监听模式构建...");
  console.log("📦 正在构建以下组件/页面:");
  buildConfig.forEach((item) => {
    console.log(`   - ${item.name}`);
  });
  console.log("");

  buildConfig.forEach((buildItem) => {
    const config = createConfig(buildItem, true);
    build({
      ...config,
      configFile: false, // 明确指定不使用根目录的vite.config.js
      build: {
        ...config.build,
        minify: false,
        watch: true,
      },
    });
  });
};

buildWatchHandler();
