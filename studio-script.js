let selectedFile = null;
// Real publish to Supabase with video upload
async function publishVideo() {
  const title = document.getElementById('videoTitle').value.trim();
  if (!title) { showToast('⚠️ ADD A TITLE FIRST!'); return; }

  const user = await getUser();
  if (!user) { window.location.href = 'ddott-login.html'; return; }

  // Check file
  const fileInput = document.getElementById('fileInput');
  const file = fileInput?.files[0];
  if (!file) { showToast('⚠️ SELECT A VIDEO FILE!'); return; }

  const description = document.querySelector('.form-textarea').value.trim();
  const category = document.querySelector('.form-select').value;
  const tags = [...document.querySelectorAll('.tag-chip')]
    .map(t => t.textContent.replace('✕','').trim());

  showToast('🚀 UPLOADING VIDEO...');

  // Upload to Supabase Storage
  const fileName = `${user.id}/${Date.now()}_${file.name}`;
  const { data: uploadData, error: uploadError } = await db.storage
    .from('videos')
    .upload(fileName, file, { contentType: file.type });

  if (uploadError) {
    showToast('❌ UPLOAD ERROR: ' + uploadError.message);
    return;
  }

  // Get public URL
  const { data: urlData } = db.storage.from('videos').getPublicUrl(fileName);
  const videoUrl = urlData.publicUrl;

  showToast('💾 SAVING...');

  // Save to videos table
  const { error } = await db.from('videos').insert({
    user_id: user.id,
    title: title,
    description: description,
    category: category,
    tags: tags,
    video_url: videoUrl,
    views: 0,
    likes: 0,
    emo_coins_earned: 0
  });

  if (error) {
    showToast('❌ ERROR: ' + error.message);
    return;
  }

  showToast('✅ VIDEO PUBLISHED TO DDOTT TV!');

  // Award emo coins
  const profile = await getProfile(user.id);
  if (profile) {
    await db.from('profiles').update({
      emo_coins: (profile.emo_coins || 0) + 50
    }).eq('id', user.id);
  }

  setTimeout(() => {
    document.getElementById('videoTitle').value = '';
    document.querySelector('.form-textarea').value = '';
    document.getElementById('uploadProgress').classList.remove('show');
    fileInput.value = '';
  }, 2000);
}

function handleFileSelect(input) {
  const file = input.files[0];
  if (!file) return;
  selectedFile = file;
  document.getElementById('fileName').textContent = file.name;
  document.getElementById('fileSize').textContent = (file.size / 1024 / 1024).toFixed(1) + ' MB';
  document.getElementById('filePreview').style.display = 'flex';
  document.getElementById('uploadZone').classList.add('success');
}

function showTab(tab, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const tabs = {upload:'uploadTab', myVideos:'myVideosTab', spotPay:'spotPayTab'};
  Object.values(tabs).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const active = document.getElementById(tabs[tab]);
  if (active) active.style.display = 'block';
}
