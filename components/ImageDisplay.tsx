
import React from 'react';

interface ImageDisplayProps {
  title: string;
  imageDataUrl?: string | null;
  children?: React.ReactNode;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageDataUrl, children }) => {
  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-lg font-semibold text-center text-gray-300">{title}</h3>
      <div className="relative aspect-square w-full bg-gray-700/50 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
        {imageDataUrl ? (
          <img src={imageDataUrl} alt={title} className="w-full h-full object-contain rounded-lg" />
        ) : children ? (
          children
        ) : (
          <div className="text-gray-500 text-center p-4">
            <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 4v.01M28 8l10.586 10.586a2 2 0 010 2.828L32 28M8 32l9.414-9.414a2 2 0 012.828 0L28 32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-2 text-sm">{title === 'Original Image' ? 'Upload an image to start' : 'Your result will appear here'}</p>
          </div>
        )}
      </div>
    </div>
  );
};
