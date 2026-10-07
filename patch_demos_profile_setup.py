#!/usr/bin/env python3
import sys

TARGET = "/data/data/com.termux/files/home/Ddott.Tv/demos/index.html"

with open(TARGET, "r", encoding="utf-8") as f:
    content = f.read()

if "DEMOS PROFILE SETUP (JS)" in content:
    print("Already patched. No changes made.")
    sys.exit(0)

patches = []

# ---------- 1. CSS ----------
patches.append((
"""</style>
</head>""",
"""  /* ===== DEMOS PROFILE SETUP (CSS) ===== */
  .dm-pf-note { font-size:13.5px; color:var(--muted); line-height:1.5; margin:0 0 6px; }
  .dm-pf-hint { font-size:12px; color:var(--muted); margin-top:4px; }
  .dm-pf-status { font-size:13px; color:var(--terra-d); margin-top:10px; min-height:16px; }
  .dm-sheet select { width:100%; border:1px solid var(--line); background:var(--card); border-radius:12px; padding:12px; font-size:15px; color:var(--ink); font-family:inherit; }
</style>
</head>"""
))

# ---------- 2. HTML ----------
patches.append((
"""<div class="dm-toast" id="toast"></div>""",
"""<!-- DEMOS PROFILE SETUP -->
<div class="dm-sheet-bg" id="pfBg">
  <div class="dm-sheet">
    <h3>Create your Demos profile</h3>
    <p class="dm-pf-note">This profile is only for Demos. Your username is how people find you.</p>
    <label>Username</label>
    <input id="pf_user" maxlength="20" autocapitalize="none" autocomplete="off" placeholder="e.g. dwin05">
    <div class="dm-pf-hint">3 to 20 characters: a-z, 0-9 and _</div>
    <label>Name</label>
    <input id="pf_name" maxlength="40" placeholder="Your name">
    <label>Bio (optional)</label>
    <textarea id="pf_bio" maxlength="200" style="min-height:70px"></textarea>
    <label>Profile photo (optional)</label>
    <input id="pf_av" type="file" accept="image/*">
    <label>Banner (optional)</label>
    <input id="pf_bn" type="file" accept="image/*">
    <div class="dm-pf-status" id="pf_status"></div>
    <div class="dm-row">
      <button class="dm-btn sec" id="pfCancel">Later</button>
      <button class="dm-btn pri" id="pfSave">Create profile</button>
    </div>
  </div>
</div>
<div class="dm-toast" id="toast"></div>"""
))

# ---------- 3. JS block (inserted before the FAB listener) ----------
patches.append((
"""  $('#fab').addEventListener('click', openSheet);""",
"""  /* ===== DEMOS PROFILE SETUP (JS) ===== */
  var myProfile = null, pfBusy = false;

  async function loadMyProfile(){
    if (!me) { myProfile = null; return; }
    var r = await DB.from('demos_profiles').select('*').eq('user_id', me.id).maybeSingle();
    myProfile = r && r.data ? r.data : null;
  }
  function pfStatus(t){ $('#pf_status').textContent = t || ''; }
  function openSetup(){
    $('#pf_user').value = ''; $('#pf_name').value = ''; $('#pf_bio').value = '';
    $('#pf_av').value = ''; $('#pf_bn').value = '';
    pfStatus('');
    $('#pfBg').classList.add('show');
  }
  function closeSetup(){
    if (pfBusy) { toast('Saving… please wait'); return; }
    $('#pfBg').classList.remove('show');
  }
  async function saveProfile(){
    if (pfBusy) return;
    if (!me) { goLogin(); return; }
    var username = $('#pf_user').value.trim().toLowerCase();
    var name = $('#pf_name').value.trim();
    var bio = $('#pf_bio').value.trim();
    if (!/^[a-z0-9_]{3,20}$/.test(username)) { pfStatus('Username: 3 to 20 characters, a-z, 0-9 and _'); return; }
    if (!name || name.length > 40) { pfStatus('Enter your name (up to 40 characters)'); return; }
    var avF = $('#pf_av').files && $('#pf_av').files[0] ? $('#pf_av').files[0] : null;
    var bnF = $('#pf_bn').files && $('#pf_bn').files[0] ? $('#pf_bn').files[0] : null;
    var btn = $('#pfSave');
    pfBusy = true; btn.disabled = true;
    try {
      var row = { user_id: me.id, username: username, display_name: name, bio: bio || null };
      if (avF) { pfStatus('Uploading photo…'); row.avatar_url = await upImage(avF); }
      if (bnF) { pfStatus('Uploading banner…'); row.banner_url = await upImage(bnF); }
      pfStatus('Saving…');
      var r = await DB.from('demos_profiles').insert(row);
      if (r.error) {
        if (r.error.code === '23505') throw new Error('That username is taken. Try another.');
        throw new Error(r.error.message);
      }
      await loadMyProfile();
      pfBusy = false;
      $('#pfBg').classList.remove('show');
      toast('Profile created');
      load();
    } catch (err) {
      pfStatus((err && err.message) ? err.message : 'Could not save profile');
    } finally {
      pfBusy = false; btn.disabled = false; hideProg();
    }
  }
  $('#pfCancel').addEventListener('click', closeSetup);
  $('#pfSave').addEventListener('click', saveProfile);

  $('#fab').addEventListener('click', openSheet);"""
))

# ---------- 4. Posting needs a Demos profile ----------
patches.append((
"""  function openSheet(){
    if (!me) { goLogin(); return; }
    var f = '';""",
"""  function openSheet(){
    if (!me) { goLogin(); return; }
    if (!myProfile) { openSetup(); return; }
    var f = '';"""
))

# ---------- 5. Names and photos come from demos_profiles, not Ddott.TV profiles ----------
patches.append((
"""      DB.from('profiles').select('id,display_name,username,avatar_url').in('id', uids),""",
"""      DB.from('demos_profiles').select('user_id,display_name,username,avatar_url').in('user_id', uids),"""
))
patches.append((
"""    (out[0].data || []).forEach(function(p){ prof[p.id] = p; });""",
"""    (out[0].data || []).forEach(function(p){ prof[p.user_id] = p; });"""
))

# ---------- 6. Ask for a profile on first visit ----------
patches.append((
"""    await load();
    if (!me) toast('Log in to post and rate');""",
"""    await load();
    if (!me) toast('Log in to post and rate');
    else {
      try { await loadMyProfile(); } catch(e){ myProfile = null; }
      if (!myProfile) openSetup();
    }"""
))

for old, new in patches:
    n = content.count(old)
    if n != 1:
        print("ERROR: expected exactly 1 match, found %d for:\n%s" % (n, old[:80]))
        sys.exit(1)

for old, new in patches:
    content = content.replace(old, new, 1)

with open(TARGET, "w", encoding="utf-8") as f:
    f.write(content)

print("Patched OK: Demos profile setup added (%d changes)." % len(patches))
