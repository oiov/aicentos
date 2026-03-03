# Quick Setup with ZCF

[ZCF](https://zcf.ufomiao.com) is a zero-config enhancement tool for Claude  Code. A single command handles API configuration, workflow import, and MCP service setup.

## 1. Quick Connect

```bash
npx zcf i -s -t api_key -k "your-api-key" -u "https://fishxcode.com/"
```

Replace `your-api-key` with the `sk-xxx` token from your [FishXCode Console](https://fishxcode.com/console/token).

This writes to `~/.claude/settings.json` automatically:

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-xxx",
    "ANTHROPIC_BASE_URL": "https://fishxcode.com/"
  }
}
```

### Pin a specific model (optional)

```bash
npx zcf i -s -t api_key -k "sk-xxx" -u "https://fishxcode.com/" \
  --api-model "claude-sonnet-4-5-20250929" \
  --api-fast-model "claude-haiku-4-5-20251001"
```

---

## 2. Full Initialization (Recommended)

Configure API, workflows, and MCP services in one shot:

```bash
npx zcf i -s -t api_key -k "sk-xxx" -u "https://fishxcode.com/" \
  --workflows all \
  --mcp-services context7,open-websearch \
  --output-styles engineer-professional
```

Resulting `~/.claude/` structure:

```
~/.claude/
├── settings.json          # API, MCP, permissions
├── CLAUDE.md              # Global system prompt
├── commands/zcf/          # Workflow slash commands
└── agents/zcf/            # Workflow agents
```

---

## 3. Workflow Commands

After installation, use these in Claude  Code:

| Command | Description |
|---|---|
| `/zcf:workflow` | Six-phase dev workflow (Research → Ideate → Plan → Execute → Optimize → Review) |
| `/zcf:feat` | Feature development with planning and UI/UX design |
| `/zcf:git-commit` | Automated Git commit |
| `/zcf:git-rollback` | Git rollback |
| `/zcf:bmad-init` | Enterprise agile workflow |

---

## 4. MCP Services

| Service | Description |
|---|---|
| `context7` | Context retrieval and library docs lookup |
| `open-websearch` | DuckDuckGo/Bing/Brave search |
| `spec-workflow` | Spec workflow MCP |
| `Playwright` | Browser automation |

```bash
# Install MCP services separately
npx zcf i -s --mcp-services context7,open-websearch
```

---

## 5. Update

```bash
npx zcf update
```

---

## FAQ

### Will my existing settings.json be overwritten?

ZCF automatically backs up to `~/.claude/backup/` before any changes, and offers four strategies: backup & overwrite / smart merge / docs only / skip.

### How do I switch back to manual config?

The generated `settings.json` is standard format — edit it directly. See [Claude  Code Setup](/en/start).
