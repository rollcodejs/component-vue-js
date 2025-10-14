import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { buildInfoCollector } from './createConfig.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// 格式化文件大小
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 收集构建信息
function collectBuildInfo() {
  const distDir = path.join(__dirname, '..', 'dist');
  const outputDir = path.join(distDir, '');
  const buildInfos = [];
  
  if (!fs.existsSync(outputDir)) {
    console.log('❌ dist 目录不存在，请先运行构建命令');
    return;
  }

  // 首先尝试从构建信息收集器获取
  const collectedInfos = buildInfoCollector.getAllInfos();
  if (collectedInfos.length > 0) {
    console.log('📦 从构建过程收集信息...\n');
    
    // 为每个信息添加实际文件大小
    collectedInfos.forEach(buildInfo => {
      const jsFile = path.join(outputDir, buildInfo.name, `${buildInfo.name}.js`);
      if (fs.existsSync(jsFile)) {
        const stats = fs.statSync(jsFile);
        buildInfo.output.actualSize = stats.size;
      }
      buildInfos.push(buildInfo);
    });
    
    return buildInfos;
  }

  // 如果收集器为空，回退到读取文件的方式（向后兼容）
  console.log('📦 从文件系统收集构建信息...\n');
  
  const packages = fs.readdirSync(outputDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  packages.forEach(packageName => {
    const infoFile = path.join(outputDir, packageName, 'build-info.json');
    const jsFile = path.join(outputDir, packageName, `${packageName}.js`);
    
    if (fs.existsSync(infoFile)) {
      try {
        const buildInfo = JSON.parse(fs.readFileSync(infoFile, 'utf8'));
        
        // 获取实际文件大小
        if (fs.existsSync(jsFile)) {
          const stats = fs.statSync(jsFile);
          buildInfo.output.actualSize = stats.size;
        }
        
        buildInfos.push(buildInfo);
      } catch (error) {
        console.warn(`⚠️  无法读取 ${infoFile}:`, error.message);
      }
    } else {
      console.warn(`⚠️  构建信息文件不存在: ${infoFile}`);
    }
  });

  return buildInfos;
}

// 生成构建报告
function generateBuildReport(buildInfos) {
  if (!buildInfos || buildInfos.length === 0) {
    console.log('❌ 没有找到构建信息');
    return;
  }

  console.log('📊 构建报告\n');
  console.log('='.repeat(80));

  // 总体统计
  const totalSize = buildInfos.reduce((sum, info) => sum + (info.output.actualSize || info.output.size), 0);
  const totalGzippedSize = buildInfos.reduce((sum, info) => sum + info.output.gzippedSize, 0);

  console.log(`📈 总体统计:`);
  console.log(`   总包数: ${buildInfos.length}`);
  console.log(`   总大小: ${formatFileSize(totalSize)}`);
  console.log(`   总压缩大小: ${formatFileSize(totalGzippedSize)}`);
  console.log('');

  // 详细包信息
  buildInfos.forEach((info, index) => {
    console.log(`${index + 1}. ${info.name}`);
    console.log(`   入口文件: ${info.entry}`);
    console.log(`   构建时间: ${new Date(info.buildTime).toLocaleString()}`);
    console.log(`   文件大小: ${formatFileSize(info.output.actualSize || info.output.size)}`);
    console.log(`   压缩大小: ${formatFileSize(info.output.gzippedSize)}`);
    
    if (info.bundleAnalysis.modules && info.bundleAnalysis.modules.length > 0) {
      console.log(`   模块数量: ${info.bundleAnalysis.modules.length}`);
    }
    
    console.log('');
  });

  // 依赖分析
  console.log('📋 依赖分析');
  console.log('-'.repeat(40));
  
  const allDeps = new Set();
  const allDevDeps = new Set();
  
  buildInfos.forEach(info => {
    info.dependencies.forEach(dep => allDeps.add(dep));
    info.devDependencies.forEach(dep => allDevDeps.add(dep));
  });

  if (allDeps.size > 0) {
    console.log('生产依赖:');
    Array.from(allDeps).sort().forEach(dep => {
      console.log(`  - ${dep}`);
    });
    console.log('');
  }

  if (allDevDeps.size > 0) {
    console.log('开发依赖:');
    Array.from(allDevDeps).sort().forEach(dep => {
      console.log(`  - ${dep}`);
    });
    console.log('');
  }

  // 生成汇总报告文件
  const report = {
    summary: {
      totalPackages: buildInfos.length,
      totalSize,
      totalGzippedSize,
      buildTime: new Date().toISOString()
    },
    packages: buildInfos,
    dependencies: {
      production: Array.from(allDeps).sort(),
      development: Array.from(allDevDeps).sort()
    }
  };

  const reportFile = path.join(__dirname, '..', 'build-info', 'build-report.json');
  try {
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    console.log(`✅ 构建报告已生成: ${reportFile}`);
  } catch (error) {
    console.error('❌ 生成构建报告失败:', error.message);
  }

  console.log('='.repeat(80));
}

// 主函数
function main() {
  const buildInfos = collectBuildInfo();
  generateBuildReport(buildInfos);
}

// 如果直接运行此脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { collectBuildInfo, generateBuildReport };
