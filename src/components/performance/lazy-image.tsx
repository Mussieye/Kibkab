import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface LazyImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallback?: string;
  placeholder?: "blur" | "empty";
}

export function LazyImage({
  src,
  alt,
  fallback = "/placeholder.jpg",
  placeholder = "blur",
  className = "",
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="w-full h-full skeleton"></div>
        </div>
      )}
      <Image
        src={hasError ? fallback : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        placeholder={placeholder}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
