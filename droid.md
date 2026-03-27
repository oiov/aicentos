# 在 Droid CLI 中使用 AICentos

## 安装 Droid CLI

::: code-group

```bash [macOS/Linux]
curl -fsSL https://app.factory.ai/cli | sh
```

```powershell [Windows]
irm https://app.factory.ai/cli/windows | iex
```

:::

## 配置模型

编辑 `~/.factory/config.json`，将内容修改为以下内容：

```json
{
  "custom_models": [
    {
      "model_display_name": "aicentos-gpt5",
      "model": "gpt-5",
      "base_url": "https://aicentos.com/v1",
      "api_key": "YOUR_FISHXCODE_KEY",
      "provider": "generic-chat-completion-api",
      "max_tokens": 1280000
    }
  ]
}
```

::: warning 重要
请将 `YOUR_FISHXCODE_KEY` 替换为你的 AICentos API Key。
:::

## 直接启动使用

配置完成后，在命令行输入 `droid`，在弹出的界面输入 `/model`，并选择 Custom Model 中的 `aicentos-gpt5` 即可开始使用。
