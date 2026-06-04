const CLOUDINARY_CLOUD_NAME = 'dggip9tpp';
const CLOUDINARY_UPLOAD_PRESET = 'ddott-tv-upload';

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'ddott-tv');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) throw new Error('HTTP ' + response.status);
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  if (!data.secure_url) throw new Error('No URL returned');
  return data.secure_url;
}
