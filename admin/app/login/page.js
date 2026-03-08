'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ThemeToggle from '../ThemeToggle'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Identifiants incorrects')
        return
      }
      router.push('/')
      router.refresh()
    } catch {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-theme-toggle">
        <span>Thème</span>
        <ThemeToggle label={false} />
      </div>
      <div className="login-card">
        <div className="login-brand">
          <span className="login-logo">L & Y</span>
          <h1>Admin RSVP</h1>
          <p>Mariage Yannick & Lydia</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Identifiant</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            autoFocus
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
