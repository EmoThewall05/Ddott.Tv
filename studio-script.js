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

  const description = document.getElementById('videoDesc').value.trim();
  const category = document.getElementById('videoCategory').value;
  const tags = [...document.querySelectorAll('.tag-chip')]
    .map(t => t.textContent.replace('✕','').trim());

  showToast('🚀 UPLOADING TO CLOUDINARY...');

  // Upload to Cloudinary
  let videoUrl;
  try {
    videoUrl = await uploadToCloudinary(file);
  } catch (err) {
    showToast('❌ ' + (err.message || 'Upload failed'));
    return;
  }

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
    document.getElementById('videoDesc').value = '';
    
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

function showToast(msg) {
  let toast = document.getElementById('ddott-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ddott-toast';
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1a0030;border:1px solid #00f5ff;color:#fff;padding:12px 20px;border-radius:10px;font-size:13px;z-index:9999;text-align:center;min-width:200px;box-shadow:0 0 20px #00f5ff44;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.display = 'block';
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity='0'; setTimeout(()=>toast.style.display='none',300); }, 3000);
}
