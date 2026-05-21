const SUPABASE_URL = 'https://havmduragglvstlxrgag.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhdm1kdXJhZ2dsdnN0bHhyZ2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NjM5NDksImV4cCI6MjA5NDMzOTk0OX0.HqyIk3BN6pKu6cqYJvo-naVB3H6C6P3brQmnHMGlB-Q'

async function signUp(email, password, username) {
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  const { data, error } = await client.auth.signUp({ email, password })
  if (error) return { error }
  await client.from('profiles').insert({
    id: data.user.id,
    username,
    emo_coins: 100,
    streak_days: 1,
    last_login: new Date().toISOString().split('T')[0]
  })
  return { data }
}

async function signIn(email, password) {
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) return { error }
  localStorage.setItem('ddott_user', JSON.stringify(data.user))
  localStorage.setItem('ddott_session', JSON.stringify(data.session))
  window.location.href = 'ddott-tv-app.html'
  return { data }
}

async function signOut() {
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  await client.auth.signOut()
  localStorage.removeItem('ddott_user')
  localStorage.removeItem('ddott_session')
  window.location.href = 'ddott-login.html'
}

function getUser() {
  const user = localStorage.getItem('ddott_user')
  return user ? JSON.parse(user) : null
}

function requireAuth() {
  if (!getUser()) window.location.href = 'ddott-login.html'
}
