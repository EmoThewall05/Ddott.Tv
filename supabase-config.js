window.SUPABASE_URL = 'https://kwciyiwdyotebdgyjxgt.supabase.co'
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3Y2l5aXdkeW90ZWJkZ3lqeGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5OTQ0MjUsImV4cCI6MjEwMjU3MDQyNX0.cSxsDwEz-Lfy9YLFfQ5mSK15Ne0O3vbxJBz8IABmF08'

window.db = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
const db = window.db

async function getProfile() {
  const { data: { user } } = await db.auth.getUser()
  if (!user) return null
  const { data, error } = await db.from('profiles').select('*').eq('id', user.id).single()
  if (error) { console.error('getProfile error:', error); return null }
  return data
}

async function earnCoins(kind, ref) {
  const { data, error } = await db.rpc('earn_coins', { p_kind: kind, p_ref: ref || null })
  if (error) { console.error('earnCoins error:', error); return { awarded: 0, error: error.message } }
  return data
}

// Disabled: coins are now awarded only by the server (earn_coins)
async function addCoins() {
  console.warn('addCoins is disabled, use earnCoins(kind, ref)')
  return { awarded: 0 }
}

async function claimDailyLogin() {
  const { data: { user } } = await db.auth.getUser()
  if (!user) return { error: 'Not logged in' }
  const res = await earnCoins('daily_login')
  if (res.error) return { error: res.error }
  if (!res.awarded) return { error: 'Already claimed' }
  return { coins: res.awarded, streak: res.streak }
}
