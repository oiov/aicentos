# Modelos suportados

O AICentos oferece suporte a uma variedade de modelos de IA de diversos provedores, cobrindo diferentes casos de uso e cadeias de ferramentas. Voce pode escolher e trocar de modelo livremente conforme suas necessidades.

## Anthropic (Claude)

| ID do modelo | Descricao | Caso de uso recomendado | Ferramentas compativeis |
|-------------|-----------|------------------------|------------------------|
| `claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 versao mais recente, o mais poderoso | Codificacao complexa, design de arquitetura | Claude Code |
| `claude-sonnet-4-5-20250514` | Claude Sonnet 4.5 versao estavel | Codificacao diaria, revisao de codigo | Claude Code |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5, equilibrio entre velocidade e qualidade | Completacoes rapidas, tarefas leves | Claude Code |
| `claude-3-5-haiku-20241022` | Claude 3.5 Haiku, resposta mais rapida | Chamadas frequentes, completacoes em tempo real | Claude Code |

## OpenAI

| ID do modelo | Descricao | Caso de uso recomendado | Ferramentas compativeis |
|-------------|-----------|------------------------|------------------------|
| `gpt-5` | GPT-5, modelo principal da OpenAI | Codificacao geral, desenvolvimento conversacional | Codex, RooCode, Qwen Code |

## Outros modelos

| ID do modelo | Descricao | Caso de uso recomendado | Ferramentas compativeis |
|-------------|-----------|------------------------|------------------------|
| `glm-4.5` | Zhipu GLM-4.5 | Desenvolvimento geral | RooCode, Qwen Code |
| `glm-4.6` | Zhipu GLM-4.6, desempenho aprimorado | Raciocinio complexo, desenvolvimento | RooCode, Qwen Code |
| `deepseek-v3.1` | DeepSeek V3.1, raciocinio profundo destacado | Implementacao de algoritmos, raciocinio logico | RooCode, Qwen Code |

## Trocar de modelo

### Claude Code

Defina o modelo principal atraves de variaveis de ambiente:

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

Edite o arquivo `~/.codex/config.toml` e altere o campo `model`:

```toml
model = "gpt-5"
```

### RooCode / Qwen Code

Altere o campo **Model** diretamente na configuracao do provedor. Qualquer ID de modelo compativel listado acima pode ser utilizado.

## Recomendacoes

::: tip Melhor para codificacao
**claude-sonnet-4-5-20250929** — Maior capacidade geral de codificacao, ideal para projetos complexos e tarefas de arquitetura.
:::

::: tip Melhor velocidade
**claude-3-5-haiku-20241022** — Tempo de resposta mais rapido, ideal para chamadas frequentes e completacoes em tempo real.
:::

::: tip Melhor equilibrio
**claude-haiku-4-5-20251001** — Excelente equilibrio entre velocidade e qualidade, adequado para a maioria das tarefas de desenvolvimento diarias.
:::
