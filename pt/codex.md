# Usando AICentOS com Codex

## Instalação

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

## Configurar Variáveis de Ambiente

1. Visite [https://www.aicentos.com/console/token](https://www.aicentos.com/console/token) para obter sua API Key
2. Crie `~/.codex/config.toml`:

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

3. Crie `~/.codex/auth.json`, definindo `OPENAI_API_KEY` com sua API Key do AICentOS:

   ```json
   {
     "OPENAI_API_KEY": "sua_api_key"
   }
   ```

## Iniciar Diretamente

```bash
cd meu-projeto
codex
```

## Usar Codex no VSCode

1. Instale a extensão Codex
2. Acesse configurações em modo JSON
3. Adicione:

```json
{
  "chatgpt.apiBase": "https://www.aicentos.com/v1",
  "chatgpt.config": {
    "preferred_auth_method": "api_key",
    "model_provider": "aicentos"
  }
}
```
