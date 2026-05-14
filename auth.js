async function signUp(email, password, username) {
  const { data, error } = await db.auth.signUp({ email, password });
  if (error) return { error };
  
  if (data.user) {
    await db.from('profiles').insert({
      id: data.user.id,
      username: username,
      display_name: username,
      emo_coins: 0
    });
  }
  return { data };
}

async function signIn(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  return { data, error };
}

async function signOut() {
  await db.auth.signOut();
  window.location.href = 'ddott-landing-v2.html';
}

async function getUser() {
  const { data: { user } } = await db.auth.getUser();
  return user;
}

async function getProfile(userId) {
  const { data } = await db.from('profiles').select('*').eq('id', userId).single();
  return data;
}
