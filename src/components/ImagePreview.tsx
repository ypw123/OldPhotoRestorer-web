import React from 'react';
import { Download, RotateCcw } from 'lucide-react';

interface ImagePreviewProps {
  originalImage: string;
  restoredImage?: string;
  isProcessing: boolean;
  onReset: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  originalImage,
  restoredImage,
  isProcessing,
  onReset
}) => {
  const handleDownload = () => {
    if (restoredImage) {
      const link = document.createElement('a');
      link.href = restoredImage;
      link.download = `restored-photo-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* 操作按钮 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">修复结果</h2>
        <div className="flex space-x-3">
          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
          >
            <RotateCcw className="h-4 w-4" />
            <span>重新上传</span>
          </button>
          {restoredImage && (
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Download className="h-4 w-4" />
              <span>下载修复版</span>
            </button>
          )}
        </div>
      </div>

      {/* 图片对比 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 原图 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <span className="inline-block w-3 h-3 bg-red-400 rounded-full mr-2"></span>
            原始照片
          </h3>
          <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
            <img
              src={originalImage}
              alt="原始照片"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 修复版 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
            AI修复版
          </h3>
          <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
            {isProcessing ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-400 mx-auto"></div>
                  <div className="space-y-2">
                    <p className="text-gray-600 font-medium">AI正在修复中...</p>
                    <p className="text-sm text-gray-500">请耐心等待几秒钟</p>
                  </div>
                </div>
              </div>
            ) : restoredImage ? (
              <img
                src={restoredImage}
                alt="修复后照片"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                修复完成后显示在这里
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 修复进度 */}
      {isProcessing && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">修复进度</span>
              <span className="text-orange-500 font-medium">处理中...</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;