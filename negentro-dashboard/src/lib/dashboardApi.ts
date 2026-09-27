export type ApiKeyRecord = {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  disabled?: boolean
}

export type CreatedApiKey = { record: ApiKeyRecord; secret: string; preview?: boolean }

export type MemberRecord = {
  email: string
  role: string
  twoFactor?: boolean
  joined?: string
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  signal?: AbortSignal
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '')

const wait = (milliseconds = 520) => new Promise((resolve) => window.setTimeout(resolve, milliseconds))

async function request<T>(path: string, options: RequestOptions = {}, mockResult: T): Promise<T> {
  if (!API_BASE) {
    await wait()
    return mockResult
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method ?? 'GET',
    headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: 'include',
    signal: options.signal,
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(detail || `Request failed (${response.status})`)
  }

  if (response.status === 204) return mockResult
  return response.json() as Promise<T>
}

export const dashboardApi = {
  addMemory: (type: string, content: string) =>
    request('/v1/memories', { method: 'POST', body: { type, content } }, { id: `mem_${Date.now()}` }),

  searchMemories: (query: string, searchType: string) =>
    request('/v1/memories/search', { method: 'POST', body: { query, searchType } }, {
      answer: 'Search completed. Connect VITE_API_BASE_URL to display live memory results.',
      results: [],
    }),

  refreshAnalytics: (range: string) =>
    request(`/v1/analytics?range=${encodeURIComponent(range)}`, {}, { refreshedAt: new Date().toISOString() }),

  createApiKey: async (name: string): Promise<CreatedApiKey> => {
    const secret = `demo_sk_${Array.from(crypto.getRandomValues(new Uint8Array(24)), (byte) => byte.toString(16).padStart(2, '0')).join('')}`
    const result = await request<CreatedApiKey>('/v1/api-keys', { method: 'POST', body: { name } }, {
      record: {
        id: crypto.randomUUID(), name, key: `demo_sk_…${secret.slice(-4)}`,
        created: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date()),
        lastUsed: 'Never',
      },
      secret, preview: true,
    })
    if (!result.record?.id || !result.secret) throw new Error('The server did not return the new key. Refresh your key list before trying again.')
    return result
  },

  updateApiKey: (id: string, disabled: boolean) =>
    request(`/v1/api-keys/${id}`, { method: 'PATCH', body: { disabled } }, { id, disabled }),

  deleteApiKey: (id: string) =>
    request(`/v1/api-keys/${id}`, { method: 'DELETE' }, { id }),

  connectorAction: (connector: string, action: 'upgrade' | 'configure') =>
    request(`/v1/connectors/${encodeURIComponent(connector.toLowerCase())}/${action}`, { method: 'POST' }, { connector, action }),

  saveByokProvider: (provider: string) =>
    request('/v1/byok/providers', { method: 'POST', body: { provider } }, { provider, configured: true }),

  addByokKey: (provider: string, priority: 'prioritized' | 'fallback', key: string) =>
    request('/v1/byok/keys', { method: 'POST', body: { provider, priority, key } }, { id: `byok_${Date.now()}` }),

  updateWorkspace: (name: string) =>
    request('/v1/workspace', { method: 'PATCH', body: { name } }, { name }),

  inviteMember: (email: string, role: string) =>
    request('/v1/members/invitations', { method: 'POST', body: { email, role } }, {
      email,
      role,
      twoFactor: false,
      joined: 'Invited',
    } as MemberRecord),

  updateMemberRole: (email: string, role: string) =>
    request(`/v1/members/${encodeURIComponent(email)}`, { method: 'PATCH', body: { role } }, { email, role }),

  selectRegion: (region: string) =>
    request('/v1/privacy/region', { method: 'PATCH', body: { region } }, { region }),

  requestExport: () => request('/v1/exports', { method: 'POST' }, { queued: true }),

  billingAction: (action: string, plan?: string) =>
    request('/v1/billing/actions', { method: 'POST', body: { action, plan } }, { action, plan }),

  accountAction: (action: string) =>
    request(`/v1/account/${action}`, { method: 'POST' }, { action }),
}
