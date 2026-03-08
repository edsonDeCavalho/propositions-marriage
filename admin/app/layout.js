import './globals.css'

export const metadata = {
  title: 'Admin RSVP — Yannick & Lydia',
  description: 'Liste des confirmations de présence',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
