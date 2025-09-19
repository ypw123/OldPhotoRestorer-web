import React from 'react';
import { Camera } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-2 rounded-xl shadow-lg">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">老照片修复</h1>
              <p className="text-sm text-gray-600">AI智能修复，重现珍贵回忆</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;