import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onFileSelect(imageFile);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-orange-400 bg-orange-50 scale-105'
            : 'border-gray-300 bg-gray-50 hover:border-orange-300 hover:bg-orange-25'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full transition-all duration-300 ${
            isDragOver ? 'bg-orange-400' : 'bg-gray-200'
          }`}>
            {isDragOver ? (
              <ImageIcon className="h-8 w-8 text-white" />
            ) : (
              <Upload className="h-8 w-8 text-gray-600" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">
              {isDragOver ? '释放文件开始修复' : '上传老照片'}
            </h3>
            <p className="text-gray-600">
              拖拽照片到此处，或点击选择文件
            </p>
            <p className="text-sm text-gray-500">
              支持 JPG, PNG, WebP 格式，最大 10MB
            </p>
          </div>

          <button
            className={`px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isProcessing}
          >
            选择照片
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
      </div>
    </div>
  );
};

export default FileUpload;