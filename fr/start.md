# Utiliser FishXCode avec Claude  Code

## 1. Obtenir la clé API

### 1. Créer un compte

Rendez-vous sur [fishxcode.com](https://fishxcode.com/register?aff=9CTW) et cliquez sur **S'inscrire** :

![Page d'accueil FishXCode](/img/start/api-01-home.png)

Choisissez votre méthode d'inscription (GitHub, LinuxDO ou nom d'utilisateur) :

![Choix de la méthode d'inscription](/img/start/api-02-register.png)

Renseignez votre nom d'utilisateur, mot de passe et confirmation du mot de passe pour finaliser l'inscription :

![Formulaire d'inscription](/img/start/api-03-register-form.png)

### 2. Se connecter

Une fois inscrit, connectez-vous avec votre nom d'utilisateur et votre mot de passe :

![Page de connexion](/img/start/api-04-login.png)

Après connexion, vous accédez à la console :

![Page d'accueil de la console](/img/start/api-05-console.png)

### 3. Créer un token

Allez dans **Console → Gestion des tokens → Ajouter un token** et remplissez le formulaire :

![Ajouter un token](/img/start/api-06-token-create.png)

- Pour le **groupe de tokens**, choisissez de préférence le **canal officiel**. Ce groupe inclut `claude-opus-4-5-20251101`, `claude-haiku-4-5-20251001`, `claude-opus-4-6`, `claude-sonnet-4-5-20250929`, `claude-sonnet-4-6`, etc. Le modèle est sélectionné automatiquement selon la complexité de la tâche, sans intervention manuelle.

Une fois créé, cliquez sur le bouton **Copier** dans la liste des tokens pour récupérer votre clé API (format : `sk-xxx`) :

![Copier le token](/img/start/api-07-token-copy.png)

### 4. Recharger le solde

Allez dans **Console → Gestion du portefeuille** ; les paiements Alipay, WeChat et codes de recharge sont acceptés :

![Page de recharge](/img/start/api-08-wallet.png)

| Méthode | Chemin |
|---|---|
| Alipay | Saisir/sélectionner le montant → Alipay |
| WeChat | Saisir/sélectionner le montant → WeChat |
| Code de recharge | Saisir le code dans la zone dédiée → Cliquer sur Échanger |

::: tip Multiplicateur de taux
Le `0.5x` dans le nom d'un groupe indique le multiplicateur de consommation. Plus la valeur est faible, plus vous obtenez de tokens. Par exemple, `0.5x` signifie 10 millions de tokens officiels pour 1 yuan (contre 5 millions au tarif officiel).
:::

---

## 2. Préparation de l'environnement

### Installer Node.js

Claude  Code s'installe via npm. Vérifiez d'abord que Node.js est disponible.

::: code-group

```bash [macOS - Vérifier]
node -v
npm -v
```

```bash [macOS - Installation via Homebrew]
brew install node
```

```bash [Windows - Vérifier (CMD/PowerShell)]
node -v
npm -v
```

:::

Si non installé, téléchargez le package correspondant à votre plateforme depuis [nodejs.org/zh-cn/download](https://nodejs.org/zh-cn/download). **Windows nécessite un redémarrage** après l'installation.

### Windows uniquement : installer Git Bash

Claude  Code requiert un environnement bash. Les utilisateurs Windows doivent installer Git Bash :

1. Téléchargez depuis [git-scm.com/install/windows](https://git-scm.com/download/windows) et installez la version correspondante.
2. Vérification : clic droit sur le bureau — si **Open Git Bash here** apparaît, l'installation est réussie.

---

## 3. Installer Claude  Code

::: code-group

```bash [npm]
npm install -g @anthropic-ai/claude-code
```

```bash [pnpm]
pnpm install -g @anthropic-ai/claude-code
```

```bash [yarn]
yarn global add @anthropic-ai/claude-code
```

:::

Vérifier l'installation :

```bash
claude --version
```

---

## 4. Configurer FishXCode

### Option 1 : settings.json (Recommandé)

Éditez `~/.claude/settings.json` (Windows : `C:\Users\<nom_utilisateur>\.claude\settings.json`) avec le contenu suivant :

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "Remplacez par votre clé API",
    "ANTHROPIC_BASE_URL": "https://fishxcode.com/",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  },
  "permissions": {
    "allow": [
      "Bash",
      "LS(*)",
      "Read(*)",
      "Write(*)",
      "Edit(*)",
      "MultiEdit(*)",
      "Glob(*)",
      "Grep(*)",
      "Task(*)",
      "WebFetch(domain:*)",
      "WebSearch",
      "TodoWrite(*)",
      "NotebookRead(*)",
      "NotebookEdit(*)"
    ],
    "defaultMode": "bypassPermissions",
    "deny": []
  },
}
```

Cette configuration est **permanente** — inutile de redéfinir les variables à chaque session.

### Option 2 : Variables d'environnement temporaires

::: code-group

```bash [macOS/Linux]
export ANTHROPIC_BASE_URL=https://fishxcode.com/
export ANTHROPIC_AUTH_TOKEN=sk-xxx
```

```powershell [Windows PowerShell (temporaire)]
$env:ANTHROPIC_BASE_URL="https://fishxcode.com/"
$env:ANTHROPIC_AUTH_TOKEN="sk-xxx"
```

```cmd [Windows CMD (temporaire)]
set ANTHROPIC_BASE_URL=https://fishxcode.com/
set ANTHROPIC_AUTH_TOKEN=sk-xxx
```

:::

Pour écrire définitivement dans les variables système Windows, exécutez dans PowerShell :

```powershell
setx ANTHROPIC_AUTH_TOKEN "sk-xxx"
setx ANTHROPIC_BASE_URL "https://fishxcode.com/"
```

Rouvrez le terminal après l'exécution pour que les modifications prennent effet.

::: warning
Remplacez `sk-xxx` par votre token réel obtenu depuis la [Console FishXCode](https://fishxcode.com/console/token).
:::

---

## 5. Démarrage

```bash
cd my-project
claude
```

---

## 6. Sélection du modèle

Tapez `/model` dans l'interface de conversation de Claude  Code pour changer de modèle :

| Option | Modèle réel | Notes |
|---|---|---|
| **Default** | `claude-sonnet-4-5-20250929` + `claude-haiku-4-5-20251001` | Sélection automatique selon la tâche. Recommandé pour un usage quotidien |
| **Opus** | `claude-opus-4-5-20251101` | Raisonnement le plus puissant, coût plus élevé |
| **Haiku** | `claude-haiku-4-5-20251001` | Léger et rapide |

Vous pouvez également fixer un modèle via une variable d'environnement :

::: code-group

```bash [macOS/Linux]
export ANTHROPIC_MODEL=claude-sonnet-4-5-20250929
claude
```

```powershell [Windows PowerShell]
$env:ANTHROPIC_MODEL="claude-sonnet-4-5-20250929"
claude
```

:::

::: tip Mettre à jour Claude  Code
Si la version du modèle n'est pas la plus récente, exécutez la commande de mise à jour puis redémarrez les outils concernés :
```bash
npm install -g @anthropic-ai/claude-code
```
:::

---

## 7. Intégration IDE

### IntelliJ IDEA

Chemin : Fichier → Paramètres → Plugins → Marketplace → rechercher `claude code`, puis installer **Claude  Code Terminal** :

![Installer Claude  Code Terminal](/img/start/idea-01-install.png)

Redémarrez IDEA après l'installation et vérifiez que le plugin est bien chargé :

![Vérification du plugin chargé](/img/start/idea-02-verify.png)

::: info
Si le plugin n'apparaît pas dans le Marketplace, votre version d'IDEA est trop ancienne — mettez-la à jour vers la dernière version.
:::

### VSCode

Appuyez sur `Ctrl + Shift + X` pour ouvrir le panneau des extensions, recherchez `claude code` et installez **Claude  Code for VSCode**.

![Rechercher et installer le plugin Claude  Code](/img/start/vscode-01-install.png)

Une fois installé, le plugin propose trois méthodes de connexion :

![Méthodes de connexion du plugin Claude  Code](/img/start/vscode-02-login.png)

Il est recommandé de configurer la connexion à FishXCode via `settings.json`. Cliquez sur l'**icône d'engrenage** en bas à droite du plugin → **Modifier dans settings.json** :

![Ouvrir l'édition de settings.json](/img/start/vscode-03-settings.png)

Ajoutez les éléments suivants dans le `settings.json` de VSCode :

```json
{
  "claudeCode.preferredLocation": "panel",
  "claudeCode.environmentVariables": [
    { "name": "ANTHROPIC_AUTH_TOKEN", "value": "Remplacez par votre clé API" },
    { "name": "ANTHROPIC_BASE_URL", "value": "https://fishxcode.com/" }
  ]
}
```

![Exemple de configuration settings.json](/img/start/vscode-04-config.png)

Après avoir sauvegardé, **quittez et rouvrez VSCode** ; le plugin se connectera normalement à FishXCode.

![Utiliser Claude  Code dans VSCode](/img/start/vscode-05-demo.gif)

---

## 8. Questions fréquentes

### Erreur 403

Le solde du token est insuffisant. Rechargez dans la console et réessayez.

### Windows : erreur de connexion ou 400/401

Exécutez à nouveau la commande `setx` dans PowerShell pour écrire les variables système, puis rouvrez le terminal :

```powershell
setx ANTHROPIC_AUTH_TOKEN "sk-xxx"
setx ANTHROPIC_BASE_URL "https://fishxcode.com/"
```

### "Unable to connect to Anthropic services"

Erreur complète :

```
Unable to connect to Anthropic services
Failed to connect to api.anthropic.com: ERR_BAD_REQUEST
Please check your internet connection and network settings.
```

Cela se produit car Claude  Code n'a pas terminé l'onboarding et tente toujours de se connecter à `api.anthropic.com`. **Aucun VPN requis.** Ouvrez `~/.claude.json` (le fichier `.claude.json` dans votre répertoire home — pas `.claude/settings.json`) et ajoutez `"hasCompletedOnboarding": true` à la fin :

```json
{
  "installMethod": "unknown",
  "autoUpdates": true,
  "projects": { ... },
  "hasCompletedOnboarding": true
}
```

::: tip
Ajoutez une virgule après le champ précédent avant d'insérer la nouvelle entrée (syntaxe JSON obligatoire). Relancez `claude` après la sauvegarde pour rétablir la connexion.
:::
