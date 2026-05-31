import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export default function PosterImage({ src, alt, className = "", skeletonClassName = "" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${skeletonClassName}`}>
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-dark-800 animate-pulse flex items-center justify-center">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] animate-[shimmer_1.5s_infinite]" />
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className={`w-full h-full bg-dark-800 flex flex-col items-center justify-center text-white/30 p-4 text-center ${className}`}>
          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-xs font-medium uppercase tracking-wider">Image Unavailable</span>
        </div>
      ) : (
        /* Actual Image */
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover ${!isLoaded ? 'opacity-0' : 'opacity-100'} ${className}`}
          loading="lazy"
        />
      )}
    </div>
  );
}
