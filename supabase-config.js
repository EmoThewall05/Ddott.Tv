window.SUPABASE_URL = 'https://havmduragglvstlxrgag.supabase.co'
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhdm1kdXJhZ2dsdnN0bHhyZ2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NjM5NDksImV4cCI6MjA5NDMzOTk0OX0.HqyIk3BN6pKu6cqYJvo-naVB3H6C6P3brQmnHMGlB-Q'

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function getProfile() {
  const { data: { user } } = await db.auth.getUser()
  if (!user) return null
  const { data } = await db.from('profiles').select('*').eq('id', user.id).single()
  return data
}

async function addCoins(amount, type, description) {
  const { data: { user } } = await db.auth.getUser()
  if (!user) return
  const profile = await getProfile()
  await db.from('profiles').update({
    emo_coins: (profile.emo_coins || 0) + amount,
    earned_today: (profile.earned_today || 0) + amount
  }).eq('id', user.id)
  await db.from('emo_transactions').insert({
    user_id: user.id,
    amount,
    type,
    description
  })
}

async function claimDailyLogin() {
  const { data: { user } } = await db.auth.getUser()
  if (!user) return { error: 'Not logged in' }
  const profile = await getProfile()
  const today = new Date().toISOString().split('T')[0]
  if (profile.last_login === today) return { error: 'Already claimed' }
  const newStreak = (profile.streak_days || 0) + 1
  const bonus = newStreak >= 7 ? 3 : 1
  await db.from('profiles').update({
    last_login: today,
    streak_days: newStreak,
    emo_coins: (profile.emo_coins || 0) + bonus
  }).eq('id', user.id)
  await db.from('emo_transactions').insert({
    user_id: user.id,
    amount: bonus,
    type: 'daily_login',
    description: `Day ${newStreak} streak bonus`
  })
  return { coins: bonus, streak: newStreak }
}
