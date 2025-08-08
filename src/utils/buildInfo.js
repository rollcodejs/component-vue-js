// 构建信息工具函数
export async function getBuildInfo() {
  try {
    const response = await fetch('/dist/build-report.json');
    if (!response.ok) {
      throw new Error('无法加载构建报告');
    }
    return await response.json();
  } catch (error) {
    console.warn('加载构建信息失败:', error.message);
    return null;
  }
}

// 获取单个组件的构建信息
export async function getComponentBuildInfo(componentName) {
  try {
    const response = await fetch(`/dist/${componentName}/build-info.json`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    return null;
  }
}

// 格式化文件大小
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 获取包类型（组件或页面）
export function getPackageType(entryPath) {
  if (entryPath.includes('/components/')) {
    return '组件';
  } else if (entryPath.includes('/pages/')) {
    return '页面';
  }
  return '未知';
}
