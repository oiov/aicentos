# Using AICentOS with Codex

## Install Codex

::: code-group

```bash [pnpm]
pnpm install -g @openai/codex
```

```bash [npm]
npm install -g @openai/codex
```

```bash [yarn]
yarn global add @openai/codex
```

```bash [bunx]
bunx --global @openai/codex
```

:::

## Configure Environment Variables

1. Visit [https://www.aicentos.com/console/token](https://www.aicentos.com/console/token) to obtain your API Key
2. Create `~/.codex/config.toml` with this configuration:

   ```toml
   model = "gpt-5.3-codex"
   model_provider = "aicentos"
   preferred_auth_method = "apikey"

   [model_providers.aicentos]
   name = "OpenAI using Chat Completions"
   base_url = "https://www.aicentos.com/v1"
   wire_api = "responses"
   query_params = {}
   stream_idle_timeout_ms = 300000
   ```

3. Create `~/.codex/auth.json`, setting `OPENAI_API_KEY` to your AICentOS API Key:

   ```json
   {
     "OPENAI_API_KEY": "your_api_key_here"
   }
   ```

## Launch Directly

```bash
cd my-project
codex
```

## Using Codex in VSCode

1. Install the Codex extension
2. Access settings and switch to JSON configuration mode
3. Add these settings:

```json
{
  "chatgpt.apiBase": "https://www.aicentos.com/v1",
  "chatgpt.config": {
    "preferred_auth_method": "api_key",
    "model_provider": "aicentos"
  }
}
```

4. Click the Codex icon to begin using it
