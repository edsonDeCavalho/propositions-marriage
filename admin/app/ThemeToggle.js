'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'admin-theme'

function getTheme() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') || 'dark'
}

function setTheme(value) {
  document.documentElement.setAttribute('data-theme', value)
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch (_) {}
}

export default function ThemeToggle({ label = true, className = '' }) {
  const [theme, setThemeState] = useState('dark')

  useEffect(() => {
    setThemeState(getTheme())
  }, [])

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setThemeState(next)
  }, [theme])

  return (
    <div className={label ? `theme-toggle-block ${className}`.trim() : className}>
      {label && (
        <span className="theme-toggle-wrap">
          <span>{theme === 'dark' ? 'Mode nuit' : 'Mode jour'}</span>
        </span>
      )}
      <button
        type="button"
        className="theme-toggle"
        onClick={toggle}
        title={theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit'}
        aria-label={theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit'}
      />
    </div>
  )
}

export { setTheme, getTheme, STORAGE_KEY }
