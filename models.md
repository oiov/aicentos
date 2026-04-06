# 支持的模型

NBility 平台支持来自多个供应商的 AI 模型，覆盖不同的使用场景和工具链。你可以根据实际需求自由选择和切换模型。

## Anthropic (Claude)

| 模型 ID | 说明 | 推荐场景 | 兼容工具 |
|---------|------|---------|---------|
| `claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 最新版，综合能力最强 | 复杂编码、架构设计 | Claude Code |
| `claude-sonnet-4-5-20250514` | Claude Sonnet 4.5 稳定版 | 日常编码、代码审查 | Claude Code |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5，速度与质量兼顾 | 快速补全、轻量任务 | Claude Code |
| `claude-3-5-haiku-20241022` | Claude 3.5 Haiku，响应最快 | 高频调用、实时补全 | Claude Code |

## OpenAI

| 模型 ID | 说明 | 推荐场景 | 兼容工具 |
|---------|------|---------|---------|
| `gpt-5` | GPT-5，OpenAI 旗舰模型 | 通用编码、对话式开发 | Codex, RooCode, Qwen Code |

## 其他模型

| 模型 ID | 说明 | 推荐场景 | 兼容工具 |
|---------|------|---------|---------|
| `glm-4.5` | 智谱 GLM-4.5 | 中文编码、通用开发 | RooCode, Qwen Code |
| `glm-4.6` | 智谱 GLM-4.6，性能升级 | 中文编码、复杂推理 | RooCode, Qwen Code |
| `deepseek-v3.1` | DeepSeek V3.1，深度推理能力突出 | 算法实现、逻辑推理 | RooCode, Qwen Code |

## 切换模型

### Claude Code

通过环境变量设置主模型：

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

编辑 `~/.codex/config.toml`，修改 `model` 字段：

```toml
model = "gpt-5"
```

### RooCode / Qwen Code

在提供商配置中直接修改 **Model** 字段即可。支持填写上述任何兼容模型的 ID。

## 模型推荐

::: tip 最佳编码能力
**claude-sonnet-4-5-20250929** — 综合编码能力最强，适合复杂项目和架构级任务。
:::

::: tip 最佳响应速度
**claude-3-5-haiku-20241022** — 响应速度最快，适合高频调用和实时补全场景。
:::

::: tip 最佳性价比
**claude-haiku-4-5-20251001** — 在速度和质量之间取得良好平衡，适合大多数日常开发任务。
:::
