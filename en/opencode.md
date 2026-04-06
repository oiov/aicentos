# Using NBility with OpenCode

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

## Configure NBility

1. Get your API Key from [https://nbility.dev/console/token](https://nbility.dev/console/token)
2. Set the environment variable:

::: code-group

```bash [Linux/macOS]
export NBility_TOKEN=sk-xxx
```

```powershell [Windows PowerShell]
$env:NBility_TOKEN="sk-xxx"
```

:::

3. Create `opencode.json` in your project root or `~/.config/opencode/`:

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

::: warning Important
Replace `sk-xxx` with your actual Token from the [NBility console](https://nbility.dev/console/token).
:::

## Launch

```bash
cd my-project
opencode
```

Once launched, select a model under the NBility provider to start coding.
