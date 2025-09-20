import { Sparkles, Upload, Zap, Download } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "上传老照片",
      description: "支持 JPG、PNG、WebP 格式，最大 10MB"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI智能修复",
      description: "去除划痕、污渍，增强清晰度和色彩"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "完美复原",
      description: "获得高质量修复后的珍贵回忆"
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "下载保存",
      description: "一键下载修复版本，永久保存"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            如何修复老照片
          </h2>
          <p className="text-lg text-gray-600">
            简单四步，让珍贵回忆重获新生
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* 连接线 */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-300 to-orange-200 z-0" 
                     style={{ width: 'calc(100% - 2rem)' }} />
              )}
              
              {/* 步骤卡片 */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 z-10">
                <div className="text-center">
                  {/* 步骤号 */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold rounded-full mb-4 text-lg">
                    {index + 1}
                  </div>
                  
                  {/* 图标 */}
                  <div className="flex justify-center mb-4 text-orange-500">
                    {step.icon}
                  </div>
                  
                  {/* 标题和描述 */}
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;