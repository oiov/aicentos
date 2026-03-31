# Utiliser AICentOS avec RooCode

## Installation dans VSCode

1. Recherchez [RooCode](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline) dans VSCode et installez-le
2. Visitez [https://www.aicentos.com/console/token](https://www.aicentos.com/console/token) pour obtenir votre clé API

## Ajouter un Fournisseur

Après l'installation, ouvrez RooCode et ajoutez un fournisseur compatible OpenAI :

| Paramètre | Valeur |
|-----------|--------|
| **URL de base OpenAI** | `https://www.aicentos.com/v1` |
| **Clé API** | Votre clé de AICentOS |
| **Modèle** | `gpt-5` |

::: tip Conseil
Vous pouvez aussi utiliser `glm-4.5`, `glm-4.6`, ou `deepseek-v3.1`.
:::

Enregistrez et commencez à utiliser.
