# Utiliser AICentOS avec Codex

## Installation

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

## Configuration des Variables d'Environnement

1. Obtenez votre clé API sur [https://www.aicentos.com/console/token](https://www.aicentos.com/console/token)
2. Créez `~/.codex/config.toml` :

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

3. Créez `~/.codex/auth.json`, en définissant `OPENAI_API_KEY` avec votre clé API AICentOS :

   ```json
   {
     "OPENAI_API_KEY": "votre_clé_api"
   }
   ```

## Démarrage Direct

```bash
cd mon-projet
codex
```

## Utiliser Codex dans VSCode

1. Installez l'extension Codex
2. Accédez aux paramètres et passez en mode JSON
3. Ajoutez :

```json
{
  "chatgpt.apiBase": "https://www.aicentos.com/v1",
  "chatgpt.config": {
    "preferred_auth_method": "api_key",
    "model_provider": "aicentos"
  }
}
```

4. Cliquez sur l'icône Codex pour commencer
