const STREAM_WORKER_URL = 'https://ddott-stream-upload.meradivin.workers.dev';
const STREAM_CUSTOMER_CODE = '1ailxmj6l2809ehq';
const TUS_THRESHOLD_BYTES = 190 * 1024 * 1024;

async function uploadToCloudflareStream(file, onProgress) {
  if (file.size > TUS_THRESHOLD_BYTES) {
    return uploadViaTus(file, onProgress);
  }
  return uploadViaBasicPost(file);
}

async function uploadViaBasicPost(file) {
  const urlRes = await fetch(`${STREAM_WORKER_URL}/api/get-upload-url`, {
    method: 'POST',
  });
  if (!urlRes.ok) throw new Error('Could not get upload URL');
  const { uploadURL, uid } = await urlRes.json();
  if (!uploadURL || !uid) throw new Error('Invalid upload URL response');

  const formData = new FormData();
  formData.append('file', file);

  const uploadRes = await fetch(uploadURL, {
    method: 'POST',
    body: formData,
  });
  if (!uploadRes.ok) throw new Error('HTTP ' + uploadRes.status);

  return buildResult(uid);
}

function _dbgPanel() {
  let el = document.getElementById('_tusDebugPanel');
  if (!el) {
    el = document.createElement('div');
    el.id = '_tusDebugPanel';
    el.style.cssText = 'position:fixed;bottom:0;left:0;right:0;max-height:40vh;overflow-y:auto;background:rgba(0,0,0,0.95);color:#0f0;font-family:monospace;font-size:11px;padding:8px;z-index:99999;white-space:pre-wrap;border-top:2px solid #0ff;';
    document.body.appendChild(el);
  }
  return el;
}
function _dbg(msg) {
  const el = _dbgPanel();
  const t = new Date().toISOString().split('T')[1].split('.')[0];
  el.textContent += '[' + t + '] ' + msg + '\n';
  el.scrollTop = el.scrollHeight;
}

async function initTusSessionWithRetry(file, uploadMetadata, attempts) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const initRes = await fetch(`${STREAM_WORKER_URL}/api/get-tus-upload-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uploadLength: file.size,
          uploadMetadata: uploadMetadata,
        }),
      });
      if (!initRes.ok) throw new Error('Could not init TUS upload, status=' + initRes.status);
      const data = await initRes.json();
      if (!data.uploadURL) throw new Error('Invalid TUS upload URL response');
      return data;
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
      }
    }
  }
  throw lastErr;
}

let _pendingResumeUpload = null;

function _resumeBanner() {
  let el = document.getElementById('_resumeUploadBanner');
  if (!el) {
    el = document.createElement('div');
    el.id = '_resumeUploadBanner';
    el.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#1a1a2e;color:#fff;padding:12px;z-index:99998;display:none;align-items:center;justify-content:space-between;gap:8px;font-family:sans-serif;font-size:13px;';
    document.body.appendChild(el);
  }
  return el;
}

function _showResumeBanner(onResume, onFreshStart) {
  const el = _resumeBanner();
  el.style.display = 'flex';
  el.innerHTML = '';

  const text = document.createElement('span');
  text.textContent = '\u26a0\ufe0f Upload interrupted. Resume from where it stopped?';
  el.appendChild(text);

  const btnWrap = document.createElement('div');
  btnWrap.style.cssText = 'display:flex;gap:8px;';

  const resumeBtn = document.createElement('button');
  resumeBtn.textContent = 'Resume Upload';
  resumeBtn.style.cssText = 'background:#0f0;color:#000;border:none;padding:8px 14px;border-radius:6px;font-weight:bold;';
  resumeBtn.onclick = () => { _hideResumeBanner(); onResume(); };

  const freshBtn = document.createElement('button');
  freshBtn.textContent = 'Start Fresh';
  freshBtn.style.cssText = 'background:#333;color:#fff;border:1px solid #666;padding:8px 14px;border-radius:6px;';
  freshBtn.onclick = () => { _hideResumeBanner(); onFreshStart(); };

  btnWrap.appendChild(resumeBtn);
  btnWrap.appendChild(freshBtn);
  el.appendChild(btnWrap);
}

function _hideResumeBanner() {
  const el = document.getElementById('_resumeUploadBanner');
  if (el) el.style.display = 'none';
}

function uploadViaTus(file, onProgress) {
  return new Promise(async (resolve, reject) => {
    try {
      _dbg('TUS start, file=' + file.name + ' size=' + file.size);
      const metadataParts = [`name ${btoa(file.name || 'video')}`];
      const uploadMetadata = metadataParts.join(',');

      function pickChunkSize(responseTimeMs) {
        if (responseTimeMs > 2000) {
          _dbg('Slow connection detected (' + responseTimeMs + 'ms) - using 2MB chunks');
          return 2 * 1024 * 1024;
        } else if (responseTimeMs > 800) {
          _dbg('Medium connection detected (' + responseTimeMs + 'ms) - using 4MB chunks');
          return 4 * 1024 * 1024;
        }
        _dbg('Fast connection detected (' + responseTimeMs + 'ms) - using 8MB chunks');
        return 8 * 1024 * 1024;
      }

      function startUpload(uploadURL, uid, chunkSize) {
        const upload = new tus.Upload(file, {
          uploadUrl: uploadURL,
          chunkSize: chunkSize,
          retryDelays: [0, 1000, 3000, 5000, 10000, 20000, 30000],
          metadata: { name: file.name || 'video' },
          fingerprint: () => Promise.resolve(`${STREAM_WORKER_URL}-${file.name}-${file.size}-${file.lastModified}`),
          storeFingerprintForResuming: true,
          removeFingerprintOnSuccess: true,
          onError: (error) => {
            _dbg('ERROR: ' + error.message);
            _pendingResumeUpload = upload;
            _showResumeBanner(
              () => {
                _dbg('User chose: Resume Upload');
                upload.start();
              },
              () => {
                _dbg('User chose: Start Fresh');
                _pendingResumeUpload = null;
                upload.abort(true).then(() => uploadViaTus(file, onProgress).then(resolve).catch(reject));
              }
            );
          },
          onProgress: (bytesUploaded, bytesTotal) => {
            _dbg('progress: ' + bytesUploaded + '/' + bytesTotal);
            if (onProgress) onProgress(Math.round((bytesUploaded / bytesTotal) * 100));
          },
          onSuccess: () => {
            _dbg('SUCCESS');
            _pendingResumeUpload = null;
            _hideResumeBanner();
            resolve(buildResult(uid));
          },
        });

        upload.findPreviousUploads()
          .then((previousUploads) => {
            if (previousUploads.length > 0) {
              _dbg('Found previous upload, resuming...');
              upload.resumeFromPreviousUpload(previousUploads[0]);
            }
            upload.start();
          })
          .catch((err) => {
            _dbg('findPreviousUploads failed (network issue), starting fresh: ' + err.message);
            upload.start();
          });
      }

      _dbg('calling get-tus-upload-url...');
      const speedTestStart = Date.now();
      const { uploadURL, uid } = await initTusSessionWithRetry(file, uploadMetadata, 3);
      const responseTimeMs = Date.now() - speedTestStart;
      _dbg('got uploadURL, uid=' + uid + ' (init took ' + responseTimeMs + 'ms)');

      const chunkSize = pickChunkSize(responseTimeMs);
      startUpload(uploadURL, uid, chunkSize);
    } catch (err) {
      _dbg('CATCH: ' + err.message);
      reject(err);
    }
  });
}

function buildResult(uid) {
  const videoUrl = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${uid}/manifest/video.m3u8`;
  const thumbnailUrl = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${uid}/thumbnails/thumbnail.jpg`;
  return { videoUrl, thumbnailUrl, uid };
}
