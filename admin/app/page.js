'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import * as XLSX from 'xlsx'

const API_BASE = ''

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatEnfants(enfants) {
  if (!enfants || !Array.isArray(enfants) || enfants.length === 0) return '—'
  return enfants
    .map((e) => `${e.prenom || ''} (${e.age || '?'} ans)`)
    .filter(Boolean)
    .join(', ') || '—'
}

function presenceLabel(presence) {
  if (!presence) return '—'
  const p = String(presence).toLowerCase()
  if (p === 'oui' || p === 'yes') return 'Oui'
  if (p === 'non' || p === 'no') return 'Non'
  return presence
}

function presenceBadgeClass(presence) {
  if (!presence) return ''
  const p = String(presence).toLowerCase()
  if (p === 'oui' || p === 'yes') return 'badge-yes'
  if (p === 'non' || p === 'no') return 'badge-no'
  return ''
}

function isPresent(presence) {
  if (!presence) return false
  const p = String(presence).toLowerCase()
  return p === 'oui' || p === 'yes'
}

export default function AdminPage() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [activeTab, setActiveTab] = useState('confirmations')

  const [search, setSearch] = useState('')
  const [filterPresence, setFilterPresence] = useState('all')
  const [filterPlusUn, setFilterPlusUn] = useState('all')
  const [filterSurprise, setFilterSurprise] = useState('all')
  const [filterEnfants, setFilterEnfants] = useState('all')
  const [deletingId, setDeletingId] = useState(null)

  const fetchList = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_BASE ? `${API_BASE}/api/rsvp` : '/api/rsvp')
      if (!res.ok) throw new Error('Erreur chargement')
      const data = await res.json()
      setList(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message)
      setList([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchList()
    const interval = setInterval(fetchList, 30000)
    return () => clearInterval(interval)
  }, [fetchList])

  const stats = useMemo(() => {
    const present = list.filter((r) => isPresent(r.presence)).length
    const absent = list.filter((r) => r.presence && !isPresent(r.presence)).length
    const withPlusUn = list.filter((r) => r.plusUn).length
    const withSurprise = list.filter((r) => r.organiserSurprise).length
    const withEnfants = list.filter((r) => r.enfants?.length > 0).length
    return {
      total: list.length,
      present,
      absent,
      withPlusUn,
      withSurprise,
      withEnfants,
    }
  }, [list])

  const filteredList = useMemo(() => {
    return list.filter((row) => {
      const searchLower = search.trim().toLowerCase()
      if (searchLower) {
        const nom = (row.nom || '').toLowerCase()
        const email = (row.email || '').toLowerCase()
        const tel = (row.telephone || '').replace(/\s/g, '')
        const searchNorm = searchLower.replace(/\s/g, '')
        if (!nom.includes(searchLower) && !email.includes(searchLower) && !tel.includes(searchNorm)) return false
      }
      if (filterPresence === 'oui' && !isPresent(row.presence)) return false
      if (filterPresence === 'non' && (isPresent(row.presence) || !row.presence)) return false
      if (filterPlusUn === 'oui' && !row.plusUn) return false
      if (filterPlusUn === 'non' && row.plusUn) return false
      if (filterSurprise === 'oui' && !row.organiserSurprise) return false
      if (filterSurprise === 'non' && row.organiserSurprise) return false
      const hasEnfants = (row.enfants?.length ?? 0) > 0
      if (filterEnfants === 'oui' && !hasEnfants) return false
      if (filterEnfants === 'non' && hasEnfants) return false
      return true
    })
  }, [list, search, filterPresence, filterPlusUn, filterSurprise, filterEnfants])

  const enfantsList = useMemo(() => {
    const out = []
    list.forEach((row) => {
      const enfants = row.enfants || []
      enfants.forEach((e) => {
        if (e.prenom?.trim() || e.age?.trim()) {
          out.push({
            prenom: e.prenom?.trim() || '—',
            age: e.age?.trim() || '—',
            parentNom: row.nom || '—',
            parentTel: row.telephone || '—',
            parentEmail: row.email || '—',
            presence: presenceLabel(row.presence),
          })
        }
      })
    })
    return out
  }, [list])

  const exportExcel = () => {
    const rows = filteredList.map((row) => ({
      Date: formatDate(row.date),
      Version: row.version || '—',
      Nom: row.nom || '—',
      Email: row.email || '—',
      Téléphone: row.telephone || '—',
      Présence: presenceLabel(row.presence),
      '+1': row.plusUn ? 'Oui' : 'Non',
      'Nom +1': row.plusUnNom || '—',
      'Relation +1': row.plusUnRelation || '—',
      'Préférences alimentaires': row.preferencesAlimentaires || '—',
      'Organiser une surprise': row.organiserSurprise ? 'Oui' : 'Non',
      'A des enfants': row.aDesEnfants ?? row.adesEnfants ?? '—',
      'Enfants (détail)': formatEnfants(row.enfants),
      Message: row.message || '—',
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Confirmations')
    XLSX.writeFile(wb, `confirmations-presence-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  const hasActiveFilters = search.trim() || filterPresence !== 'all' || filterPlusUn !== 'all' || filterSurprise !== 'all' || filterEnfants !== 'all'
  const clearFilters = () => {
    setSearch('')
    setFilterPresence('all')
    setFilterPlusUn('all')
    setFilterSurprise('all')
    setFilterEnfants('all')
  }

  const exportEnfantsExcel = () => {
    const rows = enfantsList.map((r) => ({
      'Prénom': r.prenom,
      'Âge': r.age,
      'Responsable': r.parentNom,
      'Téléphone': r.parentTel,
      'Email': r.parentEmail,
      'Présence responsable': r.presence,
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Enfants')
    XLSX.writeFile(wb, `enfants-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  const [filterDietaryHasPref, setFilterDietaryHasPref] = useState('all')
  const dietaryList = useMemo(() => {
    let rows = list.map((row) => ({
      ...row,
      pref: (row.preferencesAlimentaires || '').trim(),
    }))
    if (filterDietaryHasPref === 'oui') {
      rows = rows.filter((r) => r.pref.length > 0)
    }
    return rows.sort((a, b) => {
      const aHas = a.pref.length > 0 ? 1 : 0
      const bHas = b.pref.length > 0 ? 1 : 0
      if (bHas !== aHas) return bHas - aHas
      return (b.pref || '').localeCompare(a.pref || '')
    })
  }, [list, filterDietaryHasPref])

  const exportDietaryExcel = () => {
    const rows = dietaryList.map((row) => ({
      Nom: row.nom || '—',
      Email: row.email || '—',
      Téléphone: row.telephone || '—',
      'Préférences alimentaires': row.preferencesAlimentaires || '—',
      Présence: presenceLabel(row.presence),
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Préf. alimentaires')
    XLSX.writeFile(wb, `preferences-alimentaires-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  const dietaryWithPrefCount = useMemo(() => list.filter((r) => (r.preferencesAlimentaires || '').trim().length > 0).length, [list])

  const handleDelete = async (id, nom) => {
    if (!id) return
    const message = `Supprimer la réservation de "${nom || 'cette personne'}" ? Cette action est irréversible.`
    if (!window.confirm(message)) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/rsvp/${id}`, { method: 'DELETE' })
      if (res.status === 404) {
        alert('Réservation introuvable.')
        await fetchList()
        return
      }
      if (!res.ok) throw new Error('Erreur lors de la suppression')
      await fetchList()
    } catch (e) {
      alert(e.message || 'Impossible de supprimer.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">L & Y</span>
          <h1 className="sidebar-title">Admin RSVP</h1>
          <p className="sidebar-subtitle">Mariage Yannick & Lydia</p>
        </div>
        <nav className="sidebar-nav">
          <button
            type="button"
            className={`nav-item ${activeTab === 'confirmations' ? 'active' : ''}`}
            onClick={() => setActiveTab('confirmations')}
            aria-current={activeTab === 'confirmations' ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden>◇</span>
            Confirmations
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === 'enfants' ? 'active' : ''}`}
            onClick={() => setActiveTab('enfants')}
            aria-current={activeTab === 'enfants' ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden>◆</span>
            Enfants
          </button>
          <button
            type="button"
            className={`nav-item ${activeTab === 'dietary' ? 'active' : ''}`}
            onClick={() => setActiveTab('dietary')}
            aria-current={activeTab === 'dietary' ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden>◎</span>
            Préf. alimentaires
          </button>
        </nav>
        <div className="sidebar-actions">
          <button
            type="button"
            className="btn btn-sidebar btn-refresh"
            onClick={fetchList}
            disabled={loading}
          >
            {loading ? '…' : '↻'} Rafraîchir
          </button>
          <button
            type="button"
            className="btn btn-sidebar btn-export"
            onClick={
              activeTab === 'enfants' ? exportEnfantsExcel
                : activeTab === 'dietary' ? exportDietaryExcel
                  : exportExcel
            }
            disabled={
              activeTab === 'confirmations' ? list.length === 0
                : activeTab === 'enfants' ? enfantsList.length === 0
                  : dietaryList.length === 0
            }
          >
            ↓ Exporter Excel
          </button>
        </div>
        <div className="sidebar-footer">
          <span>{list.length} réponse(s)</span>
          {activeTab === 'enfants' && <span>{enfantsList.length} enfant(s)</span>}
          {activeTab === 'dietary' && <span>{dietaryWithPrefCount} avec préférences</span>}
        </div>
      </aside>

      <main className="dashboard-main">
        {activeTab === 'confirmations' && (
          <header className="dashboard-header">
            <h2 className="dashboard-heading">Tableau de bord</h2>
            <p className="dashboard-desc">Vue d’ensemble des confirmations de présence</p>
          </header>
        )}

        {error && (
          <div className="dashboard-error">
            Impossible de charger les données. Vérifiez que le backend RSVP tourne (port 8081).
          </div>
        )}

        {!error && activeTab === 'dietary' && (
          <>
            <header className="dashboard-header">
              <h2 className="dashboard-heading">Préférences alimentaires</h2>
              <p className="dashboard-desc">Préférences et régimes alimentaires déclarés par les invités</p>
            </header>
            <section className="filters-section filters-section--single">
              <div className="filter-select-wrap">
                <label htmlFor="filter-dietary-has" className="filter-label">Afficher</label>
                <select
                  id="filter-dietary-has"
                  className="filter-select"
                  value={filterDietaryHasPref}
                  onChange={(e) => setFilterDietaryHasPref(e.target.value)}
                >
                  <option value="all">Tous les invités</option>
                  <option value="oui">Avec préférences renseignées</option>
                </select>
              </div>
              <p className="filters-result">
                {dietaryList.length} invité{dietaryList.length !== 1 ? 's' : ''}
                {filterDietaryHasPref === 'oui' && ` (${dietaryWithPrefCount} avec préférences)`}
              </p>
            </section>
            <section className="table-section">
              {loading && list.length === 0 ? (
                <div className="dashboard-empty">Chargement…</div>
              ) : dietaryList.length === 0 ? (
                <div className="dashboard-empty">
                  {filterDietaryHasPref === 'oui' ? 'Aucune préférence alimentaire renseignée.' : 'Aucune confirmation pour le moment.'}
                </div>
              ) : (
                <div className="table-wrapper">
                  <table className="dashboard-table dashboard-table--dietary">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Préférences alimentaires</th>
                        <th>Présence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dietaryList.map((row) => (
                        <tr key={row.id || row.date}>
                          <td className="cell-nom">{row.nom || '—'}</td>
                          <td className="cell-email">{row.email || '—'}</td>
                          <td className="cell-tel">{row.telephone || '—'}</td>
                          <td className="cell-dietary-full">{row.preferencesAlimentaires || '—'}</td>
                          <td>
                            <span className={`badge ${presenceBadgeClass(row.presence)}`}>
                              {presenceLabel(row.presence)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {!error && activeTab === 'enfants' && (
          <>
            <header className="dashboard-header">
              <h2 className="dashboard-heading">Liste des enfants</h2>
              <p className="dashboard-desc">Enfants déclarés dans les confirmations RSVP</p>
            </header>
            <section className="table-section">
              {loading && list.length === 0 ? (
                <div className="dashboard-empty">Chargement…</div>
              ) : enfantsList.length === 0 ? (
                <div className="dashboard-empty">Aucun enfant déclaré pour le moment.</div>
              ) : (
                <div className="table-wrapper">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Prénom</th>
                        <th>Âge</th>
                        <th>Responsable (adulte)</th>
                        <th>Téléphone</th>
                        <th>Email</th>
                        <th>Présence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enfantsList.map((row, i) => (
                        <tr key={`${row.parentNom}-${row.prenom}-${i}`}>
                          <td className="cell-nom">{row.prenom}</td>
                          <td>{row.age}</td>
                          <td className="cell-nom">{row.parentNom}</td>
                          <td className="cell-tel">{row.parentTel}</td>
                          <td className="cell-email">{row.parentEmail}</td>
                          <td>
                            <span className={`badge ${row.presence === 'Oui' ? 'badge-yes' : 'badge-no'}`}>
                              {row.presence}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}

        {!error && activeTab === 'confirmations' && (
          <>
            <section className="stats-grid" aria-label="Statistiques">
              <div className="stat-card stat-total">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total réponses</span>
              </div>
              <div className="stat-card stat-present">
                <span className="stat-value">{stats.present}</span>
                <span className="stat-label">Présents</span>
              </div>
              <div className="stat-card stat-absent">
                <span className="stat-value">{stats.absent}</span>
                <span className="stat-label">Absents</span>
              </div>
              <div className="stat-card stat-plusun">
                <span className="stat-value">{stats.withPlusUn}</span>
                <span className="stat-label">Avec +1</span>
              </div>
              <div className="stat-card stat-surprise">
                <span className="stat-value">{stats.withSurprise}</span>
                <span className="stat-label">Surprise à organiser</span>
              </div>
              <div className="stat-card stat-enfants">
                <span className="stat-value">{stats.withEnfants}</span>
                <span className="stat-label">Avec enfants</span>
              </div>
            </section>

            <section className="filters-section">
              <div className="filters-row">
                <div className="filter-search-wrap">
                  <label htmlFor="search" className="filter-label">Recherche</label>
                  <input
                    type="search"
                    id="search"
                    className="filter-input filter-search"
                    placeholder="Nom, email ou téléphone…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="filter-select-wrap">
                  <label htmlFor="filter-presence" className="filter-label">Présence</label>
                  <select
                    id="filter-presence"
                    className="filter-select"
                    value={filterPresence}
                    onChange={(e) => setFilterPresence(e.target.value)}
                  >
                    <option value="all">Tous</option>
                    <option value="oui">Présents</option>
                    <option value="non">Absents</option>
                  </select>
                </div>
                <div className="filter-select-wrap">
                  <label htmlFor="filter-plusun" className="filter-label">+1</label>
                  <select
                    id="filter-plusun"
                    className="filter-select"
                    value={filterPlusUn}
                    onChange={(e) => setFilterPlusUn(e.target.value)}
                  >
                    <option value="all">Tous</option>
                    <option value="oui">Avec +1</option>
                    <option value="non">Sans +1</option>
                  </select>
                </div>
                <div className="filter-select-wrap">
                  <label htmlFor="filter-surprise" className="filter-label">Surprise</label>
                  <select
                    id="filter-surprise"
                    className="filter-select"
                    value={filterSurprise}
                    onChange={(e) => setFilterSurprise(e.target.value)}
                  >
                    <option value="all">Tous</option>
                    <option value="oui">Oui</option>
                    <option value="non">Non</option>
                  </select>
                </div>
                <div className="filter-select-wrap">
                  <label htmlFor="filter-enfants" className="filter-label">Enfants</label>
                  <select
                    id="filter-enfants"
                    className="filter-select"
                    value={filterEnfants}
                    onChange={(e) => setFilterEnfants(e.target.value)}
                  >
                    <option value="all">Tous</option>
                    <option value="oui">Avec enfants</option>
                    <option value="non">Sans enfants</option>
                  </select>
                </div>
                {hasActiveFilters && (
                  <button type="button" className="btn btn-clear-filters" onClick={clearFilters}>
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
              <p className="filters-result">
                {filteredList.length} résultat{filteredList.length !== 1 ? 's' : ''}
                {hasActiveFilters && ` (sur ${list.length})`}
              </p>
            </section>

            <section className="table-section">
              {loading && list.length === 0 ? (
                <div className="dashboard-empty">Chargement…</div>
              ) : list.length === 0 ? (
                <div className="dashboard-empty">Aucune confirmation pour le moment.</div>
              ) : filteredList.length === 0 ? (
                <div className="dashboard-empty">Aucun résultat pour ces filtres.</div>
              ) : (
                <div className="table-wrapper">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Tél.</th>
                        <th>Présence</th>
                        <th>+1</th>
                        <th>Nom +1</th>
                        <th>Relation +1</th>
                        <th>Préf. alimentaires</th>
                        <th>Surprise</th>
                        <th>Enfants</th>
                        <th>Message</th>
                        <th className="cell-actions">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredList.map((row) => (
                        <tr key={row.id || row.date}>
                          <td className="cell-date">{formatDate(row.date)}</td>
                          <td className="cell-nom">{row.nom || '—'}</td>
                          <td className="cell-email">{row.email || '—'}</td>
                          <td className="cell-tel">{row.telephone || '—'}</td>
                          <td>
                            <span className={`badge ${presenceBadgeClass(row.presence)}`}>
                              {presenceLabel(row.presence)}
                            </span>
                          </td>
                          <td>{row.plusUn ? 'Oui' : '—'}</td>
                          <td>{row.plusUnNom || '—'}</td>
                          <td>{row.plusUnRelation || '—'}</td>
                          <td className="cell-dietary">{row.preferencesAlimentaires || '—'}</td>
                          <td>{row.organiserSurprise ? 'Oui' : '—'}</td>
                          <td className="cell-enfants">{formatEnfants(row.enfants)}</td>
                          <td className="cell-message">{row.message || '—'}</td>
                          <td className="cell-actions">
                            <button
                              type="button"
                              className="btn-delete"
                              onClick={() => handleDelete(row.id, row.nom)}
                              disabled={deletingId === row.id}
                              title="Supprimer cette réservation"
                            >
                              {deletingId === row.id ? '…' : 'Supprimer'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
