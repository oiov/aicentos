/// <reference lib="deno.ns" />
// FishXCode 升级维护页面 - Deno 单文件服务器
// 用法: deno run --allow-net --allow-env maintenance.deno.ts
// 环境变量:
//   PORT          - 监听端口 (默认 8001)
//   ESTIMATED_MIN - 预计维护时间(分钟, 默认 60)
//   CONTACT_EMAIL - 联系邮箱 (默认 support@fishxcode.com)
//   REDIRECT_URL  - 维护结束后跳转地址 (默认 https://fishxcode.com)

const PORT = Number(Deno.env.get("PORT")) || 8001;
const ESTIMATED_MIN = Number(Deno.env.get("ESTIMATED_MIN")) || 60;
const CONTACT_EMAIL = Deno.env.get("CONTACT_EMAIL") || "support@fishxcode.com";
const REDIRECT_URL = Deno.env.get("REDIRECT_URL") || "https://fishxcode.com";
const START_TIME = new Date();

// ─── i18n ────────────────────────────────────────────────────────────────────
interface I18nTexts {
  title: string;
  heading: string;
  subtitle: string;
  desc: string;
  progress: string;
  eta: string;
  status1: string;
  status2: string;
  status3: string;
  faq: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  contact: string;
  footer: string;
  lightMode: string;
  darkMode: string;
}

const LANG_LABELS: Record<string, string> = {
  zh: "简体中文",
  en: "English",
  fr: "Français",
  es: "Español",
  pt: "Português",
  ja: "日本語",
  ko: "한국어",
  ru: "Русский",
  vi: "Tiếng Việt",
};

const I18N: Record<string, I18nTexts> = {
  zh: {
    title: "FishXCode - 系统升级维护中",
    heading: "系统升级维护中",
    subtitle: "我们正在为您带来更好的体验",
    desc: "FishXCode 正在进行系统升级，以提升服务稳定性和性能。升级期间所有服务暂时不可用，您的数据安全不会受到任何影响。",
    progress: "升级进度",
    eta: `预计维护时间约 ${ESTIMATED_MIN} 分钟`,
    status1: "备份数据",
    status2: "系统升级",
    status3: "服务恢复",
    faq: "常见问题",
    faqQ1: "我的数据会丢失吗？",
    faqA1: "不会。所有用户数据已在维护前完成备份，升级过程不会影响任何数据安全。",
    faqQ2: "升级期间 API Key 还能用吗？",
    faqA2: "升级期间 API 服务暂时不可用，升级完成后您的 Key 将自动恢复使用，无需重新配置。",
    faqQ3: "升级后需要重新登录吗？",
    faqA3: "不需要。您的登录状态和所有配置在升级后都将保持不变。",
    contact: "如有紧急问题，请联系",
    footer: "FishXCode - AI Coding 中转站",
    lightMode: "浅色",
    darkMode: "深色",
  },
  en: {
    title: "FishXCode - System Maintenance",
    heading: "System Upgrade in Progress",
    subtitle: "We're working to bring you a better experience",
    desc: "FishXCode is undergoing a system upgrade to improve service stability and performance. All services are temporarily unavailable during this period. Your data remains safe and secure.",
    progress: "Upgrade Progress",
    eta: `Estimated maintenance time: ${ESTIMATED_MIN} minutes`,
    status1: "Data Backup",
    status2: "System Upgrade",
    status3: "Service Recovery",
    faq: "FAQ",
    faqQ1: "Will I lose my data?",
    faqA1: "No. All user data has been backed up before maintenance. The upgrade process will not affect data safety.",
    faqQ2: "Can I use my API Key during the upgrade?",
    faqA2: "API services are temporarily unavailable during the upgrade. Your Key will automatically resume working after completion — no reconfiguration needed.",
    faqQ3: "Do I need to log in again after the upgrade?",
    faqA3: "No. Your login status and all configurations will remain intact after the upgrade.",
    contact: "For urgent issues, please contact",
    footer: "FishXCode - AI Coding Hub",
    lightMode: "Light",
    darkMode: "Dark",
  },
  fr: {
    title: "FishXCode - Maintenance du système",
    heading: "Mise à jour du système en cours",
    subtitle: "Nous travaillons pour vous offrir une meilleure expérience",
    desc: "FishXCode effectue une mise à jour du système pour améliorer la stabilité et les performances. Tous les services sont temporairement indisponibles. Vos données restent en sécurité.",
    progress: "Progression de la mise à jour",
    eta: `Durée estimée de la maintenance : ${ESTIMATED_MIN} minutes`,
    status1: "Sauvegarde",
    status2: "Mise à jour",
    status3: "Récupération",
    faq: "Questions fréquentes",
    faqQ1: "Vais-je perdre mes données ?",
    faqA1: "Non. Toutes les données ont été sauvegardées avant la maintenance. Le processus de mise à jour n'affectera pas la sécurité des données.",
    faqQ2: "Puis-je utiliser ma clé API pendant la mise à jour ?",
    faqA2: "Les services API sont temporairement indisponibles. Votre clé reprendra automatiquement son fonctionnement après la mise à jour.",
    faqQ3: "Dois-je me reconnecter après la mise à jour ?",
    faqA3: "Non. Votre état de connexion et toutes vos configurations seront préservés.",
    contact: "Pour les questions urgentes, contactez",
    footer: "FishXCode - Relais AI Coding",
    lightMode: "Clair",
    darkMode: "Sombre",
  },
  es: {
    title: "FishXCode - Mantenimiento del sistema",
    heading: "Actualización del sistema en curso",
    subtitle: "Estamos trabajando para ofrecerte una mejor experiencia",
    desc: "FishXCode está realizando una actualización del sistema para mejorar la estabilidad y el rendimiento. Todos los servicios no están disponibles temporalmente. Tus datos están seguros.",
    progress: "Progreso de la actualización",
    eta: `Tiempo estimado de mantenimiento: ${ESTIMATED_MIN} minutos`,
    status1: "Respaldo",
    status2: "Actualización",
    status3: "Recuperación",
    faq: "Preguntas frecuentes",
    faqQ1: "¿Perderé mis datos?",
    faqA1: "No. Todos los datos fueron respaldados antes del mantenimiento. El proceso de actualización no afectará la seguridad de los datos.",
    faqQ2: "¿Puedo usar mi API Key durante la actualización?",
    faqA2: "Los servicios API están temporalmente no disponibles. Tu Key se restaurará automáticamente al finalizar.",
    faqQ3: "¿Necesito iniciar sesión de nuevo después de la actualización?",
    faqA3: "No. Tu estado de sesión y todas las configuraciones se mantendrán intactas.",
    contact: "Para problemas urgentes, contacta a",
    footer: "FishXCode - Estación de relevo AI Coding",
    lightMode: "Claro",
    darkMode: "Oscuro",
  },
  pt: {
    title: "FishXCode - Manutenção do sistema",
    heading: "Atualização do sistema em andamento",
    subtitle: "Estamos trabalhando para oferecer uma melhor experiência",
    desc: "O FishXCode está passando por uma atualização do sistema para melhorar a estabilidade e o desempenho. Todos os serviços estão temporariamente indisponíveis. Seus dados permanecem seguros.",
    progress: "Progresso da atualização",
    eta: `Tempo estimado de manutenção: ${ESTIMATED_MIN} minutos`,
    status1: "Backup",
    status2: "Atualização",
    status3: "Recuperação",
    faq: "Perguntas frequentes",
    faqQ1: "Vou perder meus dados?",
    faqA1: "Não. Todos os dados foram salvos antes da manutenção. O processo de atualização não afetará a segurança dos dados.",
    faqQ2: "Posso usar minha API Key durante a atualização?",
    faqA2: "Os serviços API estão temporariamente indisponíveis. Sua Key será restaurada automaticamente após a conclusão.",
    faqQ3: "Preciso fazer login novamente após a atualização?",
    faqA3: "Não. Seu estado de login e todas as configurações permanecerão intactos.",
    contact: "Para questões urgentes, entre em contato com",
    footer: "FishXCode - Hub de AI Coding",
    lightMode: "Claro",
    darkMode: "Escuro",
  },
  ja: {
    title: "FishXCode - システムメンテナンス中",
    heading: "システムアップグレード中",
    subtitle: "より良い体験をお届けするために作業中です",
    desc: "FishXCode はサービスの安定性とパフォーマンスを向上させるためにシステムアップグレードを実施中です。メンテナンス中はすべてのサービスが一時的に利用できません。データの安全性には影響ありません。",
    progress: "アップグレード進捗",
    eta: `予想メンテナンス時間: 約${ESTIMATED_MIN}分`,
    status1: "データバックアップ",
    status2: "システムアップグレード",
    status3: "サービス復旧",
    faq: "よくある質問",
    faqQ1: "データは失われますか？",
    faqA1: "いいえ。すべてのデータはメンテナンス前にバックアップ済みです。アップグレードはデータの安全性に影響しません。",
    faqQ2: "アップグレード中にAPIキーは使えますか？",
    faqA2: "アップグレード中はAPIサービスが一時停止します。完了後は自動的に復旧し、再設定は不要です。",
    faqQ3: "アップグレード後に再ログインが必要ですか？",
    faqA3: "いいえ。ログイン状態と設定はそのまま維持されます。",
    contact: "緊急のお問い合わせは",
    footer: "FishXCode - AI Coding ハブ",
    lightMode: "ライト",
    darkMode: "ダーク",
  },
  ko: {
    title: "FishXCode - 시스템 유지보수 중",
    heading: "시스템 업그레이드 진행 중",
    subtitle: "더 나은 경험을 위해 작업 중입니다",
    desc: "FishXCode는 서비스 안정성과 성능을 향상시키기 위해 시스템 업그레이드를 진행하고 있습니다. 업그레이드 기간 동안 모든 서비스가 일시적으로 사용할 수 없습니다. 데이터 보안에는 영향이 없습니다.",
    progress: "업그레이드 진행률",
    eta: `예상 유지보수 시간: 약 ${ESTIMATED_MIN}분`,
    status1: "데이터 백업",
    status2: "시스템 업그레이드",
    status3: "서비스 복구",
    faq: "자주 묻는 질문",
    faqQ1: "데이터가 손실되나요?",
    faqA1: "아닙니다. 유지보수 전에 모든 데이터가 백업되었습니다. 업그레이드는 데이터 안전에 영향을 미치지 않습니다.",
    faqQ2: "업그레이드 중에 API Key를 사용할 수 있나요?",
    faqA2: "업그레이드 중에는 API 서비스가 일시 중단됩니다. 완료 후 자동으로 복구되며 재설정이 필요 없습니다.",
    faqQ3: "업그레이드 후 다시 로그인해야 하나요?",
    faqA3: "아닙니다. 로그인 상태와 모든 설정이 그대로 유지됩니다.",
    contact: "긴급 문의는",
    footer: "FishXCode - AI Coding 허브",
    lightMode: "라이트",
    darkMode: "다크",
  },
  ru: {
    title: "FishXCode - Техническое обслуживание",
    heading: "Обновление системы",
    subtitle: "Мы работаем над улучшением вашего опыта",
    desc: "FishXCode проходит обновление системы для повышения стабильности и производительности. Все сервисы временно недоступны. Ваши данные в полной безопасности.",
    progress: "Прогресс обновления",
    eta: `Ожидаемое время обслуживания: ${ESTIMATED_MIN} минут`,
    status1: "Резервное копирование",
    status2: "Обновление системы",
    status3: "Восстановление",
    faq: "Часто задаваемые вопросы",
    faqQ1: "Потеряю ли я данные?",
    faqA1: "Нет. Все данные были сохранены перед обслуживанием. Обновление не повлияет на безопасность данных.",
    faqQ2: "Могу ли я использовать API Key во время обновления?",
    faqA2: "Сервисы API временно недоступны. Ваш ключ автоматически возобновит работу после завершения обновления.",
    faqQ3: "Нужно ли входить заново после обновления?",
    faqA3: "Нет. Ваш статус входа и все настройки сохранятся без изменений.",
    contact: "По срочным вопросам обращайтесь",
    footer: "FishXCode - AI Coding Хаб",
    lightMode: "Светлая",
    darkMode: "Тёмная",
  },
  vi: {
    title: "FishXCode - Bảo trì hệ thống",
    heading: "Đang nâng cấp hệ thống",
    subtitle: "Chúng tôi đang cải thiện trải nghiệm cho bạn",
    desc: "FishXCode đang tiến hành nâng cấp hệ thống để cải thiện độ ổn định và hiệu suất. Tất cả dịch vụ tạm thời không khả dụng. Dữ liệu của bạn vẫn an toàn.",
    progress: "Tiến độ nâng cấp",
    eta: `Thời gian bảo trì ước tính: ${ESTIMATED_MIN} phút`,
    status1: "Sao lưu dữ liệu",
    status2: "Nâng cấp hệ thống",
    status3: "Khôi phục dịch vụ",
    faq: "Câu hỏi thường gặp",
    faqQ1: "Dữ liệu của tôi có bị mất không?",
    faqA1: "Không. Tất cả dữ liệu đã được sao lưu trước khi bảo trì. Quá trình nâng cấp không ảnh hưởng đến an toàn dữ liệu.",
    faqQ2: "Tôi có thể sử dụng API Key trong khi nâng cấp không?",
    faqA2: "Dịch vụ API tạm thời không khả dụng. Key của bạn sẽ tự động hoạt động trở lại sau khi hoàn tất.",
    faqQ3: "Tôi có cần đăng nhập lại sau khi nâng cấp không?",
    faqA3: "Không. Trạng thái đăng nhập và tất cả cấu hình sẽ được giữ nguyên.",
    contact: "Liên hệ khẩn cấp",
    footer: "FishXCode - Trạm chuyển tiếp AI Coding",
    lightMode: "Sáng",
    darkMode: "Tối",
  },
};

function detectLang(req: Request): string {
  const url = new URL(req.url);
  const param = url.searchParams.get("lang");
  if (param && I18N[param]) return param;

  const accept = req.headers.get("accept-language") || "";
  const langs = accept.split(",").map((s) => s.split(";")[0].trim().toLowerCase());
  for (const l of langs) {
    const short = l.split("-")[0];
    if (I18N[short]) return short;
  }
  return "zh";
}

// ─── 健康检查 API ────────────────────────────────────────────────────────────
function handleHealthCheck(): Response {
  const uptime = Math.floor((Date.now() - START_TIME.getTime()) / 1000);
  return new Response(
    JSON.stringify({
      status: "maintenance",
      mode: "upgrade",
      startedAt: START_TIME.toISOString(),
      uptimeSeconds: uptime,
      estimatedMinutes: ESTIMATED_MIN,
      redirectUrl: REDIRECT_URL,
    }),
    {
      status: 503,
      headers: {
        "content-type": "application/json",
        "retry-after": String(ESTIMATED_MIN * 60),
      },
    },
  );
}

// ─── 语言选项 HTML ───────────────────────────────────────────────────────────
function renderLangOptions(currentLang: string): string {
  return Object.entries(LANG_LABELS)
    .map(([code, label]) =>
      `<option value="${code}"${code === currentLang ? " selected" : ""}>${label}</option>`
    )
    .join("");
}

// ─── HTML 页面 ───────────────────────────────────────────────────────────────
function renderPage(t: I18nTexts, lang: string): string {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=5.0">
  <meta name="color-scheme" content="light dark">
  <title>${t.title}</title>
  <meta name="robots" content="noindex,nofollow">
  <meta name="description" content="${t.subtitle}">
  <meta name="theme-color" content="#c9973e">
  <link rel="icon" href="https://free.picui.cn/free/2026/02/11/698c585ee1b64.png">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}

    /* ═══ Light 主题 (默认) ═══ */
    :root{
      --gold:#c9973e;--gold-light:#d4b04a;--gold-dark:#a67c2e;
      --bg:#fdf9f5;--bg-soft:#f8f2ea;
      --bg-card:#ffffff;--bg-card2:#faf6f0;
      --text:#2d200e;--text-dim:#6b7280;--text-bright:#1a1005;
      --border:rgba(185,134,46,0.15);
      --green:#16a34a;--blue:#2563eb;--amber:#d97706;
      --card-shadow:0 4px 24px rgba(185,134,46,0.08);
      --card-shadow-hover:0 8px 32px rgba(185,134,46,0.14);
      --progress-bg:#f0e8da;
      --step-pending-bg:#f5f0e8;
      --star-color:rgba(185,134,46,0.3);
      --badge-bg:rgba(185,134,46,0.08);
      --badge-border:rgba(185,134,46,0.18);
      --overlay-dots:rgba(185,134,46,0.04);
    }

    /* ═══ Dark 主题 ═══ */
    [data-theme="dark"]{
      --bg:#1c1814;--bg-soft:#231f1a;
      --bg-card:#2a251f;--bg-card2:#322c24;
      --text:#e2d8c8;--text-dim:#94a3b8;--text-bright:#fff;
      --border:rgba(196,148,56,0.18);
      --green:#22c55e;--blue:#3b82f6;--amber:#f59e0b;
      --card-shadow:0 4px 24px rgba(0,0,0,0.3);
      --card-shadow-hover:0 8px 32px rgba(196,148,56,0.2);
      --progress-bg:#1c1814;
      --step-pending-bg:#1c1814;
      --star-color:rgba(255,255,255,0.7);
      --badge-bg:rgba(185,134,46,0.12);
      --badge-border:rgba(185,134,46,0.25);
      --overlay-dots:rgba(255,255,255,0.02);
    }

    body{
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans SC','Noto Sans JP','Noto Sans KR',sans-serif;
      background:var(--bg);color:var(--text);
      min-height:100vh;min-height:100dvh;
      display:flex;flex-direction:column;align-items:center;
      overflow-x:hidden;transition:background .3s,color .3s;
    }

    /* 背景装饰 */
    .bg-pattern{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
    .stars{position:absolute;inset:0}
    .star{position:absolute;width:2px;height:2px;background:var(--star-color);border-radius:50%;animation:twinkle var(--d,3s) ease-in-out infinite var(--delay,0s)}
    @keyframes twinkle{0%,100%{opacity:.15}50%{opacity:.7}}
    /* Light 模式下的装饰圆 */
    .blob{position:absolute;border-radius:50%;filter:blur(80px);opacity:.18;transition:opacity .3s}
    .blob-1{width:400px;height:400px;background:radial-gradient(circle,#c9973e 0%,transparent 70%);top:-100px;right:-100px}
    .blob-2{width:300px;height:300px;background:radial-gradient(circle,#de7898 0%,transparent 70%);bottom:-50px;left:-80px}
    [data-theme="dark"] .blob{opacity:.08}

    /* 顶部工具栏 */
    .toolbar{
      position:fixed;top:0;left:0;right:0;z-index:100;
      display:flex;align-items:center;justify-content:flex-end;gap:8px;
      padding:12px 16px;
      background:var(--bg);background:color-mix(in srgb,var(--bg) 85%,transparent);
      backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
      border-bottom:1px solid var(--border);
      transition:background .3s;
    }
    .toolbar select{
      appearance:none;-webkit-appearance:none;
      background:var(--bg-card);border:1px solid var(--border);color:var(--text);
      padding:6px 28px 6px 10px;border-radius:8px;font-size:.8rem;cursor:pointer;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af'%3E%3Cpath d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat:no-repeat;background-position:right 8px center;
      transition:border-color .2s,background .3s;
    }
    .toolbar select:hover{border-color:var(--gold)}
    .theme-toggle{
      background:var(--bg-card);border:1px solid var(--border);color:var(--text-dim);
      padding:6px 12px;border-radius:8px;cursor:pointer;font-size:.8rem;
      display:flex;align-items:center;gap:4px;transition:all .2s;
    }
    .theme-toggle:hover{border-color:var(--gold);color:var(--gold)}

    /* 主容器 */
    .container{position:relative;z-index:1;width:100%;max-width:720px;padding:72px 24px 40px;text-align:center}

    /* Logo */
    .logo{
      width:80px;height:80px;border-radius:20px;margin:0 auto 24px;
      box-shadow:0 0 40px rgba(201,151,62,.2);
      animation:pulse-glow 3s ease-in-out infinite;
      transition:box-shadow .3s;
    }
    [data-theme="dark"] .logo{box-shadow:0 0 40px rgba(201,151,62,.35)}
    @keyframes pulse-glow{0%,100%{filter:drop-shadow(0 0 12px rgba(201,151,62,.25))}50%{filter:drop-shadow(0 0 24px rgba(201,151,62,.45))}}

    h1{font-size:clamp(1.5rem,5vw,2.2rem);font-weight:700;color:var(--text-bright);margin-bottom:8px;line-height:1.3}
    .subtitle{font-size:clamp(.9rem,3vw,1.1rem);color:var(--gold);margin-bottom:20px;font-weight:500}
    .desc{color:var(--text-dim);line-height:1.7;margin-bottom:32px;font-size:clamp(.85rem,2.5vw,.95rem);max-width:560px;margin-left:auto;margin-right:auto}

    /* 倒计时 */
    .countdown{display:flex;justify-content:center;gap:clamp(8px,3vw,16px);margin-bottom:32px}
    .cd-item{
      background:var(--bg-card);border:1px solid var(--border);border-radius:12px;
      padding:clamp(10px,2.5vw,16px) clamp(12px,3vw,20px);
      min-width:clamp(56px,15vw,72px);
      box-shadow:var(--card-shadow);transition:all .3s;
    }
    .cd-num{font-size:clamp(1.2rem,4vw,1.8rem);font-weight:700;color:var(--gold);font-variant-numeric:tabular-nums}
    .cd-label{font-size:.7rem;color:var(--text-dim);text-transform:uppercase;margin-top:4px;letter-spacing:.05em}

    /* 进度卡片 */
    .progress-card{
      background:var(--bg-card);border:1px solid var(--border);border-radius:16px;
      padding:clamp(20px,4vw,28px) clamp(16px,3vw,24px);
      margin-bottom:28px;text-align:left;
      box-shadow:var(--card-shadow);transition:all .3s;
    }
    .progress-title{font-size:1rem;font-weight:600;color:var(--text-bright);margin-bottom:6px}
    .progress-eta{font-size:.85rem;color:var(--text-dim);margin-bottom:20px}

    .progress-bar-bg{width:100%;height:8px;background:var(--progress-bg);border-radius:4px;overflow:hidden;margin-bottom:24px}
    .progress-bar{
      height:100%;border-radius:4px;transition:width .5s ease;
      background:linear-gradient(90deg,var(--gold-dark),var(--gold),var(--gold-light));
      background-size:200% 100%;animation:shimmer 2s linear infinite;
    }
    @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

    .steps{display:flex;justify-content:space-between;gap:12px}
    .step{flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;transition:all .3s}
    .step-icon{
      width:40px;height:40px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;font-size:18px;
      transition:all .3s;
    }
    .step.done .step-icon{background:rgba(34,197,94,.12);color:var(--green)}
    .step.active .step-icon{background:rgba(201,151,62,.15);color:var(--gold);animation:step-pulse 1.5s ease-in-out infinite}
    .step.pending .step-icon{background:var(--step-pending-bg);color:var(--text-dim)}
    @keyframes step-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
    .step-label{font-size:.8rem;color:var(--text-dim);text-align:center}
    .step.active .step-label{color:var(--gold);font-weight:600}
    .step.done .step-label{color:var(--green);font-weight:500}

    /* 安全徽章 */
    .badges{display:flex;justify-content:center;gap:clamp(6px,2vw,12px);margin-bottom:28px;flex-wrap:wrap}
    .badge{
      display:inline-flex;align-items:center;gap:6px;
      background:var(--badge-bg);border:1px solid var(--badge-border);
      border-radius:20px;padding:6px 14px;font-size:.75rem;color:var(--text-dim);
      transition:all .3s;
    }
    .badge-dot{width:6px;height:6px;border-radius:50%;background:var(--green);animation:blink 2s ease-in-out infinite}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}

    /* FAQ */
    .faq{text-align:left;margin-bottom:28px}
    .faq h2{font-size:1.1rem;color:var(--text-bright);margin-bottom:16px;text-align:center}
    .faq-item{
      background:var(--bg-card);border:1px solid var(--border);border-radius:12px;
      padding:16px 20px;margin-bottom:10px;cursor:pointer;
      box-shadow:var(--card-shadow);
      transition:border-color .2s,box-shadow .2s,background .3s;
    }
    .faq-item:hover{border-color:rgba(201,151,62,.35);box-shadow:var(--card-shadow-hover)}
    .faq-q{font-weight:600;color:var(--text-bright);font-size:.9rem;display:flex;justify-content:space-between;align-items:center;gap:12px}
    .faq-q::after{content:'+';color:var(--gold);font-size:1.2rem;transition:transform .2s;flex-shrink:0}
    .faq-item.open .faq-q::after{transform:rotate(45deg)}
    .faq-a{color:var(--text-dim);font-size:.85rem;line-height:1.7;max-height:0;overflow:hidden;transition:max-height .3s ease,margin .3s}
    .faq-item.open .faq-a{max-height:200px;margin-top:10px}

    /* 联系 */
    .contact{color:var(--text-dim);font-size:.85rem;margin-bottom:36px}
    .contact a{color:var(--gold);text-decoration:none;font-weight:500}
    .contact a:hover{text-decoration:underline}

    footer{color:var(--text-dim);font-size:.8rem;padding:20px 0;opacity:.5}

    /* ═══ 响应式：平板 ═══ */
    @media(max-width:768px){
      .container{padding:68px 20px 32px}
      .progress-card{border-radius:12px}
    }

    /* ═══ 响应式：手机 ═══ */
    @media(max-width:480px){
      .toolbar{padding:10px 12px;gap:6px}
      .toolbar select{font-size:.75rem;padding:5px 24px 5px 8px}
      .theme-toggle{font-size:.75rem;padding:5px 10px}
      .container{padding:60px 16px 28px}
      .logo{width:64px;height:64px;border-radius:16px}
      .steps{flex-direction:column;gap:12px}
      .step{flex-direction:row;justify-content:flex-start;gap:12px;padding-left:12px}
      .step-icon{width:36px;height:36px;font-size:16px;flex-shrink:0}
      .faq-item{padding:14px 16px}
      .badges{gap:6px}
      .badge{padding:5px 10px;font-size:.7rem}
    }

    /* ═══ 超小屏 ═══ */
    @media(max-width:360px){
      .container{padding:56px 12px 24px}
      .countdown{gap:6px}
      .cd-item{min-width:50px;padding:8px 10px}
    }

    /* ═══ 大屏 (>1024px) ═══ */
    @media(min-width:1024px){
      .container{max-width:760px;padding-top:80px}
    }

    /* ═══ 减少动画偏好 ═══ */
    @media(prefers-reduced-motion:reduce){
      *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
    }
  </style>
</head>
<body>
  <!-- 背景 -->
  <div class="bg-pattern">
    <div class="stars" id="stars"></div>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
  </div>

  <!-- 顶部工具栏：语言 + 主题 -->
  <div class="toolbar">
    <select id="langSelect" onchange="location.href='?lang='+this.value" aria-label="Language">
      ${renderLangOptions(lang)}
    </select>
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
      <span id="themeIcon">&#9790;</span>
      <span id="themeLabel">${t.darkMode}</span>
    </button>
  </div>

  <div class="container">
    <!-- Logo -->
    <img class="logo" src="https://free.picui.cn/free/2026/02/11/698c585ee1b64.png" alt="FishXCode" width="80" height="80">

    <h1>${t.heading}</h1>
    <p class="subtitle">${t.subtitle}</p>
    <p class="desc">${t.desc}</p>

    <!-- 倒计时 -->
    <div class="countdown" id="countdown">
      <div class="cd-item"><div class="cd-num" id="cd-h">00</div><div class="cd-label">H</div></div>
      <div class="cd-item"><div class="cd-num" id="cd-m">00</div><div class="cd-label">M</div></div>
      <div class="cd-item"><div class="cd-num" id="cd-s">00</div><div class="cd-label">S</div></div>
    </div>

    <!-- 进度卡片 -->
    <div class="progress-card">
      <div class="progress-title">${t.progress}</div>
      <div class="progress-eta">${t.eta}</div>
      <div class="progress-bar-bg"><div class="progress-bar" id="pbar" style="width:0%"></div></div>
      <div class="steps">
        <div class="step done" id="s1">
          <div class="step-icon">&#10003;</div>
          <div class="step-label">${t.status1}</div>
        </div>
        <div class="step active" id="s2">
          <div class="step-icon">&#9881;</div>
          <div class="step-label">${t.status2}</div>
        </div>
        <div class="step pending" id="s3">
          <div class="step-icon">&#9889;</div>
          <div class="step-label">${t.status3}</div>
        </div>
      </div>
    </div>

    <!-- 安全徽章 -->
    <div class="badges">
      <div class="badge"><div class="badge-dot"></div>SSL Encrypted</div>
      <div class="badge"><div class="badge-dot"></div>Data Protected</div>
      <div class="badge"><div class="badge-dot"></div>Auto Recovery</div>
    </div>

    <!-- FAQ -->
    <div class="faq">
      <h2>${t.faq}</h2>
      <div class="faq-item" onclick="this.classList.toggle('open')">
        <div class="faq-q">${t.faqQ1}</div>
        <div class="faq-a">${t.faqA1}</div>
      </div>
      <div class="faq-item" onclick="this.classList.toggle('open')">
        <div class="faq-q">${t.faqQ2}</div>
        <div class="faq-a">${t.faqA2}</div>
      </div>
      <div class="faq-item" onclick="this.classList.toggle('open')">
        <div class="faq-q">${t.faqQ3}</div>
        <div class="faq-a">${t.faqA3}</div>
      </div>
    </div>

    <!-- 联系方式 -->
    <p class="contact">${t.contact} <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>

    <footer>${t.footer}</footer>
  </div>

  <script>
    // ── 主题切换 ──
    (function(){
      var html=document.documentElement;
      var btn=document.getElementById('themeToggle');
      var icon=document.getElementById('themeIcon');
      var label=document.getElementById('themeLabel');
      var lightText='${t.lightMode}',darkText='${t.darkMode}';

      function setTheme(theme){
        html.setAttribute('data-theme',theme);
        localStorage.setItem('fxc-theme',theme);
        if(theme==='dark'){icon.textContent='\\u2600';label.textContent=lightText;}
        else{icon.textContent='\\u263E';label.textContent=darkText;}
        // 更新 meta theme-color
        var mc=document.querySelector('meta[name="theme-color"]');
        if(mc)mc.content=theme==='dark'?'#1c1814':'#fdf9f5';
      }

      // 初始化：优先 localStorage > prefers-color-scheme
      var saved=localStorage.getItem('fxc-theme');
      if(saved){setTheme(saved);}
      else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches){setTheme('dark');}
      else{setTheme('light');}

      btn.addEventListener('click',function(){
        setTheme(html.getAttribute('data-theme')==='dark'?'light':'dark');
      });

      // 监听系统主题变化
      if(window.matchMedia){
        window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change',function(e){
          if(!localStorage.getItem('fxc-theme')){setTheme(e.matches?'dark':'light');}
        });
      }
    })();

    // ── 星空背景 ──
    (function(){
      var c=document.getElementById('stars');
      for(var i=0;i<50;i++){
        var s=document.createElement('div');
        s.className='star';
        s.style.left=Math.random()*100+'%';
        s.style.top=Math.random()*100+'%';
        s.style.setProperty('--d',(2+Math.random()*4)+'s');
        s.style.setProperty('--delay',Math.random()*3+'s');
        if(Math.random()>.7)s.style.width=s.style.height='3px';
        c.appendChild(s);
      }
    })();

    // ── 倒计时 + 进度 ──
    (function(){
      var start=${START_TIME.getTime()};
      var dur=${ESTIMATED_MIN}*60*1000;
      var redirect='${REDIRECT_URL}';

      function tick(){
        var now=Date.now();
        var elapsed=now-start;
        var remain=Math.max(0,dur-elapsed);
        var pct=Math.min(100,Math.floor(elapsed/dur*100));

        var ts=Math.floor(remain/1000);
        var h=Math.floor(ts/3600);
        var m=Math.floor((ts%3600)/60);
        var s=ts%60;
        document.getElementById('cd-h').textContent=String(h).padStart(2,'0');
        document.getElementById('cd-m').textContent=String(m).padStart(2,'0');
        document.getElementById('cd-s').textContent=String(s).padStart(2,'0');
        document.getElementById('pbar').style.width=pct+'%';

        var s1=document.getElementById('s1');
        var s2=document.getElementById('s2');
        var s3=document.getElementById('s3');
        if(pct<30){s1.className='step active';s2.className='step pending';s3.className='step pending';}
        else if(pct<80){s1.className='step done';s2.className='step active';s3.className='step pending';}
        else if(pct<100){s1.className='step done';s2.className='step done';s3.className='step active';}
        else{s1.className='step done';s2.className='step done';s3.className='step done';}

        if(remain<=0){location.href=redirect;return;}
        requestAnimationFrame(tick);
      }
      tick();
    })();

    // ── 定时健康检查 ──
    setInterval(function(){
      fetch('/api/health').then(function(r){
        if(r.status===200)location.href='${REDIRECT_URL}';
      }).catch(function(){});
    },30000);
  </script>
</body>
</html>`;
}

// ─── 路由 ────────────────────────────────────────────────────────────────────
Deno.serve({ port: PORT }, (req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/api/health") {
    return handleHealthCheck();
  }

  if (url.pathname === "/robots.txt") {
    return new Response("User-agent: *\nDisallow: /\n", {
      headers: { "content-type": "text/plain" },
    });
  }

  const lang = detectLang(req);
  const t = I18N[lang];
  return new Response(renderPage(t, lang), {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": String(ESTIMATED_MIN * 60),
      "cache-control": "no-store, no-cache, must-revalidate",
      "x-content-type-options": "nosniff",
      "x-frame-options": "SAMEORIGIN",
      "x-xss-protection": "1; mode=block",
      "referrer-policy": "strict-origin-when-cross-origin",
      "strict-transport-security": "max-age=31536000; includeSubDomains",
    },
  });
});

console.log(`\n  FishXCode Maintenance Server`);
console.log(`  ───────────────────────────`);
console.log(`  Port:      ${PORT}`);
console.log(`  ETA:       ${ESTIMATED_MIN} min`);
console.log(`  Started:   ${START_TIME.toISOString()}`);
console.log(`  Redirect:  ${REDIRECT_URL}`);
console.log(`  Contact:   ${CONTACT_EMAIL}`);
console.log(`  Languages: ${Object.keys(LANG_LABELS).join(", ")}\n`);
