<template>
  <div class="app">
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <div class="logo-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="logo-text">ROLLCODE</span>
        </div>
        <div class="header-badge">
          <span class="badge-text">READY FOR 1.0</span>
          <div class="badge-dot"></div>
        </div>
      </div>
    </header>

    <main class="main">
      <!-- 英雄区域 - 真正的通栏 -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">RollCode 插件开发平台</h1>
          <p class="hero-subtitle">
            快速构建您的自定义组件和页面，让开发更高效
          </p>
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="stat-number">5</div>
              <div class="stat-label">组件库</div>
            </div>
            <div class="hero-stat">
              <div class="stat-number">2</div>
              <div class="stat-label">页面模板</div>
            </div>
            <div class="hero-stat">
              <div class="stat-number">100%</div>
              <div class="stat-label">兼容SSG</div>
            </div>
          </div>
        </div>
      </section>

      <div class="container">
        <!-- 组件部分 -->
        <section class="section">
          <div class="section-header">
            <h2 class="section-title">
              <svg
                class="icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg>
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
                <div class="card-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
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
              <svg
                class="icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 2V8H20"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 13H8"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 17H8"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 9H8"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
                <div class="card-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 2V8H20"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 13H8"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 17H8"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 9H8"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
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
              <svg
                class="icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3V21H21"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 9L12 6L16 10L20 6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
              <svg
                class="icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
            <div class="code-header">
              <span class="file-path">{{ getCurrentFilePath() }}</span>
              <div class="code-actions">
                <span class="file-info" v-if="getCurrentFileInfo()">
                  {{ getCurrentFileInfo() }}
                </span>
                <button class="copy-btn" @click="copyCode" title="复制代码">
                  📋
                </button>
              </div>
            </div>
            <div class="code-block-wrapper">
              <pre
                class="code-block"
              ><code class="hljs" :class="getCodeLanguage()" v-html="highlightedCode"></code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from "vue";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import lessLang from "highlight.js/lib/languages/less";
import jsonLang from "highlight.js/lib/languages/json";
import markdownLang from "highlight.js/lib/languages/markdown";
import {
  getBuildInfo,
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

    const components = ref([]);

    const pages = ref([]);

    // 自动发现 lib 目录下的组件与页面
    const loadDiscoveredData = async () => {
      try {
        const response = await fetch('/discovered.json');
        if (!response.ok) {
          throw new Error('无法加载发现数据');
        }
        const data = await response.json();
        components.value = data.components || [];
        pages.value = data.pages || [];
      } catch (error) {
        console.warn('加载发现数据失败:', error.message);
        // 降级到空数组
        components.value = [];
        pages.value = [];
      }
    };

    // 注册 highlight.js 语言（将 vue 映射为 xml/html 高亮）
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("xml", xml);
    hljs.registerLanguage("html", xml);
    hljs.registerLanguage("vue", xml);
    hljs.registerLanguage("css", css);
    hljs.registerLanguage("less", lessLang);
    hljs.registerLanguage("json", jsonLang);
    hljs.registerLanguage("markdown", markdownLang);

    const getHighlightLanguage = () => {
      if (!activeTab.value) return "plaintext";
      const extension = activeTab.value.split(".").pop();
      const map = {
        vue: "xml",
        js: "javascript",
        ts: "typescript",
        html: "xml",
        css: "css",
        less: "less",
        scss: "css",
        json: "json",
        md: "markdown",
      };
      return map[extension] || "plaintext";
    };

    const highlightedCode = ref("");

    const recomputeHighlight = async () => {
      await nextTick();
      const code = getCurrentCode();
      const lang = getHighlightLanguage();
      try {
        if (lang === "plaintext") {
          highlightedCode.value = hljs.highlightAuto(code).value;
        } else {
          highlightedCode.value = hljs.highlight(code, {
            language: lang,
          }).value;
        }
      } catch (e) {
        highlightedCode.value = hljs.highlightAuto(code).value;
      }
    };

    const showCode = async (item) => {
      selectedItem.value = item;
      activeTab.value = item.files[0]?.name || "";
      showModal.value = true;

      // 重置文件内容
      for (const file of item.files) {
        file.content = "// 正在加载代码...";
      }

      // 动态加载文件内容
      await loadFileContents(item);
      await recomputeHighlight();
    };

    const closeModal = () => {
      showModal.value = false;
      selectedItem.value = null;
    };

    // 动态加载文件内容
    const loadFileContents = async (item) => {
      try {
        for (const file of item.files) {
          try {
            // 使用 Vite 的 ?raw 查询参数来加载原始文件内容
            const response = await fetch(`/${file.path}?raw`);
            if (response.ok) {
              file.content = await response.text();
            } else {
              // 如果 ?raw 失败，尝试直接加载
              const rawResponse = await fetch(`/${file.path}`);
              if (rawResponse.ok) {
                file.content = await rawResponse.text();
              } else {
                file.content = `// 无法加载文件: ${file.path}\n// 错误: ${response.status} ${response.statusText}\n\n请确保文件路径正确且文件存在。`;
              }
            }
          } catch (fileError) {
            console.error(`加载文件 ${file.path} 失败:`, fileError);
            file.content = `// 加载文件失败: ${file.path}\n// 错误: ${fileError.message}\n\n请检查文件路径和网络连接。`;
          }
        }
        await recomputeHighlight();
      } catch (error) {
        console.error("加载文件内容失败:", error);
        for (const file of item.files) {
          file.content = `// 加载文件失败: ${file.path}\n// 错误: ${error.message}\n\n请检查开发服务器是否正常运行。`;
        }
        await recomputeHighlight();
      }
    };

    const getCurrentCode = () => {
      if (!selectedItem.value || !activeTab.value) return "";
      const file = selectedItem.value.files.find(
        (f) => f.name === activeTab.value
      );
      return file?.content || "// 正在加载代码...";
    };

    // 获取当前文件路径
    const getCurrentFilePath = () => {
      if (!selectedItem.value || !activeTab.value) return "";
      const file = selectedItem.value.files.find(
        (f) => f.name === activeTab.value
      );
      return file?.path || "";
    };

    // 获取当前文件信息
    const getCurrentFileInfo = () => {
      if (!selectedItem.value || !activeTab.value) return "";
      const file = selectedItem.value.files.find(
        (f) => f.name === activeTab.value
      );
      if (!file) return "";

      if (file.content && file.content.startsWith("// 正在加载代码...")) {
        return "🔄 加载中...";
      } else if (
        (file.content && file.content.startsWith("// 无法加载文件")) ||
        file.content.startsWith("// 加载文件失败")
      ) {
        return "❌ 加载失败";
      } else if (file.content) {
        const lines = file.content.split("\n").length;
        const size = new Blob([file.content]).size;
        return `📄 ${lines} 行 | ${formatFileSize(size)}`;
      }
      return "";
    };

    // 获取代码语言类型
    const getCodeLanguage = () => {
      if (!activeTab.value) return "";
      const extension = activeTab.value.split(".").pop();
      const languageMap = {
        vue: "language-vue",
        js: "language-javascript",
        ts: "language-typescript",
        html: "language-html",
        css: "language-css",
        less: "language-less",
        scss: "language-scss",
        json: "language-json",
        md: "language-markdown",
      };
      return languageMap[extension] || "language-plaintext";
    };

    // 复制代码到剪贴板
    const copyCode = async () => {
      const code = getCurrentCode();
      try {
        await navigator.clipboard.writeText(code);
        // 可以添加一个临时的成功提示
        const copyBtn = document.querySelector(".copy-btn");
        if (copyBtn) {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = "✅";
          copyBtn.style.background = "#10b981";
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = "#667eea";
          }, 2000);
        }
      } catch (err) {
        console.error("复制失败:", err);
        // 降级方案：使用传统的复制方法
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
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

    // 从汇总报告分发构建信息到各个项
    const populateItemBuildInfo = () => {
      if (!buildInfo.value || !buildInfo.value.packages) return;
      const byName = new Map(
        buildInfo.value.packages.map((p) => [p.name, p])
      );
      for (const component of components.value) {
        component.buildInfo = byName.get(component.name) || null;
      }
      for (const page of pages.value) {
        page.buildInfo = byName.get(page.name) || null;
      }
    };

    onMounted(async () => {
      await loadDiscoveredData();
      await loadBuildInfo();
      populateItemBuildInfo();
    });

    watch(activeTab, async () => {
      await recomputeHighlight();
    });

    watch(showModal, async (visible) => {
      if (visible) {
        await recomputeHighlight();
      }
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
      getCurrentFilePath,
      getCurrentFileInfo,
      getCodeLanguage,
      copyCode,
      buildInfo,
      formatFileSize,
      getPackageType,
      formatBuildTime,
      highlightedCode,
    };
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
.app {
  min-height: 100vh;
  background: #f8fafc; /* NEUTRAL 50 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 英雄区域 - 真正的通栏设计 */
.hero-section {
  background: radial-gradient(
    circle,
    rgb(70 192 255) 0%,
    rgb(105, 167, 255) 100%
  );
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1rem;
  }
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem; /* text-5xl */
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem; /* text-3xl */
  }
}

.hero-subtitle {
  font-size: 1.25rem; /* text-xl */
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 3rem 0;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero-stats {
    gap: 1.5rem;
  }
}

.hero-stat {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem; /* text-4xl */
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: 1rem; /* text-large */
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.header {
  background: #ffffff; /* WHITE */
  border-bottom: 1px solid #e5e7eb; /* NEUTRAL 200 */
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, rgb(70 192 255), rgb(105, 167, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.25rem; /* text-xl */
  font-weight: 700;
  color: #111827; /* NEUTRAL 900 */
  letter-spacing: -0.025em;
}

.header-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6; /* NEUTRAL 100 */
  padding: 0.5rem 1rem;
  border-radius: 20px; /* rounded-full */
  border: 1px solid #e5e7eb; /* NEUTRAL 200 */
}

.badge-text {
  font-size: 0.875rem; /* text-sm */
  font-weight: 600;
  color: #6b7280; /* NEUTRAL 500 */
  letter-spacing: 0.025em;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #1cb29f; /* TEAL 600 */
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.main {
  padding: 0;
  position: relative;
  z-index: 5;
}

.container {
  width: 100%;
  padding: 0;
}

.section {
  margin-bottom: 0;
  padding: 5rem 2rem;
  position: relative;
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 1rem;
  }
}

.section:nth-child(odd) {
  background: #ffffff; /* WHITE */
}

.section:nth-child(even) {
  background: #f8fafc; /* NEUTRAL 50 */
}

.section-header {
  margin-bottom: 2.5rem;
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.875rem; /* text-3xl */
  font-weight: 600;
  color: #111827; /* NEUTRAL 900 */
  margin: 0 0 0.75rem 0;
  line-height: 2.25rem; /* 36px */
}

.icon {
  width: 20px;
  height: 20px;
  color: #6b7280; /* NEUTRAL 500 */
}

.section-desc {
  color: #6b7280; /* NEUTRAL 500 */
  margin: 0;
  font-size: 1rem; /* text-large */
  line-height: 1.5rem; /* 24px */
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.card {
  background: #ffffff; /* WHITE */
  border-radius: 12px; /* rounded-xl */
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e5e7eb; /* NEUTRAL 200 */
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* shadow-sm */
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    rgb(70 192 255),
    rgb(105, 167, 255),
    rgb(135, 200, 255)
  );
  opacity: 0;
  transition: opacity 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* shadow-lg */
  border-color: #d1d5db; /* NEUTRAL 300 */
}

.card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-shrink: 0;
}

.card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(70, 192, 255, 0.1), rgba(105, 167, 255, 0.1));
  border: 1px solid rgba(70, 192, 255, 0.2);
  border-radius: 8px; /* rounded-lg */
  background: linear-gradient(135deg, rgb(70 192 255), rgb(105, 167, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex-shrink: 0;
}

.card-title-section {
  flex: 1;
}

.card-title {
  font-size: 1.125rem; /* text-xl */
  font-weight: 600;
  color: #111827; /* NEUTRAL 900 */
  margin: 0 0 0.5rem 0;
  line-height: 1.75rem; /* 28px */
}

.card-build-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem; /* text-xs */
  flex-wrap: wrap;
}

.build-size {
  color: #0e9080; /* TEAL 700 */
  font-weight: 600;
  background: #ecfffc; /* TEAL 100 */
  padding: 0.125rem 0.375rem;
  border-radius: 4px; /* rounded */
  border: 1px solid #ecfffc; /* TEAL 100 */
}

.build-gzip {
  color: #6b7280; /* NEUTRAL 500 */
  background: #f9fafb; /* NEUTRAL 50 */
  padding: 0.125rem 0.375rem;
  border-radius: 4px; /* rounded */
  border: 1px solid #f3f4f6; /* NEUTRAL 100 */
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
}

.card-desc {
  color: #6b7280; /* NEUTRAL 500 */
  line-height: 1.6;
  margin: 0 0 1rem 0;
  flex-shrink: 0;
  font-size: 0.875rem; /* text-sm */
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.meta-item {
  font-size: 0.75rem; /* text-xs */
  color: #6b7280; /* NEUTRAL 500 */
  background: #f8fafc; /* NEUTRAL 50 */
  padding: 0.375rem 0.75rem;
  border-radius: 6px; /* rounded-md */
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  border: 1px solid #e2e8f0; /* NEUTRAL 200 */
  line-height: 1.4;
}

.card-footer {
  border-top: 1px solid #f1f5f9; /* NEUTRAL 100 */
  padding-top: 1rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.view-code {
  background: linear-gradient(135deg, rgb(70 192 255), rgb(105, 167, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 500;
  font-size: 0.875rem; /* text-sm */
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
}

.view-code::after {
  content: "→";
  transition: transform 0.2s ease;
}

.card:hover .view-code::after {
  transform: translateX(2px);
}

.commands {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .commands {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.command-item {
  background: #ffffff; /* WHITE */
  border-radius: 12px; /* rounded-xl */
  padding: 1.5rem;
  border: 1px solid #e5e7eb; /* NEUTRAL 200 */
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* shadow-sm */
}

.command-item:hover {
  border-color: #d1d5db; /* NEUTRAL 300 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
}

.command-header {
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.command-name {
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  font-weight: 600;
  color: #111827; /* NEUTRAL 900 */
  background: #f8fafc; /* NEUTRAL 50 */
  padding: 0.375rem 0.75rem;
  border-radius: 6px; /* rounded-md */
  border: 1px solid #e2e8f0; /* NEUTRAL 200 */
  font-size: 0.875rem; /* text-sm */
  display: block;
}

.command-tag {
  display: inline-block;
  background: linear-gradient(135deg, rgb(70 192 255), rgb(105, 167, 255));
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px; /* rounded-xl */
  font-size: 0.75rem; /* text-xs */
  font-weight: 500;
  letter-spacing: 0.025em;
  margin-top: 0.5em;
}

.command-desc {
  color: #6b7280; /* NEUTRAL 500 */
  margin: 0;
  line-height: 1.6;
  font-size: 0.875rem; /* text-sm */
}

/* 构建信息样式 */
.build-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .build-summary {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
}

.summary-card {
  background: #ffffff; /* WHITE */
  border-radius: 12px; /* rounded-xl */
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #e5e7eb; /* NEUTRAL 200 */
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* shadow-sm */
}

.summary-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, rgb(70 192 255), rgb(105, 167, 255));
}

.summary-card:hover {
  border-color: #d1d5db; /* NEUTRAL 300 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
}

.summary-number {
  font-size: 1.75rem; /* text-2xl */
  font-weight: 700;
  color: #111827; /* NEUTRAL 900 */
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.summary-label {
  font-size: 0.875rem; /* text-sm */
  color: #6b7280; /* NEUTRAL 500 */
  font-weight: 500;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal {
  background: #ffffff; /* WHITE */
  border-radius: 16px; /* rounded-2xl */
  width: 100%;
  max-width: 1000px;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25); /* shadow-2xl */
  border: 1px solid #e5e7eb; /* NEUTRAL 200 */
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb; /* NEUTRAL 200 */
  background: #f8fafc; /* NEUTRAL 50 */
}

.modal-title {
  margin: 0;
  font-size: 1.125rem; /* text-xl */
  font-weight: 600;
  color: #111827; /* NEUTRAL 900 */
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-title::before {
  content: "";
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, rgb(70 192 255), rgb(105, 167, 255));
  border-radius: 4px; /* rounded */
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-title::after {
  content: "📁";
  font-size: 0.875rem; /* text-sm */
  position: absolute;
  margin-left: 2px;
  margin-top: 2px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.25rem; /* text-xl */
  cursor: pointer;
  color: #6b7280; /* NEUTRAL 500 */
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px; /* rounded-lg */
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #e5e7eb; /* NEUTRAL 200 */
  color: #374151; /* NEUTRAL 700 */
}

.modal-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.code-tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb; /* NEUTRAL 200 */
  background: #f8fafc; /* NEUTRAL 50 */
  overflow-x: auto;
}

.tab-button {
  background: none;
  border: none;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  font-size: 0.875rem; /* text-sm */
  color: #6b7280; /* NEUTRAL 500 */
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  font-weight: 500;
  position: relative;
}

.tab-button.active {
  background: linear-gradient(135deg, rgb(70 192 255), rgb(105, 167, 255));
  -webkit-background-clip: text;
  background-clip: text;
  border-bottom-color: rgb(70 192 255);
  background: #ffffff; /* WHITE */
  font-weight: 600;
}

.tab-button:hover {
  background: rgba(70, 192, 255, 0.05);
  background: linear-gradient(135deg, rgb(70 192 255), rgb(105, 167, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.code-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-height: 0; /* 确保flex子元素能正确收缩 */
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background: #f8fafc; /* NEUTRAL 50 */
  border-radius: 8px; /* rounded-lg */
  border: 1px solid #e5e7eb; /* NEUTRAL 200 */
  flex-shrink: 0;
}

.file-path {
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  font-size: 0.875rem; /* text-sm */
  color: #374151; /* NEUTRAL 700 */
  flex-grow: 1;
  margin-right: 1rem;
  padding: 0.375rem 0.75rem;
  background: #ffffff; /* WHITE */
  border-radius: 6px; /* rounded-md */
  border: 1px solid #d1d5db; /* NEUTRAL 300 */
}

.code-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.file-info {
  font-size: 0.75rem; /* text-xs */
  color: #6b7280; /* NEUTRAL 500 */
  background: #f3f4f6; /* NEUTRAL 100 */
  padding: 0.375rem 0.75rem;
  border-radius: 6px; /* rounded-md */
  border: 1px solid #e5e7eb; /* NEUTRAL 200 */
  white-space: nowrap;
  font-weight: 500;
}

.copy-btn {
  background: linear-gradient(135deg, rgb(70 192 255), rgb(105, 167, 255));
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px; /* rounded-lg */
  cursor: pointer;
  font-size: 0.875rem; /* text-sm */
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  min-width: 60px;
  gap: 0.25rem;
}

.copy-btn:hover {
  background: linear-gradient(135deg, rgb(50, 150, 220), rgb(85, 140, 220));
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(70, 192, 255, 0.3);
}

.code-block-wrapper {
  flex: 1;
  overflow: hidden;
  border-radius: 12px; /* rounded-xl */
  border: 1px solid #e5e7eb; /* NEUTRAL 200 */
  background: #1f2937; /* NEUTRAL 800 */
  min-height: 0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* shadow-inner */
}

.code-block {
  background: #1f2937; /* NEUTRAL 800 */
  color: #e5e7eb; /* NEUTRAL 200 */
  padding: 1.25rem;
  border-radius: 0;
  margin: 0;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  font-size: 0.875rem; /* text-sm */
  line-height: 1.7;
  overflow: auto;
  white-space: pre;
  height: 100%;
  border: none;
  min-height: 400px;
  max-height: 600px;
}

.code-block::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.code-block::-webkit-scrollbar-track {
  background: #374151; /* NEUTRAL 700 */
  border-radius: 4px; /* rounded */
}

.code-block::-webkit-scrollbar-thumb {
  background: #6b7280; /* NEUTRAL 500 */
  border-radius: 4px; /* rounded */
}

.code-block::-webkit-scrollbar-thumb:hover {
  background: #9ca3af; /* NEUTRAL 400 */
}

.code-block pre {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
}

.code-block code {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  white-space: pre;
  word-break: normal;
  word-wrap: normal;
  color: inherit;
}

.code-block .hljs {
  padding: 0.5rem 1rem;
  border-radius: 0;
  background: #1f2937;
  color: #e5e7eb;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
}

/* 改进的语法高亮颜色方案 */
.code-block .hljs-keyword {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-string {
  color: #f1fa8c; /* 更亮的黄色 */
}
.code-block .hljs-number {
  color: #bd93f9; /* 更亮的紫色 */
}
.code-block .hljs-function {
  color: #8be9fd; /* 更亮的青色 */
}
.code-block .hljs-comment {
  color: #6272a4; /* 更柔和的蓝色 */
  font-style: italic;
}
.code-block .hljs-variable {
  color: #f8f8f2; /* 更亮的白色 */
}
.code-block .hljs-attribute {
  color: #50fa7b; /* 更亮的绿色 */
}
.code-block .hljs-tag {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-selector-tag {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-built_in {
  color: #8be9fd; /* 更亮的青色 */
}
.code-block .hljs-preprocessor {
  color: #8be9fd; /* 更亮的青色 */
}
.code-block .hljs-doctype {
  color: #8be9fd; /* 更亮的青色 */
}
.code-block .hljs-entity {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-url {
  color: #8be9fd; /* 更亮的青色 */
}
.code-block .hljs-regexp {
  color: #f1fa8c; /* 更亮的黄色 */
}
.code-block .hljs-symbol {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-bullet {
  color: #bd93f9; /* 更亮的紫色 */
}
.code-block .hljs-code {
  color: #f8f8f2; /* 更亮的白色 */
}
.code-block .hljs-title {
  color: #8be9fd; /* 更亮的青色 */
}
.code-block .hljs-section {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-name {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-selector-id {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-selector-class {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-quote {
  color: #f1fa8c; /* 更亮的黄色 */
}
.code-block .hljs-template-tag {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-deletion {
  color: #ff5555; /* 更亮的红色 */
}
.code-block .hljs-addition {
  color: #50fa7b; /* 更亮的绿色 */
}
.code-block .hljs-emphasis {
  font-style: italic;
  color: #f8f8f2; /* 更亮的白色 */
}
.code-block .hljs-strong {
  font-weight: bold;
  color: #f8f8f2; /* 更亮的白色 */
}

/* Vue 特定的语法高亮 */
.code-block .hljs-template {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-attr {
  color: #50fa7b; /* 更亮的绿色 */
}
.code-block .hljs-literal {
  color: #bd93f9; /* 更亮的紫色 */
}
.code-block .hljs-params {
  color: #f8f8f2; /* 更亮的白色 */
}
.code-block .hljs-property {
  color: #8be9fd; /* 更亮的青色 */
}
.code-block .hljs-meta {
  color: #6272a4; /* 更柔和的蓝色 */
}
.code-block .hljs-punctuation {
  color: #f8f8f2; /* 更亮的白色 */
}
.code-block .hljs-operator {
  color: #ff79c6; /* 更鲜艳的粉色 */
}
.code-block .hljs-namespace {
  color: #8be9fd; /* 更亮的青色 */
}
.code-block .hljs-type {
  color: #8be9fd; /* 更亮的青色 */
}
.code-block .hljs-class {
  color: #8be9fd; /* 更亮的青色 */
}
.code-block .hljs-constant {
  color: #bd93f9; /* 更亮的紫色 */
}
.code-block .hljs-imports {
  color: #8be9fd; /* 更亮的青色 */
}
.code-block .hljs-exports {
  color: #8be9fd; /* 更亮的青色 */
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

  .modal {
    max-width: 100%;
    max-height: 90vh;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.1rem;
  }

  .code-tabs {
    overflow-x: auto;
    padding: 0 0.5rem;
  }

  .tab-button {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .code-content {
    padding: 0.5rem;
  }

  .code-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .file-path {
    margin-right: 0;
    width: 100%;
    font-size: 0.8rem;
  }

  .code-block {
    min-height: 300px;
    max-height: 400px;
    font-size: 0.8rem;
    padding: 0.75rem;
  }

  .card {
    height: auto;
    min-height: 280px;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .modal {
    max-height: 95vh;
  }

  .code-content {
    padding: 0.25rem;
  }

  .code-block {
    min-height: 250px;
    max-height: 350px;
    font-size: 0.75rem;
    padding: 0.5rem;
  }

  .code-header {
    padding: 0.5rem;
  }

  .file-path {
    font-size: 0.75rem;
  }

  .file-info {
    font-size: 0.7rem;
  }
}
</style>

<!-- 将语法高亮颜色放到全局，避免 scoped 作用域导致不生效 -->
<style>
/* 基础 */
.code-block .hljs {
  background: #1f2937;
  color: #e5e7eb;
} /* NEUTRAL 800, NEUTRAL 200 */

/* 关键字与常见 token */
.code-block .hljs-keyword {
  color: #ff5f82;
} /* ROSE 400 */
.code-block .hljs-string {
  color: #f59e0b;
} /* AMBER 400 */
.code-block .hljs-number {
  color: rgb(135, 200, 255);
} /* 新的蓝色调 */
.code-block .hljs-function,
.code-block .hljs-title {
  color: rgb(105, 167, 255);
} /* 新的蓝色调 */
.code-block .hljs-comment {
  color: #9ca3af;
  font-style: italic;
} /* NEUTRAL 400 */
.code-block .hljs-variable,
.code-block .hljs-params,
.code-block .hljs-code {
  color: #e5e7eb;
} /* NEUTRAL 200 */
.code-block .hljs-attribute,
.code-block .hljs-attr {
  color: #1cb29f;
} /* TEAL 600 */
.code-block .hljs-tag,
.code-block .hljs-selector-tag,
.code-block .hljs-name,
.code-block .hljs-operator {
  color: #ff5f82;
} /* ROSE 400 */
.code-block .hljs-built_in,
.code-block .hljs-type,
.code-block .hljs-class,
.code-block .hljs-namespace,
.code-block .hljs-property {
  color: rgb(105, 167, 255);
} /* 新的蓝色调 */
.code-block .hljs-literal,
.code-block .hljs-bullet {
  color: rgb(135, 200, 255);
} /* 新的蓝色调 */
.code-block .hljs-regexp {
  color: #f59e0b;
} /* AMBER 400 */
.code-block .hljs-entity,
.code-block .hljs-url,
.code-block .hljs-preprocessor,
.code-block .hljs-doctype {
  color: rgb(105, 167, 255);
} /* 新的蓝色调 */
.code-block .hljs-quote {
  color: #f59e0b;
} /* AMBER 400 */
.code-block .hljs-deletion {
  color: #e11d48;
} /* ROSE 600 */
.code-block .hljs-addition {
  color: #1cb29f;
} /* TEAL 600 */
.code-block .hljs-emphasis {
  font-style: italic;
  color: #e5e7eb;
} /* NEUTRAL 200 */
.code-block .hljs-strong {
  font-weight: 700;
  color: #e5e7eb;
} /* NEUTRAL 200 */
</style>
