# Usar NBility com OpenCode

## Instalar OpenCode

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

## Configurar NBility

1. Obtenha sua API Key em [https://nbility.dev/console/token](https://nbility.dev/console/token)
2. Configure a variavel de ambiente:

::: code-group

```bash [Linux/macOS]
export NBility_TOKEN=sk-xxx
```

```powershell [Windows PowerShell]
$env:NBility_TOKEN="sk-xxx"
```

:::

3. Crie `opencode.json` na raiz do seu projeto ou em `~/.config/opencode/`:

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

::: warning Importante
Substitua `sk-xxx` pelo seu token real obtido no [console do NBility](https://nbility.dev/console/token).
:::

## Iniciar

```bash
cd my-project
opencode
```

Apos iniciar, selecione um modelo do provedor NBility para comecar.
