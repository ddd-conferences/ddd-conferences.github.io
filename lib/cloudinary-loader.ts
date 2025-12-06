// Utility function to generate Cloudinary URLs for responsive images
export function getCloudinaryUrl(
  imagePath: string,
  options?: {
    width?: number;
    quality?: number | 'auto';
  }
): string {
  // If it's already a full URL (like external hotel images), return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dfutm7d1x';
  
  // Remove leading slash from path if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Build transformation parameters
  const params: string[] = ['f_auto']; // Auto format (WebP, AVIF when supported)
  
  if (options?.quality) {
    params.push(`q_${options.quality}`);
  } else {
    params.push('q_auto');
  }
  
  if (options?.width) {
    params.push(`w_${options.width}`);
    params.push('c_limit'); // Don't upscale beyond original size
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${cleanPath}`;
}

