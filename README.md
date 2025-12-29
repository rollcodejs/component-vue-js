# RollCode 组件开发模板

> RollCode 低代码系统的官方组件开发模板

## 📖 简介

本项目是 RollCode 低代码平台的官方组件开发模板，用于快速创建和开发自定义组件。通过本模板，你可以轻松开发出符合 RollCode 规范的 Vue 组件。

关于 RollCode 的更多介绍，请访问 [RollCode 官网](https://www.rollcode.cn)。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

1. 启动开发服务器：

```bash
npm run lib:dev
```

2. 在另一个终端启动静态文件服务：

```bash
npm run serve
```

3. 打开 RollCode 开发控制台（可替换为自己的私有化部署地址），填入你的开发地址：

```
https://www.rollcode.cn/console/dev?extensionDevHref=http://localhost:3001
```

> 💡 提示：将 `http://localhost:3001` 替换为你实际的开发地址

## 📚 开发文档

详细的组件开发指南，请参考：

- [RollCode 自定义组件开发文档](https://docs.rollcode.cn/developer/develop-guide/custom-component)

## 📦 构建

构建生产版本：

```bash
npm run lib
```

## 📝 项目结构

```
├── lib/                    # 组件源码目录
│   ├── components/         # 组件目录
│   ├── pages/              # 页面目录
│   ├── hooks/              # 自定义 Hooks
│   ├── types/              # 类型定义
│   └── utils/              # 工具函数
├── dist/                   # 构建输出目录
├── scripts/                # 构建脚本
└── package.json
```

## 🔗 相关链接

- [RollCode 官网](https://www.rollcode.cn)
- [RollCode 开发文档](https://docs.rollcode.cn)
- [组件开发指南](https://docs.rollcode.cn/developer/develop-guide/custom-component)

## 📄 许可证

ISC

