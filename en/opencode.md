# Using AICentOS with OpenCode

## Install OpenCode

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

## Configure AICentOS

1. Get your API Key from [https://www.aicentos.com/console/token](https://www.aicentos.com/console/token)
2. Set the environment variable:

::: code-group

```bash [Linux/macOS]
export AICENTOS_TOKEN=sk-xxx
```

```powershell [Windows PowerShell]
$env:AICENTOS_TOKEN="sk-xxx"
```

:::

3. Create `opencode.json` in your project root or `~/.config/opencode/`:

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

::: warning Important
Replace `sk-xxx` with your actual Token from the [AICentOS console](https://www.aicentos.com/console/token).
:::

## Launch

```bash
cd my-project
opencode
```

Once launched, select a model under the AICentOS provider to start coding.
