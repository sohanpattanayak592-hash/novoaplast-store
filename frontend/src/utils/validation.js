/**
 * Validation utility for Poster Images
 */

/**
 * Validates if a poster's image matches its collection/title context.
 * For a real production app, this could invoke an AI vision API.
 * Locally, we check if the image URL contains invalid patterns (like loremflickr or generic source.unsplash).
 * 
 * @param {Object} params
 * @param {string} params.title - Poster title
 * @param {string} params.collection - Collection name or ID
 * @param {string} params.image - Image URL
 * @returns {Object} - { isValid: boolean, reason: string, score: number }
 */
export function validatePosterImage({ title, collection, image }) {
  if (!image) {
    return { isValid: false, reason: "No image provided", score: 0 };
  }

  // Reject generic random placeholder services that don't guarantee subject match
  const genericDomains = [
    'loremflickr.com',
    'picsum.photos',
    'placekitten.com',
    'placehold.co',
    'dummyimage.com'
  ];

  const hasGenericDomain = genericDomains.some(domain => image.includes(domain));
  if (hasGenericDomain) {
    return { 
      isValid: false, 
      reason: "Uses generic random placeholder service", 
      score: 10 
    };
  }

  // Reject if it uses unsplash without specific high-quality IDs 
  // (e.g., source.unsplash.com with broad random keywords)
  if (image.includes('source.unsplash.com') && !image.includes('photo-')) {
    return {
      isValid: false,
      reason: "Uses broad generic unsplash search which returns unrelated images",
      score: 30
    };
  }

  // If it's a specific, curated premium image (like images.unsplash.com/photo-ID), 
  // we assume it has been manually verified or matched.
  if (image.includes('images.unsplash.com/photo-') || image.includes('plus.unsplash.com/premium_photo-')) {
    return {
      isValid: true,
      reason: "Premium curated image",
      score: 95
    };
  }

  // Fallback for valid relative paths or verified CDNs
  return {
    isValid: true,
    reason: "Valid image source",
    score: 90
  };
}
