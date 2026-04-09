<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const activeTab = ref<'claude' | 'codex'>('claude')

const I18N: Record<string, Record<string, string>> = {
  'zh-CN': {
    commentClaude: '// 配置 Claude',
    commentCodex: '// 配置 Codex',
    start: '# 开始编码',
  },
  'en': {
    commentClaude: '// Setup Claude',
    commentCodex: '// Setup Codex',
    start: '# Start coding',
  },
  'fr': {
    commentClaude: '// Configurer Claude',
    commentCodex: '// Configurer Codex',
    start: '# Commencer à coder',
  },
  'es': {
    commentClaude: '// Configurar Claude',
    commentCodex: '// Configurar Codex',
    start: '# Empezar a programar',
  },
  'pt': {
    commentClaude: '// Configurar Claude',
    commentCodex: '// Configurar Codex',
    start: '# Começar a programar',
  },
}

const t = computed(() => {
  const l = lang.value?.replace(/^\/|\/$/g, '') || 'zh-CN'
  return I18N[l] || I18N['zh-CN']
})

const config = computed(() => {
  if (activeTab.value === 'codex') {
    return {
      comment: t.value.commentCodex,
      lines: [
        { keyword: 'export', varName: 'OPENAI_BASE_URL', value: '"https://nbility.dev/v1"' },
        { keyword: 'export', varName: 'OPENAI_API_KEY', value: '"sk-..."' },
      ],
      command: 'codex',
    }
  }
  return {
    comment: t.value.commentClaude,
    lines: [
      { keyword: 'export', varName: 'ANTHROPIC_BASE_URL', value: '"https://nbility.dev"' },
      { keyword: 'export', varName: 'ANTHROPIC_API_KEY', value: '"sk-..."' },
    ],
    command: 'claude',
  }
})
</script>

<template>
  <div class="terminal-preview">
    <div class="terminal">
      <div class="terminal-bar">
        <span class="terminal-dot" style="background:#ff5f57"></span>
        <span class="terminal-dot" style="background:#febc2e"></span>
        <span class="terminal-dot" style="background:#28c840"></span>
        <span class="terminal-bar-title">TERMINAL — zsh</span>
      </div>
      <div class="terminal-body">
        <div class="terminal-tabs">
          <button
            class="terminal-tab"
            :class="{ active: activeTab === 'claude' }"
            @click="activeTab = 'claude'"
          >Claude</button>
          <button
            class="terminal-tab"
            :class="{ active: activeTab === 'codex' }"
            @click="activeTab = 'codex'"
          >Codex</button>
        </div>
        <div class="terminal-content">
          <p><span class="cm">{{ config.comment }}</span></p>
          <p v-for="(line, i) in config.lines" :key="i">
            <span class="kw">{{ line.keyword }}</span>
            {{ ' ' }}
            <span class="var-name">{{ line.varName }}</span><span class="op">=</span><span class="str">{{ line.value }}</span>
          </p>
          <p>&nbsp;</p>
          <p><span class="cm">{{ t.start }}</span></p>
          <p><span class="run">$</span> <span class="cmd">{{ config.command }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal-preview {
  max-width: 520px;
  margin: 4rem auto 2rem;
  padding: 0 24px;
}

.terminal {
  background: #2a251f;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
  text-align: left;
}

.terminal-bar {
  background: #1c1814;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.terminal-bar-title {
  color: #6a7a8e;
  font-size: 12px;
  margin-left: 8px;
}

.terminal-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.terminal-body {
  padding: 18px 22px;
  color: #a3b8d0;
  overflow-x: auto;
}

.terminal-tabs {
  display: inline-flex;
  gap: 8px;
  margin-bottom: 14px;
}

.terminal-tab {
  background: rgba(163, 184, 208, 0.12);
  color: #a3b8d0;
  border: 1px solid rgba(163, 184, 208, 0.2);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.terminal-tab.active {
  color: #2a251f;
  background: #86efac;
  border-color: #86efac;
}

.terminal-content p {
  margin: 0;
}

.cm { color: #6a7a8e; }
.kw { color: #c084fc; }
.str { color: #86efac; }
.var-name { color: #93c5fd; font-weight: bold; }
.op { color: #fbbf24; }
.run { color: #34d399; }
.cmd { color: #e2e8f0; }

@media (max-width: 640px) {
  .terminal {
    font-size: 11px;
  }
  .terminal-body {
    padding: 14px 16px;
  }
}
</style>
