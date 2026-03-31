# Using AICentOS with Droid CLI

## Install Droid CLI

::: code-group

```bash [macOS/Linux]
curl -fsSL https://app.factory.ai/cli | sh
```

```powershell [Windows]
irm https://app.factory.ai/cli/windows | iex
```

:::

## Configure Model

Edit `~/.factory/config.json` with the following content:

```json
{
  "custom_models": [
    {
      "model_display_name": "aicentos-gpt5",
      "model": "gpt-5",
      "base_url": "https://www.aicentos.com/v1",
      "api_key": "YOUR_AICENTOS_KEY",
      "provider": "generic-chat-completion-api",
      "max_tokens": 1280000
    }
  ]
}
```

::: warning Important
Replace `YOUR_AICENTOS_KEY` with your AICentOS API Key.
:::

## Launch Directly

After configuration, type `droid` in your terminal, enter `/model`, and select `aicentos-gpt5` from Custom Model to start using it.
