# Configuração rápida com ZCF

[ZCF](https://zcf.ufomiao.com) é uma ferramenta de configuração zero para Claude  Code. Um único comando gerencia a configuração da API, importação de workflows e integração de serviços MCP.

## 1. Conexão rápida

```bash
npx zcf i -s -t api_key -k "sua-chave-api" -u "https://fishxcode.com/"
```

Substitua `sua-chave-api` pelo token `sk-xxx` obtido no [Console FishXCode](https://fishxcode.com/console/token).

Isso escreve automaticamente em `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-xxx",
    "ANTHROPIC_BASE_URL": "https://fishxcode.com/"
  }
}
```

### Fixar um modelo específico (opcional)

```bash
npx zcf i -s -t api_key -k "sk-xxx" -u "https://fishxcode.com/" \
  --api-model "claude-sonnet-4-5-20250929" \
  --api-fast-model "claude-haiku-4-5-20251001"
```

---

## 2. Inicialização completa (Recomendado)

Configure API, workflows e serviços MCP de uma vez:

```bash
npx zcf i -s -t api_key -k "sk-xxx" -u "https://fishxcode.com/" \
  --workflows all \
  --mcp-services context7,open-websearch \
  --output-styles engineer-professional
```

Estrutura `~/.claude/` resultante:

```
~/.claude/
├── settings.json          # API, MCP, permissões
├── CLAUDE.md              # Prompt de sistema global
├── commands/zcf/          # Comandos de workflow
└── agents/zcf/            # Agentes de workflow
```

---

## 3. Comandos de workflow

Após a instalação, use no Claude  Code:

| Comando | Descrição |
|---|---|
| `/zcf:workflow` | Workflow de seis fases (Pesquisa → Ideia → Plano → Execução → Otimização → Revisão) |
| `/zcf:feat` | Desenvolvimento de funcionalidades com planejamento e design UI/UX |
| `/zcf:git-commit` | Commit Git automatizado |
| `/zcf:git-rollback` | Rollback Git |
| `/zcf:bmad-init` | Workflow ágil empresarial |

---

## 4. Serviços MCP

| Serviço | Descrição |
|---|---|
| `context7` | Recuperação de contexto e documentação de bibliotecas |
| `open-websearch` | Pesquisa DuckDuckGo/Bing/Brave |
| `spec-workflow` | MCP de workflow Spec |
| `Playwright` | Automação de navegador |

```bash
npx zcf i -s --mcp-services context7,open-websearch
```

---

## 5. Atualização

```bash
npx zcf update
```

---

## Perguntas frequentes

### Meu settings.json existente será sobrescrito?

O ZCF faz backup automático em `~/.claude/backup/` antes de qualquer alteração, e oferece quatro estratégias: backup e sobrescrever / mesclagem inteligente / apenas documentos / ignorar.

### Como voltar à configuração manual?

O `settings.json` gerado está em formato padrão — edite diretamente. Ver [Configuração Claude  Code](/pt/start).
