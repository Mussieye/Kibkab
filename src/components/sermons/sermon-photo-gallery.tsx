"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SermonPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface SermonPhotoGalleryProps {
  photos: SermonPhoto[];
  title?: string;
  className?: string;
}

export function SermonPhotoGallery({ 
  photos, 
  title = "Sermon Photos", 
  className = "" 
}: SermonPhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhoto(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhoto === null) return;
    
    if (direction === 'prev') {
      setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : photos.length - 1);
    } else {
      setSelectedPhoto(selectedPhoto < photos.length - 1 ? selectedPhoto + 1 : 0);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Gallery Title */}
      <div className="text-center">
        <h3 className="font-serif text-2xl text-royal-purple mb-2">{title}</h3>
        <p className="text-charcoal/70">
          {photos.length} photo{photos.length !== 1 ? 's' : ''} from this sermon
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative cursor-pointer overflow-hidden rounded-lg border border-royal-purple/20 bg-white"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-square relative">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3">
                    <svg className="w-6 h-6 text-royal-purple" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Caption */}
            {photo.caption && (
              <div className="p-3">
                <p className="text-sm text-charcoal/70 text-center">{photo.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gold transition-colors"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigatePhoto('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors bg-black/50 rounded-full p-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            
            <button
              onClick={() => navigatePhoto('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors bg-black/50 rounded-full p-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
              </svg>
            </button>

            {/* Main Image */}
            <div className="relative">
              <Image
                src={photos[selectedPhoto].src}
                alt={photos[selectedPhoto].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              
              {/* Caption */}
              {photos[selectedPhoto].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-center">{photos[selectedPhoto].caption}</p>
                </div>
              )}
            </div>

            {/* Photo Counter */}
            <div className="text-center mt-4">
              <p className="text-white/70 text-sm">
                {selectedPhoto + 1} / {photos.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {photos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📷</div>
          <h4 className="text-xl font-semibold text-charcoal mb-2">No Photos Yet</h4>
          <p className="text-charcoal/70">
            Photos from this sermon will appear here once uploaded.
          </p>
        </div>
      )}
    </div>
  );
}
