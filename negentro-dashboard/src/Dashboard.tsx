import { useState, useRef } from 'react'
import {
  Rocket,
  Database,
  Key,
  BarChart3,
  Users,
  Settings,
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  Plus,
  ExternalLink,
  Moon,
  Sun,
  LogOut,
  Eye,
  EyeOff,
  Bot,
  Code2,
  Plug,
  Cable,
  MessageSquare,
  LayoutDashboard,
  FileText,
  GitBranch,
  Shield,
  KeyRound,
  Activity,
  RefreshCw,
  Search,
  ChevronRight,
  Lock,
  MoreHorizontal,
  Globe,
  Monitor,
  ShieldCheck,
  UserPlus,
  CreditCard,
  PanelLeftClose,
  PanelLeftOpen,
  Zap,
  CircleCheck,
} from 'lucide-react'
import pythonLogo from './assets/python-logo.svg'
import curlSymbol from './assets/curl-symbol.svg'
import openClawMascot from './assets/openclaw-mascot.svg'
import hermesAgentLogo from './assets/hermes-agent.svg'
import codexLogo from './assets/codex.svg'
import claudeCodeLogo from './assets/claude-code.svg'
import antigravityLogo from './assets/antigravity.png'
import vscodeLogo from './assets/vscode.svg'
import googleDriveLogo from './assets/connector-google-drive.png'
import notionLogo from './assets/connector-notion.webp'
import oneDriveLogo from './assets/connector-onedrive.webp'
import githubLogo from './assets/connector-github.svg'
import amazonS3Logo from './assets/connector-amazon-s3.webp'
import gmailLogo from './assets/connector-gmail.webp'
import webCrawlerLogo from './assets/connector-web-crawler.png'
import granolaLogo from './assets/connector-granola.jpeg'
import byokOpenAILogo from './assets/byok-openai.svg'
import byokAnthropicLogo from './assets/byok-anthropic.png'
import byokGoogleLogo from './assets/byok-google.webp'
import byokDeepSeekLogo from './assets/byok-deepseek.webp'
import byokBasetenLogo from './assets/byok-baseten.webp'
import byokGroqLogo from './assets/byok-groq.png'
import byokOpenRouterLogo from './assets/byok-openrouter.png'
import byokCerebrasLogo from './assets/byok-cerebras.png'
import byokSambaNovaLogo from './assets/byok-sambanova.png'
import byokGlmLogo from './assets/byok-glm.png'
import byokTogetherLogo from './assets/byok-together.png'
import byokMistralLogo from './assets/byok-mistral.jpeg'
import { dashboardApi, type ApiKeyRecord, type MemberRecord } from './lib/dashboardApi'
import ApiKeyDialog from './ApiKeyDialog'

const sidebarNav = [
  { id: 'get-started', label: 'Get started', icon: Rocket, section: 'main' },
  { id: 'playground', label: 'Playground', icon: MessageSquare, section: 'main' },
  { id: 'api-keys', label: 'API keys', icon: Key, section: 'main' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'advanced' },
  { id: 'api-reference', label: 'API Reference', icon: FileText, section: 'advanced' },
  { id: 'connectors', label: 'Connectors', icon: Cable, section: 'advanced' },
  { id: 'graph', label: 'Graph', icon: GitBranch, section: 'advanced' },
  { id: 'privacy', label: 'Privacy & Compliance', icon: Shield, section: 'advanced' },
  { id: 'byok', label: 'BYOK', icon: KeyRound, section: 'advanced' },
  { id: 'settings', label: 'Settings', icon: Settings, section: 'account' },
  { id: 'members', label: 'Members', icon: Users, section: 'account' },
  { id: 'usage-billing', label: 'Usage & Billing', icon: BarChart3, section: 'account' },
  { id: 'system-status', label: 'System Status', icon: Activity, section: 'bottom' },
]

const DEMO_API_KEY = 'exb_sk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('get-started')
  const [pageLoading, setPageLoading] = useState(false)
  const navigationTimer = useRef<number | null>(null)
  const mainRef = useRef<HTMLElement>(null)
  const handleNav = (id: string) => {
    if (id === activeNav) return
    if (navigationTimer.current) window.clearTimeout(navigationTimer.current)
    setPageLoading(true)
    setActiveNav(id)
    mainRef.current?.scrollTo(0, 0)
    navigationTimer.current = window.setTimeout(() => setPageLoading(false), 240)
  }
  const [dark, setDark] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [baseName, setBaseName] = useState('')
  const [baseCreated, setBaseCreated] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [keyCreated, setKeyCreated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const theme = dark
    ? {
        bg: '#1a1a1a',
        bgSecondary: '#222',
        bgTertiary: '#2b2b2b',
        bgCard: '#262626',
        text: '#eee',
        textSecondary: '#bbb',
        textTertiary: '#888',
        border: '#333',
        accent: '#ECCDF5',
        accentHover: '#d9b3e6',
        accentBg: '#2e1f3a',
        success: '#34d399',
        sidebarBg: '#1a1a1a',
        inputBg: '#2b2b2b',
        codeBg: '#1e1e1e',
        codeText: '#e0e0e0',
        codeStr: '#a5d6a7',
        codeKw: '#c792ea',
        codeFunc: '#82aaff',
        codeParam: '#f0c674',
        codeOp: '#89ddff',
        codeBracket: '#e0e0e0',
      }
    : {
        bg: '#fcfcfd',
        bgSecondary: '#fff',
        bgTertiary: '#f4f4f5',
        bgCard: '#fff',
        text: '#111',
        textSecondary: '#555',
        textTertiary: '#888',
        border: '#e5e5e5',
        accent: '#765DFB',
        accentHover: '#6248e0',
        accentBg: '#f0ecfe',
        success: '#22c55e',
        sidebarBg: '#fcfcfd',
        inputBg: '#f8f8f8',
        codeBg: '#f5f5f5',
        codeText: '#333',
        codeStr: '#2e7d32',
        codeKw: '#7b1fa2',
        codeFunc: '#1565c0',
        codeParam: '#bf360c',
        codeOp: '#6a1b9a',
        codeBracket: '#333',
      }

  const handleCopy = () => {
    navigator.clipboard.writeText(DEMO_API_KEY)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCreateBase = () => {
    if (baseName.trim()) setBaseCreated(true)
  }

  const handleCreateKey = () => {
    if (keyName.trim()) setKeyCreated(true)
  }

  const renderContent = () => {
    if (activeNav === 'get-started') return renderGetStarted()
    if (activeNav === 'playground') return renderPlayground()
    if (activeNav === 'api-keys') return renderApiKeys()
    if (activeNav === 'dashboard') return renderDashboard()
    if (activeNav === 'connectors') return renderConnectors()
    if (activeNav === 'byok') return renderBYOK()
    if (activeNav === 'graph') return renderGraph()
    if (activeNav === 'settings') return renderSettings()
    if (activeNav === 'members') return renderMembers()
    if (activeNav === 'usage-billing') return renderUsage()
    if (activeNav === 'api-reference') return renderApiReference()
    if (activeNav === 'privacy') return renderPrivacy()
    if (activeNav === 'system-status') return renderSystemStatus()
    return renderPlaceholder()
  }

  const username = 'Guest'

  const [selectedQuickstart, setSelectedQuickstart] = useState('sdk')
  const [selectedLang, setSelectedLang] = useState('python')
  const [selectedAgent, setSelectedAgent] = useState('openclaw')
  const [selectedPluginPlatform, setSelectedPluginPlatform] = useState('codex')
  const [selectedPluginTab, setSelectedPluginTab] = useState('plugin')
  const [copiedStep, setCopiedStep] = useState<string | null>(null)
  const [playgroundTab, setPlaygroundTab] = useState('add')
  const [addMemoryType, setAddMemoryType] = useState('text')
  const [dashboardTimeFilter, setDashboardTimeFilter] = useState('30d')
  const [searchType, setSearchType] = useState('hybrid')
  const [searchTypeOpen, setSearchTypeOpen] = useState(false)
  const [connectorsFilter, setConnectorsFilter] = useState('all')
  const [connectorsSearch, setConnectorsSearch] = useState('')
  const [byokSearch, setByokSearch] = useState('')
  const [byokSelected, setByokSelected] = useState<string | null>(null)
  const [memberRole, setMemberRole] = useState('Admin')
  const [selectedRegion, setSelectedRegion] = useState('us-east')
  const [busyAction, setBusyAction] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; tone: 'success' | 'error' } | null>(null)
  const toastTimer = useRef<number | null>(null)
  const [memoryInput, setMemoryInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchAnswer, setSearchAnswer] = useState('')
  const [dashboardUpdatedAt, setDashboardUpdatedAt] = useState('just now')
  const [configuredByok, setConfiguredByok] = useState<string[]>([])
  const [byokDraft, setByokDraft] = useState<{ priority: 'prioritized' | 'fallback'; value: string } | null>(null)
  const [graphScale, setGraphScale] = useState(1)
  const [workspaceName, setWorkspaceName] = useState("Guest's Workspace")
  const [workspaceEditing, setWorkspaceEditing] = useState(false)
  const [keyDialog, setKeyDialog] = useState<'create' | ApiKeyRecord | null>(null)
  const [apiKeys, setApiKeys] = useState<ApiKeyRecord[]>([
    { id: 'default', name: 'Default key', key: 'exb_sk_...o5p6', created: 'Sep 24, 2026', lastUsed: 'Never' },
    { id: 'production', name: 'Production', key: 'exb_sk_...r8k2', created: 'Sep 20, 2026', lastUsed: 'Sep 25, 2026' },
  ])
  const [members, setMembers] = useState<MemberRecord[]>([
    { email: 'guest@piyapi.dev', role: 'Admin', twoFactor: false, joined: '26 Sep' },
  ])

  const notify = (message: string, tone: 'success' | 'error' = 'success') => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    setToast({ message, tone })
    toastTimer.current = window.setTimeout(() => setToast(null), 3200)
  }

  const runAction = async <T,>(id: string, task: () => Promise<T>, successMessage: string, onSuccess?: (result: T) => void) => {
    if (busyAction) return
    setBusyAction(id)
    try {
      const result = await task()
      onSuccess?.(result)
      notify(successMessage)
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Something went wrong. Please try again.', 'error')
    } finally {
      setBusyAction(null)
    }
  }

  const quickstartOptions = [
    { id: 'sdk', label: 'SDK Integration', desc: 'Drop into your existing SDK', icon: Code2 },
    { id: 'harness', label: 'Agent Harness', desc: 'Memory across every session', icon: Bot },
    { id: 'plugins', label: 'Plugins', desc: 'Memory for your workflow', icon: Plug },
    { id: 'connectors', label: 'Connectors', desc: 'Connect to any data source', icon: Cable },
  ]

  const renderGetStarted = () => (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 600, color: theme.text, letterSpacing: '-.02em' }}>
        Welcome, {username}
      </h1>
      <p style={{ fontSize: 14, color: theme.textSecondary, marginTop: 8 }}>
        Explore all the ways to start using Piyapi.
      </p>

      <div
        className="quickstart-row"
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 28,
        }}
      >
      {quickstartOptions.map((opt) => {
        const Icon = opt.icon
        const isSelected = selectedQuickstart === opt.id
        return (
          <button
            key={opt.id}
            onClick={() => setSelectedQuickstart(opt.id)}
            className="quickstart-card"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 10,
              border: `1.5px solid ${isSelected ? theme.text : theme.border}`,
              background: theme.bgCard,
              cursor: 'pointer',
              fontFamily: 'inherit',
              textAlign: 'left',
              transition: 'border-color .15s, box-shadow .15s',
              boxShadow: isSelected ? `0 0 0 0.5px ${theme.text}` : 'none',
            }}
          >
            <div
              className="qs-icon"
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: theme.bgTertiary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={15} color={theme.textSecondary} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="qs-label" style={{ fontSize: 13, fontWeight: 600, color: theme.text, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                {opt.label}
              </div>
              <div className="qs-desc" style={{ fontSize: 12, color: theme.textTertiary, marginTop: 1, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {opt.desc}
              </div>
            </div>
          </button>
        )
      })}
      </div>

      {selectedQuickstart === 'sdk' && (() => {
        const codeSnippets: Record<string, { label: string; icon: React.ReactNode; code: React.ReactNode }> = {
          python: {
            label: 'Python',
            icon: <img src={pythonLogo} alt="" aria-hidden="true" style={{ display: 'block', width: 18, height: 18, objectFit: 'contain' }} />,
            code: (
              <>
                <span style={{ color: theme.codeKw }}>from</span> <span style={{ color: theme.codeText }}>piyapi</span> <span style={{ color: theme.codeKw }}>import</span> <span style={{ color: theme.codeText }}>PiyClient</span>{'\n'}
                {'\n'}
                <span style={{ color: theme.codeText }}>client</span> <span style={{ color: theme.codeOp }}>=</span> <span style={{ color: theme.codeText }}>PiyClient</span>(<span style={{ color: theme.codeParam }}>api_key</span>=<span style={{ color: theme.codeStr }}>"your_api_key"</span>){'\n'}
                {'\n'}
                <span style={{ color: theme.codeText }}># Sub-20ms hybrid vector + graph search</span>{'\n'}
                <span style={{ color: theme.codeText }}>results</span> <span style={{ color: theme.codeOp }}>=</span> <span style={{ color: theme.codeText }}>client</span>.<span style={{ color: theme.codeText }}>memories</span>.<span style={{ color: theme.codeFunc }}>search</span>({'\n'}
                {'    '}<span style={{ color: theme.codeParam }}>query</span>=<span style={{ color: theme.codeStr }}>"What tech stack and database schema do we use?"</span>,{'\n'}
                {'    '}<span style={{ color: theme.codeParam }}>limit</span>=<span style={{ color: theme.codeText }}>5</span>{'\n'}
                ){'\n'}
                <span style={{ color: theme.codeFunc }}>print</span>(<span style={{ color: theme.codeText }}>results</span>)
              </>
            ),
          },
          typescript: {
            label: 'TypeScript',
            icon: (
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: 3, background: '#3178c6', color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>TS</span>
            ),
            code: (
              <>
                <span style={{ color: theme.codeKw }}>import</span> <span style={{ color: theme.codeBracket }}>{'{'}</span> <span style={{ color: theme.codeText }}>PiyAPI</span> <span style={{ color: theme.codeBracket }}>{'}'}</span> <span style={{ color: theme.codeKw }}>from</span> <span style={{ color: theme.codeStr }}>'@piyso/piyapi'</span>;{'\n'}
                {'\n'}
                <span style={{ color: theme.codeKw }}>const</span> <span style={{ color: theme.codeText }}>memory</span> <span style={{ color: theme.codeOp }}>=</span> <span style={{ color: theme.codeKw }}>new</span> <span style={{ color: theme.codeText }}>PiyAPI</span>(<span style={{ color: theme.codeBracket }}>{'{'}</span> <span style={{ color: theme.codeParam }}>apiKey</span>: <span style={{ color: theme.codeText }}>process</span>.<span style={{ color: theme.codeText }}>env</span>.<span style={{ color: theme.codeText }}>PIYAPI_KEY</span> <span style={{ color: theme.codeBracket }}>{'}'}</span>);{'\n'}
                {'\n'}
                <span style={{ color: theme.codeText }}>// Query bitemporal cognitive memory graph</span>{'\n'}
                <span style={{ color: theme.codeKw }}>const</span> <span style={{ color: theme.codeText }}>response</span> <span style={{ color: theme.codeOp }}>=</span> <span style={{ color: theme.codeKw }}>await</span> <span style={{ color: theme.codeText }}>memory</span>.<span style={{ color: theme.codeFunc }}>search</span>(<span style={{ color: theme.codeBracket }}>{'{'}</span>{'\n'}
                {'  '}<span style={{ color: theme.codeParam }}>query</span>: <span style={{ color: theme.codeStr }}>"What tech stack and database schema do we use?"</span>,{'\n'}
                {'  '}<span style={{ color: theme.codeParam }}>limit</span>: <span style={{ color: theme.codeText }}>5</span>,{'\n'}
                <span style={{ color: theme.codeBracket }}>{'}'}</span>);{'\n'}
                <span style={{ color: theme.codeText }}>console</span>.<span style={{ color: theme.codeFunc }}>log</span>(<span style={{ color: theme.codeText }}>response</span>.<span style={{ color: theme.codeText }}>results</span>);
              </>
            ),
          },
          curl: {
            label: 'cURL',
            icon: <img src={curlSymbol} alt="" aria-hidden="true" style={{ display: 'block', width: 19, height: 17, objectFit: 'contain', filter: dark ? 'brightness(0) invert(1)' : 'none' }} />,
            code: (
              <>
                <span style={{ color: theme.codeFunc }}>curl</span> <span style={{ color: theme.codeOp }}>-X</span> POST <span style={{ color: theme.codeStr }}>"https://api.piyapi.com/v1/memories/search"</span> \{'\n'}
                {'  '}<span style={{ color: theme.codeOp }}>-H</span> <span style={{ color: theme.codeStr }}>"Authorization: Bearer $PIYAPI_KEY"</span> \{'\n'}
                {'  '}<span style={{ color: theme.codeOp }}>-H</span> <span style={{ color: theme.codeStr }}>"Content-Type: application/json"</span> \{'\n'}
                {'  '}<span style={{ color: theme.codeOp }}>-d</span> <span style={{ color: theme.codeStr }}>&apos;{'{"query": "What tech stack and database schema do we use?", "limit": 5}'}&apos;</span>
              </>
            ),
          },
        }
        const snippet = codeSnippets[selectedLang]
        return (
          <>
            <div
              style={{
                display: 'inline-flex',
                gap: 0,
                marginTop: 24,
                background: theme.bgTertiary,
                borderRadius: 10,
                padding: 4,
              }}
            >
              {[
                { id: 'python', label: 'PYTHON' },
                { id: 'typescript', label: 'TYPESCRIPT' },
                { id: 'curl', label: 'CURL API' },
              ].map((lang) => {
                const isActive = selectedLang === lang.id
                return (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 20px',
                      borderRadius: 8,
                      border: 'none',
                      background: isActive ? theme.bgCard : 'transparent',
                      color: theme.text,
                      cursor: 'pointer',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: '.06em',
                      transition: 'background .15s, box-shadow .15s',
                      boxShadow: isActive ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: lang.id === 'typescript' ? 11 : 13 }}>
                      {codeSnippets[lang.id].icon}
                    </span>
                    {lang.label}
                  </button>
                )
              })}
            </div>

            <div
              style={{
                marginTop: 16,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                overflow: 'hidden',
                background: theme.bgCard,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  borderBottom: `1px solid ${theme.border}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {snippet.icon}
                  <span style={{ fontSize: 13, fontWeight: 500, color: theme.text }}>{snippet.label}</span>
                </div>
                <button
                  onClick={() => {
                    const el = document.querySelector('.code-block-pre')
                    if (el) {
                      navigator.clipboard.writeText(el.textContent || '')
                      setCopied(true)
                      setTimeout(() => setCopied(false), 1500)
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 8px',
                    border: 'none',
                    borderRadius: 6,
                    background: 'transparent',
                    color: theme.textSecondary,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 12,
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <pre
                className="code-block-pre"
                style={{
                  margin: 0,
                  padding: '20px 24px',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: theme.codeText,
                  overflowX: 'hidden',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {snippet.code}
              </pre>
            </div>
          </>
        )
      })()}

      {selectedQuickstart === 'harness' && (() => {
        const agentSnippets: Record<string, { label: string; icon: React.ReactNode; code: React.ReactNode }> = {
          openclaw: {
            label: 'OpenClaw',
            icon: <img src={openClawMascot} alt="" aria-hidden="true" style={{ display: 'block', width: 20, height: 20, objectFit: 'contain' }} />,
            code: (
              <>
                <span style={{ color: theme.codeKw }}>from</span> <span style={{ color: theme.codeText }}>piyapi</span> <span style={{ color: theme.codeKw }}>import</span> <span style={{ color: theme.codeText }}>AgentHarness</span>{'\n'}
                {'\n'}
                <span style={{ color: theme.codeText }}>harness</span> <span style={{ color: theme.codeOp }}>=</span> <span style={{ color: theme.codeText }}>AgentHarness</span>(<span style={{ color: theme.codeParam }}>engine</span>=<span style={{ color: theme.codeStr }}>"openclaw"</span>){'\n'}
                <span style={{ color: theme.codeText }}>harness</span>.<span style={{ color: theme.codeFunc }}>connect</span>(<span style={{ color: theme.codeParam }}>user_id</span>=<span style={{ color: theme.codeStr }}>"alex"</span>){'\n'}
                {'\n'}
                <span style={{ color: theme.codeText }}>response</span> <span style={{ color: theme.codeOp }}>=</span> <span style={{ color: theme.codeText }}>harness</span>.<span style={{ color: theme.codeFunc }}>run</span>({'\n'}
                {'  '}<span style={{ color: theme.codeParam }}>prompt</span>=<span style={{ color: theme.codeStr }}>"Summarize my last 3 conversations"</span>,{'\n'}
                {'  '}<span style={{ color: theme.codeParam }}>memory</span>=<span style={{ color: theme.codeKw }}>True</span>{'\n'}
                ){'\n'}
                <span style={{ color: theme.codeFunc }}>print</span>(<span style={{ color: theme.codeText }}>response</span>.<span style={{ color: theme.codeText }}>output</span>)
              </>
            ),
          },
          hermes: {
            label: 'Hermes Agent',
            icon: <img src={hermesAgentLogo} alt="" aria-hidden="true" style={{ display: 'block', width: 19, height: 19, borderRadius: 4, objectFit: 'contain' }} />,
            code: (
              <>
                <span style={{ color: theme.codeKw }}>from</span> <span style={{ color: theme.codeText }}>piyapi.agents</span> <span style={{ color: theme.codeKw }}>import</span> <span style={{ color: theme.codeText }}>HermesAgent</span>{'\n'}
                {'\n'}
                <span style={{ color: theme.codeText }}>agent</span> <span style={{ color: theme.codeOp }}>=</span> <span style={{ color: theme.codeText }}>HermesAgent</span>({'\n'}
                {'  '}<span style={{ color: theme.codeParam }}>model</span>=<span style={{ color: theme.codeStr }}>"hermes-3-llama-3.1"</span>,{'\n'}
                {'  '}<span style={{ color: theme.codeParam }}>memory_key</span>=<span style={{ color: theme.codeStr }}>"project-alpha"</span>{'\n'}
                ){'\n'}
                {'\n'}
                <span style={{ color: theme.codeText }}>result</span> <span style={{ color: theme.codeOp }}>=</span> <span style={{ color: theme.codeText }}>agent</span>.<span style={{ color: theme.codeFunc }}>invoke</span>({'\n'}
                {'  '}<span style={{ color: theme.codeParam }}>task</span>=<span style={{ color: theme.codeStr }}>"Draft a follow-up email based on our last meeting notes"</span>,{'\n'}
                {'  '}<span style={{ color: theme.codeParam }}>context_window</span>=<span style={{ color: theme.codeText }}>4096</span>{'\n'}
                ){'\n'}
                <span style={{ color: theme.codeFunc }}>print</span>(<span style={{ color: theme.codeText }}>result</span>.<span style={{ color: theme.codeText }}>text</span>)
              </>
            ),
          },
        }
        const snippet = agentSnippets[selectedAgent]
        return (
          <>
            <div
              style={{
                display: 'inline-flex',
                gap: 0,
                marginTop: 24,
                background: theme.bgTertiary,
                borderRadius: 10,
                padding: 4,
              }}
            >
              {[
                { id: 'openclaw', label: 'OPENCLAW' },
                { id: 'hermes', label: 'HERMES AGENT' },
              ].map((agent) => {
                const isActive = selectedAgent === agent.id
                return (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 20px',
                      borderRadius: 8,
                      border: 'none',
                      background: isActive ? theme.bgCard : 'transparent',
                      color: theme.text,
                      cursor: 'pointer',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: '.06em',
                      transition: 'background .15s, box-shadow .15s',
                      boxShadow: isActive ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
                    }}
                  >
                    {agentSnippets[agent.id].icon}
                    {agent.label}
                  </button>
                )
              })}
            </div>

            <div
              style={{
                marginTop: 16,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                overflow: 'hidden',
                background: theme.bgCard,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  borderBottom: `1px solid ${theme.border}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {snippet.icon}
                  <span style={{ fontSize: 13, fontWeight: 500, color: theme.text }}>{snippet.label}</span>
                </div>
                <button
                  onClick={() => {
                    const el = document.querySelector('.code-block-pre-agent')
                    if (el) {
                      navigator.clipboard.writeText(el.textContent || '')
                      setCopied(true)
                      setTimeout(() => setCopied(false), 1500)
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 8px',
                    border: 'none',
                    borderRadius: 6,
                    background: 'transparent',
                    color: theme.textSecondary,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 12,
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <pre
                className="code-block-pre-agent"
                style={{
                  margin: 0,
                  padding: '20px 24px',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: theme.codeText,
                  overflowX: 'hidden',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {snippet.code}
              </pre>
            </div>
          </>
        )
      })()}

      {selectedQuickstart === 'plugins' && (() => {
        const copyStep = (text: string, id: string) => {
          navigator.clipboard.writeText(text)
          setCopiedStep(id)
          setTimeout(() => setCopiedStep(null), 1500)
        }

        type PluginSetup = { install: string; desc: string; steps: { label: string; cmd: string }[] }
        const pluginSteps: Record<string, Record<string, PluginSetup>> = {
          codex: {
            plugin: {
              install: 'Install the Piyapi plugin in Codex:',
              desc: 'Add persistent memory from the Codex plugin directory.',
              steps: [
                { label: 'Step 1: Find the plugin', cmd: 'Plugins → Search “Piyapi Memory”' },
                { label: 'Step 2: Enable it for this workspace', cmd: 'Piyapi Memory → Install' },
              ],
            },
            mcp: {
              install: 'Connect Piyapi to Codex with MCP:',
              desc: 'Register the local Piyapi MCP server with Codex.',
              steps: [
                { label: 'Step 1: Add the MCP server', cmd: 'codex mcp add piyapi -- npx -y @piyapi/mcp-server' },
                { label: 'Step 2: Verify the connection', cmd: 'codex mcp list' },
              ],
            },
          },
          'claude-code': {
            plugin: {
              install: 'Install the Piyapi plugin in Claude Code:',
              desc: 'Add memory through the Claude Code plugin marketplace.',
              steps: [
                { label: 'Step 1: Add the plugin marketplace', cmd: '/plugin marketplace add piyapi/memory' },
                { label: 'Step 2: Install the plugin', cmd: '/plugin install piyapi@piyapi-plugins' },
              ],
            },
            mcp: {
              install: 'Connect Piyapi to Claude Code with MCP:',
              desc: 'Register Piyapi as a project-level stdio MCP server.',
              steps: [
                { label: 'Step 1: Add the MCP server', cmd: 'claude mcp add piyapi -- npx -y @piyapi/mcp-server' },
                { label: 'Step 2: Verify the connection', cmd: 'claude mcp list' },
              ],
            },
          },
          antigravity: {
            plugin: {
              install: 'Install the Piyapi plugin in Antigravity:',
              desc: 'Enable Piyapi from Antigravity customizations.',
              steps: [
                { label: 'Step 1: Open plugin settings', cmd: 'Settings → Customizations → Plugins' },
                { label: 'Step 2: Find and install Piyapi', cmd: 'Search “Piyapi Memory” → Install' },
              ],
            },
            mcp: {
              install: 'Connect Piyapi to Antigravity with MCP:',
              desc: 'Add Piyapi to the workspace MCP configuration.',
              steps: [
                { label: 'Step 1: Open the workspace config', cmd: '.agents/mcp_config.json' },
                { label: 'Step 2: Add the Piyapi server', cmd: '{"mcpServers":{"piyapi":{"command":"npx","args":["-y","@piyapi/mcp-server"]}}}' },
              ],
            },
          },
          vscode: {
            plugin: {
              install: 'Install the Piyapi agent plugin in VS Code:',
              desc: 'Add Piyapi through the Agent Plugins gallery.',
              steps: [
                { label: 'Step 1: Open the plugin gallery', cmd: 'Agent Plugins: Browse' },
                { label: 'Step 2: Find and install Piyapi', cmd: 'Search “Piyapi Memory” → Install in Workspace' },
              ],
            },
            mcp: {
              install: 'Connect Piyapi to VS Code with MCP:',
              desc: 'Add Piyapi to your VS Code MCP server configuration.',
              steps: [
                { label: 'Step 1: Add the MCP server', cmd: 'code --add-mcp \'{"name":"piyapi","command":"npx","args":["-y","@piyapi/mcp-server"]}\'' },
                { label: 'Step 2: Verify the connection', cmd: 'MCP: List Servers' },
              ],
            },
          },
        }

        const current = pluginSteps[selectedPluginPlatform]?.[selectedPluginTab] ?? pluginSteps.codex.plugin

        return (
          <>
            <div
              className="plugin-platform-tabs"
              style={{
                display: 'inline-flex',
                gap: 0,
                marginTop: 24,
                background: theme.bgTertiary,
                borderRadius: 10,
                padding: 4,
                maxWidth: '100%',
                overflowX: 'auto',
              }}
            >
              {[
                { id: 'codex', label: 'CODEX', icon: <img src={codexLogo} alt="" aria-hidden="true" style={{ display: 'block', width: 18, height: 18, filter: dark ? 'brightness(0) invert(1)' : 'none' }} /> },
                { id: 'claude-code', label: 'CLAUDE CODE', icon: <img src={claudeCodeLogo} alt="" aria-hidden="true" style={{ display: 'block', width: 18, height: 18, filter: 'invert(56%) sepia(44%) saturate(763%) hue-rotate(331deg) brightness(91%) contrast(85%)' }} /> },
                { id: 'antigravity', label: 'ANTIGRAVITY', icon: <img src={antigravityLogo} alt="" aria-hidden="true" style={{ display: 'block', width: 19, height: 19, objectFit: 'contain' }} /> },
                { id: 'vscode', label: 'VS CODE', icon: <img src={vscodeLogo} alt="" aria-hidden="true" style={{ display: 'block', width: 18, height: 18, objectFit: 'contain' }} /> },
              ].map((p) => {
                const isActive = selectedPluginPlatform === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPluginPlatform(p.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 20px',
                      borderRadius: 8,
                      border: 'none',
                      background: isActive ? theme.bgCard : 'transparent',
                      color: isActive ? theme.text : theme.textTertiary,
                      cursor: 'pointer',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: '.06em',
                      transition: 'background .15s, box-shadow .15s',
                      boxShadow: isActive ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
                    }}
                  >
                    {p.icon}
                    {p.label}
                  </button>
                )
              })}
            </div>

            <div
              style={{
                marginTop: 16,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                overflow: 'hidden',
                background: theme.bgCard,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  borderBottom: `1px solid ${theme.border}`,
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    background: theme.bgTertiary,
                    borderRadius: 10,
                    padding: 4,
                  }}
                >
                  {['plugin', 'mcp'].map((tab) => {
                    const isActive = selectedPluginTab === tab
                    return (
                      <button
                        key={tab}
                        onClick={() => setSelectedPluginTab(tab)}
                        style={{
                          padding: '8px 20px',
                          borderRadius: 8,
                          border: 'none',
                          background: isActive ? theme.bgCard : 'transparent',
                          color: isActive ? theme.text : theme.textTertiary,
                          cursor: 'pointer',
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 12,
                          fontWeight: 500,
                          letterSpacing: '.06em',
                          boxShadow: isActive ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
                          transition: 'background .15s, box-shadow .15s',
                        }}
                      >
                        {tab.toUpperCase()}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => notify('Plugin documentation route is ready for the production docs URL.')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '7px 14px',
                    borderRadius: 8,
                    border: `1px solid ${theme.border}`,
                    background: theme.bgCard,
                    color: theme.text,
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  View Docs <ExternalLink size={13} />
                </button>
              </div>

              <div style={{ padding: '20px 24px 24px' }}>
                <p style={{ fontSize: 13, color: theme.text, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
                  {current.install}
                </p>

                {current.steps.map((step, i) => (
                  <div key={i} style={{ marginBottom: i < current.steps.length - 1 ? 20 : 0 }}>
                    <p style={{ fontSize: 12, color: theme.textTertiary, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
                      {step.label}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        padding: '14px 16px',
                        borderRadius: 10,
                        border: `1px solid ${theme.border}`,
                        background: theme.bgSecondary,
                      }}
                    >
                      <code style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 13,
                        color: theme.codeText,
                        flex: 1,
                        minWidth: 0,
                        overflowWrap: 'anywhere',
                      }}>
                        {step.cmd.split(' ').map((word, wi) => {
                          const isKeyword = ['add', 'install', 'start'].includes(word)
                          return (
                            <span key={wi}>
                              {wi > 0 && ' '}
                              <span style={{ color: isKeyword ? theme.accent : theme.codeText }}>{word}</span>
                            </span>
                          )
                        })}
                      </code>
                      <button
                        onClick={() => copyStep(step.cmd, `step-${i}`)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 12px',
                          borderRadius: 8,
                          border: 'none',
                          background: theme.text,
                          color: theme.bg,
                          cursor: 'pointer',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                          flexShrink: 0,
                        }}
                      >
                        {copiedStep === `step-${i}` ? <Check size={13} /> : <Copy size={13} />}
                        {copiedStep === `step-${i}` ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      })()}

      {selectedQuickstart === 'connectors' && (
        <>
          <div
            style={{
              display: 'inline-flex',
              gap: 0,
              marginTop: 24,
              background: theme.bgTertiary,
              borderRadius: 10,
              padding: 4,
            }}
          >
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 20px',
                borderRadius: 8,
                border: 'none',
                background: theme.bgCard,
                color: theme.text,
                cursor: 'pointer',
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '.06em',
                boxShadow: '0 1px 3px rgba(0,0,0,.08)',
              }}
            >
              <span>🔄</span>
              CDC CONNECTORS
            </button>
          </div>

          <div
            style={{
              marginTop: 16,
              border: `1px solid ${theme.border}`,
              borderRadius: 12,
              overflow: 'hidden',
              background: theme.bgCard,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                borderBottom: `1px solid ${theme.border}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>🔄</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: theme.text }}>CDC Connector</span>
              </div>
              <button
                onClick={() => {
                  const el = document.querySelector('.code-block-pre-cdc')
                  if (el) {
                    navigator.clipboard.writeText(el.textContent || '')
                    setCopied(true)
                    setTimeout(() => setCopied(false), 1500)
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 8px',
                  border: 'none',
                  borderRadius: 6,
                  background: 'transparent',
                  color: theme.textSecondary,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 12,
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <pre
              className="code-block-pre-cdc"
              style={{
                margin: 0,
                padding: '20px 24px',
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                lineHeight: 1.7,
                color: theme.codeText,
                overflowX: 'hidden',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              <span style={{ color: theme.codeKw }}>from</span> <span style={{ color: theme.codeText }}>piyapi_memory</span> <span style={{ color: theme.codeKw }}>import</span> <span style={{ color: theme.codeText }}>PiyAPIClient</span>{'\n'}
              {'\n'}
              <span style={{ color: theme.codeText }}>client</span> <span style={{ color: theme.codeOp }}>=</span> <span style={{ color: theme.codeText }}>PiyAPIClient</span>(<span style={{ color: theme.codeParam }}>api_key</span>=<span style={{ color: theme.codeStr }}>"YOUR_API_KEY"</span>){'\n'}
              <span style={{ color: theme.codeText }}>connectors</span> <span style={{ color: theme.codeOp }}>=</span> <span style={{ color: theme.codeText }}>client</span>.<span style={{ color: theme.codeText }}>connectors</span>.<span style={{ color: theme.codeFunc }}>list</span>(){'\n'}
              <span style={{ color: theme.codeFunc }}>print</span>(<span style={{ color: theme.codeStr }}>"Active CDC Connectors:"</span>, <span style={{ color: theme.codeText }}>connectors</span>)
            </pre>
          </div>
        </>
      )}
    </div>
  )

  const renderPlayground = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: theme.text, letterSpacing: '-.02em' }}>Playground</h1>
      </div>

      {/* Toggle */}
      <div
        style={{
          display: 'inline-flex',
          gap: 0,
          background: theme.bgTertiary,
          borderRadius: 10,
          padding: 4,
          marginBottom: 20,
        }}
      >
        {[
          { id: 'add', label: 'ADD MEMORIES' },
          { id: 'search', label: 'SEARCH MEMORIES' },
        ].map((tab) => {
          const isActive = playgroundTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setPlaygroundTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 20px',
                borderRadius: 8,
                border: 'none',
                background: isActive ? theme.bgCard : 'transparent',
                color: theme.text,
                cursor: 'pointer',
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '.06em',
                transition: 'background .15s, box-shadow .15s',
                boxShadow: isActive ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Big window */}
      <div
        style={{
          ...cardStyle(theme),
          height: 528,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {playgroundTab === 'add' ? (
          <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Input type toggle */}
            <div
              style={{
                display: 'inline-flex',
                gap: 0,
                background: theme.bgTertiary,
                borderRadius: 10,
                padding: 4,
                marginBottom: 20,
                alignSelf: 'flex-start',
              }}
            >
              {[
                { id: 'text', label: 'TEXT' },
                { id: 'json', label: 'JSON' },
                { id: 'weburl', label: 'WEB URL' },
              ].map((tab) => {
                const isActive = addMemoryType === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAddMemoryType(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '6px 16px',
                      borderRadius: 8,
                      border: 'none',
                      background: isActive ? theme.bgCard : 'transparent',
                      color: theme.text,
                      cursor: 'pointer',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: '.06em',
                      transition: 'background .15s, box-shadow .15s',
                      boxShadow: isActive ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {addMemoryType === 'text' && (
              <textarea
                placeholder="Enter a memory to store..."
                value={memoryInput}
                onChange={(event) => setMemoryInput(event.target.value)}
                style={{
                  flex: 1,
                  padding: 20,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  background: theme.bgTertiary,
                  color: theme.text,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.6,
                  resize: 'none',
                  outline: 'none',
                }}
              />
            )}
            {addMemoryType === 'json' && (
              <textarea
                placeholder='{"role": "user", "content": "Hi, my name is Alex..."}'
                value={memoryInput}
                onChange={(event) => setMemoryInput(event.target.value)}
                style={{
                  flex: 1,
                  padding: 20,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  background: theme.bgTertiary,
                  color: theme.text,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  lineHeight: 1.6,
                  resize: 'none',
                  outline: 'none',
                }}
              />
            )}
            {addMemoryType === 'weburl' && (
              <input
                type="text"
                placeholder="https://example.com/article"
                value={memoryInput}
                onChange={(event) => setMemoryInput(event.target.value)}
                style={{
                  padding: '14px 18px',
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  background: theme.bgTertiary,
                  color: theme.text,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  outline: 'none',
                }}
              />
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <button
                onClick={() => {
                  if (!memoryInput.trim()) return notify('Enter content before adding a memory.', 'error')
                  runAction('add-memory', () => dashboardApi.addMemory(addMemoryType, memoryInput.trim()), 'Memory added successfully.', () => setMemoryInput(''))
                }}
                disabled={busyAction === 'add-memory'}
                style={{
                  padding: '10px 28px',
                  borderRadius: 8,
                  border: 'none',
                  background: theme.accent,
                  color: '#fff',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: busyAction === 'add-memory' ? 'wait' : 'pointer',
                  opacity: busyAction === 'add-memory' ? 0.72 : 1,
                }}
              >
                {busyAction === 'add-memory' ? 'Adding…' : 'Add Memory'}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Chat messages area */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontSize: 14, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", maxWidth: 460, textAlign: 'center', lineHeight: 1.55 }}>
                  {searchAnswer || 'Ask a question to search your memories'}
                </p>
              </div>
            </div>

            {/* Bolt-style chat input */}
            <div
              style={{
                margin: '0 20px 20px',
                borderRadius: 14,
                border: `1px solid ${theme.border}`,
                background: theme.bgTertiary,
                overflow: 'visible',
              }}
            >
              <textarea
                placeholder="What do you want to search?"
                rows={2}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    if (!searchQuery.trim()) return notify('Enter a question to search.', 'error')
                    runAction('search-memory', () => dashboardApi.searchMemories(searchQuery.trim(), searchType), 'Memory search completed.', (result) => setSearchAnswer(result.answer))
                  }
                }}
                style={{
                  width: '100%',
                  padding: '18px 20px 8px',
                  border: 'none',
                  background: 'transparent',
                  color: theme.text,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.5,
                  resize: 'none',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px 12px',
                }}
              >
                {/* Search type dropdown */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setSearchTypeOpen(!searchTypeOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 8,
                      border: 'none',
                      background: 'transparent',
                      color: theme.textSecondary,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                  >
                    {searchType.charAt(0).toUpperCase() + searchType.slice(1)}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: 2 }}>
                      <path d="M1 1L5 5L9 1" stroke={theme.textTertiary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {searchTypeOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: 0,
                        marginBottom: 6,
                        background: theme.bgCard,
                        border: `1px solid ${theme.border}`,
                        borderRadius: 12,
                        padding: '8px 0',
                        minWidth: 200,
                        boxShadow: '0 8px 24px rgba(0,0,0,.15)',
                        zIndex: 100,
                      }}
                    >
                      <div style={{ padding: '8px 16px 6px', fontSize: 12, fontWeight: 600, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", letterSpacing: '.03em' }}>
                        Search Type
                      </div>
                      {['hybrid', 'vector', 'keyword', 'piygraph'].map((type) => {
                        const isActive = searchType === type
                        const labels: Record<string, string> = { hybrid: 'Hybrid', vector: 'Vector', keyword: 'Keyword', piygraph: 'PiyGraph' }
                        return (
                          <button
                            key={type}
                            onClick={() => { setSearchType(type); setSearchTypeOpen(false) }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              width: '100%',
                              padding: '10px 16px',
                              border: 'none',
                              background: 'transparent',
                              color: theme.text,
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 14,
                              cursor: 'pointer',
                              textAlign: 'left',
                            }}
                          >
                            <span
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: theme.accent,
                                flexShrink: 0,
                              }}
                            />
                            <span style={{ flex: 1 }}>{labels[type]}</span>
                            {isActive && (
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: theme.accent,
                                  padding: '2px 8px',
                                  borderRadius: 6,
                                  border: `1px solid ${theme.accent}`,
                                  letterSpacing: '.04em',
                                }}
                              >
                                ACTIVE
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Send button */}
                <button
                  onClick={() => {
                    if (!searchQuery.trim()) return notify('Enter a question to search.', 'error')
                    runAction('search-memory', () => dashboardApi.searchMemories(searchQuery.trim(), searchType), 'Memory search completed.', (result) => setSearchAnswer(result.answer))
                  }}
                  disabled={busyAction === 'search-memory'}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: 'none',
                    background: theme.accent,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: busyAction === 'search-memory' ? 'wait' : 'pointer',
                    opacity: busyAction === 'search-memory' ? 0.72 : 1,
                    flexShrink: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14V2M8 2L3 7M8 2L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: theme.text, letterSpacing: '-.02em' }}>Dashboard</h1>
      </div>

      {/* Time filter bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 24,
          paddingBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 4 }}>
          {['All time', '24h', '7d', '30d', '90d'].map((period) => {
            const isActive = dashboardTimeFilter === period
            return (
              <button
                key={period}
                onClick={() => setDashboardTimeFilter(period)}
                style={{
                  padding: '8px 18px',
                  border: 'none',
                  borderRadius: isActive ? 8 : 0,
                  background: isActive ? theme.accent : 'none',
                  boxShadow: 'none',
                  color: isActive ? '#fff' : theme.textSecondary,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                {period}
              </button>
            )
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => runAction('refresh-dashboard', () => dashboardApi.refreshAnalytics(dashboardTimeFilter), 'Dashboard data refreshed.', () => setDashboardUpdatedAt('just now'))}
            disabled={busyAction === 'refresh-dashboard'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              border: 'none',
              background: 'transparent',
              color: theme.textSecondary,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              cursor: busyAction === 'refresh-dashboard' ? 'wait' : 'pointer',
            }}
          >
            <RefreshCw size={14} className={busyAction === 'refresh-dashboard' ? 'dashboard-spin' : undefined} />
            {busyAction === 'refresh-dashboard' ? 'Refreshing…' : 'Refresh'}
          </button>
          <span style={{ fontSize: 13, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif" }}>
            Updated {dashboardUpdatedAt}
          </span>
        </div>
      </div>

      {/* Overview section */}
      <h2 style={{ fontSize: 15, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 14 }}>Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Tokens Processed', value: '24.8K', sub: '+1.2K today' },
          { label: 'Memory Stored', value: '15', sub: '+15 today' },
          { label: 'Tokens Saved', value: '—', sub: '' },
          { label: 'Median Latency', value: '—', sub: '' },
        ].map((stat) => (
          <div key={stat.label} style={{ ...cardStyle(theme), padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              <p style={{ fontSize: 13, color: theme.textSecondary, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{stat.label}</p>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="7" cy="7" r="6" stroke={theme.textTertiary} strokeWidth="1.2"/>
                <text x="7" y="10" textAnchor="middle" fill={theme.textTertiary} fontSize="9" fontFamily="DM Sans, sans-serif">i</text>
              </svg>
            </div>
            <p style={{ fontSize: 28, fontWeight: 700, color: theme.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>{stat.value}</p>
            <p style={{ fontSize: 12, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif" }}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Memory utilization & Recall score */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 16 }}>
        {/* Memory utilization */}
        <div style={{ ...cardStyle(theme), padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="1" width="10" height="14" rx="2" stroke={theme.textTertiary} strokeWidth="1.3"/>
              <path d="M6 5h4M6 8h4" stroke={theme.textTertiary} strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Memory utilization</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="7" cy="7" r="6" stroke={theme.textTertiary} strokeWidth="1.2"/>
              <text x="7" y="10" textAnchor="middle" fill={theme.textTertiary} fontSize="9" fontFamily="DM Sans, sans-serif">i</text>
            </svg>
          </div>

          <div
            style={{
              border: `1px solid ${theme.border}`,
              borderRadius: 10,
              padding: '28px 24px',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            <p style={{ fontSize: 36, fontWeight: 300, color: theme.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>26%</p>
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: theme.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>0 / 500 memories served in this range</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: theme.bgTertiary, overflow: 'hidden' }}>
              <div style={{ width: '0%', height: '100%', borderRadius: 3, background: theme.accent }} />
            </div>
          </div>
          <p style={{ fontSize: 12, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", marginTop: 12 }}>
            Unlocks at 500 memories served in this range.
          </p>
        </div>

        {/* Recall score */}
        <div style={{ ...cardStyle(theme), padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="1" width="10" height="14" rx="2" stroke={theme.textTertiary} strokeWidth="1.3"/>
              <path d="M6 5h4M6 8h4" stroke={theme.textTertiary} strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Recall score</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="7" cy="7" r="6" stroke={theme.textTertiary} strokeWidth="1.2"/>
              <text x="7" y="10" textAnchor="middle" fill={theme.textTertiary} fontSize="9" fontFamily="DM Sans, sans-serif">i</text>
            </svg>
          </div>

          <div
            style={{
              border: `1px solid ${theme.border}`,
              borderRadius: 10,
              padding: '16px 24px 28px',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            <p style={{ fontSize: 12, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>No scored results for this range.</p>
            <p style={{ fontSize: 36, fontWeight: 300, color: theme.textSecondary, fontFamily: "'DM Mono', monospace", letterSpacing: '.08em' }}>0.435</p>
          </div>
        </div>
      </div>

      {/* Detailed section */}
      <h2 style={{ fontSize: 15, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif", marginTop: 32, marginBottom: 14 }}>Detailed</h2>

      {/* Usage graph — full width */}
      <div style={{ ...cardStyle(theme), padding: '18px 22px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Usage over time</span>
          <div style={{ display: 'flex', gap: 12, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: theme.textSecondary }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: theme.accent }} /> API Calls
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: theme.textSecondary }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: dark ? '#4ade80' : '#22c55e' }} /> Memories
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 160 }}>
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50, 88, 72, 60, 42, 78, 68, 92, 58, 84, 48, 76, 63, 87, 55, 70, 82, 66, 74].map((h, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              <div style={{ width: '100%', borderRadius: '3px 3px 0 0', background: theme.accent, height: h * 1.4, opacity: 0.8 }} />
              <div style={{ width: '100%', borderRadius: '3px 3px 0 0', background: dark ? '#4ade80' : '#22c55e', height: h * 0.5, opacity: 0.6 }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif" }}>
          <span>Sep 1</span><span>Sep 8</span><span>Sep 15</span><span>Sep 22</span><span>Sep 25</span>
        </div>
      </div>

      {/* Error rate & Storage breakdown — equal pair */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 16 }}>
        {/* Error rate */}
        <div style={{ ...cardStyle(theme), padding: '18px 22px' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Error rate</span>
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <p style={{ fontSize: 36, fontWeight: 700, color: dark ? '#f87171' : '#dc2626', fontFamily: "'DM Sans', sans-serif" }}>2.1%</p>
            <p style={{ fontSize: 12, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>of total requests failed</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 48, marginTop: 20 }}>
            {[12, 8, 15, 6, 10, 4, 18, 7, 9, 5, 14, 3, 11, 6, 8, 4, 7, 10, 5, 3].map((h, i) => (
              <div key={i} style={{ flex: 1, height: h * 2.5, borderRadius: 2, background: dark ? '#f87171' : '#dc2626', opacity: 0.5 + (i / 40) }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif" }}>
            <span>30d ago</span><span>Now</span>
          </div>
        </div>

        {/* Storage breakdown */}
        <div style={{ ...cardStyle(theme), padding: '18px 22px' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Storage breakdown</span>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Text', value: 680, total: 1247, color: theme.accent },
              { label: 'JSON', value: 312, total: 1247, color: dark ? '#4ade80' : '#22c55e' },
              { label: 'Web URL', value: 187, total: 1247, color: dark ? '#fbbf24' : '#eab308' },
              { label: 'Graph', value: 68, total: 1247, color: dark ? '#60a5fa' : '#3b82f6' },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ color: theme.text, fontWeight: 500 }}>{item.label}</span>
                  <span style={{ color: theme.textTertiary }}>{item.value.toLocaleString()} memories</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: theme.bgTertiary, overflow: 'hidden' }}>
                  <div style={{ width: `${(item.value / item.total) * 100}%`, height: '100%', borderRadius: 3, background: item.color, transition: 'width .3s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Request logs — full width */}
      <div style={{ ...cardStyle(theme), padding: 0, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '18px 22px 14px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Request logs</span>
          <span style={{ fontSize: 12, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif" }}>Last 50 requests</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
              {['Timestamp', 'Endpoint', 'Status', 'Latency'].map((h) => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 500, color: theme.textTertiary, fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { time: '12:45:02', endpoint: '/v1/memories/add', status: 200, latency: '124ms' },
              { time: '12:44:58', endpoint: '/v1/memories/search', status: 200, latency: '89ms' },
              { time: '12:44:31', endpoint: '/v1/memories/add', status: 200, latency: '156ms' },
              { time: '12:43:17', endpoint: '/v1/memories/search', status: 429, latency: '12ms' },
              { time: '12:42:55', endpoint: '/v1/memories/delete', status: 200, latency: '67ms' },
              { time: '12:42:10', endpoint: '/v1/memories/add', status: 500, latency: '302ms' },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${theme.border}` }}>
                <td style={{ padding: '10px 16px', color: theme.textSecondary, fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{row.time}</td>
                <td style={{ padding: '10px 16px', color: theme.text, fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{row.endpoint}</td>
                <td style={{ padding: '10px 16px' }}>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: "'DM Mono', monospace",
                    background: row.status === 200 ? (dark ? '#1a3a2a' : '#dcfce7') : row.status === 429 ? (dark ? '#3a2a1a' : '#fef3c7') : (dark ? '#3a1a1a' : '#fee2e2'),
                    color: row.status === 200 ? (dark ? '#4ade80' : '#16a34a') : row.status === 429 ? (dark ? '#fbbf24' : '#d97706') : (dark ? '#f87171' : '#dc2626'),
                  }}>{row.status}</span>
                </td>
                <td style={{ padding: '10px 16px', color: theme.textSecondary, fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{row.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top users & Rate limit — equal pair */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {/* Top users/agents */}
        <div style={{ ...cardStyle(theme), padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px 14px', borderBottom: `1px solid ${theme.border}` }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Top users / agents</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
                {['Agent / Key', 'Memories', 'API Calls', 'Last active'].map((h) => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 500, color: theme.textTertiary, fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Production key', memories: '842', calls: '5,210', active: '2 min ago' },
                { name: 'OpenClaw Agent', memories: '298', calls: '2,104', active: '15 min ago' },
                { name: 'Hermes Agent', memories: '87', calls: '876', active: '1 hr ago' },
                { name: 'Default key', memories: '20', calls: '242', active: '3 hrs ago' },
              ].map((row) => (
                <tr key={row.name} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '10px 14px', color: theme.text, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>{row.name}</td>
                  <td style={{ padding: '10px 14px', color: theme.textSecondary, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{row.memories}</td>
                  <td style={{ padding: '10px 14px', color: theme.textSecondary, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{row.calls}</td>
                  <td style={{ padding: '10px 14px', color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>{row.active}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rate limit status */}
        <div style={{ ...cardStyle(theme), padding: '18px 22px' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Rate limit status</span>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { label: 'API Calls', used: 8432, limit: 50000 },
              { label: 'Memories', used: 1247, limit: 10000 },
              { label: 'Storage', used: 2.4, limit: 10, unit: 'GB' },
            ].map((item) => {
              const pct = (item.used / item.limit) * 100
              const isWarning = pct > 80
              return (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                    <span style={{ color: theme.text, fontWeight: 500 }}>{item.label}</span>
                    <span style={{ color: theme.textTertiary }}>
                      {item.unit ? `${item.used}${item.unit} / ${item.limit}${item.unit}` : `${item.used.toLocaleString()} / ${item.limit.toLocaleString()}`}
                    </span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: theme.bgTertiary, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: isWarning ? (dark ? '#f87171' : '#dc2626') : theme.accent, transition: 'width .3s' }} />
                  </div>
                  <p style={{ fontSize: 12, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{pct.toFixed(1)}% used</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  const renderApiKeys = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: theme.text, letterSpacing: '-.02em' }}>API keys</h1>
        <button
          onClick={() => setKeyDialog('create')}
          disabled={busyAction === 'create-api-key'}
          style={{ ...primaryBtn(theme), opacity: busyAction === 'create-api-key' ? 0.72 : 1, cursor: busyAction === 'create-api-key' ? 'wait' : 'pointer' }}
        >
          {busyAction === 'create-api-key' ? <RefreshCw size={15} className="dashboard-spin" style={{ marginRight: 4 }} /> : <Plus size={15} style={{ marginRight: 4 }} />} {busyAction === 'create-api-key' ? 'Creating…' : 'Create new API key'}
        </button>
      </div>
      <p style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 24, lineHeight: 1.5 }}>
        Easily create, view, and manage your API keys for seamless integration.
      </p>
      <div style={{ ...cardStyle(theme), overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
              {['Name', 'Key', 'Created', 'Last used', 'Actions'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: theme.textTertiary,
                    fontSize: 13,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((row) => (
              <tr key={row.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                <td style={{ padding: '14px 16px', color: theme.text, fontWeight: 500 }}>{row.name}{row.disabled ? <span style={{ marginLeft: 8, fontSize: 11, color: theme.textTertiary }}>Disabled</span> : null}</td>
                <td
                  style={{
                    padding: '14px 16px',
                    fontFamily: "'DM Mono', 'SF Mono', monospace",
                    fontSize: 13,
                    color: theme.textSecondary,
                  }}
                >
                  {row.key}
                </td>
                <td style={{ padding: '14px 16px', color: theme.textSecondary }}>{row.created}</td>
                <td style={{ padding: '14px 16px', color: theme.textTertiary }}>{row.lastUsed}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => runAction(`toggle-key-${row.id}`, () => dashboardApi.updateApiKey(row.id, !row.disabled), row.disabled ? 'API key enabled.' : 'API key disabled.', () => setApiKeys((current) => current.map((key) => key.id === row.id ? { ...key, disabled: !key.disabled } : key)))}
                      disabled={busyAction === `toggle-key-${row.id}`}
                      style={{
                        padding: '5px 12px',
                        borderRadius: 6,
                        border: `1px solid ${theme.border}`,
                        background: 'transparent',
                        color: theme.textSecondary,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      {busyAction === `toggle-key-${row.id}` ? 'Saving…' : row.disabled ? 'Enable' : 'Disable'}
                    </button>
                    <button
                      onClick={() => setKeyDialog(row)}
                      disabled={busyAction === `delete-key-${row.id}`}
                      style={{
                        padding: '5px 12px',
                        borderRadius: 6,
                        border: '1px solid #ef4444',
                        background: 'transparent',
                        color: '#ef4444',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      {busyAction === `delete-key-${row.id}` ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderConnectors = () => {
    const connectorIconStyle = (bg: string) => ({
      width: 42,
      height: 42,
      borderRadius: 10,
      background: bg,
      display: 'flex' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexShrink: 0,
      overflow: 'hidden' as const,
    })

    const connectors: { name: string; plan: string; category: string; bg: string; iconEl: React.ReactNode }[] = [
      {
        name: 'Google Drive', plan: 'Pro', category: 'oauth',
        bg: dark ? '#1a2a3a' : '#E8F0FE',
        iconEl: <img src={googleDriveLogo} alt="" aria-hidden="true" style={{ width: 27, height: 27, objectFit: 'contain' }} />,
      },
      {
        name: 'Notion', plan: 'Pro', category: 'oauth',
        bg: dark ? '#2a2a2a' : '#F5F5F5',
        iconEl: <img src={notionLogo} alt="" aria-hidden="true" style={{ width: 25, height: 25, objectFit: 'contain' }} />,
      },
      {
        name: 'OneDrive', plan: 'Pro', category: 'oauth',
        bg: dark ? '#1a2a3a' : '#E3F2FD',
        iconEl: <img src={oneDriveLogo} alt="" aria-hidden="true" style={{ width: 28, height: 24, objectFit: 'contain' }} />,
      },
      {
        name: 'GitHub', plan: 'Scale', category: 'oauth',
        bg: dark ? '#2a2a2a' : '#F0F0F0',
        iconEl: <img src={githubLogo} alt="" aria-hidden="true" style={{ width: 23, height: 23, objectFit: 'contain', filter: dark ? 'invert(1)' : 'none' }} />,
      },
      {
        name: 'Amazon S3', plan: 'Scale', category: 'services',
        bg: dark ? '#2a1a1a' : '#FFF3E0',
        iconEl: <img src={amazonS3Logo} alt="" aria-hidden="true" style={{ width: 27, height: 27, objectFit: 'contain' }} />,
      },
      {
        name: 'Gmail', plan: 'Max', category: 'oauth',
        bg: dark ? '#2a1a1a' : '#FDECEA',
        iconEl: <img src={gmailLogo} alt="" aria-hidden="true" style={{ width: 25, height: 25, objectFit: 'contain' }} />,
      },
      {
        name: 'Web Crawler', plan: 'Scale', category: 'services',
        bg: dark ? '#1a2a1a' : '#E8F5E9',
        iconEl: <img src={webCrawlerLogo} alt="" aria-hidden="true" style={{ width: 27, height: 27, objectFit: 'contain', borderRadius: '50%' }} />,
      },
      {
        name: 'Granola', plan: 'Pro', category: 'services',
        bg: dark ? '#1a2a1a' : '#E8F5E9',
        iconEl: <img src={granolaLogo} alt="" aria-hidden="true" style={{ width: 30, height: 30, objectFit: 'cover', transform: 'scale(1.4)' }} />,
      },
    ]

    const filtered = connectors.filter((c) => {
      const matchesFilter = connectorsFilter === 'all' || c.category === connectorsFilter
      const matchesSearch = !connectorsSearch || c.name.toLowerCase().includes(connectorsSearch.toLowerCase())
      return matchesFilter && matchesSearch
    })

    return (
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>Connectors</h1>
        <p style={{ fontSize: 14, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", marginBottom: 28 }}>
          Bring in content from the tools you already use.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'oauth', label: 'OAuth' },
              { id: 'services', label: 'Services' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setConnectorsFilter(tab.id)}
                style={{
                  padding: '6px 16px',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  background: connectorsFilter === tab.id ? theme.accent : 'transparent',
                  border: '0 none',
                  outline: 'none',
                  borderRadius: 8,
                  color: connectorsFilter === tab.id ? '#fff' : theme.textSecondary,
                  cursor: 'pointer',
                  transition: 'all .15s',
                  WebkitAppearance: 'none' as never,
                  appearance: 'none' as never,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: theme.textTertiary, pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search connectors..."
              value={connectorsSearch}
              onChange={(e) => setConnectorsSearch(e.target.value)}
              style={{
                padding: '8px 14px 8px 34px',
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                border: `1px solid ${theme.border}`,
                borderRadius: 8,
                background: theme.bgSecondary,
                color: theme.text,
                outline: 'none',
                width: 220,
              }}
            />
          </div>
        </div>

        <div style={{ border: `1px solid ${theme.border}`, borderRadius: 12, overflow: 'hidden', background: theme.bgSecondary }}>
          {filtered.map((connector, i) => (
            <div
              key={connector.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 24px',
                gap: 16,
                transition: 'background .15s',
              }}
            >
              <div style={connectorIconStyle(connector.bg)}>
                {connector.iconEl}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>{connector.name}</span>
                  <Lock size={13} color={theme.textTertiary} strokeWidth={1.8} />
                </div>
                <p style={{ fontSize: 12, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", marginTop: 3 }}>
                  Requires the <span style={{ color: theme.accent, fontWeight: 600 }}>{connector.plan}</span> plan
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <ChevronRight size={16} color={theme.textTertiary} />
                <button
                  onClick={() => runAction(`upgrade-${connector.name}`, () => dashboardApi.connectorAction(connector.name, 'upgrade'), `${connector.name} upgrade flow is ready for billing handoff.`)}
                  disabled={busyAction === `upgrade-${connector.name}`}
                  style={{
                    padding: '6px 18px',
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                    border: `1px solid ${theme.border}`,
                    borderRadius: 8,
                    background: 'none',
                    color: theme.text,
                    cursor: busyAction === `upgrade-${connector.name}` ? 'wait' : 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  {busyAction === `upgrade-${connector.name}` ? 'Opening…' : 'Upgrade'}
                </button>
                <button
                  onClick={() => runAction(`configure-${connector.name}`, () => dashboardApi.connectorAction(connector.name, 'configure'), `${connector.name} configuration initialized.`)}
                  disabled={busyAction === `configure-${connector.name}`}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 6,
                    border: `1px solid ${theme.border}`,
                    background: 'none',
                    color: theme.textTertiary,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {busyAction === `configure-${connector.name}` ? <RefreshCw size={15} className="dashboard-spin" /> : <MoreHorizontal size={15} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderBYOK = () => {
    const providers: Array<{ name: string; letter: string; bg: string; fg: string; logo?: string }> = [
      { name: 'OpenAI', letter: '◎', bg: dark ? '#333' : '#1a1a1a', fg: '#fff', logo: byokOpenAILogo },
      { name: 'Anthropic', letter: 'A', bg: '#d4a574', fg: '#fff', logo: byokAnthropicLogo },
      { name: 'Google Gemini', letter: 'G', bg: '#4285f4', fg: '#fff', logo: byokGoogleLogo },
      { name: 'DeepSeek', letter: 'D', bg: '#0ea5e9', fg: '#fff', logo: byokDeepSeekLogo },
      { name: 'Baseten', letter: 'B', bg: '#6366f1', fg: '#fff', logo: byokBasetenLogo },
      { name: 'Groq', letter: 'G', bg: '#f97316', fg: '#fff', logo: byokGroqLogo },
      { name: 'OpenRouter', letter: 'OR', bg: '#f43f5e', fg: '#fff', logo: byokOpenRouterLogo },
      { name: 'Cerebras', letter: 'C', bg: '#ea580c', fg: '#fff', logo: byokCerebrasLogo },
      { name: 'SambaNova', letter: 'S', bg: '#a855f7', fg: '#fff', logo: byokSambaNovaLogo },
      { name: 'GLM (Zhipu AI)', letter: 'GL', bg: '#06b6d4', fg: '#fff', logo: byokGlmLogo },
      { name: 'Together AI', letter: 'T', bg: '#f59e0b', fg: '#fff', logo: byokTogetherLogo },
      { name: 'Mistral AI', letter: 'M', bg: '#f59e0b', fg: '#fff', logo: byokMistralLogo },
      { name: 'Hugging Face', letter: '🤗', bg: '#fbbf24', fg: '#000' },
    ]

    const selected = providers.find((p) => p.name === byokSelected)

    if (selected) {
      const dashed = { border: `2px dashed ${theme.border}`, borderRadius: 10, padding: '28px 0', textAlign: 'center' as const, color: theme.textTertiary, fontSize: 13, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }
      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <button
              onClick={() => { setByokSelected(null); setByokDraft(null) }}
              style={{ background: 'transparent', border: '0 none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: theme.textTertiary, padding: 0 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            </button>
            <span style={{ fontSize: 14, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif" }}>BYOK</span>
            <ChevronRight size={14} color={theme.textTertiary} />
            <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>{selected.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: selected.logo ? '#fff' : selected.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 700,
                color: selected.fg,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {selected.logo ? (
                  <img src={selected.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6, boxSizing: 'border-box' }} />
                ) : selected.letter}
              </div>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{selected.name}</h1>
                <span style={{ fontSize: 13, color: theme.accent, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }}>
                  View supported models <ExternalLink size={12} style={{ verticalAlign: 'middle', marginLeft: 2 }} />
                </span>
              </div>
            </div>
            <button
              onClick={() => runAction(`save-byok-${selected.name}`, () => dashboardApi.saveByokProvider(selected.name), `${selected.name} routing saved.`, () => setConfiguredByok((current) => current.includes(selected.name) ? current : [...current, selected.name]))}
              disabled={busyAction === `save-byok-${selected.name}`}
              style={{
              padding: '8px 20px',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              background: theme.accent,
              border: '0 none',
              borderRadius: 8,
              color: '#fff',
              cursor: busyAction === `save-byok-${selected.name}` ? 'wait' : 'pointer',
              opacity: busyAction === `save-byok-${selected.name}` ? 0.72 : 1,
            }}>
              {busyAction === `save-byok-${selected.name}` ? 'Saving…' : 'Save'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 40 }}>
            <div style={{ width: 220, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Key size={14} color={theme.text} />
                <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Provider Keys</span>
              </div>
              <p style={{ fontSize: 13, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                Add and configure your API keys. Drag a key by its handle to reorder it within a section or move it between sections.
              </p>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>Prioritized</h3>
                    <p style={{ fontSize: 13, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif" }}>Attempted in order, before falling back to Piyapi endpoints.</p>
                  </div>
                  <button onClick={() => setByokDraft({ priority: 'prioritized', value: '' })} style={{
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                    border: `1px solid ${theme.border}`,
                    borderRadius: 8,
                    background: 'transparent',
                    color: theme.text,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    <Plus size={14} /> Add key
                  </button>
                </div>
                {byokDraft?.priority === 'prioritized' ? (
                  <div style={{ ...dashed, padding: 14, display: 'flex', gap: 10 }}>
                    <input type="password" autoFocus value={byokDraft.value} onChange={(event) => setByokDraft({ priority: 'prioritized', value: event.target.value })} placeholder="Enter provider API key" style={{ ...inputStyle(theme), minWidth: 0 }} />
                    <button onClick={() => {
                      if (!byokDraft.value.trim()) return notify('Enter an API key.', 'error')
                      runAction(`add-byok-prioritized`, () => dashboardApi.addByokKey(selected.name, 'prioritized', byokDraft.value.trim()), 'Prioritized key added.', () => setByokDraft(null))
                    }} disabled={busyAction === 'add-byok-prioritized'} style={primaryBtn(theme)}>{busyAction === 'add-byok-prioritized' ? 'Adding…' : 'Add'}</button>
                  </div>
                ) : (
                  <div style={dashed} onClick={() => setByokDraft({ priority: 'prioritized', value: '' })}>
                    <Plus size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Add a prioritized key
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>Fallback</h3>
                    <p style={{ fontSize: 13, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif" }}>Tried only after attempting Piyapi endpoints, in order.</p>
                  </div>
                  <button onClick={() => setByokDraft({ priority: 'fallback', value: '' })} style={{
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                    border: `1px solid ${theme.border}`,
                    borderRadius: 8,
                    background: 'transparent',
                    color: theme.text,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                    <Plus size={14} /> Add key
                  </button>
                </div>
                {byokDraft?.priority === 'fallback' ? (
                  <div style={{ ...dashed, padding: 14, display: 'flex', gap: 10 }}>
                    <input type="password" autoFocus value={byokDraft.value} onChange={(event) => setByokDraft({ priority: 'fallback', value: event.target.value })} placeholder="Enter provider API key" style={{ ...inputStyle(theme), minWidth: 0 }} />
                    <button onClick={() => {
                      if (!byokDraft.value.trim()) return notify('Enter an API key.', 'error')
                      runAction(`add-byok-fallback`, () => dashboardApi.addByokKey(selected.name, 'fallback', byokDraft.value.trim()), 'Fallback key added.', () => setByokDraft(null))
                    }} disabled={busyAction === 'add-byok-fallback'} style={primaryBtn(theme)}>{busyAction === 'add-byok-fallback' ? 'Adding…' : 'Add'}</button>
                  </div>
                ) : (
                  <div style={dashed} onClick={() => setByokDraft({ priority: 'fallback', value: '' })}>
                    <Plus size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Add a fallback key
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }

    const filtered = providers.filter((p) =>
      !byokSearch || p.name.toLowerCase().includes(byokSearch.toLowerCase())
    )

    return (
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>BYOK Routing</h1>
        <p style={{ fontSize: 14, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
          Route AI model inference through your own provider API keys.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Available</span>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: theme.textTertiary, pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search providers..."
              value={byokSearch}
              onChange={(e) => setByokSearch(e.target.value)}
              style={{
                padding: '8px 14px 8px 34px',
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                border: `1px solid ${theme.border}`,
                borderRadius: 8,
                background: theme.bgSecondary,
                color: theme.text,
                outline: 'none',
                width: 220,
              }}
            />
          </div>
        </div>

        <div style={{ borderRadius: 12, overflow: 'hidden' }}>
          {filtered.map((provider) => (
            <div
              key={provider.name}
              onClick={() => { setByokSelected(provider.name); setByokDraft(null); mainRef.current?.scrollTo(0, 0) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 20px',
                gap: 14,
                cursor: 'pointer',
                transition: 'background .12s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: provider.logo ? '#fff' : provider.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: provider.fg,
                fontFamily: "'DM Sans', sans-serif",
                flexShrink: 0,
              }}>
                {provider.logo ? (
                  <img src={provider.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 5, boxSizing: 'border-box' }} />
                ) : provider.letter}
              </div>

              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>
                {provider.name}
              </span>

              <span style={{ fontSize: 13, color: theme.textTertiary, fontFamily: "'DM Sans', sans-serif", marginRight: 8 }}>
                {configuredByok.includes(provider.name) ? 'Configured' : 'Not configured'}
              </span>
              <ChevronRight size={16} color={theme.textTertiary} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderGraph = () => {
    const purple = '#765DFB'
    const lavender = '#ECCDF5'
    const deepBlue = '#1e3a8a'
    const lineStroke = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'

    const seed = (i: number) => {
      let s = i * 2654435761
      s = ((s >>> 16) ^ s) * 0x45d9f3b
      s = ((s >>> 16) ^ s) * 0x45d9f3b
      return ((s >>> 16) ^ s) / 4294967296
    }

    const colors = [purple, purple, lavender, lavender, lavender, deepBlue, deepBlue]

    const clusters = [
      { cx: 280, cy: 180, spread: 120, count: 35 },
      { cx: 700, cy: 160, spread: 100, count: 30 },
      { cx: 500, cy: 320, spread: 140, count: 45 },
      { cx: 180, cy: 420, spread: 90, count: 25 },
      { cx: 780, cy: 400, spread: 110, count: 30 },
      { cx: 420, cy: 480, spread: 80, count: 20 },
      { cx: 900, cy: 260, spread: 70, count: 15 },
    ]

    const anchors = [
      { x: 280, y: 180, r: 7, color: purple, label: 'Stoicism' },
      { x: 700, y: 160, r: 6.5, color: deepBlue, label: 'Buddhism' },
      { x: 500, y: 320, r: 8, color: purple, label: 'Ethics' },
      { x: 180, y: 420, r: 5.5, color: lavender, label: 'Epistemology' },
      { x: 780, y: 400, r: 6, color: deepBlue, label: 'Logic' },
      { x: 420, y: 480, r: 5, color: lavender, label: 'Aesthetics' },
      { x: 900, y: 260, r: 4.5, color: purple, label: 'Metaphysics' },
      { x: 360, y: 100, r: 4, color: deepBlue, label: 'Plato' },
      { x: 600, y: 220, r: 5, color: purple, label: 'Aristotle' },
      { x: 140, y: 260, r: 4, color: lavender, label: 'Seneca' },
      { x: 840, y: 180, r: 3.5, color: deepBlue, label: 'Nagarjuna' },
      { x: 560, y: 460, r: 4, color: lavender, label: 'Kant' },
      { x: 650, y: 340, r: 3.5, color: purple, label: 'Hegel' },
    ]

    const particles: { x: number; y: number; r: number; color: string }[] = []
    let idx = 0
    clusters.forEach((cl) => {
      for (let i = 0; i < cl.count; i++) {
        const angle = seed(idx) * Math.PI * 2
        const dist = seed(idx + 1000) * cl.spread * (0.3 + seed(idx + 2000) * 0.7)
        const tier = seed(idx + 3000)
        const r = tier < 0.6 ? 1 + seed(idx + 4000) * 1.2 : tier < 0.85 ? 2 + seed(idx + 4000) * 1.5 : 3 + seed(idx + 4000) * 2
        particles.push({
          x: cl.cx + Math.cos(angle) * dist,
          y: cl.cy + Math.sin(angle) * dist,
          r,
          color: colors[Math.floor(seed(idx + 5000) * colors.length)],
        })
        idx++
      }
    })

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: 40 + seed(idx + 6000) * 920,
        y: 40 + seed(idx + 7000) * 480,
        r: 0.8 + seed(idx + 8000) * 0.8,
        color: colors[Math.floor(seed(idx + 9000) * colors.length)],
      })
      idx++
    }

    const links: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = []
    const allPts = [...anchors.map((a) => ({ x: a.x, y: a.y, r: a.r })), ...particles]
    for (let i = 0; i < allPts.length; i++) {
      for (let j = i + 1; j < allPts.length; j++) {
        const dx = allPts[i].x - allPts[j].x
        const dy = allPts[i].y - allPts[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const threshold = (allPts[i].r + allPts[j].r) * 12
        if (dist < threshold && dist > 5) {
          links.push({
            x1: allPts[i].x, y1: allPts[i].y,
            x2: allPts[j].x, y2: allPts[j].y,
            opacity: Math.max(0.03, 1 - dist / threshold) * 0.5,
          })
        }
      }
    }

    const panelStyle: React.CSSProperties = {
      background: dark ? 'rgba(20,20,20,0.85)' : 'rgba(255,255,255,0.88)',
      border: `1px solid ${theme.border}`,
      borderRadius: 8,
      backdropFilter: 'blur(8px)',
      fontFamily: "'DM Sans', sans-serif",
      color: theme.text,
    }

    return (
      <div style={{
        height: 'calc(100vh - 52px - 72px - 80px)',
        borderRadius: 14,
        position: 'relative',
        overflow: 'hidden',
        background: dark ? '#0a0a0a' : '#ffffff',
        border: `1px solid ${theme.border}`,
      }}>
        <svg width="100%" height="100%" viewBox="0 0 1000 560" style={{ position: 'absolute', inset: 0, transform: `scale(${graphScale})`, transformOrigin: 'center', transition: 'transform .24s cubic-bezier(.2,.8,.2,1)' }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {links.map((l, i) => (
            <line key={`l${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={lineStroke} strokeWidth={0.5} opacity={l.opacity} />
          ))}

          {particles.map((p, i) => (
            <circle key={`p${i}`} cx={p.x} cy={p.y} r={p.r}
              fill={p.color} opacity={p.r > 2.5 ? 0.7 : p.r > 1.5 ? 0.5 : 0.35} />
          ))}

          {anchors.map((a, i) => (
            <g key={`a${i}`} filter="url(#glow)">
              <circle cx={a.x} cy={a.y} r={a.r * 2.5} fill={a.color} opacity={0.06} />
              <circle cx={a.x} cy={a.y} r={a.r * 1.5} fill={a.color} opacity={0.12} />
              <circle cx={a.x} cy={a.y} r={a.r} fill={a.color} opacity={0.9} />
              {a.label && (
                <text x={a.x} y={a.y - a.r - 6} textAnchor="middle"
                  fontSize={a.r > 6 ? 9 : 7.5} fontFamily="DM Sans, sans-serif" fontWeight={500}
                  fill={dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'} letterSpacing="0.3">
                  {a.label}
                </text>
              )}
            </g>
          ))}
        </svg>

        <div style={{
          position: 'absolute', top: 16, left: 16,
          ...panelStyle, padding: '8px 16px', fontSize: 12,
          color: theme.textSecondary, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="3" cy="3" r="1.5" fill={purple} opacity="0.8"/>
            <circle cx="9" cy="3" r="1.5" fill={deepBlue} opacity="0.8"/>
            <circle cx="6" cy="9" r="1.5" fill={lavender} opacity="0.8"/>
            <line x1="3" y1="3" x2="9" y2="3" stroke={dark ? '#fff' : '#000'} strokeWidth="0.4" opacity="0.2"/>
            <line x1="3" y1="3" x2="6" y2="9" stroke={dark ? '#fff' : '#000'} strokeWidth="0.4" opacity="0.2"/>
          </svg>
          {allPts.length} nodes · {links.length} edges
        </div>

        <div style={{
          position: 'absolute', bottom: 16, left: 16,
          display: 'flex', flexDirection: 'column', gap: 5,
        }}>
          {[{ label: 'Fit', key: 'Z' }, { label: 'Center', key: 'C' }].map((btn) => (
            <button key={btn.label} onClick={() => { setGraphScale(1); notify(`${btn.label} view applied.`) }} style={{
              ...panelStyle, display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 12px', fontSize: 12, fontWeight: 500, cursor: 'pointer',
            }}>
              {btn.label}
              <span style={{
                fontSize: 11, fontFamily: "'DM Mono', monospace",
                padding: '1px 5px', borderRadius: 3,
                background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                color: theme.textTertiary,
              }}>{btn.key}</span>
            </button>
          ))}
          <div style={{
            ...panelStyle, display: 'flex', alignItems: 'center', gap: 4,
            padding: '3px 8px', fontSize: 12, fontWeight: 500,
          }}>
            <span style={{ minWidth: 26 }}>{Math.round(graphScale * 4)}%</span>
            <button onClick={() => setGraphScale((scale) => Math.max(0.65, Number((scale - 0.1).toFixed(2))))} style={{ width: 22, height: 22, borderRadius: 4, border: `1px solid ${theme.border}`, background: 'transparent', color: theme.textSecondary, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
            <button onClick={() => setGraphScale((scale) => Math.min(1.8, Number((scale + 0.1).toFixed(2))))} style={{ width: 22, height: 22, borderRadius: 4, border: `1px solid ${theme.border}`, background: 'transparent', color: theme.textSecondary, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>
          <details style={{ ...panelStyle, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>
            <summary style={{ fontWeight: 500, listStyle: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
              <ChevronRight size={11} /> Legend
            </summary>
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12 }}>
              {[
                { color: purple, label: 'Domain / Tradition' },
                { color: lavender, label: 'Section / Quote' },
                { color: deepBlue, label: 'Work / Synthesis' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    )
  }

  const renderSettings = () => {
    const settingsFields = [
      { label: 'Workspace name', value: workspaceName, action: 'update' as const },
      { label: 'Account ID', value: 'acc_7f3a9b2e1d4c', action: 'copy' as const },
      { label: 'Email', value: 'guest@piyapi.dev', action: null },
    ]

    return (
      <>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 24 }}>General</h2>

        <div style={{
          background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          borderRadius: 14,
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
        }}>
          {settingsFields.map((field, i) => (
            <div key={field.label} style={{
              padding: '20px 24px',
              borderBottom: i < settingsFields.length - 1 ? `1px solid ${theme.border}` : 'none',
            }}>
              <div style={{
                fontSize: 13,
                fontWeight: 500,
                color: theme.textSecondary,
                marginBottom: 10,
              }}>
                {field.label}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: dark ? 'rgba(255,255,255,0.05)' : '#fff',
                borderRadius: 10,
                border: `1px solid ${theme.border}`,
                padding: '12px 16px',
              }}>
                {field.action === 'update' && workspaceEditing ? (
                  <input autoFocus value={workspaceName} onChange={(event) => setWorkspaceName(event.target.value)} onKeyDown={(event) => {
                    if (event.key === 'Enter' && workspaceName.trim()) runAction('update-workspace', () => dashboardApi.updateWorkspace(workspaceName.trim()), 'Workspace name updated.', () => setWorkspaceEditing(false))
                    if (event.key === 'Escape') setWorkspaceEditing(false)
                  }} style={{ ...inputStyle(theme), padding: 0, border: 'none', background: 'transparent', fontWeight: 500 }} />
                ) : (
                  <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: theme.text }}>{field.value}</span>
                )}
                {field.action && (
                  <button
                    onClick={() => {
                      if (field.action === 'copy') {
                        navigator.clipboard.writeText(field.value)
                        notify('Account ID copied.')
                      } else if (!workspaceEditing) {
                        setWorkspaceEditing(true)
                      } else if (workspaceName.trim()) {
                        runAction('update-workspace', () => dashboardApi.updateWorkspace(workspaceName.trim()), 'Workspace name updated.', () => setWorkspaceEditing(false))
                      }
                    }}
                    disabled={busyAction === 'update-workspace'}
                    style={{
                      padding: '6px 18px',
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                      color: theme.accent,
                      background: dark ? 'rgba(118,93,251,0.12)' : 'rgba(118,93,251,0.1)',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}>
                    {field.action === 'copy' ? 'Copy' : workspaceEditing ? (busyAction === 'update-workspace' ? 'Saving…' : 'Save') : 'Update'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Active sessions */}
        <div style={{
          background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          borderRadius: 14,
          border: `1px solid ${theme.border}`,
          marginTop: 28,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 24px',
            fontSize: 15,
            fontWeight: 600,
            color: theme.text,
            borderBottom: `1px solid ${theme.border}`,
          }}>
            Active sessions
          </div>
          <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Monitor size={20} color={theme.textSecondary} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>Chrome on macOS</span>
                <span style={{
                  fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 5,
                  background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  color: theme.textSecondary,
                }}>This device</span>
              </div>
              <div style={{ fontSize: 13, color: theme.textTertiary, lineHeight: 1.5 }}>
                Mumbai, IN · 192.168.1.42 · Signed in 26 Sep · Active now
              </div>
            </div>
          </div>
        </div>

        {/* Two-factor authentication */}
        <div style={{
          background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          borderRadius: 14,
          border: `1px solid ${theme.border}`,
          marginTop: 28,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 24px',
            fontSize: 15,
            fontWeight: 600,
            color: theme.text,
            borderBottom: `1px solid ${theme.border}`,
          }}>
            Two-factor authentication
          </div>
          <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <ShieldCheck size={20} color={theme.textSecondary} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>Authenticator app</span>
                <span style={{
                  fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 5,
                  background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  color: theme.textSecondary,
                }}>Off</span>
              </div>
              <div style={{ fontSize: 13, color: theme.textTertiary, lineHeight: 1.5 }}>
                Ask for a code from your phone after the email code. Protects you if someone gets into your inbox.
              </div>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNav('usage-billing') }} style={{
              fontSize: 13, fontWeight: 500, color: theme.accent, textDecoration: 'none',
              whiteSpace: 'nowrap', flexShrink: 0, marginTop: 4,
            }}>
              Available on Scale, upgrade ↗
            </a>
          </div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginTop: 48, marginBottom: 24 }}>Advanced</h2>

        <div style={{
          background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          borderRadius: 14,
          border: `1px solid ${theme.border}`,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: theme.text, marginBottom: 4 }}>
              Export all memories
            </div>
            <div style={{ fontSize: 13, color: theme.textTertiary, lineHeight: 1.5 }}>
              Download every memory in this organization as a compressed CSV file. One export can run at a time.
            </div>
          </div>
          <button onClick={() => runAction('request-export', () => dashboardApi.requestExport(), 'Export requested. You will be notified when it is ready.')} disabled={busyAction === 'request-export'} style={{
            padding: '8px 20px',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            color: theme.accent,
            background: dark ? 'rgba(118,93,251,0.12)' : 'rgba(118,93,251,0.1)',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {busyAction === 'request-export' ? 'Requesting…' : 'Request export'}
          </button>
        </div>

        {/* Delete memories */}
        <div style={{
          background: dark ? 'rgba(255,55,55,0.06)' : 'rgba(255,0,0,0.02)',
          borderRadius: 14,
          border: `1px solid ${dark ? 'rgba(255,80,80,0.2)' : 'rgba(220,50,50,0.15)'}`,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 16,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#ef4444', marginBottom: 4 }}>
              Delete all memories
            </div>
            <div style={{ fontSize: 13, color: theme.textTertiary, lineHeight: 1.5 }}>
              Permanently erase every memory stored in this workspace. This action cannot be undone.
            </div>
          </div>
          <button onClick={() => {
            if (window.confirm('Delete all memories? This action cannot be undone.')) runAction('delete-memories', () => dashboardApi.accountAction('delete-memories'), 'All memories were deleted.')
          }} disabled={busyAction === 'delete-memories'} style={{
            padding: '8px 20px',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            color: '#fff',
            background: '#ef4444',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {busyAction === 'delete-memories' ? 'Deleting…' : 'Delete memories'}
          </button>
        </div>

        {/* Delete account */}
        <div style={{
          background: dark ? 'rgba(255,55,55,0.06)' : 'rgba(255,0,0,0.02)',
          borderRadius: 14,
          border: `1px solid ${dark ? 'rgba(255,80,80,0.2)' : 'rgba(220,50,50,0.15)'}`,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 16,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#ef4444', marginBottom: 4 }}>
              Delete account
            </div>
            <div style={{ fontSize: 13, color: theme.textTertiary, lineHeight: 1.5 }}>
              Permanently delete your account and all associated data. You will lose access to this workspace.
            </div>
          </div>
          <button onClick={() => {
            if (window.confirm('Delete this account and all associated data?')) runAction('delete-account', () => dashboardApi.accountAction('delete'), 'Account deletion request submitted.')
          }} disabled={busyAction === 'delete-account'} style={{
            padding: '8px 20px',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            color: '#fff',
            background: '#ef4444',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {busyAction === 'delete-account' ? 'Deleting…' : 'Delete account'}
          </button>
        </div>

        {/* Log out */}
        <div style={{
          background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          borderRadius: 14,
          border: `1px solid ${theme.border}`,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 16,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: theme.text, marginBottom: 4 }}>
              Log out
            </div>
            <div style={{ fontSize: 13, color: theme.textTertiary, lineHeight: 1.5 }}>
              Sign out of your current session on this device.
            </div>
          </div>
          <button onClick={() => { window.location.href = 'http://localhost:5176/' }} style={{
            padding: '8px 20px',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            color: theme.text,
            background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
            border: `1px solid ${theme.border}`,
            borderRadius: 10,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </>
    )
  }

  const renderMembers = () => {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, margin: 0 }}>Members</h2>
          <button onClick={() => {
            const email = window.prompt('Email address to invite')?.trim()
            if (!email) return
            if (!/^\S+@\S+\.\S+$/.test(email)) return notify('Enter a valid email address.', 'error')
            runAction('invite-member', () => dashboardApi.inviteMember(email, 'User'), 'Member invitation sent.', (member) => setMembers((current) => [...current, member]))
          }} disabled={busyAction === 'invite-member'} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 18px', fontSize: 14, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            color: theme.text,
            background: dark ? 'rgba(255,255,255,0.08)' : '#fff',
            border: `1px solid ${theme.border}`,
            borderRadius: 10, cursor: 'pointer',
          }}>
            <UserPlus size={16} />
            {busyAction === 'invite-member' ? 'Inviting…' : 'Invite Member'}
          </button>
        </div>

        <div style={{
          background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          borderRadius: 12,
          border: `1px solid ${theme.border}`,
          marginTop: 24,
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 140px 100px 100px 48px',
            padding: '12px 24px',
            borderBottom: `1px solid ${theme.border}`,
            background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: theme.textSecondary }}>
              <Users size={14} />
              Member Name
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: theme.textSecondary }}>Access</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: theme.textSecondary }}>2FA</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: theme.textSecondary }}>Joined</div>
            <div />
          </div>

          {/* Table rows */}
          {members.map((member, i) => (
            <div key={member.email} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 140px 100px 100px 48px',
              padding: '14px 24px',
              alignItems: 'center',
              borderBottom: i < members.length - 1 ? `1px solid ${theme.border}` : 'none',
            }}>
              <div style={{ fontSize: 14, color: theme.text }}>{member.email}</div>
              <div>
                <select
                  value={member.email === 'guest@piyapi.dev' ? memberRole : member.role}
                  onChange={(e) => {
                    const role = e.target.value
                    if (member.email === 'guest@piyapi.dev') setMemberRole(role)
                    setMembers((current) => current.map((item) => item.email === member.email ? { ...item, role } : item))
                    runAction(`role-${member.email}`, () => dashboardApi.updateMemberRole(member.email, role), 'Member role updated.')
                  }}
                  style={{
                    fontSize: 13, color: theme.textSecondary,
                    padding: '4px 12px', borderRadius: 6,
                    border: `1px solid ${theme.border}`,
                    background: 'transparent',
                    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                    appearance: 'auto',
                  }}>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div style={{ fontSize: 13, color: theme.textTertiary }}>{member.twoFactor ? 'On' : 'Off'}</div>
              <div style={{ fontSize: 13, color: theme.textTertiary }}>{member.joined ?? '26 Sep'}</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => notify(`Member actions ready for ${member.email}.`)} aria-label={`Actions for ${member.email}`} style={{ border: 0, background: 'transparent', padding: 4, cursor: 'pointer', color: theme.textTertiary }}><MoreHorizontal size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  const renderUsage = () => {
    const cardBg = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'

    return (
      <>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 6 }}>Usage</h2>
        <p style={{ fontSize: 14, color: theme.textTertiary, marginBottom: 28 }}>
          Where this period's credits went, day by day and meter by meter.
        </p>

        {/* This period */}
        <div style={{
          background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 24px', fontSize: 15, fontWeight: 600, color: theme.text, borderBottom: `1px solid ${theme.border}` }}>
            This period
          </div>
          <div style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 28, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: theme.text }}>$0.00</span>
              <span style={{ fontSize: 14, color: theme.textTertiary }}>used</span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', marginBottom: 10, width: '100%' }} />
            <div style={{ fontSize: 13, color: theme.textTertiary }}>
              of $5.00 in credits · resets Sep 27
            </div>
          </div>
        </div>

        {/* Tokens + Projected */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 }}>
          <div style={{
            background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`,
            padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: theme.textTertiary, fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>
              Tokens Processed
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 24, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: theme.text }}>0</span>
              <span style={{ fontSize: 13, color: theme.textTertiary }}>this period</span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: theme.accent, width: '100%' }} />
          </div>

          <div style={{
            background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`,
            padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: theme.textTertiary, fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>
              Projected Month-End
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 24, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: theme.text }}>$0.00</span>
              <span style={{ fontSize: 13, color: theme.textTertiary }}>at current pace</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
              <span style={{ fontSize: 12, color: theme.textTertiary, whiteSpace: 'nowrap' }}>0% of credits</span>
            </div>
          </div>
        </div>

        {/* Daily spend */}
        <div style={{
          background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden', marginTop: 20,
        }}>
          <div style={{ padding: '16px 24px', fontSize: 15, fontWeight: 600, color: theme.text, borderBottom: `1px solid ${theme.border}` }}>
            Daily spend
          </div>
          <div style={{
            padding: '48px 24px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
            minHeight: 160,
          }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: theme.text, marginBottom: 6 }}>No spend yet</div>
            <div style={{ fontSize: 13, color: theme.textTertiary }}>Daily usage appears here as it's metered.</div>
          </div>
        </div>

        {/* Usage Breakdown */}
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 6, marginTop: 40 }}>Usage Breakdown</h2>
        <p style={{ fontSize: 14, color: theme.textTertiary, marginBottom: 20 }}>
          Request volume tracked by API key.
        </p>
        <div style={{
          background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden',
        }}>
          {/* Header row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 140px 140px 140px', padding: '12px 24px',
            borderBottom: `1px solid ${theme.border}`, alignItems: 'center',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', color: theme.textTertiary, fontFamily: "'DM Mono', monospace", display: 'flex', alignItems: 'center', gap: 8 }}>
              <Key size={14} color={theme.textTertiary} />
              API Key Name
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', color: theme.textTertiary, fontFamily: "'DM Mono', monospace", display: 'flex', alignItems: 'center', gap: 6 }}>
              <Plus size={14} color={theme.textTertiary} />
              Add Requests
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', color: theme.textTertiary, fontFamily: "'DM Mono', monospace", display: 'flex', alignItems: 'center', gap: 6 }}>
              <Search size={14} color={theme.textTertiary} />
              Retrieval
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', color: theme.textTertiary, fontFamily: "'DM Mono', monospace", display: 'flex', alignItems: 'center', gap: 6 }}>
              <Activity size={14} color={theme.textTertiary} />
              Cost
            </div>
          </div>
          {/* Key rows */}
          {[
            { name: 'pk-production-key', add: 248, retrieval: 32, total: '$1.42' },
            { name: 'pk-staging-key', add: 116, retrieval: 13, total: '$0.58' },
          ].map((row, i, arr) => (
            <div key={row.name} style={{
              display: 'grid', gridTemplateColumns: '1fr 140px 140px 140px', padding: '14px 24px',
              borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Key size={15} color={theme.accent} />
                <span style={{ fontSize: 14, fontWeight: 500, color: theme.text, fontFamily: "'DM Mono', monospace" }}>{row.name}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Mono', monospace", color: theme.text }}>{row.add}</span>
              <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Mono', monospace", color: theme.text }}>{row.retrieval}</span>
              <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Mono', monospace", color: theme.text }}>{row.total}</span>
            </div>
          ))}
        </div>

        {/* Billing Plans */}
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 6, marginTop: 40 }}>Plans</h2>
        <p style={{ fontSize: 14, color: theme.textTertiary, marginBottom: 20 }}>
          Choose the plan that fits your usage.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {/* Hobby Plan */}
          <div style={{
            background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`,
            padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 13, color: theme.textTertiary, marginBottom: 4 }}>Hobby Plan</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 20 }}>Free</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Unlimited end users', '10,000 add requests per month', '1000 retrieval requests per month', 'Community Support'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: theme.textSecondary }}>
                    <Check size={14} color={theme.textTertiary} style={{ marginTop: 2, flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <button style={{
              marginTop: 28, width: '100%', padding: '10px 0', borderRadius: 8,
              border: `1px solid ${theme.border}`, background: dark ? 'rgba(255,255,255,0.06)' : '#fff',
              color: theme.textSecondary, fontSize: 14, fontWeight: 500, cursor: 'default', fontFamily: 'inherit',
            }}>
              Current Plan
            </button>
          </div>

          {/* Starter Plan */}
          <div style={{
            background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`,
            padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 13, color: theme.textTertiary, marginBottom: 4 }}>Starter Plan</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 20 }}>$19<span style={{ fontSize: 14, fontWeight: 400, color: theme.textTertiary }}>/month</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Unlimited end users', '50,000 add requests per month', '5000 retrieval requests per month', 'Community Support'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: theme.textSecondary }}>
                    <Check size={14} color={theme.textTertiary} style={{ marginTop: 2, flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => runAction('upgrade-starter', () => dashboardApi.billingAction('checkout', 'starter'), 'Starter checkout initialized.')} disabled={busyAction === 'upgrade-starter'} style={{
              marginTop: 28, width: '100%', padding: '10px 0', borderRadius: 8,
              border: `1px solid ${theme.border}`, background: dark ? 'rgba(255,255,255,0.06)' : '#fff',
              color: theme.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {busyAction === 'upgrade-starter' ? 'Opening checkout…' : 'Upgrade to Starter'}
            </button>
          </div>

          {/* Pro Plan */}
          <div style={{
            background: cardBg, borderRadius: 14, border: `1px solid ${theme.accent}`,
            padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 12, right: 12, fontSize: 11, fontWeight: 600,
              background: theme.accent, color: '#fff', padding: '3px 10px', borderRadius: 20,
            }}>
              Recommended
            </div>
            <div>
              <div style={{ fontSize: 13, color: theme.textTertiary, marginBottom: 4 }}>Pro Plan</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 20 }}>$249<span style={{ fontSize: 14, fontWeight: 400, color: theme.textTertiary }}>/month</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Unlimited end users', '500,000 add requests per month', '50,000 retrieval requests per months', 'Graph memory (Entity Linking)', 'Dream (Memory Consolidation)', 'Private Slack Channel', 'Advanced Analytics', 'Multiple Project Support'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: theme.textSecondary }}>
                    <Check size={14} color={theme.textTertiary} style={{ marginTop: 2, flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => runAction('upgrade-pro', () => dashboardApi.billingAction('checkout', 'pro'), 'Pro checkout initialized.')} disabled={busyAction === 'upgrade-pro'} style={{
              marginTop: 28, width: '100%', padding: '10px 0', borderRadius: 8,
              border: `1px solid ${theme.border}`, background: dark ? 'rgba(255,255,255,0.06)' : '#fff',
              color: theme.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {busyAction === 'upgrade-pro' ? 'Opening checkout…' : 'Upgrade to Pro'}
            </button>
          </div>

          {/* Enterprise Plan */}
          <div style={{
            background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`,
            padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 13, color: theme.textTertiary, marginBottom: 4 }}>Enterprise Plan</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 20 }}>Flexible Pricing</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Unlimited end users', 'Unlimited add requests', 'Unlimited retrieval requests', 'Graph memory (Entity Linking)', 'Dream (Memory Consolidation)', 'Private Slack Channel', 'Advanced Analytics', 'On-prem deployment', 'Audit Logs', 'SSO', 'Custom Integrations', 'SLA'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: theme.textSecondary }}>
                    <Check size={14} color={theme.textTertiary} style={{ marginTop: 2, flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => runAction('contact-sales', () => dashboardApi.billingAction('contact-sales', 'enterprise'), 'Sales request submitted.')} disabled={busyAction === 'contact-sales'} style={{
              marginTop: 28, width: '100%', padding: '10px 0', borderRadius: 8,
              border: `1px solid ${theme.border}`, background: dark ? 'rgba(255,255,255,0.06)' : '#fff',
              color: theme.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {busyAction === 'contact-sales' ? 'Submitting…' : 'Contact Us'}
            </button>
          </div>
        </div>

        {/* Billing & payment */}
        <div style={{
          background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden', marginTop: 40,
        }}>
          <div style={{
            padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: `1px solid ${theme.border}`,
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>Billing & payment</span>
            <button onClick={() => runAction('manage-billing', () => dashboardApi.billingAction('portal'), 'Billing portal initialized.')} disabled={busyAction === 'manage-billing'} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8,
              border: `1px solid ${theme.border}`, background: dark ? 'rgba(255,255,255,0.06)' : '#fff',
              color: theme.text, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <ExternalLink size={14} />
              {busyAction === 'manage-billing' ? 'Opening…' : 'Manage billing'}
            </button>
          </div>
          <div style={{ padding: '20px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', color: theme.textTertiary, fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>Account</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>A</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', color: theme.textTertiary, fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>Billing Email</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>itsofficialaniket7@gmail.com</div>
              </div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px', borderRadius: 10,
              border: `1px solid ${theme.border}`,
              background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <CreditCard size={20} color={theme.textTertiary} />
                <span style={{ fontSize: 14, color: theme.textSecondary }}>No payment method</span>
              </div>
              <button onClick={() => runAction('payment-method', () => dashboardApi.billingAction('payment-method'), 'Payment method setup initialized.')} disabled={busyAction === 'payment-method'} style={{
                display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
                color: theme.text, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {busyAction === 'payment-method' ? 'Opening…' : 'Add payment method'}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderPrivacy = () => {
    const cardBg = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
    const regions = [
      { id: 'us-east', flag: '🇺🇸', name: 'US-East (AWS N. Virginia)', latency: '12ms', regulation: 'NIST SP 800-53 · FedRAMP Moderate' },
      { id: 'eu-central', flag: '🇪🇺', name: 'EU-Central (AWS Frankfurt)', latency: '85ms', regulation: 'GDPR · SCHREMS II' },
      { id: 'ap-south', flag: '🇮🇳', name: 'AP-South (AWS Mumbai)', latency: '110ms', regulation: 'DPDP Act' },
      { id: 'ap-northeast', flag: '🇯🇵', name: 'AP-Northeast (AWS Tokyo)', latency: '140ms', regulation: 'APPI' },
    ]

    return (
      <>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 6 }}>Privacy & Compliance</h2>
        <p style={{ fontSize: 14, color: theme.textTertiary, marginBottom: 28 }}>
          Manage how your data is stored, processed, and protected across Piyapi services.
        </p>

        <div style={{
          background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 24px', fontSize: 15, fontWeight: 600, color: theme.text, borderBottom: `1px solid ${theme.border}` }}>
            Data Residency
          </div>

          {regions.map((r, i) => {
            const isActive = r.id === selectedRegion
            return (
              <div key={r.id} onClick={() => {
                if (r.id === selectedRegion) return
                const previous = selectedRegion
                setSelectedRegion(r.id)
                runAction(`region-${r.id}`, () => dashboardApi.selectRegion(r.id), 'Data residency region updated.', undefined).catch(() => setSelectedRegion(previous))
              }} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 24px', cursor: 'pointer',
                borderBottom: i < regions.length - 1 ? `1px solid ${theme.border}` : 'none',
                background: isActive ? (dark ? 'rgba(118,93,251,0.06)' : 'rgba(118,93,251,0.03)') : 'transparent',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', border: isActive ? `5px solid ${theme.accent}` : `2px solid ${theme.border}`,
                    boxSizing: 'border-box', flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 16 }}>{r.flag}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>{r.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 12, color: theme.textTertiary, fontFamily: "'DM Mono', monospace" }}>{r.regulation}</span>
                  <span style={{ fontSize: 12, color: theme.textTertiary, fontFamily: "'DM Mono', monospace" }}>{r.latency}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* PII Masking */}
        <div style={{
          background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden', marginTop: 20,
        }}>
          <div style={{ padding: '16px 24px', fontSize: 15, fontWeight: 600, color: theme.text, borderBottom: `1px solid ${theme.border}` }}>
            PII Auto-Masking
          </div>
          {['Gov ID (SSN / Passport)', 'Contact (Email / Phone)', 'Medical MRN & DOB', 'Financial (CC / IBAN)'].map((rule, i, arr) => (
            <div key={rule} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 24px',
              borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none',
            }}>
              <span style={{ fontSize: 14, color: theme.text }}>{rule}</span>
              <Check size={16} color={theme.accent} />
            </div>
          ))}
        </div>

        {/* Encryption */}
        <div style={{
          background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden', marginTop: 20,
        }}>
          <div style={{ padding: '16px 24px', fontSize: 15, fontWeight: 600, color: theme.text, borderBottom: `1px solid ${theme.border}` }}>
            Encryption
          </div>
          {[
            { title: 'At-Rest', value: 'AES-256-GCM' },
            { title: 'In-Transit', value: 'TLS 1.3 with PFS' },
            { title: 'Key Rotation', value: '30-day cycle' },
          ].map((item, i, arr) => (
            <div key={item.title} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 24px',
              borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none',
            }}>
              <span style={{ fontSize: 14, color: theme.text }}>{item.title}</span>
              <span style={{ fontSize: 13, color: theme.textTertiary, fontFamily: "'DM Mono', monospace" }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Audit Log */}
        <div style={{
          background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden', marginTop: 20,
        }}>
          <div style={{ padding: '16px 24px', fontSize: 15, fontWeight: 600, color: theme.text, borderBottom: `1px solid ${theme.border}` }}>
            Audit Log
          </div>
          {[
            { action: 'BYOK_KEY_ROTATE', email: 'admin@piyapi.cloud', time: '27 Sep, 7:37 AM' },
            { action: 'PHI_REDACTION_SCAN', email: 'security@piyapi.cloud', time: '27 Sep, 6:37 AM' },
            { action: 'REGION_STORAGE_SET', email: 'dev@piyapi.cloud', time: '27 Sep, 5:37 AM' },
          ].map((row, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 24px',
              borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: theme.text, marginBottom: 2 }}>{row.action}</div>
                <div style={{ fontSize: 12, color: theme.textTertiary }}>{row.email}</div>
              </div>
              <span style={{ fontSize: 12, color: theme.textTertiary, fontFamily: "'DM Mono', monospace" }}>{row.time}</span>
            </div>
          ))}
        </div>

        {/* Master Key Control */}
        <div style={{
          background: dark ? 'rgba(255,55,55,0.06)' : 'rgba(255,0,0,0.02)', borderRadius: 14,
          border: `1px solid ${dark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.15)'}`, overflow: 'hidden', marginTop: 20,
        }}>
          <div style={{ padding: '16px 24px', fontSize: 15, fontWeight: 600, color: theme.text, borderBottom: `1px solid ${dark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.15)'}` }}>
            Master Key Control
          </div>
          <div style={{ padding: '14px 24px', borderBottom: `1px solid ${dark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.15)'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: 14, color: theme.text }}>Key ID</span>
              <span style={{ fontSize: 13, color: theme.textTertiary, fontFamily: "'DM Mono', monospace" }}>Not configured</span>
            </div>
          </div>
          <div style={{ padding: '14px 24px', borderBottom: `1px solid ${dark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.15)'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, color: theme.text }}>Algorithm</span>
              <span style={{ fontSize: 13, color: theme.textTertiary, fontFamily: "'DM Mono', monospace" }}>HKDF-SHA256 · AES-256-GCM</span>
            </div>
          </div>
          <div style={{ padding: '20px 24px' }}>
            <button onClick={() => {
              if (window.confirm('Revoke the master key? Data encrypted with it may become inaccessible.')) runAction('revoke-master-key', () => dashboardApi.accountAction('revoke-master-key'), 'Master key revocation request submitted.')
            }} disabled={busyAction === 'revoke-master-key'} style={{
              width: '100%', padding: '10px 0', borderRadius: 8,
              background: 'transparent', border: '1px solid #ef4444', color: '#ef4444',
              fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {busyAction === 'revoke-master-key' ? 'Revoking…' : 'Revoke Master Key'}
            </button>
            <div style={{ fontSize: 12, color: theme.textTertiary, marginTop: 8 }}>
              This action is irreversible. All data encrypted with this key will be permanently lost.
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderApiReference = () => {
    const cardBg = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
    return (
      <>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 6 }}>API Reference</h2>
        <p style={{ fontSize: 14, color: theme.textTertiary, marginBottom: 28 }}>
          Browse our developer docs or explore all the ways to start using Piyapi.
        </p>

        <div style={{
          background: cardBg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: 'hidden',
          padding: '28px 32px',
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: theme.text, marginBottom: 24 }}>
            Get started with Piyapi API
          </div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <div style={{
              width: 260, height: 160, borderRadius: 14, background: dark ? '#111' : '#f5f5f5',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              overflow: 'hidden',
            }}>
              <img src={dark ? '/piyapi-logo-white.webp' : '/piyapi-logo-black.webp'} alt="Piyapi" style={{ width: 160, objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 1.6, margin: 0 }}>
                Learn what you can do with the Piyapi API and get up and running in minutes.
              </p>
              <button onClick={() => notify('Documentation route is ready for the production docs URL.')} style={{
                display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
                color: theme.accent, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: 0,
              }}>
                Read the docs <span style={{ fontSize: 18 }}>→</span>
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderSystemStatus = () => {
    const green = '#22c55e'
    const uptimeDays = 90
    const monitors = [
      {
        group: 'Platform APIs',
        items: [
          { name: 'Add Memory', status: 'Operational', uptime: Array(uptimeDays).fill(true) },
          { name: 'Search Memory', status: 'Operational', uptime: Array(uptimeDays).fill(true) },
          { name: 'Get Memory', status: 'Operational', uptime: Array(uptimeDays).fill(true) },
          { name: 'Delete Memory', status: 'Operational', uptime: Array(uptimeDays).fill(true) },
        ],
      },
      {
        group: 'Infrastructure',
        items: [
          { name: 'API Gateway', status: 'Operational', uptime: Array(uptimeDays).fill(true) },
          { name: 'Graph Engine', status: 'Operational', uptime: Array(uptimeDays).fill(true) },
        ],
      },
      {
        group: 'Website',
        items: [
          { name: 'Dashboard', status: 'Operational', uptime: Array(uptimeDays).fill(true) },
          { name: 'Documentation', status: 'Operational', uptime: Array(uptimeDays).fill(true) },
        ],
      },
    ]

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <img
            src={dark ? '/piyapi-logo-white.webp' : '/piyapi-logo-black.webp'}
            alt="Piyapi"
            style={{ height: 48 }}
          />
        </div>

        <div style={{
          padding: '28px 32px',
          borderRadius: 14,
          background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          border: `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 32,
        }}>
          <CircleCheck size={28} color={green} fill={green} stroke={dark ? '#111' : '#fff'} />
          <span style={{ fontSize: 22, fontWeight: 600, color: theme.text }}>All Systems Operational</span>
        </div>

        {monitors.map((group) => (
          <div key={group.group} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.textTertiary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {group.group}
            </div>
            <div style={{
              borderRadius: 14,
              border: `1px solid ${theme.border}`,
              background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              overflow: 'hidden',
            }}>
              {group.items.map((monitor, i) => (
                <div
                  key={monitor.name}
                  style={{
                    padding: '16px 24px',
                    borderBottom: i < group.items.length - 1 ? `1px solid ${theme.border}` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>{monitor.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: green }}>{monitor.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {monitor.uptime.map((up, d) => (
                      <div
                        key={d}
                        style={{
                          flex: 1,
                          height: 28,
                          borderRadius: 2,
                          background: up
                            ? (dark ? 'rgba(34,197,94,0.4)' : 'rgba(34,197,94,0.5)')
                            : (dark ? 'rgba(239,68,68,0.4)' : 'rgba(239,68,68,0.5)'),
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: theme.textTertiary }}>
                    <span>{uptimeDays} days ago</span>
                    <span style={{ fontSize: 12, color: theme.textSecondary }}>100% uptime</span>
                    <span>Today</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{
          textAlign: 'center',
          padding: '24px 0',
          fontSize: 12,
          color: theme.textTertiary,
        }}>
          Powered by Piyapi
        </div>
      </div>
    )
  }

  const renderPlaceholder = () => {
    const item = sidebarNav.find((n) => n.id === activeNav)
    const Icon = item?.icon || Settings
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
          textAlign: 'center',
        }}
      >
        <Icon size={36} color={theme.textTertiary} style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 22, fontWeight: 600, color: theme.text, marginBottom: 6 }}>{item?.label}</h2>
        <p style={{ fontSize: 14, color: theme.textTertiary }}>This section is coming soon.</p>
      </div>
    )
  }

  const mainItems = sidebarNav.filter((n) => n.section === 'main')
  const advancedItems = sidebarNav.filter((n) => n.section === 'advanced')
  const accountItems = sidebarNav.filter((n) => n.section === 'account')
  const bottomItems = sidebarNav.filter((n) => n.section === 'bottom')


  return (
    <div
      style={{
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        background: theme.bg,
        color: theme.text,
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        transition: 'background .2s, color .2s',
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Mono:wght@400;500&display=swap"
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.4)',
            zIndex: 40,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`dashboard-sidebar${sidebarOpen ? ' open' : ''}`}
        style={{
          width: sidebarCollapsed ? 0 : 250,
          minWidth: sidebarCollapsed ? 0 : 250,
          background: theme.sidebarBg,
          borderRight: sidebarCollapsed ? 'none' : `1px solid ${theme.border}`,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: sidebarOpen ? 'fixed' : undefined,
          zIndex: sidebarOpen ? 50 : undefined,
          left: sidebarOpen ? 0 : undefined,
          transition: 'width .2s, min-width .2s',
          overflow: 'hidden',
        }}
      >
        {/* Username + sidebar toggle */}
        <div style={{
          padding: '16px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6, background: theme.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 13, fontWeight: 700,
            }}>
              {username.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{username}</span>
          </div>
          <button
            onClick={() => setSidebarCollapsed(true)}
            style={{
              background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              border: 'none', borderRadius: 6, width: 30, height: 30,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: theme.textTertiary,
            }}
          >
            <PanelLeftClose size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
          <NavGroup items={mainItems} active={activeNav} onSelect={(id) => { handleNav(id); setSidebarOpen(false) }} theme={theme} />
          <div style={{ marginTop: 20, marginBottom: 6, padding: '0 12px' }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: theme.textTertiary }}>
              Advanced
            </span>
          </div>
          <NavGroup items={advancedItems} active={activeNav} onSelect={(id) => { handleNav(id); setSidebarOpen(false) }} theme={theme} />
          <div style={{ marginTop: 20, marginBottom: 6, padding: '0 12px' }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: theme.textTertiary }}>
              Account
            </span>
          </div>
          <NavGroup items={accountItems} active={activeNav} onSelect={(id) => { handleNav(id); setSidebarOpen(false) }} theme={theme} />
        </nav>

        {/* Bottom */}
        <div style={{ padding: '8px 10px 14px' }}>
          <NavGroup items={bottomItems} active={activeNav} onSelect={(id) => { handleNav(id); setSidebarOpen(false) }} theme={theme} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px', marginTop: 6 }}>
            <button
              onClick={() => setDark(!dark)}
              style={{
                ...iconBtn(theme),
                width: 32,
                height: 32,
              }}
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button onClick={() => { window.location.href = 'http://localhost:5176/' }} style={{ ...iconBtn(theme), width: 32, height: 32 }} title="Logout">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main
        ref={mainRef}
        style={{
          flex: 1,
          overflowY: 'scroll',
          background: theme.bgSecondary,
        }}
      >
        {/* Top bar (mobile) */}
        <div
          style={{
            height: 52,
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            borderBottom: `1px solid ${theme.border}`,
            background: theme.bgSecondary,
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ ...iconBtn(theme), marginRight: 12, display: 'none' }}
            className="mobile-menu-btn"
          >
            ☰
          </button>
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              style={{
                background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                border: 'none', borderRadius: 6, width: 30, height: 30,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: theme.textTertiary, marginRight: 12,
              }}
            >
              <PanelLeftOpen size={16} />
            </button>
          )}
          <span style={{ fontSize: 14, fontWeight: 500, color: theme.textSecondary }}>
            {sidebarNav.find((n) => n.id === activeNav)?.label}
          </span>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '6px 14px', borderRadius: 8,
              border: `1px solid ${theme.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: theme.textTertiary }}>Total Spend:</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: theme.text, fontFamily: "'DM Mono', monospace" }}>$0.12</span>
              </div>
              <span style={{ fontSize: 12, color: theme.textTertiary }}>Credits:</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#22c55e', fontFamily: "'DM Mono', monospace" }}>$5.88</span>
            </div>
            <button onClick={() => setWorkspaceOpen((open) => !open)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 8,
              border: `1px solid ${theme.border}`, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: theme.text }}>Workspace</span>
              <ChevronDown size={14} color={theme.textTertiary} style={{ transform: workspaceOpen ? 'rotate(180deg)' : 'none', transition: 'transform .18s' }} />
            </button>
            {workspaceOpen && (
              <div className="dashboard-popover" style={{ position: 'absolute', top: 42, right: 92, width: 220, padding: 8, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.bgCard, boxShadow: '0 14px 36px rgba(0,0,0,.14)', zIndex: 60 }}>
                <button onClick={() => { setWorkspaceOpen(false); handleNav('settings') }} style={{ width: '100%', padding: '9px 10px', border: 0, borderRadius: 7, background: 'transparent', color: theme.text, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>
                  {workspaceName}
                </button>
              </div>
            )}
            <button onClick={() => handleNav('usage-billing')} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8,
              background: dark ? '#fff' : '#111', color: dark ? '#111' : '#fff',
              border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            }}>
              <Zap size={14} fill="currentColor" />
              Upgrade
            </button>
          </div>
        </div>

        {pageLoading && <div className="dashboard-progress" style={{ position: 'sticky', top: 52, height: 2, zIndex: 31, background: theme.accent, transformOrigin: 'left' }} />}

        <div className="content-area" style={{ maxWidth: 860, margin: '0 auto', padding: '36px 40px 80px' }}>
          <div key={activeNav} className="dashboard-content-enter" style={{ opacity: pageLoading ? 0.72 : 1, transition: 'opacity .18s' }}>
            {renderContent()}
          </div>
        </div>
      </main>

      {keyDialog && <ApiKeyDialog target={keyDialog} theme={theme} onClose={() => setKeyDialog(null)}
        onCreated={(record) => setApiKeys((current) => [...current, record])}
        onDeleted={(id) => { setApiKeys((current) => current.filter((key) => key.id !== id)); notify('API key deleted.') }} />}

      {toast && (
        <div className="dashboard-toast" role="status" style={{
          position: 'fixed', right: 22, top: 68, zIndex: 100,
          display: 'flex', alignItems: 'center', gap: 9, maxWidth: 360,
          padding: '11px 14px', borderRadius: 10, border: `1px solid ${theme.border}`,
          background: theme.bgCard, color: theme.text, boxShadow: '0 16px 40px rgba(0,0,0,.16)',
          fontSize: 13, fontWeight: 500,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: toast.tone === 'success' ? theme.success : '#ef4444', flexShrink: 0 }} />
          {toast.message}
        </div>
      )}

      <style>{`
        @keyframes dashboard-enter { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dashboard-toast-in { from { opacity: 0; transform: translateY(-8px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes dashboard-progress { from { transform: scaleX(.08); opacity: .45; } to { transform: scaleX(1); opacity: 1; } }
        @keyframes dashboard-spin { to { transform: rotate(360deg); } }
        .dashboard-content-enter { animation: dashboard-enter .24s cubic-bezier(.2,.8,.2,1); }
        .dashboard-toast { animation: dashboard-toast-in .22s cubic-bezier(.2,.8,.2,1); }
        .dashboard-popover { animation: dashboard-toast-in .18s cubic-bezier(.2,.8,.2,1); }
        .dashboard-progress { animation: dashboard-progress .24s ease-out; }
        .dashboard-spin { animation: dashboard-spin .8s linear infinite; }
        button { transition: transform .12s ease, opacity .15s ease, background-color .15s ease, border-color .15s ease, color .15s ease; }
        button:active:not(:disabled) { transform: scale(.985); }
        button:disabled { cursor: wait !important; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
        @media (min-width: 768px) {
          .content-area { margin-left: calc(50% - 430px) !important; }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: flex !important; }
          .dashboard-sidebar { transform: translateX(-100%); position: fixed; z-index: 50; }
          .dashboard-sidebar.open { transform: translateX(0); }
        }
        @media (max-width: 767px) {
          .quickstart-row { flex-direction: column; gap: 12px !important; }
          .quickstart-row > .quickstart-card {
            flex: none !important;
            padding: 18px 20px !important;
            border-radius: 12px !important;
            gap: 14px !important;
          }
          .quickstart-row > .quickstart-card .qs-icon {
            width: 44px !important;
            height: 44px !important;
            border-radius: 10px !important;
          }
          .quickstart-row > .quickstart-card .qs-icon svg {
            width: 20px !important;
            height: 20px !important;
          }
          .quickstart-row > .quickstart-card .qs-label {
            font-size: 15px !important;
          }
          .quickstart-row > .quickstart-card .qs-desc {
            font-size: 13px !important;
            margin-top: 2px !important;
          }
          .plugin-platform-tabs {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: 100%;
            overflow: visible !important;
          }
          .plugin-platform-tabs > button {
            justify-content: center;
            padding: 8px 10px !important;
          }
        }
      `}</style>
    </div>
  )
}

function StepBadge({ n, theme }: { n: number; theme: Record<string, string> }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: -10,
        left: 20,
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: theme.accent,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {n}
    </div>
  )
}

function NavGroup({
  items,
  active,
  onSelect,
  theme,
}: {
  items: typeof sidebarNav
  active: string
  onSelect: (id: string) => void
  theme: Record<string, string>
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map((item) => {
        const Icon = item.icon
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: isActive ? theme.accentBg : 'transparent',
              color: isActive ? theme.accent : theme.textSecondary,
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
              width: '100%',
              textAlign: 'left',
              transition: 'background .15s, color .15s',
            }}
          >
            <Icon size={16} />
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

function CodeBlock({ theme, lang, code }: { theme: Record<string, string>; lang: string; code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: theme.codeBg,
        borderRadius: 8,
        padding: '10px 14px',
        border: `1px solid ${theme.border}`,
        fontFamily: "'DM Mono', 'SF Mono', monospace",
        fontSize: 13,
        color: theme.text,
        flex: 1,
        minWidth: 180,
      }}
    >
      <span style={{ color: theme.textTertiary, fontSize: 12 }}>{lang === 'bash' ? '$' : ''}</span>
      <span style={{ flex: 1 }}>{code}</span>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        style={iconBtn(theme)}
        title="Copy"
      >
        {copied ? <Check size={14} color={theme.success} /> : <Copy size={14} />}
      </button>
    </div>
  )
}

function cardStyle(theme: Record<string, string>): React.CSSProperties {
  return {
    background: theme.bgCard,
    borderRadius: 12,
    border: `1px solid ${theme.border}`,
    padding: '24px',
  }
}

function inputStyle(theme: Record<string, string>): React.CSSProperties {
  return {
    flex: 1,
    padding: '10px 14px',
    borderRadius: 8,
    border: `1px solid ${theme.border}`,
    background: theme.inputBg,
    color: theme.text,
    fontSize: 14,
    outline: 'none',
    fontFamily: 'inherit',
  }
}

function primaryBtn(theme: Record<string, string>): React.CSSProperties {
  return {
    padding: '10px 18px',
    borderRadius: 8,
    border: 'none',
    background: theme.accent,
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  }
}

function iconBtn(theme: Record<string, string>): React.CSSProperties {
  return {
    background: 'none',
    border: 'none',
    padding: 4,
    cursor: 'pointer',
    color: theme.textSecondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    fontFamily: 'inherit',
  }
}
