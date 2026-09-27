import { useEffect, useRef, useState } from 'react'
import { Check, Copy, KeyRound, Loader2, X } from 'lucide-react'
import { dashboardApi, type ApiKeyRecord, type CreatedApiKey } from './lib/dashboardApi'

export default function ApiKeyDialog({ target, theme, onClose, onCreated, onDeleted }: {
  target: 'create' | ApiKeyRecord
  theme: Record<string, string>
  onClose: () => void
  onCreated: (record: ApiKeyRecord) => void
  onDeleted: (id: string) => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const locked = useRef(false)
  const [name, setName] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [created, setCreated] = useState<CreatedApiKey | null>(null)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const deleting = target !== 'create'
  const canClose = !pending && (!created || saved)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    dialog.current?.showModal()
    dialog.current?.querySelector<HTMLInputElement>('#api-key-name')?.focus()
    return () => { previous?.focus() }
  }, [])

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (locked.current) return
    if (!deleting && !name.trim()) { setError('Enter a name for this key.'); return }
    locked.current = true
    setPending(true)
    setError('')
    try {
      if (deleting) {
        await dashboardApi.deleteApiKey(target.id)
        onDeleted(target.id)
        onClose()
      } else {
        const result = await dashboardApi.createApiKey(name.trim())
        // Keep the secret only in this dialog; the table receives masked metadata.
        onCreated({ ...result.record, key: `${result.secret.split('_').slice(0, 2).join('_')}_…${result.secret.slice(-4)}` })
        setCreated(result)
      }
    } catch {
      setError(deleting ? 'Couldn’t delete this key. Please try again.' : 'Couldn’t create the key. Please try again.')
    } finally {
      locked.current = false
      setPending(false)
    }
  }

  const button: React.CSSProperties = { font: 'inherit', fontSize: 13, fontWeight: 500, borderRadius: 8, padding: '9px 16px', cursor: 'pointer', border: `1px solid ${theme.border}`, background: theme.bgCard, color: theme.text, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7 }
  return (
    <dialog ref={dialog} className="api-key-dialog" aria-labelledby="key-dialog-title" aria-describedby="key-dialog-description"
      onCancel={(event) => { event.preventDefault(); if (canClose) onClose() }}
      style={{ width: 440, maxWidth: 'calc(100vw - 32px)', boxSizing: 'border-box', margin: 'auto', padding: 0, border: `1px solid ${theme.border}`, borderRadius: 14, background: theme.bgCard, color: theme.text, fontFamily: "'DM Sans', sans-serif", boxShadow: '0 24px 80px rgba(0,0,0,.2)' }}>
      <form onSubmit={submit}>
        <div style={{ padding: '24px 24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <KeyRound size={20} color={theme.textSecondary} />
            <button type="button" aria-label="Close dialog" disabled={!canClose} onClick={onClose} style={{ ...button, border: 0, padding: 3, opacity: canClose ? 1 : .35 }}><X size={18} /></button>
          </div>
          <h2 id="key-dialog-title" style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600, letterSpacing: '-.02em' }}>{created ? 'Your API key is ready' : deleting ? 'Delete API key?' : 'Create API key'}</h2>
          <p id="key-dialog-description" style={{ margin: '0 0 24px', color: theme.textSecondary, fontSize: 13, lineHeight: 1.6 }}>
            {created ? 'Copy this key and store it somewhere safe. You won’t be able to view it again.' : deleting ? 'Applications using this key will lose access immediately. This cannot be undone.' : 'Give your key a name so you can identify where it’s used.'}
          </p>
          {created ? <>
            {created.preview && <p style={{ fontSize: 12, color: theme.textSecondary, marginBottom: 12 }}>Preview key · cannot authenticate API requests.</p>}
            <div style={{ border: `1px solid ${theme.border}`, borderRadius: 8, background: theme.inputBg, padding: 12 }}>
              <code style={{ display: 'block', overflowWrap: 'anywhere', fontSize: 12, lineHeight: 1.7 }}>{created.secret}</code>
              <button type="button" onClick={async () => {
                try { await navigator.clipboard.writeText(created.secret); setCopied(true); setError('') }
                catch { setError('Clipboard access was blocked. Select and copy the key manually.') }
              }} style={{ ...button, marginTop: 12, width: '100%' }}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy key'}</button>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginTop: 18 }}><input type="checkbox" checked={saved} onChange={(event) => setSaved(event.target.checked)} />I’ve saved this key</label>
          </> : deleting ? <div style={{ padding: '12px 14px', background: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{target.name}</div><code style={{ display: 'block', fontSize: 12, color: theme.textSecondary, marginTop: 5 }}>{target.key}</code>
          </div> : <>
            <label htmlFor="api-key-name" style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Name</label>
            <input id="api-key-name" autoFocus autoComplete="off" placeholder="e.g. Production server" maxLength={64} value={name} disabled={pending} onChange={(event) => { setName(event.target.value); setError('') }} aria-invalid={!!error} style={{ width: '100%', boxSizing: 'border-box', padding: '11px 12px', border: `1px solid ${theme.border}`, borderRadius: 8, background: theme.inputBg, color: theme.text, font: 'inherit', fontSize: 14 }} />
          </>}
          {error && <p role="alert" style={{ color: '#dc2626', fontSize: 13, margin: '14px 0 0', lineHeight: 1.5 }}>{error}</p>}
        </div>
        <div style={{ borderTop: `1px solid ${theme.border}`, padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          {!created && <button type="button" disabled={pending} onClick={onClose} style={button}>Cancel</button>}
          {created ? <button type="button" disabled={!saved} onClick={onClose} style={{ ...button, background: theme.accent, color: '#fff', borderColor: 'transparent', opacity: saved ? 1 : .5 }}>Done</button> :
            <button type="submit" disabled={pending || (!deleting && !name.trim())} style={{ ...button, minWidth: 116, background: deleting ? '#dc2626' : theme.accent, color: '#fff', borderColor: 'transparent', opacity: pending || (!deleting && !name.trim()) ? .6 : 1 }}>
              {pending && <Loader2 size={14} className="dashboard-spin" />}{pending ? deleting ? 'Deleting…' : 'Creating…' : deleting ? 'Delete key' : 'Create key'}
            </button>}
        </div>
      </form>
      <style>{`.api-key-dialog::backdrop { background: rgba(0,0,0,.38); } .api-key-dialog[open] { animation: dashboard-toast-in .16s ease-out; } .api-key-dialog button:disabled { cursor: not-allowed !important; } .api-key-dialog :focus-visible { outline: 2px solid ${theme.accent}; outline-offset: 3px; }`}</style>
    </dialog>
  )
}
