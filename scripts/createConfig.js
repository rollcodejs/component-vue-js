import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'vite';
import fs from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// 自定义插件：生成构建信息
const buildInfoPlugin = (buildItem, needsWatch) => {
  return {
    name: 'build-info',
    writeBundle(options, bundle) {
      const { name } = buildItem;
      const outputDir = `dist/${name}`;
      const infoFile = `${outputDir}/build-info.json`;
      
      // 收集构建信息
      const buildInfo = {
        name,
        buildTime: new Date().toISOString(),
        entry: buildItem.path,
        output: {
          file: `${name}.js`,
          format: 'umd',
          size: 0,
          gzippedSize: 0
        },
        dependencies: [],
        devDependencies: [],
        bundleAnalysis: {}
      };

      // 分析bundle
      if (bundle) {
        const mainFile = bundle[`${name}.js`];
        if (mainFile) {
          buildInfo.output.size = mainFile.code.length;
          buildInfo.output.gzippedSize = estimateGzipSize(mainFile.code);
          
          // 收集依赖信息
          if (mainFile.modules) {
            buildInfo.bundleAnalysis.modules = Object.keys(mainFile.modules).map(moduleId => ({
              id: moduleId,
              size: mainFile.modules[moduleId].code.length
            }));
            
            // 分析实际使用的依赖
            const usedDeps = new Set();
            const usedDevDeps = new Set();
            
            // 读取package.json用于版本信息
            let packageJson;
            try {
              packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            } catch (error) {
              console.warn('无法读取package.json:', error.message);
              packageJson = { dependencies: {}, devDependencies: {} };
            }
            
            // 分析模块中的依赖
            Object.keys(mainFile.modules).forEach(moduleId => {
              // 跳过node_modules中的依赖，只关注项目内的模块
              if (moduleId.includes('node_modules/')) {
                // 提取包名（去掉版本号等）
                const packageName = moduleId.split('node_modules/')[1]?.split('/')[0];
                if (packageName && !packageName.startsWith('.')) {
                  // 检查是生产依赖还是开发依赖
                  if (packageJson.dependencies && packageJson.dependencies[packageName]) {
                    usedDeps.add(packageName);
                  } else if (packageJson.devDependencies && packageJson.devDependencies[packageName]) {
                    usedDevDeps.add(packageName);
                  }
                }
              }
            });
            
            buildInfo.dependencies = Array.from(usedDeps).sort();
            buildInfo.devDependencies = Array.from(usedDevDeps).sort();
          }
        }
      }

      // 写入构建信息文件
      try {
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(infoFile, JSON.stringify(buildInfo, null, 2));
        
        // 在watch模式下，每次构建都显示信息
        if (needsWatch) {
          const size = buildInfo.output.size;
          const gzipSize = buildInfo.output.gzippedSize;
          console.log(`✅ ${name}: ${formatFileSize(size)} (${formatFileSize(gzipSize)} gzipped)`);
        } else {
          console.log(`✅ 构建信息已生成: ${infoFile}`);
        }
      } catch (error) {
        console.error('写入构建信息失败:', error.message);
      }
    }
  };
};

// 估算gzip压缩后的大小
function estimateGzipSize(code) {
  // 简单的gzip大小估算（实际压缩率约为30-40%）
  return Math.round(code.length * 0.35);
}

// 格式化文件大小
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const createConfig = (buildItem, needsWatch) => {
  const { name, path } = buildItem;
  return defineConfig({
    mode: 'production',
    define: {
      'process.env': {
        NODE_ENV: 'production'
      }
    },
    plugins: [
      commonjs(), 
      resolve(), 
      vue(), 
      vueJsx(), 
      libInjectCss(),
      buildInfoPlugin(buildItem, needsWatch)
    ],
    build: {
      ssr: false,
      emptyOutDir: false,
      outDir: `dist/${name}`,
      watch: needsWatch ? {} : null,
      lib: {
        name,
        entry: join(__dirname, '..', path),
        fileName: () => `${name}.js`,
        formats: ['umd']
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  });
};
