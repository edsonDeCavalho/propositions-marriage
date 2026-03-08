const BACKEND_URL = process.env.NEXT_PUBLIC_RSVP_API_URL || process.env.RSVP_API_URL || 'http://localhost:8081'

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/rsvp`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      const text = await res.text()
      return Response.json(
        { error: `Backend error: ${res.status}`, details: text },
        { status: res.status }
      )
    }
    const data = await res.json()
    return Response.json(data)
  } catch (err) {
    console.error('RSVP API proxy error:', err.message)
    return Response.json(
      { error: 'Impossible de joindre le backend', details: err.message },
      { status: 502 }
    )
  }
}
