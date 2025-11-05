
import React, { useState, useRef, useCallback } from 'react';
import type { ImageFile } from '../types';

interface ImageUploadProps {
  onImageSelect: (file: ImageFile) => void;
}

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File | null) => {
      if (file && file.type.startsWith('image/')) {
        try {
          const dataUrl = await fileToDataUrl(file);
          setPreview(dataUrl);
          onImageSelect({ file, dataUrl });
        } catch (error) {
          console.error("Error reading file:", error);
          // Optionally, show an error to the user
        }
      }
    },
    [onImageSelect]
  );
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
        <label htmlFor="upload-button" className="block text-sm font-medium text-gray-300 mb-2">
            1. Upload an image
        </label>
        <div 
            className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${dragActive ? 'border-purple-500 bg-gray-700/50' : 'border-gray-600 hover:border-gray-500 bg-gray-700'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
        >
            <input
                ref={inputRef}
                type="file"
                id="upload-button"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
            />
            {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-lg p-2" />
            ) : (
                <div className="text-center text-gray-400">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 4v.01M28 8l10.586 10.586a2 2 0 010 2.828L32 28M8 32l9.414-9.414a2 2 0 012.828 0L28 32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2">Drag & drop or <span className="font-semibold text-purple-400">click to upload</span></p>
                    <p className="text-xs mt-1">PNG, JPG, WEBP, etc.</p>
                </div>
            )}
        </div>
    </div>
  );
};
