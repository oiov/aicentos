# 在 OpenCode 中使用 AICentOS

## 安装 OpenCode

::: code-group

```bash [npm]
npm install -g opencode-ai@latest
```

```bash [brew]
brew install opencode
```

```bash [scoop]
scoop install opencode
```

:::

## 配置 AICentOS

1. 访问 [https://www.aicentos.com/console/token](https://www.aicentos.com/console/token) 获取 API Key
2. 设置环境变量：

::: code-group

```bash [Linux/macOS]
export AICENTOS_TOKEN=sk-xxx
```

```powershell [Windows PowerShell]
$env:AICENTOS_TOKEN="sk-xxx"
```

:::

3. 在项目根目录或 `~/.config/opencode/` 下创建 `opencode.json`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "aicentos-anthropic": {
      "npm": "@ai-sdk/anthropic",
      "name": "aicentos-anthropic",
      "options": {
        "baseURL": "https://www.aicentos.com/v1",
        "apiKey": "{env:AICENTOS_TOKEN}"
      },
      "models": {
        "claude-sonnet-4-6": {
          "name": "claude-sonnet-4-6"
        }
      }
    },
    "aicentos-openai": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "aicentos-openai",
      "options": {
        "baseURL": "https://www.aicentos.com/v1",
        "apiKey": "{env:AICENTOS_TOKEN}"
      },
      "models": {
        "gpt-5.2-codex": {
          "name": "gpt-5.2-codex"
        }
      }
    }
  }
}
```

::: warning 重要
请将 `sk-xxx` 替换为你在 [AICentOS 控制台](https://www.aicentos.com/console/token) 获取的实际 Token。
:::

## 启动使用

```bash
cd my-project
opencode
```

启动后通过界面选择 AICentOS 提供商下的模型即可开始使用。
