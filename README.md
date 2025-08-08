# rollcodejs-plugins-template

本项目是为 [RollCode](https://www.rollcode.cn/) 平台开发自定义资产（组件/页面）的 Vue 模板工程，开箱即用，支持自定义组件与页面的快速开发、调试与打包，适配 RollCode 平台资产规范。

## 特性

- 基于 Vue 3 + Vite
- 支持自定义组件、自定义页面开发
- 产物为单 JS 文件，资源全部内联，便于上传和分发(生产建议更换为链接)
- 兼容 RollCode 平台资产规范，支持 meta 配置、行为暴露、属性设置器等
- 内置开发、打包脚本，支持本地调试与热重载

---

## 目录结构

```text
rollcodejs-plugins-template/
├── lib/                  # 库文件目录
│   ├── components/       # 组件开发目录
│   │   ├── Button/       # 示例组件
│   │   │   ├── Button.vue
│   │   │   └── index.js
│   │   └── Seckill/
│   │       ├── Seckill.vue
│   │       └── index.js
│   └── pages/            # 自定义页面开发目录
│       └── Lottery/
│           ├── Lottery.vue
│           ├── index.js
│           └── assets/   # 页面用到的图片等资源
├── public/               # 公共资源目录
├── scripts/              # 构建与开发脚本
├── package.json
└── README.md
```

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 开发模式

#### 组件开发

以 `lib/components/Button` 为例，编辑 `Button.vue` 和 `index.js`，`index.js` 需导出组件和 meta 信息：

```js
export { default } from "./Button.vue";

export const meta = {
  actions: [
    {
      label: "点击",
      name: "onClick",
    },
  ],
  setters: {
    text: {
      type: "Text",
      default: "按钮",
      label: "按钮文本",
    },
  },
};
```

#### 页面开发

以 `lib/pages/Lottery` 为例，编辑 `Lottery.vue` 和 `index.js`，并可在 `assets` 目录放置页面资源。

```js
export { default } from "./Lottery.vue";

export const meta = {
  actions: [
    {
      label: "抽奖",
      name: "lottery",
      dataType: "string",
    },
  ],
};
```

### 3. 本地调试

#### 库开发模式
```bash
npm run lib:dev
```

- 所有要打包的入口文件都在 `build.config.js` 中配置, 指定 `name` 和 `path` 即可。
- 启动后会监听源码变更，自动重新打包。
- 每次构建都会生成构建信息，显示包体积大小。
- 适合开发 RollCode 插件组件和页面。

#### Vue 应用开发模式
```bash
npm run app:dev
```

- 启动 Vue 应用开发服务器
- 默认端口为 3000
- 在组件卡片上显示实时构建信息（包体积、构建时间等）
- 适合开发应用界面和功能

### 4. 打包发布

```bash
npm run lib
```

- 打包产物会输出到 `dist/` 目录下，每个资产为一个独立的 JS 文件，所有资源已 base64 内联，无需额外上传图片等资源。
- 每个包都会生成 `build-info.json` 文件，包含包体积、依赖信息等详细数据。
- 构建完成后会自动生成汇总报告 `dist/build-report.json`。

### 5. 查看构建报告

```bash
npm run build:report
```

- 显示所有包的详细构建信息，包括：
  - 包体积大小（原始大小和压缩后大小）
  - 构建时间
  - 依赖分析
  - 模块分析

---

## 资产规范说明

### 1. 组件/页面导出

每个资产需通过 `index.js` 导出主组件和 meta 信息：

```js
export { default } from "./YourComponent.vue";

export const meta = {
  actions: [
    /* 行为配置 */
  ],
  setters: {
    /* 属性设置器 */
  },
};
```

### 2. 行为（actions）

通过 meta.actions 暴露组件方法，供平台或其他组件调用。  
详见[官方文档-行为配置](https://docs.rollcode.cn/developer/develop-guide/custom-page#定义行为)。

### 3. 属性设置器（setters）

通过 meta.setters 配置属性类型、默认值、标签等，支持平台资产属性面板自动生成。  
详见[官方文档-属性设置器](https://docs.rollcode.cn/developer/develop-guide/custom-page#SetterPropsObject)。

### 4. 插槽支持

自定义页面支持 `pageRegion`、`popupRegion` 等插槽，详见[官方文档-定义插槽](https://docs.rollcode.cn/developer/develop-guide/custom-page#定义插槽)。

---

## 调试与上线流程

1. 本地开发并调试，确认无误后执行打包
2. 上传 `dist/xxx.js` 到 RollCode 平台资产管理
3. 在平台中添加新页面或组件，选择上传的 JS 文件
4. 配置属性、行为等，完成资产上线

---

## 参考文档

- [RollCode 官方开发文档](https://docs.rollcode.cn/developer/develop-guide/custom-page)
- [RollCode 组件开发模板（GitHub）](https://github.com/rollcodejs/component-vue-js)

---

如有问题欢迎提 Issue 或 PR！
