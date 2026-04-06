# 在 OpenCode 中使用 NBility

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

## 配置 NBility

1. 访问 [https://nbility.dev/console/token](https://nbility.dev/console/token) 获取 API Key
2. 设置环境变量：

::: code-group

```bash [Linux/macOS]
export NBility_TOKEN=sk-xxx
```

```powershell [Windows PowerShell]
$env:NBility_TOKEN="sk-xxx"
```

:::

3. 在项目根目录或 `~/.config/opencode/` 下创建 `opencode.json`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "nbility-anthropic": {
      "npm": "@ai-sdk/anthropic",
      "name": "nbility-anthropic",
      "options": {
        "baseURL": "https://nbility.dev/v1",
        "apiKey": "{env:NBility_TOKEN}"
      },
      "models": {
        "claude-sonnet-4-6": {
          "name": "claude-sonnet-4-6"
        }
      }
    },
    "nbility-openai": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "nbility-openai",
      "options": {
        "baseURL": "https://nbility.dev/v1",
        "apiKey": "{env:NBility_TOKEN}"
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
请将 `sk-xxx` 替换为你在 [NBility 控制台](https://nbility.dev/console/token) 获取的实际 Token。
:::

## 启动使用

```bash
cd my-project
opencode
```

启动后通过界面选择 NBility 提供商下的模型即可开始使用。
