[根目录](../CLAUDE.md) > **deno**

# Deno Landing Page 模块

## 模块职责

FishXCode 主站 (`fishxcode.com`) 的着陆页服务器，以**单文件 Deno 应用**实现，包含完整的多语言 Landing Page (HTML/CSS/JS 全部内联)、SEO 支持、访问计数和 API 端点。

## 入口与启动

- **入口文件**: `landing.deno.ts`
- **启动命令**:
  ```bash
  deno run --allow-net --allow-env --unstable-kv landing.deno.ts
  ```
- **端口**: 默认 `8001`，可通过 `PORT` 环境变量覆盖
- **运行时**: Deno (需启用 `unstable` KV 功能)

## 对外接口

| 路径 | 方法 | 说明 |
|------|------|------|
| `/` | GET | Landing Page HTML (多语言，基于 Accept-Language 或 `?lang=` 参数) |
| `/robots.txt` | GET | 爬虫规则 |
| `/sitemap.xml` | GET | 站点地图 |
| `/manifest.json` | GET | PWA Manifest |
| `/api/visit` | POST | 访问计数 API (使用 Deno KV 持久化) |

## 关键依赖与配置

- **运行时依赖**: Deno 标准库 (无第三方依赖)
- **持久化**: Deno KV (`Deno.openKv()`) -- 用于访问计数
- **配置文件**: `deno.json` -- 仅声明 `unstable: ["kv"]`

## 数据模型

- **Deno KV 键**: 访问计数存储在 KV 中
- **无数据库**: 无外部数据库依赖

## 内联功能

该单文件 (~88KB) 内联了以下内容：

- **完整 HTML 模板**: 含 hero 区域、功能特性、定价、FAQ、页脚
- **CSS 样式**: 响应式设计，深色/浅色主题
- **JavaScript**: 语言切换、滚动动画、访问计数
- **SEO**: Open Graph meta 标签、结构化数据 (JSON-LD)
- **i18n**: 支持 13 种语言的翻译文本

## 测试与质量

- **当前状态**: 无自动化测试
- **手动验证**: 本地启动后访问 `http://localhost:8001` 检查页面渲染

## 常见问题 (FAQ)

**Q: 为什么用单文件而不是框架？**
A: Deno Deploy 支持单文件部署，减少构建步骤，Landing Page 内容相对固定。

**Q: 如何更新翻译？**
A: 在 `landing.deno.ts` 中搜索 i18n 相关的对象字面量，按语言 key 添加/修改翻译文本。

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `deno/landing.deno.ts` | 主服务器文件 (单文件全部逻辑) |
| `deno/deno.json` | Deno 运行时配置 |

## 变更记录 (Changelog)

| 日期 | 操作 | 说明 |
|------|------|------|
| 2026-03-05 | 创建 | 首次由 init-architect 自动生成 |
