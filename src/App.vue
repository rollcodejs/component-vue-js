<template>
  <div class="app">
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <img src="/logo.svg" alt="RollCode" />
          <span class="logo-text">RollCode</span>
        </div>
        <h1 class="title">插件开发平台</h1>
        <p class="subtitle">快速构建您的自定义组件和页面</p>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <!-- 组件部分 -->
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">
              <span class="icon">🧩</span>
              组件库
            </h2>
            <p class="section-desc">在 lib/components 目录下开发的组件</p>
          </div>

          <div class="cards-grid">
            <div
              v-for="component in components"
              :key="component.name"
              class="card"
              @click="showCode(component)"
            >
              <div class="card-header">
                <div class="card-icon">🧩</div>
                <div class="card-title-section">
                  <h3 class="card-title">{{ component.name }}</h3>
                  <div class="card-build-info" v-if="component.buildInfo">
                    <span class="build-size">{{
                      formatFileSize(component.buildInfo.output.size)
                    }}</span>
                    <span class="build-gzip"
                      >({{
                        formatFileSize(component.buildInfo.output.gzippedSize)
                      }}
                      gzipped)</span
                    >
                  </div>
                </div>
              </div>
              <div class="card-content">
                <p class="card-desc">{{ component.description }}</p>
                <div class="card-meta">
                  <span class="meta-item">类型: 组件</span>
                  <span class="meta-item">路径: {{ component.path }}</span>
                  <span class="meta-item" v-if="component.buildInfo">
                    构建时间:
                    {{ formatBuildTime(component.buildInfo.buildTime) }}
                  </span>
                  <span
                    class="meta-item"
                    v-if="
                      component.buildInfo &&
                      component.buildInfo.dependencies.length > 0
                    "
                  >
                    生产依赖: {{ component.buildInfo.dependencies.join(", ") }}
                  </span>
                </div>
              </div>
              <div class="card-footer">
                <span class="view-code">查看代码 →</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 页面部分 -->
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">
              <span class="icon">📄</span>
              页面库
            </h2>
            <p class="section-desc">在 lib/pages 目录下开发的页面</p>
          </div>

          <div class="cards-grid">
            <div
              v-for="page in pages"
              :key="page.name"
              class="card"
              @click="showCode(page)"
            >
              <div class="card-header">
                <div class="card-icon">📄</div>
                <div class="card-title-section">
                  <h3 class="card-title">{{ page.name }}</h3>
                  <div class="card-build-info" v-if="page.buildInfo">
                    <span class="build-size">{{
                      formatFileSize(page.buildInfo.output.size)
                    }}</span>
                    <span class="build-gzip"
                      >({{
                        formatFileSize(page.buildInfo.output.gzippedSize)
                      }}
                      gzipped)</span
                    >
                  </div>
                </div>
              </div>
              <div class="card-content">
                <p class="card-desc">{{ page.description }}</p>
                <div class="card-meta">
                  <span class="meta-item">类型: 页面</span>
                  <span class="meta-item">路径: {{ page.path }}</span>
                  <span class="meta-item" v-if="page.buildInfo">
                    构建时间: {{ formatBuildTime(page.buildInfo.buildTime) }}
                  </span>
                  <span
                    class="meta-item"
                    v-if="
                      page.buildInfo && page.buildInfo.dependencies.length > 0
                    "
                  >
                    生产依赖: {{ page.buildInfo.dependencies.join(", ") }}
                  </span>
                </div>
              </div>
              <div class="card-footer">
                <span class="view-code">查看代码 →</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 构建信息 -->
        <section class="section" v-if="buildInfo">
          <div class="section-header">
            <h2 class="section-title">
              <span class="icon">📊</span>
              构建统计
            </h2>
            <p class="section-desc">最新的构建统计信息</p>
          </div>

          <div class="build-summary">
            <div class="summary-card">
              <div class="summary-number">
                {{ buildInfo.summary.totalPackages }}
              </div>
              <div class="summary-label">总包数</div>
            </div>
            <div class="summary-card">
              <div class="summary-number">
                {{ formatFileSize(buildInfo.summary.totalSize) }}
              </div>
              <div class="summary-label">总大小</div>
            </div>
            <div class="summary-card">
              <div class="summary-number">
                {{ formatFileSize(buildInfo.summary.totalGzippedSize) }}
              </div>
              <div class="summary-label">压缩大小</div>
            </div>
          </div>
        </section>

        <!-- 开发命令 -->
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">
              <span class="icon">⚡</span>
              开发命令
            </h2>
          </div>

          <div class="commands">
            <div class="command-item">
              <div class="command-header">
                <span class="command-name">npm run lib:dev</span>
                <span class="command-tag">开发模式</span>
              </div>
              <p class="command-desc">监听文件变化并自动重新构建组件和页面</p>
            </div>

            <div class="command-item">
              <div class="command-header">
                <span class="command-name">npm run lib</span>
                <span class="command-tag">生产构建</span>
              </div>
              <p class="command-desc">生产模式构建，输出到 dist 目录</p>
            </div>

            <div class="command-item">
              <div class="command-header">
                <span class="command-name">npm run app:dev</span>
                <span class="command-tag">应用开发</span>
              </div>
              <p class="command-desc">启动 Vue 应用开发服务器</p>
            </div>

            <div class="command-item">
              <div class="command-header">
                <span class="command-name">npm run build:report</span>
                <span class="command-tag">构建报告</span>
              </div>
              <p class="command-desc">查看详细的构建信息和包分析</p>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- 代码预览模态框 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ selectedItem?.name }}</h3>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
        <div class="modal-content">
          <div class="code-tabs">
            <button
              v-for="file in selectedItem?.files"
              :key="file.name"
              class="tab-button"
              :class="{ active: activeTab === file.name }"
              @click="activeTab = file.name"
            >
              {{ file.name }}
            </button>
          </div>
          <div class="code-content">
            <pre class="code-block"><code>{{ getCurrentCode() }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  getBuildInfo,
  getComponentBuildInfo,
  formatFileSize,
  getPackageType,
} from "./utils/buildInfo.js";

export default {
  name: "App",
  setup() {
    const showModal = ref(false);
    const selectedItem = ref(null);
    const activeTab = ref("");
    const buildInfo = ref(null);

    const components = ref([
      {
        name: "Button",
        description: "一个可自定义的按钮组件，支持文本、颜色和动画效果",
        path: "lib/components/Button",
        buildInfo: null,
        files: [
          { name: "Button.vue", content: "// Button 组件代码" },
          { name: "index.js", content: "// Button 导出配置" },
        ],
      },
      {
        name: "Seckill",
        description: "秒杀活动组件，支持倒计时和商品展示",
        path: "lib/components/Seckill",
        buildInfo: null,
        files: [
          { name: "Seckill.vue", content: "// Seckill 组件代码" },
          { name: "index.js", content: "// Seckill 导出配置" },
        ],
      },
      {
        name: "ComponentExample",
        description: "组件开发示例，展示基本的组件结构",
        path: "lib/components/ComponentExample",
        buildInfo: null,
        files: [
          {
            name: "ComponentExample.vue",
            content: "// ComponentExample 组件代码",
          },
          { name: "index.js", content: "// ComponentExample 导出配置" },
        ],
      },
    ]);

    const pages = ref([
      {
        name: "Lottery",
        description: "抽奖页面，支持多种奖品和抽奖动画",
        path: "lib/pages/Lottery",
        buildInfo: null,
        files: [
          { name: "Lottery.vue", content: "// Lottery 页面代码" },
          { name: "index.js", content: "// Lottery 导出配置" },
        ],
      },
      {
        name: "PageExample",
        description: "页面开发示例，展示基本的页面结构",
        path: "lib/pages/PageExample",
        buildInfo: null,
        files: [
          { name: "PageExample.vue", content: "// PageExample 页面代码" },
          { name: "index.js", content: "// PageExample 导出配置" },
        ],
      },
    ]);

    const showCode = (item) => {
      selectedItem.value = item;
      activeTab.value = item.files[0]?.name || "";
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedItem.value = null;
    };

    const getCurrentCode = () => {
      if (!selectedItem.value || !activeTab.value) return "";
      const file = selectedItem.value.files.find(
        (f) => f.name === activeTab.value
      );
      return file?.content || "";
    };

    // 格式化构建时间
    const formatBuildTime = (timeString) => {
      return new Date(timeString).toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    // 加载构建信息
    const loadBuildInfo = async () => {
      const info = await getBuildInfo();
      buildInfo.value = info;
    };

    // 加载每个组件的构建信息
    const loadComponentBuildInfo = async () => {
      // 加载组件构建信息
      for (const component of components.value) {
        const info = await getComponentBuildInfo(component.name);
        component.buildInfo = info;
      }

      // 加载页面构建信息
      for (const page of pages.value) {
        const info = await getComponentBuildInfo(page.name);
        page.buildInfo = info;
      }
    };

    onMounted(async () => {
      await Promise.all([loadBuildInfo(), loadComponentBuildInfo()]);
    });

    return {
      components,
      pages,
      showModal,
      selectedItem,
      activeTab,
      showCode,
      closeModal,
      getCurrentCode,
      buildInfo,
      formatFileSize,
      getPackageType,
      formatBuildTime,
    };
  },
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.logo img {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.main {
  padding: 3rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section {
  margin-bottom: 3rem;
}

.section-header {
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.5rem 0;
}

.icon {
  font-size: 1.5rem;
}

.section-desc {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  height: 280px; /* 固定卡片高度 */
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 1);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.card-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  color: white;
  flex-shrink: 0;
}

.card-title-section {
  flex: 1;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.card-build-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.build-size {
  color: #667eea;
  font-weight: 600;
}

.build-gzip {
  color: #666;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.card-desc {
  color: #666;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  flex-shrink: 0;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.meta-item {
  font-size: 0.875rem;
  color: #888;
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: "Monaco", "Menlo", monospace;
}

.card-footer {
  border-top: 1px solid #eee;
  padding-top: 1rem;
  flex-shrink: 0;
}

.view-code {
  color: #667eea;
  font-weight: 500;
  font-size: 0.875rem;
}

.commands {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.command-item {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.command-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.command-name {
  font-family: "Monaco", "Menlo", monospace;
  font-weight: 600;
  color: #333;
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.command-tag {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.command-desc {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

/* 构建信息样式 */
.build-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.summary-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.summary-label {
  font-size: 0.875rem;
  color: #666;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.modal-close:hover {
  background: #eee;
}

.modal-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.code-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
}

.tab-button {
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #666;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab-button.active {
  color: #667eea;
  border-bottom-color: #667eea;
  background: white;
}

.tab-button:hover {
  background: rgba(102, 126, 234, 0.1);
}

.code-content {
  flex: 1;
  overflow: auto;
  padding: 1rem;
}

.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1rem;
  border-radius: 6px;
  margin: 0;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .commands {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 2rem;
  }

  .container {
    padding: 0 1rem;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .card {
    height: auto;
    min-height: 280px;
  }
}
</style>
