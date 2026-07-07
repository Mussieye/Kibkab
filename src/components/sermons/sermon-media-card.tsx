"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

interface SermonMedia {
  videoUrl?: string;
  thumbnailUrl?: string;
  photoUrls?: string[];
}

interface SermonMediaCardProps {
  id: string;
  title: string;
  speaker: string;
  date: string;
  tags: string[];
  media?: SermonMedia;
  className?: string;
}

export function SermonMediaCard({ 
  id, 
  title, 
  speaker, 
  date, 
  tags, 
  media,
  className = "" 
}: SermonMediaCardProps) {
  const { t } = useLanguage();

  const hasVideo = media?.videoUrl;
  const hasThumbnail = media?.thumbnailUrl;
  const hasPhotos = media?.photoUrls && media.photoUrls.length > 0;
  const totalMedia = (hasVideo ? 1 : 0) + (hasPhotos ? media.photoUrls!.length : 0);

  return (
    <article
      className={`rounded-full border border-royal-purple/20 bg-gradient-to-br from-white/90 via-white/80 to-transparent p-8 shadow-lg text-center backdrop-blur-sm relative overflow-hidden ${className}`}
    >
      {/* Fade edge effects */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/30 pointer-events-none"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-l from-transparent via-transparent to-white/15 pointer-events-none"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-transparent to-white/15 pointer-events-none"></div>
      
      {/* Media Preview */}
      {(hasVideo || hasPhotos) && (
        <div className="mb-4 relative z-10">
          {hasVideo && hasThumbnail && (
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
              <Image
                src={media.thumbnailUrl!}
                alt={`${title} thumbnail`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-3">
                  <svg className="w-6 h-6 text-royal-purple" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-royal-purple text-white text-xs px-2 py-1 rounded-full">
                VIDEO
              </div>
            </div>
          )}
          
          {hasPhotos && !hasVideo && (
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
              <Image
                src={media.photoUrls![0]}
                alt={`${title} photo`}
                fill
                className="object-cover"
              />
              {media.photoUrls!.length > 1 && (
                <div className="absolute top-2 right-2 bg-royal-purple text-white text-xs px-2 py-1 rounded-full">
                  +{media.photoUrls!.length - 1} photos
                </div>
              )}
            </div>
          )}
          
          {/* Media Count Badge */}
          <div className="flex justify-center gap-2 mb-2">
            {totalMedia > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gold/20 text-royal-purple rounded-full text-xs font-semibold">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
                </svg>
                {totalMedia} media
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Sermon Content */}
      <div className="relative z-10 space-y-2">
        <h2 className="font-serif text-2xl text-royal-purple text-center">{title}</h2>
        
        <p className="text-sm text-charcoal/90 text-center">
          <span className="font-semibold text-burgundy">{t('speaker')}</span>{" "}
          {speaker}
        </p>
        
        <p className="text-sm text-charcoal/90 text-center">
          <span className="font-semibold text-burgundy">{t('date')}</span> {date}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag) => (
            <span
              key={`${id}-${tag}`}
              className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase text-royal-purple"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Action Links */}
        <div className="flex flex-col gap-2 mt-4">
          <Link
            href={`/media/sermons/${id}`}
            className="inline-block text-sm font-semibold text-burgundy underline text-center hover:text-royal-purple transition-colors"
          >
            {hasVideo ? t('watchSermon') : 'View Details'}
          </Link>
          
          {hasPhotos && (
            <Link
              href={`/media/sermons/${id}#photos`}
              className="inline-block text-sm font-semibold text-royal-purple underline text-center hover:text-burgundy transition-colors"
            >
              View Photos ({media.photoUrls!.length})
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
