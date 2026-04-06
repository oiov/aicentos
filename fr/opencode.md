# Utiliser NBility avec OpenCode

## Installer OpenCode

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

## Configurer NBility

1. Obtenez votre cle API sur [https://nbility.dev/console/token](https://nbility.dev/console/token)
2. Definissez la variable d'environnement :

::: code-group

```bash [Linux/macOS]
export NBility_TOKEN=sk-xxx
```

```powershell [Windows PowerShell]
$env:NBility_TOKEN="sk-xxx"
```

:::

3. Creez `opencode.json` a la racine de votre projet ou dans `~/.config/opencode/` :

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
Remplacez `sk-xxx` par votre token reel obtenu depuis la [console NBility](https://nbility.dev/console/token).
:::

## Demarrage

```bash
cd my-project
opencode
```

Une fois lance, selectionnez un modele sous le fournisseur NBility pour commencer.
