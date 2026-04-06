# Utiliser NBility avec Codex

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

1. Obtenez votre clé API sur [https://nbility.dev/console/token](https://nbility.dev/console/token)
2. Créez `~/.codex/config.toml` :

   ```toml
   model = "gpt-5.3-codex"
   model_provider = "nbility"
   preferred_auth_method = "apikey"

   [model_providers.nbility]
   name = "OpenAI using Chat Completions"
   base_url = "https://nbility.dev/v1"
   wire_api = "responses"
   query_params = {}
   stream_idle_timeout_ms = 300000
   ```

3. Créez `~/.codex/auth.json`, en définissant `OPENAI_API_KEY` avec votre clé API NBility :

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
  "chatgpt.apiBase": "https://nbility.dev/v1",
  "chatgpt.config": {
    "preferred_auth_method": "api_key",
    "model_provider": "nbility"
  }
}
```

4. Cliquez sur l'icône Codex pour commencer
