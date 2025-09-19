import React from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ImagePreview from './components/ImagePreview';
import { usePhotoRestoration } from './hooks/usePhotoRestoration';

function App() {
  const { originalImage, restoredImage, isProcessing, processPhoto, reset } = usePhotoRestoration();

  return (
    <div className="min-h-screen time-travel-bg floating-particles relative">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="time-portal py-16 px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              让珍贵回忆
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                重获新生
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              通过先进的AI技术，智能修复老照片中的划痕、褪色和模糊问题，
              让每一段珍贵的回忆都能清晰地重现
            </p>
          </div>

          <div className="relative z-10">
            {!originalImage ? (
              <FileUpload onFileSelect={processPhoto} isProcessing={isProcessing} />
            ) : (
              <ImagePreview
                originalImage={originalImage}
                restoredImage={restoredImage}
                isProcessing={isProcessing}
                onReset={reset}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;