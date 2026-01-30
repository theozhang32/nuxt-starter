# Nuxt4 基础脚手架

## 技术栈

- [Nuxt4生态](https://nuxt.com/)
- [NuxtUI](https://ui.nuxt.com/) + Tailwind4
- npm包管理采用[pnpm catalog](https://antfu.me/posts/categorize-deps)

## 开发

![](https://img.shields.io/badge/node->=22-green)

```bash
pnpm install
pnpm dev
# see at localhost:3000

# 安装新包
# pkg-name 包名
# pkg-type 包分类 @see /pnpm-workspace.yaml
pnpm add pkg-name -w [-D] --save-catalog-name pkg-type
```

## 生产构建

### 构建服务器版本

```bash
pnpm build
# 部署在Node服务器上，执行下面脚本启动
pnpm start
```

### 构建静态版本

```bash
pnpm generate
# 部署在nginx、cdn或任何静态资源托管服务器
# (可选)使用node启动静态服务器
pnpm start:generate
```
