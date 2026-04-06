# Usar NBility con OpenCode

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

1. Obtén tu API Key en [https://nbility.dev/console/token](https://nbility.dev/console/token)
2. Configura la variable de entorno:

::: code-group

```bash [Linux/macOS]
export NBility_TOKEN=sk-xxx
```

```powershell [Windows PowerShell]
$env:NBility_TOKEN="sk-xxx"
```

:::

3. Crea `opencode.json` en la raíz de tu proyecto o en `~/.config/opencode/`:

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
Reemplaza `sk-xxx` por tu token real obtenido en la [consola de NBility](https://nbility.dev/console/token).
:::

## Iniciar

```bash
cd my-project
opencode
```

Una vez iniciado, selecciona un modelo del proveedor NBility para comenzar.
