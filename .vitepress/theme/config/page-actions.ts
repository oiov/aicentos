export type LocaleCode = 'zh-CN' | 'en-US' | 'fr-FR' | 'es-ES' | 'pt-BR'

export type PageActionContext = {
  path: string
  lang: LocaleCode
  docUrl: string
  githubMdPath: string | null
  githubMdUrl: string | null
  githubRawMdUrl: string | null
  preferredReadUrl: string
}

export type PageActionPlatform = {
  id: 'github' | 'chatclaude' | 'claude' | 'scira' | 't3chat'
  enabled: boolean
  labelByLocale?: Partial<Record<LocaleCode, string>>
  labelI18nKey?: string
  urlBuilder: (ctx: PageActionContext) => string | null
}

export const PAGE_ACTION_CONFIG = {
  siteBaseUrl: 'https://doc.fishxcode.com',
  github: {
    owner: 'fishxcode',
    repo: 'fishxcode',
    branch: 'main',
    pathPrefix: '',
  },
  copyOptions: {
    copyRawMd: true,
    copyArticleLink: true,
  },
  platforms: [
    {
      id: 'github',
      enabled: true,
      labelI18nKey: 'openInGithub',
      urlBuilder: (ctx: PageActionContext) => ctx.githubMdUrl,
    },
    {
      id: 'chatclaude',
      enabled: false,
      labelI18nKey: 'openInChatClaude',
      urlBuilder: () => null,
    },
    {
      id: 'claude',
      enabled: true,
      labelI18nKey: 'openInClaude',
      urlBuilder: (ctx: PageActionContext) =>
        `https://claude.ai/new?q=${encodeURIComponent(`Read ${ctx.preferredReadUrl}, I want to ask questions about it.`)}`,
    },
    {
      id: 'scira',
      enabled: false,
      labelI18nKey: 'openInSciraAI',
      urlBuilder: () => null,
    },
    {
      id: 't3chat',
      enabled: true,
      labelI18nKey: 'openInT3Chat',
      urlBuilder: (ctx: PageActionContext) =>
        `https://t3.chat/new?q=${encodeURIComponent(`Read ${ctx.preferredReadUrl}, I want to ask questions about it.`)}`,
    },
  ] as PageActionPlatform[],
} as const
