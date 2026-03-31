# Usar AICentOS con Droid CLI

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
      "model_display_name": "aicentos-gpt5",
      "model": "gpt-5",
      "base_url": "https://www.aicentos.com/v1",
      "api_key": "TU_CLAVE_AICENTOS",
      "provider": "generic-chat-completion-api",
      "max_tokens": 1280000
    }
  ]
}
```

::: warning Importante
Reemplaza `TU_CLAVE_AICENTOS` con tu API Key.
:::

## Lanzamiento Directo

Escribe `droid`, ingresa `/model`, y selecciona `aicentos-gpt5` en Custom Model.
