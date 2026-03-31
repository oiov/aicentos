# Usar AICentOS con OpenCode

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

## Configurar AICentOS

1. Obtén tu API Key en [https://www.aicentos.com/console/token](https://www.aicentos.com/console/token)
2. Configura la variable de entorno:

::: code-group

```bash [Linux/macOS]
export AICENTOS_TOKEN=sk-xxx
```

```powershell [Windows PowerShell]
$env:AICENTOS_TOKEN="sk-xxx"
```

:::

3. Crea `opencode.json` en la raíz de tu proyecto o en `~/.config/opencode/`:

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

::: warning Importante
Reemplaza `sk-xxx` por tu token real obtenido en la [consola de AICentOS](https://www.aicentos.com/console/token).
:::

## Iniciar

```bash
cd my-project
opencode
```

Una vez iniciado, selecciona un modelo del proveedor AICentOS para comenzar.
