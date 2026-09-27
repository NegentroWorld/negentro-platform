import { FormEvent, useState } from 'react'

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand${compact ? ' brand--compact' : ''}`} href="#" aria-label="Negentro home">
      <img src="/negentro-logo.png" alt="Negentro" />
    </a>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.2 7.9 3.1l5.7-5.7A19.9 19.9 0 0 0 24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-4Z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.2 7.9 3.1l5.7-5.7A19.9 19.9 0 0 0 6.3 14.7Z" />
      <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.2l-6.2-5.2A11.9 11.9 0 0 1 12.9 28l-6.6 5.1A20 20 0 0 0 24 44Z" />
      <path fill="#1976D2" d="M43.6 20H42V20H24v8h11.3a12 12 0 0 1-4.2 5.6l6.2 5.2C41 35.4 44 30.4 44 24c0-1.3-.1-2.7-.4-4Z" />
    </svg>
  )
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.2A10.7 10.7 0 0 1 12 5c5.5 0 9 7 9 7a16 16 0 0 1-2.1 3M6.6 6.7C4.3 8.2 3 12 3 12s3.5 7 9 7c1.3 0 2.4-.4 3.5-1" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" /><circle cx="12" cy="12" r="3" /></svg>
  )
}

function CloseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
}

export default function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [noticeVisible, setNoticeVisible] = useState(true)
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '').trim()
    const password = String(data.get('password') ?? '')

    if (!email || !email.includes('@')) {
      setMessage('Enter a valid email address.')
      return
    }
    if (!password) {
      setMessage('Enter your password.')
      return
    }
    setMessage('This is a local interface preview. No credentials were sent.')
  }

  return (
    <main className="auth-shell">
      <section className="splash" aria-label="Negentro introduction">
        <div className="splash__glow" />
        <div className="splash__header"><Brand /></div>
        <p className="splash__statement">Unlock AI that retains context, connects knowledge, and gets better with every interaction.</p>
      </section>

      <section className="auth-panel">
        <div className="mobile-brand"><Brand compact /></div>
        <div className="auth-content">
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <h1 className="form-logo">
              <img src="/ryapi-logo.png" alt="Ryapi sign in" />
            </h1>

            <button
              className="oauth-button"
              type="button"
              onClick={() => setMessage('Google sign-in is unavailable in this local preview.')}
            >
              <GoogleIcon />
              <span>Sign in with Google</span>
            </button>

            <div className="divider"><span>or</span></div>

            <label className="field">
              <span className="sr-only">Email</span>
              <input name="email" type="email" placeholder="Email" autoComplete="email" onChange={() => setMessage('')} />
            </label>

            <label className="field field--password">
              <span className="sr-only">Password</span>
              <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" autoComplete="current-password" onChange={() => setMessage('')} />
              <button
                className="visibility-button"
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((value) => !value)}
              >
                <EyeIcon hidden={showPassword} />
              </button>
            </label>

            <button className="submit-button" type="submit">Sign in</button>

            <div className="forgot-row">
              <a className="text-link forgot-link" href="#forgot">Forgot password?</a>
              <a className="text-link guest-link" href="http://localhost:5173/">Continue as guest</a>
            </div>

            {message && <p className="form-message" role="status">{message}</p>}

            <p className="signup-copy">No account? <a className="text-link" href="#signup">Sign up</a></p>
          </form>
        </div>

        <footer className="legal-links">
          <a href="#home">Home</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </footer>
      </section>

      {noticeVisible && (
        <aside className="beta-notice" aria-label="Preview notice">
          <p>You’re using a beta version of this platform. We appreciate your patience.</p>
          <button type="button" aria-label="Dismiss notice" onClick={() => setNoticeVisible(false)}><CloseIcon /></button>
        </aside>
      )}
    </main>
  )
}
