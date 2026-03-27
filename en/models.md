# Supported Models

AICentos supports a variety of AI models from multiple providers, covering different use cases and toolchains. You can freely choose and switch models based on your needs.

## Anthropic (Claude)

| Model ID | Description | Recommended Use Case | Compatible Tools |
|----------|-------------|---------------------|-----------------|
| `claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 latest, strongest overall | Complex coding, architecture design | Claude Code |
| `claude-sonnet-4-5-20250514` | Claude Sonnet 4.5 stable | Daily coding, code review | Claude Code |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5, balanced speed and quality | Quick completions, lightweight tasks | Claude Code |
| `claude-3-5-haiku-20241022` | Claude 3.5 Haiku, fastest response | High-frequency calls, real-time completions | Claude Code |

## OpenAI

| Model ID | Description | Recommended Use Case | Compatible Tools |
|----------|-------------|---------------------|-----------------|
| `gpt-5` | GPT-5, OpenAI flagship model | General coding, conversational development | Codex, RooCode, Qwen Code |

## Other Models

| Model ID | Description | Recommended Use Case | Compatible Tools |
|----------|-------------|---------------------|-----------------|
| `glm-4.5` | Zhipu GLM-4.5 | General-purpose development | RooCode, Qwen Code |
| `glm-4.6` | Zhipu GLM-4.6, improved performance | Complex reasoning, development | RooCode, Qwen Code |
| `deepseek-v3.1` | DeepSeek V3.1, strong deep reasoning | Algorithm implementation, logical reasoning | RooCode, Qwen Code |

## Switching Models

### Claude Code

Set the primary model via environment variables:

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

Edit `~/.codex/config.toml` and change the `model` field:

```toml
model = "gpt-5"
```

### RooCode / Qwen Code

Change the **Model** field directly in the provider configuration. Any compatible model ID listed above can be used.

## Model Recommendations

::: tip Best for Coding
**claude-sonnet-4-5-20250929** — Strongest overall coding capability, ideal for complex projects and architecture-level tasks.
:::

::: tip Best for Speed
**claude-3-5-haiku-20241022** — Fastest response time, ideal for high-frequency calls and real-time completion scenarios.
:::

::: tip Best Balance
**claude-haiku-4-5-20251001** — Great balance between speed and quality, suitable for most daily development tasks.
:::
