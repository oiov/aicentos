# Modeles supportes

NBility prend en charge une variete de modeles d'IA de plusieurs fournisseurs, couvrant differents cas d'utilisation et chaines d'outils. Vous pouvez librement choisir et changer de modele selon vos besoins.

## Anthropic (Claude)

| ID du modele | Description | Cas d'utilisation | Outils compatibles |
|-------------|-------------|-------------------|-------------------|
| `claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 derniere version, le plus performant | Codage complexe, conception d'architecture | Claude Code |
| `claude-sonnet-4-5-20250514` | Claude Sonnet 4.5 version stable | Codage quotidien, revue de code | Claude Code |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5, equilibre vitesse et qualite | Completions rapides, taches legeres | Claude Code |
| `claude-3-5-haiku-20241022` | Claude 3.5 Haiku, reponse la plus rapide | Appels frequents, completions en temps reel | Claude Code |

## OpenAI

| ID du modele | Description | Cas d'utilisation | Outils compatibles |
|-------------|-------------|-------------------|-------------------|
| `gpt-5` | GPT-5, modele phare d'OpenAI | Codage general, developpement conversationnel | Codex, RooCode, Qwen Code |

## Autres modeles

| ID du modele | Description | Cas d'utilisation | Outils compatibles |
|-------------|-------------|-------------------|-------------------|
| `glm-4.5` | Zhipu GLM-4.5 | Developpement general | RooCode, Qwen Code |
| `glm-4.6` | Zhipu GLM-4.6, performances ameliorees | Raisonnement complexe, developpement | RooCode, Qwen Code |
| `deepseek-v3.1` | DeepSeek V3.1, raisonnement approfondi | Implementation d'algorithmes, raisonnement logique | RooCode, Qwen Code |

## Changer de modele

### Claude Code

Definissez le modele principal via les variables d'environnement :

::: code-group

```bash [Linux/macOS]
export ANTHROPIC_MODEL=claude-sonnet-4-5-20250929
claude
```

```powershell [Windows PowerShell]
$env:ANTHROPIC_MODEL = "claude-sonnet-4-5-20250929"
claude
```

:::

### Codex

Modifiez le fichier `~/.codex/config.toml` et changez le champ `model` :

```toml
model = "gpt-5"
```

### RooCode / Qwen Code

Modifiez le champ **Model** directement dans la configuration du fournisseur. Tout identifiant de modele compatible liste ci-dessus peut etre utilise.

## Recommandations

::: tip Meilleur pour le codage
**claude-sonnet-4-5-20250929** — Capacite de codage globale la plus forte, ideal pour les projets complexes et les taches d'architecture.
:::

::: tip Meilleur pour la vitesse
**claude-3-5-haiku-20241022** — Temps de reponse le plus rapide, ideal pour les appels frequents et les completions en temps reel.
:::

::: tip Meilleur equilibre
**claude-haiku-4-5-20251001** — Excellent equilibre entre vitesse et qualite, adapte a la plupart des taches de developpement quotidiennes.
:::
