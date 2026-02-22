import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import './App.css'

const API_BASE = import.meta.env.VITE_RSVP_API_URL || ''

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatEnfants(enfantsStr) {
  if (!enfantsStr) return '—'
  try {
    const arr = typeof enfantsStr === 'string' ? JSON.parse(enfantsStr) : enfantsStr
    if (!Array.isArray(arr) || arr.length === 0) return '—'
    return arr.map(e => `${e.prenom || ''} (${e.age || '?'} ans)`).filter(Boolean).join(', ') || '—'
  } catch {
    return enfantsStr
  }
}

export default function App() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchList = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/api/rsvp`)
      if (!res.ok) throw new Error('Erreur chargement')
      const data = await res.json()
      setList(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message)
      setList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
    const interval = setInterval(fetchList, 30000)
    return () => clearInterval(interval)
  }, [])

  const exportExcel = () => {
    const rows = list.map(row => ({
      'Date': formatDate(row.date),
      'Version': row.version || '—',
      'Nom': row.nom || '—',
      'Email': row.email || '—',
      'Téléphone': row.telephone || '—',
      'Présence': row.presence || '—',
      '+1': row.plusUn || '—',
      'Préférences alimentaires': row.preferencesAlimentaires || '—',
      'A des enfants': row.aDesEnfants || '—',
      'Enfants (détail)': formatEnfants(row.enfants),
      'Message': row.message || '—'
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Confirmations')
    XLSX.writeFile(wb, `confirmations-presence-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  return (
    <div className="admin">
      <header className="admin-header">
        <h1>Confirmations de présence</h1>
        <p className="admin-subtitle">Mariage Yannick & Lydia — Liste des réponses RSVP</p>
        <div className="admin-actions">
          <button type="button" className="btn btn-refresh" onClick={fetchList} disabled={loading}>
            {loading ? 'Chargement…' : 'Rafraîchir'}
          </button>
          <button type="button" className="btn btn-export" onClick={exportExcel} disabled={list.length === 0}>
            Exporter en Excel
          </button>
        </div>
      </header>

      <main className="admin-main">
        {error && (
          <div className="admin-error">
            Impossible de charger les données. Vérifiez que le serveur RSVP tourne (port 3001).
          </div>
        )}
        {!error && loading && list.length === 0 && (
          <div className="admin-empty">Chargement…</div>
        )}
        {!error && !loading && list.length === 0 && (
          <div className="admin-empty">Aucune confirmation pour le moment.</div>
        )}
        {!error && list.length > 0 && (
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Présence</th>
                  <th>+1</th>
                  <th>Préférences alimentaires</th>
                  <th>Enfants</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {list.map((row, i) => (
                  <tr key={i}>
                    <td className="cell-date">{formatDate(row.date)}</td>
                    <td className="cell-nom">{row.nom || '—'}</td>
                    <td className="cell-email">{row.email || '—'}</td>
                    <td className="cell-tel">{row.telephone || '—'}</td>
                    <td>
                      <span className={`badge ${row.presence === 'yes' ? 'badge-yes' : 'badge-no'}`}>
                        {row.presence === 'yes' ? 'Oui' : row.presence === 'no' ? 'Non' : row.presence || '—'}
                      </span>
                    </td>
                    <td>{row.plusUn || '—'}</td>
                    <td className="cell-dietary">{row.preferencesAlimentaires || '—'}</td>
                    <td className="cell-enfants">{row.aDesEnfants === 'oui' ? formatEnfants(row.enfants) : '—'}</td>
                    <td className="cell-message">{row.message || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="admin-footer">
        <span>{list.length} confirmation(s)</span>
        <span>Les saisies sont enregistrées dans admin/data/rsvp-submissions.csv</span>
      </footer>
    </div>
  )
}
