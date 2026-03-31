# Utiliser AICentOS avec OpenCode

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

## Configurer AICentOS

1. Obtenez votre cle API sur [https://www.aicentos.com/console/token](https://www.aicentos.com/console/token)
2. Definissez la variable d'environnement :

::: code-group

```bash [Linux/macOS]
export AICENTOS_TOKEN=sk-xxx
```

```powershell [Windows PowerShell]
$env:AICENTOS_TOKEN="sk-xxx"
```

:::

3. Creez `opencode.json` a la racine de votre projet ou dans `~/.config/opencode/` :

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
Remplacez `sk-xxx` par votre token reel obtenu depuis la [console AICentOS](https://www.aicentos.com/console/token).
:::

## Demarrage

```bash
cd my-project
opencode
```

Une fois lance, selectionnez un modele sous le fournisseur AICentOS pour commencer.
