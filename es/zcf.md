# Configuración rápida con ZCF

[ZCF](https://zcf.ufomiao.com) es una herramienta de configuración cero para Claude  Code. Un solo comando gestiona la configuración de la API, la importación de workflows y la integración de servicios MCP.

## 1. Conexión rápida

```bash
npx zcf i -s -t api_key -k "tu-clave-api" -u "https://fishxcode.com/"
```

Reemplaza `tu-clave-api` con el token `sk-xxx` obtenido desde la [Consola FishXCode](https://fishxcode.com/console/token).

Esto escribe automáticamente en `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-xxx",
    "ANTHROPIC_BASE_URL": "https://fishxcode.com/"
  }
}
```

### Fijar un modelo específico (opcional)

```bash
npx zcf i -s -t api_key -k "sk-xxx" -u "https://fishxcode.com/" \
  --api-model "claude-sonnet-4-5-20250929" \
  --api-fast-model "claude-haiku-4-5-20251001"
```

---

## 2. Inicialización completa (Recomendado)

Configura API, workflows y servicios MCP de una vez:

```bash
npx zcf i -s -t api_key -k "sk-xxx" -u "https://fishxcode.com/" \
  --workflows all \
  --mcp-services context7,open-websearch \
  --output-styles engineer-professional
```

Estructura `~/.claude/` resultante:

```
~/.claude/
├── settings.json          # API, MCP, permisos
├── CLAUDE.md              # Prompt de sistema global
├── commands/zcf/          # Comandos de workflow
└── agents/zcf/            # Agentes de workflow
```

---

## 3. Comandos de workflow

Después de la instalación, úsalos en Claude  Code:

| Comando | Descripción |
|---|---|
| `/zcf:workflow` | Workflow de seis fases (Investigación → Ideas → Plan → Ejecución → Optimización → Revisión) |
| `/zcf:feat` | Desarrollo de funciones con planificación y diseño UI/UX |
| `/zcf:git-commit` | Commit de Git automatizado |
| `/zcf:git-rollback` | Rollback de Git |
| `/zcf:bmad-init` | Workflow ágil empresarial |

---

## 4. Servicios MCP

| Servicio | Descripción |
|---|---|
| `context7` | Recuperación de contexto y documentación de bibliotecas |
| `open-websearch` | Búsqueda DuckDuckGo/Bing/Brave |
| `spec-workflow` | MCP de workflow Spec |
| `Playwright` | Automatización del navegador |

```bash
npx zcf i -s --mcp-services context7,open-websearch
```

---

## 5. Actualización

```bash
npx zcf update
```

---

## Preguntas frecuentes

### ¿Se sobrescribirá mi settings.json existente?

ZCF hace una copia de seguridad automática en `~/.claude/backup/` antes de cualquier cambio, y ofrece cuatro estrategias: copia de seguridad y sobrescritura / fusión inteligente / solo documentos / omitir.

### ¿Cómo volver a la configuración manual?

El `settings.json` generado está en formato estándar — edítalo directamente. Ver [Configuración Claude  Code](/es/start).
