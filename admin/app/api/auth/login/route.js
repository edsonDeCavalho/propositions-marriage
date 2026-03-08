import { NextResponse } from 'next/server'
import { checkCredentials, createSessionCookie } from '../../../../lib/auth'

export async function POST(request) {
  try {
    const body = await request.json()
    const { username, password } = body || {}
    if (!checkCredentials(username, password)) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
    }
    const cookie = createSessionCookie(username.trim().toLowerCase())
    const res = NextResponse.json({ ok: true })
    res.cookies.set(cookie.name, cookie.value, cookie.options)
    return res
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
