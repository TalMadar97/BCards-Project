import React, { useEffect, useState } from "react";

const ImageWithFallback = ({ src, alt, fallbackSrc, style, className }) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc(fallbackSrc); // Set fallback image if the image fails to load
  };

  useEffect(() => {
    setImageSrc(src); // Update imageSrc when src prop changes
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      style={style}
      className={className}
    />
  );
};

export default ImageWithFallback;
