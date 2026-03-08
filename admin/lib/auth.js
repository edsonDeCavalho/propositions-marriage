import { createHmac, timingSafeEqual } from 'crypto'

const SECRET = process.env.AUTH_SECRET || 'yannick-lydia-admin-secret-change-in-production'
const COOKIE_NAME = 'admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

const USERS = [
  { username: 'edson', password: 'admin1' },
  { username: 'lydia', password: 'lydia2603' },
  { username: 'yannick', password: 'yannick2603' },
]

export function checkCredentials(username, password) {
  if (!username || !password) return false
  const u = username.trim().toLowerCase()
  return USERS.some(
    (user) => user.username === u && user.password === password
  )
}

function sign(value) {
  return createHmac('sha256', SECRET).update(value).digest('hex')
}

export function createSessionCookie(username) {
  const payload = `${username}:${Date.now()}`
  const signature = sign(payload)
  const value = Buffer.from(`${payload}:${signature}`).toString('base64url')
  return {
    name: COOKIE_NAME,
    value,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    },
  }
}

export function verifySessionCookie(cookieValue) {
  if (!cookieValue) return null
  try {
    const decoded = Buffer.from(cookieValue, 'base64url').toString('utf8')
    const lastColon = decoded.lastIndexOf(':')
    if (lastColon === -1) return null
    const payload = decoded.slice(0, lastColon)
    const signature = decoded.slice(lastColon + 1)
    const expected = sign(payload)
    if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'))) {
      return null
    }
    const [username] = payload.split(':')
    const valid = USERS.some((u) => u.username === username)
    return valid ? username : null
  } catch {
    return null
  }
}

export function getCookieName() {
  return COOKIE_NAME
}
