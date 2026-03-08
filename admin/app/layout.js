import './globals.css'

export const metadata = {
  title: 'Admin RSVP — Yannick & Lydia',
  description: 'Liste des confirmations de présence',
}

const themeScript = `
(function(){
  var t = localStorage.getItem('admin-theme');
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  else document.documentElement.setAttribute('data-theme', 'dark');
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
