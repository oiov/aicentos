# Configuration rapide avec ZCF

[ZCF](https://zcf.ufomiao.com) est un outil de configuration zéro pour Claude  Code. Une seule commande gère la configuration de l'API, l'import des workflows et l'intégration des services MCP.

## 1. Connexion rapide

```bash
npx zcf i -s -t api_key -k "votre-clé-api" -u "https://fishxcode.com/"
```

Remplacez `votre-clé-api` par le token `sk-xxx` obtenu depuis la [Console FishXCode](https://fishxcode.com/console/token).

Cela écrit automatiquement dans `~/.claude/settings.json` :

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-xxx",
    "ANTHROPIC_BASE_URL": "https://fishxcode.com/"
  }
}
```

### Fixer un modèle spécifique (optionnel)

```bash
npx zcf i -s -t api_key -k "sk-xxx" -u "https://fishxcode.com/" \
  --api-model "claude-sonnet-4-5-20250929" \
  --api-fast-model "claude-haiku-4-5-20251001"
```

---

## 2. Initialisation complète (Recommandé)

Configurer l'API, les workflows et les services MCP en une seule opération :

```bash
npx zcf i -s -t api_key -k "sk-xxx" -u "https://fishxcode.com/" \
  --workflows all \
  --mcp-services context7,open-websearch \
  --output-styles engineer-professional
```

Structure `~/.claude/` résultante :

```
~/.claude/
├── settings.json          # API, MCP, permissions
├── CLAUDE.md              # Invite système globale
├── commands/zcf/          # Commandes de workflow
└── agents/zcf/            # Agents de workflow
```

---

## 3. Commandes de workflow

Après l'installation, utilisez dans Claude  Code :

| Commande | Description |
|---|---|
| `/zcf:workflow` | Workflow en six phases (Recherche → Idée → Plan → Exécution → Optimisation → Révision) |
| `/zcf:feat` | Développement de fonctionnalités avec planification et design UI/UX |
| `/zcf:git-commit` | Commit Git automatisé |
| `/zcf:git-rollback` | Rollback Git |
| `/zcf:bmad-init` | Workflow agile entreprise |

---

## 4. Services MCP

| Service | Description |
|---|---|
| `context7` | Récupération de contexte et documentation de bibliothèques |
| `open-websearch` | Recherche DuckDuckGo/Bing/Brave |
| `spec-workflow` | MCP de workflow Spec |
| `Playwright` | Automatisation du navigateur |

```bash
npx zcf i -s --mcp-services context7,open-websearch
```

---

## 5. Mise à jour

```bash
npx zcf update
```

---

## FAQ

### Mon settings.json existant sera-t-il écrasé ?

ZCF sauvegarde automatiquement dans `~/.claude/backup/` avant toute modification, et propose quatre stratégies : sauvegarde et écrasement / fusion intelligente / docs uniquement / ignorer.

### Comment revenir à la configuration manuelle ?

Le `settings.json` généré est au format standard — modifiez-le directement. Voir [Configuration Claude  Code](/fr/start).
