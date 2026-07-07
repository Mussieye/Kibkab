"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";

interface SermonData {
  title: string;
  speaker: string;
  date: string;
  description: string;
  tags: string[];
  videoFile?: File;
  thumbnailFile?: File;
  photoFiles: File[];
}

interface SermonUploadFormProps {
  onUpload: (sermonData: SermonData) => Promise<void>;
  onCancel?: () => void;
  className?: string;
}

export function SermonUploadForm({ 
  onUpload, 
  onCancel, 
  className = "" 
}: SermonUploadFormProps) {
  const { t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [sermonData, setSermonData] = useState<SermonData>({
    title: "",
    speaker: "",
    date: "",
    description: "",
    tags: [],
    photoFiles: []
  });
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof SermonData, value: string | string[]) => {
    setSermonData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: keyof SermonData, file: File | FileList | null) => {
    if (!file) return;
    
    if (file instanceof File) {
      setSermonData(prev => ({
        ...prev,
        [field]: file
      }));
    } else if (file instanceof FileList) {
      setSermonData(prev => ({
        ...prev,
        photoFiles: Array.from(file)
      }));
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !sermonData.tags.includes(tag.trim())) {
      setSermonData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSermonData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    
    if (!sermonData.title.trim()) errors.push("Title is required");
    if (!sermonData.speaker.trim()) errors.push("Speaker is required");
    if (!sermonData.date.trim()) errors.push("Date is required");
    if (!sermonData.videoFile) errors.push("Video file is required");
    
    if (sermonData.videoFile && sermonData.videoFile.size > 500 * 1024 * 1024) {
      errors.push("Video file must be less than 500MB");
    }
    
    if (sermonData.thumbnailFile && sermonData.thumbnailFile.size > 10 * 1024 * 1024) {
      errors.push("Thumbnail must be less than 10MB");
    }
    
    sermonData.photoFiles.forEach((photo, index) => {
      if (photo.size > 10 * 1024 * 1024) {
        errors.push(`Photo ${index + 1} must be less than 10MB`);
      }
    });
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      alert("Please fix the following errors:\n" + errors.join("\n"));
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      await onUpload(sermonData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Reset form after successful upload
      setTimeout(() => {
        setSermonData({
          title: "",
          speaker: "",
          date: "",
          description: "",
          tags: [],
          photoFiles: []
        });
        setUploadProgress(0);
        setIsUploading(false);
        
        if (videoInputRef.current) videoInputRef.current.value = "";
        if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
        if (photosInputRef.current) photosInputRef.current.value = "";
      }, 1000);
      
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-royal-purple/20 p-6 ${className}`}>
      <h2 className="font-serif text-2xl text-royal-purple mb-6">Upload New Sermon</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Sermon Title *
            </label>
            <input
              type="text"
              value={sermonData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple/50"
              placeholder="Enter sermon title"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Speaker *
            </label>
            <input
              type="text"
              value={sermonData.speaker}
              onChange={(e) => handleInputChange("speaker", e.target.value)}
              className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple/50"
              placeholder="Enter speaker name"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Date *
            </label>
            <input
              type="date"
              value={sermonData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple/50"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
                className="flex-1 px-3 py-2 border border-royal-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple/50"
                placeholder="Add tag and press Enter"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {sermonData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gold/20 text-royal-purple rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-royal-purple hover:text-burgundy"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Description
          </label>
          <textarea
            value={sermonData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple/50"
            placeholder="Enter sermon description"
          />
        </div>

        {/* File Uploads */}
        <div className="space-y-4">
          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Sermon Video * (MP4, max 500MB)
            </label>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange("videoFile", e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple/50"
              required
            />
            {sermonData.videoFile && (
              <p className="text-sm text-green-600 mt-1">
                Selected: {sermonData.videoFile.name} ({(sermonData.videoFile.size / 1024 / 1024).toFixed(1)}MB)
              </p>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Thumbnail Image (JPG/PNG, max 10MB)
            </label>
            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("thumbnailFile", e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple/50"
            />
            {sermonData.thumbnailFile && (
              <p className="text-sm text-green-600 mt-1">
                Selected: {sermonData.thumbnailFile.name} ({(sermonData.thumbnailFile.size / 1024 / 1024).toFixed(1)}MB)
              </p>
            )}
          </div>

          {/* Photos Upload */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Sermon Photos (JPG/PNG, max 10MB each)
            </label>
            <input
              ref={photosInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange("photoFiles", e.target.files)}
              className="w-full px-3 py-2 border border-royal-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-purple/50"
            />
            {sermonData.photoFiles.length > 0 && (
              <p className="text-sm text-green-600 mt-1">
                Selected: {sermonData.photoFiles.length} photo{sermonData.photoFiles.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-charcoal">
              <span>Uploading sermon...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-royal-purple h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isUploading}
            className="flex-1 bg-royal-purple text-white py-3 px-6 rounded-lg font-medium hover:bg-royal-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? "Uploading..." : "Upload Sermon"}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isUploading}
              className="px-6 py-3 border border-royal-purple/20 text-royal-purple rounded-lg font-medium hover:bg-royal-purple/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
