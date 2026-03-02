# Usar FishXCode con Claude  Code

## 1. Obtener una API Key

### 1. Registrarse

Visita [fishxcode.com](https://fishxcode.com/register?aff=9CTW) y haz clic en **Registrarse**:

![Página de inicio de FishXCode](/img/start/api-01-home.png)

Elige el método de registro (GitHub, LinuxDO o nombre de usuario):

![Selección del método de registro](/img/start/api-02-register.png)

Completa el formulario con nombre de usuario, contraseña y confirmación de contraseña:

![Formulario de registro](/img/start/api-03-register-form.png)

### 2. Iniciar sesión

Una vez registrado, inicia sesión con tu nombre de usuario y contraseña:

![Página de inicio de sesión](/img/start/api-04-login.png)

Tras iniciar sesión, accederás a la consola:

![Página principal de la consola](/img/start/api-05-console.png)

### 3. Crear un token

Ve a **Consola → Gestión de tokens → Agregar token** y rellena el formulario:

![Agregar token](/img/start/api-06-token-create.png)

- En **Grupo de tokens**, se recomienda seleccionar el **canal oficial**. Este grupo incluye `claude-opus-4-5-20251101`, `claude-haiku-4-5-20251001`, `claude-opus-4-6`, `claude-sonnet-4-5-20250929`, `claude-sonnet-4-6`, etc. El modelo se selecciona automáticamente según la complejidad de la tarea, sin necesidad de cambiarlo manualmente.

Una vez creado, haz clic en el botón **Copiar** en la lista de tokens para obtener tu API Key (formato: `sk-xxx`):

![Copiar token](/img/start/api-07-token-copy.png)

### 4. Recargar saldo

Ve a **Consola → Gestión de billetera**. Se admite Alipay, WeChat o código de canje:

![Página de recarga](/img/start/api-08-wallet.png)

| Método | Ruta |
|---|---|
| Alipay | Ingresar/seleccionar monto → Alipay |
| WeChat Pay | Ingresar/seleccionar monto → WeChat |
| Código de canje | Ingresar código en el área de canje → Clic en Canjear saldo |

::: tip Explicación del multiplicador
El `0.5x multiplicador` en el nombre del grupo indica la tasa de consumo. Cuanto menor sea el valor, más tokens obtienes. Por ejemplo, `0.5x` significa que por ¥1 puedes usar 10 millones de tokens oficiales (frente a los 5 millones al precio oficial).
:::

---

## 2. Preparación del entorno

### Instalar Node.js

Claude  Code se instala via npm. Verifica primero que Node.js esté disponible.

::: code-group

```bash [macOS - Verificar]
node -v
npm -v
```

```bash [macOS - Instalar con Homebrew]
brew install node
```

```bash [Windows - Verificar (CMD/PowerShell)]
node -v
npm -v
```

:::

Si no está instalado, descarga desde [nodejs.org/es/download](https://nodejs.org/es/download). **Windows requiere reiniciar** después de la instalación.

### Solo Windows: instalar Git Bash

Claude  Code requiere un entorno bash. Los usuarios de Windows deben instalar Git Bash:

1. Descarga desde [git-scm.com/download/windows](https://git-scm.com/download/windows) e instala la versión correspondiente.
2. Verificación: clic derecho en el escritorio — si aparece **Open Git Bash here**, la instalación fue exitosa.

---

## 3. Instalar Claude  Code

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

Verificar la instalación:

```bash
claude --version
```

---

## 4. Configurar FishXCode

### Opción 1: settings.json (Recomendado)

Edita `~/.claude/settings.json` (Windows: `C:\Users\<usuario>\.claude\settings.json`) con el siguiente contenido:

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "reemplaza con tu API Key",
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

Esta configuración es **permanente** — no es necesario definir variables de entorno en cada sesión.

### Opción 2: Variables de entorno temporales

::: code-group

```bash [macOS/Linux]
export ANTHROPIC_BASE_URL=https://fishxcode.com/
export ANTHROPIC_AUTH_TOKEN=sk-xxx
```

```powershell [Windows PowerShell (temporal)]
$env:ANTHROPIC_BASE_URL="https://fishxcode.com/"
$env:ANTHROPIC_AUTH_TOKEN="sk-xxx"
```

```cmd [Windows CMD (temporal)]
set ANTHROPIC_BASE_URL=https://fishxcode.com/
set ANTHROPIC_AUTH_TOKEN=sk-xxx
```

:::

Para escribir permanentemente en las variables del sistema Windows, ejecuta en PowerShell:

```powershell
setx ANTHROPIC_AUTH_TOKEN "sk-xxx"
setx ANTHROPIC_BASE_URL "https://fishxcode.com/"
```

Vuelve a abrir la terminal después de ejecutar estos comandos.

::: warning
Reemplaza `sk-xxx` con tu token real obtenido en la [Consola FishXCode](https://fishxcode.com/console/token).
:::

---

## 5. Iniciar

```bash
cd mi-proyecto
claude
```

---

## 6. Selección de modelo

Escribe `/model` dentro de Claude  Code para cambiar de modelo:

| Opción | Modelo real | Notas |
|---|---|---|
| **Default** | `claude-sonnet-4-5-20250929` + `claude-haiku-4-5-20251001` | Selección automática según la tarea. Recomendado para uso diario. |
| **Opus** | `claude-opus-4-5-20251101` | Razonamiento más potente, mayor costo |
| **Haiku** | `claude-haiku-4-5-20251001` | Ligero y rápido |

También puedes fijar un modelo mediante variable de entorno:

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

::: tip Actualizar Claude  Code
Si la versión del modelo parece desactualizada, ejecuta el comando de actualización y reinicia tus herramientas:
```bash
npm install -g @anthropic-ai/claude-code
```
:::

---

## 7. Integración con IDE

### IntelliJ IDEA

Ruta: Archivo → Configuración → Plugins → Marketplace → buscar `claude code` → encontrar **Claude  Code Terminal** e instalar:

![Instalar Claude  Code Terminal](/img/start/idea-01-install.png)

Reinicia IDEA tras la instalación y verifica que el plugin se haya cargado:

![Verificar que el plugin está cargado](/img/start/idea-02-verify.png)

::: info
Si el plugin no aparece en el Marketplace, tu versión de IDEA es demasiado antigua — actualízala a la última versión.
:::

### VSCode

Presiona `Ctrl + Shift + X` para abrir el panel de extensiones, busca `claude code` y encuentra **Claude  Code for VSCode** para instalar.

![Buscar e instalar el plugin de Claude  Code](/img/start/vscode-01-install.png)

Una vez instalado, el plugin ofrece tres métodos de conexión:

![Métodos de conexión del plugin Claude  Code](/img/start/vscode-02-login.png)

Se recomienda conectar FishXCode mediante `settings.json`. Haz clic en el **icono de engranaje** en la esquina inferior derecha del plugin → **Editar en settings.json**:

![Abrir settings.json para editar](/img/start/vscode-03-settings.png)

Añade lo siguiente en el `settings.json` de VSCode:

```json
{
  "claudeCode.preferredLocation": "panel",
  "claudeCode.environmentVariables": [
    { "name": "ANTHROPIC_AUTH_TOKEN", "value": "reemplaza con tu API Key" },
    { "name": "ANTHROPIC_BASE_URL", "value": "https://fishxcode.com/" }
  ]
}
```

![Ejemplo de configuración en settings.json](/img/start/vscode-04-config.png)

Tras guardar, **cierra y vuelve a abrir VSCode**; el plugin se conectará correctamente a FishXCode.

![Usando Claude  Code en VSCode](/img/start/vscode-05-demo.gif)

---

## 8. Preguntas frecuentes

### Error 403

El saldo del token es insuficiente. Recarga en la consola y vuelve a intentarlo.

### Windows: error de conexión o 400/401

Ejecuta estos comandos en PowerShell para escribir variables del sistema permanentes y luego reabre la terminal:

```powershell
setx ANTHROPIC_AUTH_TOKEN "sk-xxx"
setx ANTHROPIC_BASE_URL "https://fishxcode.com/"
```

### "Unable to connect to Anthropic services"

Error completo:

```
Unable to connect to Anthropic services
Failed to connect to api.anthropic.com: ERR_BAD_REQUEST
Please check your internet connection and network settings.
```

Esto ocurre porque Claude  Code no ha completado el onboarding y sigue intentando conectarse a `api.anthropic.com`. **No se necesita VPN.** Abre `~/.claude.json` (el archivo `.claude.json` en tu directorio home — no `.claude/settings.json`) y añade `"hasCompletedOnboarding": true` al final:

```json
{
  "installMethod": "unknown",
  "autoUpdates": true,
  "projects": { ... },
  "hasCompletedOnboarding": true
}
```

::: tip
Añade una coma después del campo anterior antes de agregar la nueva entrada (requisito de sintaxis JSON). Reinicia `claude` después de guardar.
:::
