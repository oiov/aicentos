# Usar NBility con Droid CLI

## Instalación

::: code-group

```bash [macOS/Linux]
curl -fsSL https://app.factory.ai/cli | sh
```

```powershell [Windows]
irm https://app.factory.ai/cli/windows | iex
```

:::

## Configurar Modelo

Edita `~/.factory/config.json`:

```json
{
  "custom_models": [
    {
      "model_display_name": "nbility-gpt5",
      "model": "gpt-5",
      "base_url": "https://nbility.dev/v1",
      "api_key": "TU_CLAVE_NBility",
      "provider": "generic-chat-completion-api",
      "max_tokens": 1280000
    }
  ]
}
```

::: warning Importante
Reemplaza `TU_CLAVE_NBility` con tu API Key.
:::

## Lanzamiento Directo

Escribe `droid`, ingresa `/model`, y selecciona `nbility-gpt5` en Custom Model.
