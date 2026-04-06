# Usando NBility com Droid CLI

## Instalação

::: code-group

```bash [macOS/Linux]
curl -fsSL https://app.factory.ai/cli | sh
```

```powershell [Windows]
irm https://app.factory.ai/cli/windows | iex
```

:::

## Configurar Modelo

Edite `~/.factory/config.json`:

```json
{
  "custom_models": [
    {
      "model_display_name": "nbility-gpt5",
      "model": "gpt-5",
      "base_url": "https://nbility.dev/v1",
      "api_key": "SUA_CHAVE_NBility",
      "provider": "generic-chat-completion-api",
      "max_tokens": 1280000
    }
  ]
}
```

::: warning Importante
Substitua `SUA_CHAVE_NBility` pela sua API Key.
:::

## Iniciar Diretamente

Digite `droid`, entre `/model`, e selecione `nbility-gpt5` em Custom Model.
