"use client";

import { useState } from "react";

const ImageMain = ({ imageUrl, alt }: { imageUrl: string; alt: string }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Loader shown while image is loading */}
      {!isImageLoaded && (
        <div className="absolute inset-0 h-full w-full animate-pulse bg-gray-300" />
      )}

      {/* Image always rendered, but opacity transitions on load */}
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsImageLoaded(true)}
        className={`w-full h-auto object-cover transition-opacity duration-500 ${
          isImageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ImageMain;
