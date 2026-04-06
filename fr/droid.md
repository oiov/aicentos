# Utiliser NBility avec Droid CLI

## Installation

::: code-group

```bash [macOS/Linux]
curl -fsSL https://app.factory.ai/cli | sh
```

```powershell [Windows]
irm https://app.factory.ai/cli/windows | iex
```

:::

## Configuration du Modèle

Éditez `~/.factory/config.json` :

```json
{
  "custom_models": [
    {
      "model_display_name": "nbility-gpt5",
      "model": "gpt-5",
      "base_url": "https://nbility.dev/v1",
      "api_key": "VOTRE_CLÉ_NBility",
      "provider": "generic-chat-completion-api",
      "max_tokens": 1280000
    }
  ]
}
```

::: warning Important
Remplacez `VOTRE_CLÉ_NBility` par votre clé API.
:::

## Lancement Direct

Tapez `droid`, entrez `/model`, et sélectionnez `nbility-gpt5` dans Custom Model.
