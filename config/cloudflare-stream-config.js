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

function uploadViaTus(file, onProgress) {
  return new Promise(async (resolve, reject) => {
    try {
      alert('DEBUG 1: uploadViaTus started, file size=' + file.size);
      const metadataParts = [`name ${btoa(file.name || 'video')}`];
      const uploadMetadata = metadataParts.join(',');

      alert('DEBUG 2: about to call get-tus-upload-url');
      const initRes = await fetch(`${STREAM_WORKER_URL}/api/get-tus-upload-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uploadLength: file.size,
          uploadMetadata: uploadMetadata,
        }),
      });
      alert('DEBUG 3: init response status=' + initRes.status);
      if (!initRes.ok) throw new Error('Could not init TUS upload, status=' + initRes.status);
      const { uploadURL, uid } = await initRes.json();
      alert('DEBUG 4: got uploadURL=' + uploadURL + ' uid=' + uid);
      if (!uploadURL) throw new Error('Invalid TUS upload URL response');

      alert('DEBUG 5: creating tus.Upload object, tus defined? ' + (typeof tus));
      const upload = new tus.Upload(file, {
        uploadUrl: uploadURL,
        chunkSize: 52428800,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: { name: file.name || 'video' },
        onError: (error) => {
          alert('DEBUG ERROR: ' + error.message + ' | ' + JSON.stringify(error));
          reject(error);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          console.log('DEBUG PROGRESS: ' + bytesUploaded + '/' + bytesTotal);
          if (onProgress) onProgress(Math.round((bytesUploaded / bytesTotal) * 100));
        },
        onSuccess: () => {
          alert('DEBUG SUCCESS');
          resolve(buildResult(uid));
        },
      });

      alert('DEBUG 6: calling upload.start()');
      upload.start();
      alert('DEBUG 7: upload.start() called, returned control');
    } catch (err) {
      alert('DEBUG CATCH ERROR: ' + err.message);
      reject(err);
    }
  });
}

function buildResult(uid) {
  const videoUrl = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${uid}/manifest/video.m3u8`;
  const thumbnailUrl = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${uid}/thumbnails/thumbnail.jpg`;
  return { videoUrl, thumbnailUrl, uid };
}
