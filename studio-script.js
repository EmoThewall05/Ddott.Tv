// Real publish to Supabase
async function publishVideo() {
  const title = document.getElementById('vidTitle').value.trim();
  if (!title) { showToast('⚠️ ADD A TITLE FIRST!'); return; }

  const user = await getUser();
  if (!user) { window.location.href = 'ddott-login.html'; return; }

  const description = document.querySelector('.form-textarea').value.trim();
  const category = document.querySelector('.form-select').value;
  
  // Get tags
  const tags = [...document.querySelectorAll('.tag-chip')]
    .map(t => t.textContent.replace('✕','').trim());

  showToast('🚀 PUBLISHING...');

  const { data, error } = await db.from('videos').insert({
    user_id: user.id,
    title: title,
    description: description,
    category: category,
    tags: tags,
    views: 0,
    likes: 0,
    emo_coins_earned: 0
  });

  if (error) {
    showToast('❌ ERROR: ' + error.message);
    return;
  }

  showToast('✅ VIDEO PUBLISHED TO DDOTT TV!');
  
  // Award emo coins for uploading
  const profile = await getProfile(user.id);
  if (profile) {
    await db.from('profiles').update({
      emo_coins: (profile.emo_coins || 0) + 50
    }).eq('id', user.id);
  }

  // Reset form after 2 seconds
  setTimeout(() => {
    document.getElementById('vidTitle').value = '';
    document.querySelector('.form-textarea').value = '';
    document.getElementById('uploadProgress').classList.remove('show');
  }, 2000);
}
