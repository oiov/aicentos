# 使用 ZCF 快速接入 FishXCode

[ZCF](https://zcf.ufomiao.com) 是一个 Claude  Code 零配置增强工具，通过一行命令完成 API 配置、工作流导入、MCP 服务集成等全部初始化工作。

## 1. 快速接入

```bash
npx zcf i -s -t api_key -k "你的API Key" -u "https://fishxcode.com/"
```

将 `你的API Key` 替换为在 [FishXCode 控制台](https://fishxcode.com/console/token) 获取的 `sk-xxx` 格式 Token。

命令执行后自动写入 `~/.claude/settings.json`：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-xxx",
    "ANTHROPIC_BASE_URL": "https://fishxcode.com/"
  }
}
```

### 同时指定模型（可选）

```bash
npx zcf i -s -t api_key -k "sk-xxx" -u "https://fishxcode.com/" \
  --api-model "claude-sonnet-4-5-20250929" \
  --api-fast-model "claude-haiku-4-5-20251001"
```

---

## 2. 完整初始化（推荐）

一次性配置 API、工作流、MCP 服务：

```bash
npx zcf i -s -t api_key -k "sk-xxx" -u "https://fishxcode.com/" \
  --workflows all \
  --mcp-services context7,open-websearch \
  --output-styles engineer-professional
```

初始化后 `~/.claude/` 目录结构：

```
~/.claude/
├── settings.json          # API、MCP、权限配置
├── CLAUDE.md              # 全局系统提示
├── commands/zcf/          # 工作流命令
└── agents/zcf/            # 工作流智能体
```

---

## 3. 工作流命令

安装后，在 Claude  Code 中可使用：

| 命令 | 说明 |
|---|---|
| `/zcf:workflow` | 六阶段开发工作流（研究→构思→计划→执行→优化→评审） |
| `/zcf:feat` | 新功能开发，含规划与 UI/UX 设计 |
| `/zcf:git-commit` | Git 提交自动化 |
| `/zcf:git-rollback` | Git 回滚 |
| `/zcf:bmad-init` | 企业级敏捷开发流程 |

---

## 4. MCP 服务

| 服务 | 说明 |
|---|---|
| `context7` | 上下文检索与库文档查询 |
| `open-websearch` | DuckDuckGo/Bing/Brave 搜索 |
| `spec-workflow` | Spec 工作流 MCP |
| `Playwright` | 浏览器自动化 |

```bash
# 单独安装 MCP 服务
npx zcf i -s --mcp-services context7,open-websearch
```

---

## 5. 更新

```bash
npx zcf update
```

---

## 常见问题

### 已有 settings.json，会被覆盖吗？

ZCF 会在修改前自动备份至 `~/.claude/backup/`，并提供四种处理策略：备份并覆盖 / 智能合并 / 仅更新文档 / 跳过。

### 如何切换回手动配置？

ZCF 生成的 `settings.json` 是标准格式，可直接手动编辑。参考 [Claude  Code 配置](/start)。
