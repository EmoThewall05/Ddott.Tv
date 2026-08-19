const SUPABASE_URL = 'https://kwciyiwdyotebdgyjxgt.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_qxrCtkTQEnHgHKyqcI56GQ_twr7VGGW'

async function signUp(email, password, username) {
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  const { data, error } = await client.auth.signUp({ email, password })
  if (error) return { error }

  return { data }
}

async function signIn(email, password) {
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) return { error }
  localStorage.setItem('ddott_user', JSON.stringify(data.user))
  localStorage.setItem('ddott_session', JSON.stringify(data.session))
  window.location.href = 'index.html'
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
