import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionCookie, getCookieName } from '../lib/auth'
import DashboardClient from './DashboardClient'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(getCookieName())
  const username = verifySessionCookie(sessionCookie?.value)
  if (!username) {
    redirect('/login')
  }
  return <DashboardClient />
}
