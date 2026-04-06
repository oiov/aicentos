# Modelos compatibles

NBility es compatible con una variedad de modelos de IA de multiples proveedores, cubriendo diferentes casos de uso y cadenas de herramientas. Puedes elegir y cambiar de modelo libremente segun tus necesidades.

## Anthropic (Claude)

| ID del modelo | Descripcion | Caso de uso recomendado | Herramientas compatibles |
|--------------|-------------|------------------------|------------------------|
| `claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 ultima version, el mas potente | Codificacion compleja, diseno de arquitectura | Claude Code |
| `claude-sonnet-4-5-20250514` | Claude Sonnet 4.5 version estable | Codificacion diaria, revision de codigo | Claude Code |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5, equilibrio entre velocidad y calidad | Completaciones rapidas, tareas ligeras | Claude Code |
| `claude-3-5-haiku-20241022` | Claude 3.5 Haiku, respuesta mas rapida | Llamadas frecuentes, completaciones en tiempo real | Claude Code |

## OpenAI

| ID del modelo | Descripcion | Caso de uso recomendado | Herramientas compatibles |
|--------------|-------------|------------------------|------------------------|
| `gpt-5` | GPT-5, modelo insignia de OpenAI | Codificacion general, desarrollo conversacional | Codex, RooCode, Qwen Code |

## Otros modelos

| ID del modelo | Descripcion | Caso de uso recomendado | Herramientas compatibles |
|--------------|-------------|------------------------|------------------------|
| `glm-4.5` | Zhipu GLM-4.5 | Desarrollo general | RooCode, Qwen Code |
| `glm-4.6` | Zhipu GLM-4.6, rendimiento mejorado | Razonamiento complejo, desarrollo | RooCode, Qwen Code |
| `deepseek-v3.1` | DeepSeek V3.1, razonamiento profundo destacado | Implementacion de algoritmos, razonamiento logico | RooCode, Qwen Code |

## Cambiar de modelo

### Claude Code

Configura el modelo principal mediante variables de entorno:

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

Edita `~/.codex/config.toml` y cambia el campo `model`:

```toml
model = "gpt-5"
```

### RooCode / Qwen Code

Cambia el campo **Model** directamente en la configuracion del proveedor. Se puede usar cualquier ID de modelo compatible de la lista anterior.

## Recomendaciones

::: tip Mejor para codificacion
**claude-sonnet-4-5-20250929** — La mayor capacidad de codificacion general, ideal para proyectos complejos y tareas de arquitectura.
:::

::: tip Mejor velocidad
**claude-3-5-haiku-20241022** — Tiempo de respuesta mas rapido, ideal para llamadas frecuentes y completaciones en tiempo real.
:::

::: tip Mejor equilibrio
**claude-haiku-4-5-20251001** — Excelente equilibrio entre velocidad y calidad, adecuado para la mayoria de las tareas de desarrollo diarias.
:::
