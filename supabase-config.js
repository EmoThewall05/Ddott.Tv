window.SUPABASE_URL = 'https://havmduragglvstlxrgag.supabase.co'
window.SUPABASE_ANON_KEY = 'sb_publishable_FInfsWgHml8s9dAwiAKQ4Q_Tf79f3G8'

window.db = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
const db = window.db

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
