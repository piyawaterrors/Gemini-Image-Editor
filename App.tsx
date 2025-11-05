
import React, { useState, useCallback } from 'react';
import { editImage } from './services/geminiService';
import { ImageUpload } from './components/ImageUpload';
import { ImageDisplay } from './components/ImageDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import type { ImageFile } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: ImageFile) => {
    setOriginalImage(file);
    setEditedImage(null);
    setError(null);
  };

  const handleSubmit = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const base64Data = originalImage.dataUrl.split(',')[1];
      const resultBase64 = await editImage(prompt, base64Data, originalImage.file.type);
      setEditedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg p-4 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Gemini Image Editor
          </h1>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl p-4 md:p-8">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <ImageUpload onImageSelect={handleImageUpload} />
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                  2. Describe your edit
                </label>
                <textarea
                  id="prompt"
                  rows={3}
                  className="w-full bg-gray-700 border-gray-600 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-100 p-3 placeholder-gray-400"
                  placeholder="e.g., Add a retro filter, make the sky look like a sunset, remove the person in the background..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={!originalImage}
                />
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-4">
              <button
                onClick={handleSubmit}
                disabled={!originalImage || !prompt.trim() || isLoading}
                className="w-full md:w-auto px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? 'Generating...' : '✨ Generate Image'}
              </button>
               {error && <p className="text-red-400 text-center mt-4 animate-pulse">{error}</p>}
            </div>
          </div>
          
          <div className="border-t border-gray-700 my-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageDisplay title="Original Image" imageDataUrl={originalImage?.dataUrl ?? null} />
            <ImageDisplay title="Edited Image">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
                  <LoadingSpinner />
                </div>
              )}
              {editedImage && <img src={editedImage} alt="Edited" className="w-full h-full object-contain rounded-lg" />}
            </ImageDisplay>
          </div>
        </div>
      </main>
      
      <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
        <p>Powered by Google Gemini. Images are not stored.</p>
      </footer>
    </div>
  );
};

export default App;
