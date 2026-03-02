# Using FishXCode with Claude  Code

## 1. Get Your API Key

### 1. Register

Visit [fishxcode.com](https://fishxcode.com/register?aff=9CTW) and click **Register**:

![FishXCode Home](/img/start/api-01-home.png)

Choose a registration method (GitHub, LinuxDO, or username):

![Registration Method Selection](/img/start/api-02-register.png)

Fill in your username, password, and confirm password to complete registration:

![Registration Form](/img/start/api-03-register-form.png)

### 2. Log In

After registering, log in with your username and password:

![Login Page](/img/start/api-04-login.png)

After logging in, you will be taken to the console:

![Console Home](/img/start/api-05-console.png)

### 3. Create a Token

Go to **Console → Token Management → Add Token** and fill in the form:

![Add Token](/img/start/api-06-token-create.png)

- For **Token Group**, it is recommended to select **Official Channel**. This group includes models such as `claude-opus-4-5-20251101`, `claude-haiku-4-5-20251001`, `claude-opus-4-6`, `claude-sonnet-4-5-20250929`, and `claude-sonnet-4-6`. The model is selected automatically based on task complexity — no manual switching needed.

After creation, click the **Copy** button in the token list to get your API Key (format: `sk-xxx`):

![Copy Token](/img/start/api-07-token-copy.png)

### 4. Top Up

Go to **Console → Wallet Management**. Alipay, WeChat Pay, and redeem codes are supported:

![Top-Up Page](/img/start/api-08-wallet.png)

| Method | Steps |
|---|---|
| Alipay | Enter/select amount → Alipay |
| WeChat Pay | Enter/select amount → WeChat |
| Redeem Code | Enter code in the redeem section → Click Redeem |

::: tip Rate Multiplier
A group labeled `0.5x` in the group name means a 0.5x consumption multiplier — the lower the value, the more tokens you get. For example, `0.5x` means ¥1 gives you 10M official tokens (vs. 5M at the official price).
:::

---

## 2. Environment Setup

### Install Node.js

Claude  Code is installed via npm. Confirm Node.js is available first.

::: code-group

```bash [macOS - Verify]
node -v
npm -v
```

```bash [macOS - Install via Homebrew]
brew install node
```

```bash [Windows - Verify (CMD/PowerShell)]
node -v
npm -v
```

:::

If not installed, download from [nodejs.org/zh-cn/download](https://nodejs.org/zh-cn/download) for your platform. **Windows requires a restart** after installation.

### Windows Only: Install Git Bash

Claude  Code requires a bash environment. Windows users must install Git Bash:

1. Download from [git-scm.com/install/windows](https://git-scm.com/download/windows) and install the appropriate version.
2. Verify: right-click the desktop — if **Open Git Bash here** appears, installation succeeded.

---

## 3. Install Claude  Code

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

Verify installation:

```bash
claude --version
```

---

## 4. Configure FishXCode

### Option 1: settings.json (Recommended)

Edit `~/.claude/settings.json` (Windows: `C:\Users\<username>\.claude\settings.json`) with the following content:

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "replace with your API Key",
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

This configuration **persists permanently** — no need to set environment variables each session.

### Option 2: Temporary Environment Variables

::: code-group

```bash [macOS/Linux]
export ANTHROPIC_BASE_URL=https://fishxcode.com/
export ANTHROPIC_AUTH_TOKEN=sk-xxx
```

```powershell [Windows PowerShell (temporary)]
$env:ANTHROPIC_BASE_URL="https://fishxcode.com/"
$env:ANTHROPIC_AUTH_TOKEN="sk-xxx"
```

```cmd [Windows CMD (temporary)]
set ANTHROPIC_BASE_URL=https://fishxcode.com/
set ANTHROPIC_AUTH_TOKEN=sk-xxx
```

:::

To write permanently to Windows system variables, run in PowerShell:

```powershell
setx ANTHROPIC_AUTH_TOKEN "sk-xxx"
setx ANTHROPIC_BASE_URL "https://fishxcode.com/"
```

Reopen the terminal after running these commands for the changes to take effect.

::: warning
Replace `sk-xxx` with your actual Token from the [FishXCode Console](https://fishxcode.com/console/token).
:::

---

## 5. Launch

```bash
cd my-project
claude
```

---

## 6. Model Selection

Type `/model` inside Claude  Code to switch models:

| Option | Model | Notes |
|---|---|---|
| **Default** | `claude-sonnet-4-5-20250929` + `claude-haiku-4-5-20251001` | Auto-selected by task complexity. Recommended for daily use. |
| **Opus** | `claude-opus-4-5-20251101` | Strongest reasoning, higher cost |
| **Haiku** | `claude-haiku-4-5-20251001` | Lightweight and fast |

You can also pin a model via environment variable:

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

::: tip Upgrade Claude  Code
If the model version appears outdated, run the upgrade command and restart your tools:
```bash
npm install -g @anthropic-ai/claude-code
```
:::

---

## 7. IDE Integration

### IntelliJ IDEA

Navigate to: File → Settings → Plugins → Marketplace → search `claude code`, find **Claude  Code Terminal** and install:

![Install Claude  Code Terminal](/img/start/idea-01-install.png)

After installation, restart IDEA and verify the plugin has loaded:

![Verify Plugin Loaded](/img/start/idea-02-verify.png)

::: info
If the plugin does not appear in the Marketplace, your current IDEA version is too old — upgrade to the latest release.
:::

### VSCode

Press `Ctrl + Shift + X` to open the Extensions panel, search `claude code`, and install **Claude  Code for VSCode**.

![Search and Install Claude  Code Extension](/img/start/vscode-01-install.png)

After installation, the extension offers three connection methods:

![Claude  Code Extension Connection Methods](/img/start/vscode-02-login.png)

It is recommended to connect to FishXCode via `settings.json`. Click the **gear icon** in the bottom-right of the extension → **Edit in settings.json**:

![Open settings.json for Editing](/img/start/vscode-03-settings.png)

Add the following to VSCode's `settings.json`:

```json
{
  "claudeCode.preferredLocation": "panel",
  "claudeCode.environmentVariables": [
    { "name": "ANTHROPIC_AUTH_TOKEN", "value": "replace with your API Key" },
    { "name": "ANTHROPIC_BASE_URL", "value": "https://fishxcode.com/" }
  ]
}
```

![settings.json Configuration Example](/img/start/vscode-04-config.png)

After saving, **quit and reopen VSCode** — the extension will connect to FishXCode normally.

![Using Claude  Code in VSCode](/img/start/vscode-05-demo.gif)

---

## 8. FAQ

### 403 Error

Token balance is insufficient. Top up in the console and retry.

### Windows: Connection Error or 400/401

Re-run the `setx` commands in PowerShell to write system variables, then reopen the terminal:

```powershell
setx ANTHROPIC_AUTH_TOKEN "sk-xxx"
setx ANTHROPIC_BASE_URL "https://fishxcode.com/"
```

### "Unable to connect to Anthropic services"

Full error:

```
Unable to connect to Anthropic services
Failed to connect to api.anthropic.com: ERR_BAD_REQUEST
Please check your internet connection and network settings.
```

This happens because Claude  Code has not completed onboarding and is still trying to connect to `api.anthropic.com`. **No VPN required.** Open `~/.claude.json` (the `.claude.json` in your home directory — not `.claude/settings.json`) and add `"hasCompletedOnboarding": true` at the end:

```json
{
  "installMethod": "unknown",
  "autoUpdates": true,
  "projects": { ... },
  "hasCompletedOnboarding": true
}
```

::: tip
Make sure to add a comma after the preceding field (required by JSON syntax). Restart `claude` after saving to connect normally.
:::
