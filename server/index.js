import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CSV_PATH = path.join(__dirname, '..', 'admin', 'data', 'rsvp-submissions.csv')

const CSV_HEADERS = [
  'date',
  'version',
  'nom',
  'email',
  'telephone',
  'presence',
  'plusUn',
  'preferencesAlimentaires',
  'aDesEnfants',
  'enfants',
  'message'
]

function ensureDataDir() {
  const dir = path.dirname(CSV_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, CSV_HEADERS.join(',') + '\n', 'utf8')
  }
}

function escapeCsvCell(value) {
  if (value === null || value === undefined) return '""'
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"'
  }
  return '"' + str + '"'
}

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

ensureDataDir()

// POST /api/rsvp — enregistrer une nouvelle confirmation
app.post('/api/rsvp', (req, res) => {
  try {
    const body = req.body
    const row = {
      date: new Date().toISOString(),
      version: body.version || '',
      nom: body.name || body.nom || '',
      email: body.email || '',
      telephone: body.telephone || '',
      presence: body.attendance || body.presence || '',
      plusUn: body.plusUn === true || body.plusUn === 'true' ? 'Oui' : 'Non',
      preferencesAlimentaires: body.dietary || body.preferencesAlimentaires || '',
      aDesEnfants: body.hasEnfants || '',
      enfants: Array.isArray(body.enfants) ? JSON.stringify(body.enfants) : (body.enfants || ''),
      message: body.message || ''
    }
    const line = CSV_HEADERS.map(h => escapeCsvCell(row[h])).join(',') + '\n'
    fs.appendFileSync(CSV_PATH, line, 'utf8')
    res.status(201).json({ ok: true, message: 'Confirmation enregistrée' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Erreur serveur' })
  }
})

// GET /api/rsvp — lire toutes les confirmations
app.get('/api/rsvp', (req, res) => {
  try {
    if (!fs.existsSync(CSV_PATH)) {
      return res.json([])
    }
    const content = fs.readFileSync(CSV_PATH, 'utf8')
    const lines = content.trim().split('\n')
    if (lines.length <= 1) return res.json([])
    const headers = parseCsvLine(lines[0]).map(h => h.replace(/^"|"$/g, '').trim())
    const list = []
    for (let i = 1; i < lines.length; i++) {
      const values = parseCsvLine(lines[i])
      const obj = {}
      headers.forEach((h, j) => { obj[h] = values[j] ?? '' })
      list.push(obj)
    }
    res.json(list.reverse())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur lecture' })
  }
})

function parseCsvLine(line) {
  const out = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if ((c === ',' && !inQuotes) || c === '\n') {
      out.push(cur.replace(/^"|"$/g, ''))
      cur = ''
    } else {
      cur += c
    }
  }
  out.push(cur.replace(/^"|"$/g, ''))
  return out
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Serveur RSVP sur http://localhost:${PORT}`)
})
