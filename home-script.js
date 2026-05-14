// Load real user data
async function loadUser() {
  const user = await getUser();
  if (!user) { window.location.href = 'ddott-login.html'; return; }
  const profile = await getProfile(user.id);
  if (profile) {
    document.getElementById('coin-amt').textContent = profile.emo_coins || 0;
    document.getElementById('wallet-coins').textContent = profile.emo_coins || 0;
    document.getElementById('user-avatar').textContent = (profile.username || 'U')[0].toUpperCase();
  }
}

// Load real videos from Supabase
async function loadVideos() {
  const { data: videos, error } = await db.from('videos')
    .select('*, profiles(username, avatar_url)')
    .order('created_at', { ascending: false })
    .limit(6);

  const grid = document.getElementById('video-grid');
  if (error || !videos || videos.length === 0) {
    grid.innerHTML = '<div style="color:var(--dimmer);padding:20px;font-size:12px;grid-column:1/-1;">No videos yet — be the first to upload! 🎬</div>';
    return;
  }

  grid.innerHTML = videos.map(v => `
    <div class="vcard" onclick="openPlayer('${v.id}')">
      <div class="vc-thumb">
        <div class="vc-inner" style="background:linear-gradient(135deg,#0a0015,#1a0030)">
          ${v.thumbnail_url ? `<img src="${v.thumbnail_url}" style="width:100%;height:100%;object-fit:cover;">` : '🎬'}
        </div>
        <div class="vc-earn">+5🪙</div>
      </div>
      <div class="vc-info">
        <div class="vc-top">
          <div class="vc-av" style="background:linear-gradient(135deg,var(--cyan),var(--purple))">
            ${(v.profiles?.username || 'U')[0].toUpperCase()}
          </div>
          <div class="vc-title">${v.title}</div>
        </div>
        <div class="vc-bot">
          <span class="vc-ch">${v.profiles?.username || 'Creator'}</span>
          <span class="vc-views">👁 ${v.views || 0}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  loadUser();
  loadVideos();
});
