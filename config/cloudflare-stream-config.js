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

function uploadViaTus(file, onProgress) {
  return new Promise(async (resolve, reject) => {
    try {
      const metadataParts = [`name ${btoa(file.name || 'video')}`];
      const uploadMetadata = metadataParts.join(',');

      const { uploadURL, uid } = await initTusSessionWithRetry(file, uploadMetadata, 3);

      // Smaller chunk size reduces per-chunk memory pressure on mobile
      // browsers for very large files, without changing the file itself
      // or its quality in any way.
      const upload = new tus.Upload(file, {
        uploadUrl: uploadURL,
        chunkSize: 8 * 1024 * 1024,
        retryDelays: [0, 1000, 3000, 5000, 10000, 20000, 30000],
        metadata: { name: file.name || 'video' },
        removeFingerprintOnSuccess: true,
        onError: (error) => reject(error),
        onProgress: (bytesUploaded, bytesTotal) => {
          if (onProgress) onProgress(Math.round((bytesUploaded / bytesTotal) * 100));
        },
        onSuccess: () => resolve(buildResult(uid)),
      });

      upload.start();
    } catch (err) {
      reject(err);
    }
  });
}

function buildResult(uid) {
  const videoUrl = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${uid}/manifest/video.m3u8`;
  const thumbnailUrl = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${uid}/thumbnails/thumbnail.jpg`;
  return { videoUrl, thumbnailUrl, uid };
}
