const STREAM_WORKER_URL = 'https://ddott-stream-upload.meradivin.workers.dev';
const STREAM_CUSTOMER_CODE = '1ailxmj6l2809ehq';

async function uploadToCloudflareStream(file) {
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

  const videoUrl = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${uid}/manifest/video.m3u8`;
  const thumbnailUrl = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${uid}/thumbnails/thumbnail.jpg`;

  return { videoUrl, thumbnailUrl, uid };
}
