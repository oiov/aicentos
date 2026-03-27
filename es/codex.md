# Usar AICentos con Codex

## Instalación

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

## Configurar Variables de Entorno

1. Visita [https://aicentos.com/console/token](https://aicentos.com/console/token) para obtener tu API Key
2. Crea `~/.codex/config.toml`:

   ```toml
   model = "gpt-5.3-codex"
   model_provider = "aicentos"
   preferred_auth_method = "apikey"

   [model_providers.aicentos]
   name = "OpenAI using Chat Completions"
   base_url = "https://aicentos.com/v1"
   wire_api = "responses"
   query_params = {}
   stream_idle_timeout_ms = 300000
   ```

3. Crea `~/.codex/auth.json`, estableciendo `OPENAI_API_KEY` con tu API Key de AICentos:

   ```json
   {
     "OPENAI_API_KEY": "tu_api_key"
   }
   ```

## Lanzamiento Directo

```bash
cd mi-proyecto
codex
```

## Usar Codex en VSCode

1. Instala la extensión Codex
2. Accede a configuración en modo JSON
3. Agrega:

```json
{
  "chatgpt.apiBase": "https://aicentos.com/v1",
  "chatgpt.config": {
    "preferred_auth_method": "api_key",
    "model_provider": "aicentos"
  }
}
```
