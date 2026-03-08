const BACKEND_URL = process.env.NEXT_PUBLIC_RSVP_API_URL || process.env.RSVP_API_URL || 'http://localhost:8081'

export async function DELETE(request, { params }) {
  const id = params?.id
  if (!id) {
    return Response.json({ error: 'ID manquant' }, { status: 400 })
  }
  try {
    const res = await fetch(`${BACKEND_URL}/api/rsvp/${id}`, {
      method: 'DELETE',
    })
    if (res.status === 404) {
      return Response.json({ error: 'Réservation introuvable' }, { status: 404 })
    }
    if (!res.ok) {
      const text = await res.text()
      return Response.json(
        { error: `Backend error: ${res.status}`, details: text },
        { status: res.status }
      )
    }
    return new Response(null, { status: 204 })
  } catch (err) {
    console.error('RSVP DELETE proxy error:', err.message)
    return Response.json(
      { error: 'Impossible de joindre le backend', details: err.message },
      { status: 502 }
    )
  }
}
