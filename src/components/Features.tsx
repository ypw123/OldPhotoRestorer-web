import { Shield, Clock, Cpu, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Cpu className="h-10 w-10" />,
      title: "AI智能修复",
      description: "采用最新的人工智能技术，自动识别并修复照片中的缺陷",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "快速处理",
      description: "通常在30秒内完成修复，让您快速获得满意的结果",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "安全可靠",
      description: "照片安全传输，处理完成后自动删除，保护您的隐私",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: "珍藏回忆",
      description: "让褪色的回忆重现光彩，为您和家人留下珍贵的纪念",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            为什么选择我们的AI修复技术？
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            先进的AI算法结合人性化设计，让老照片修复变得简单而高效
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              {/* 图标容器 */}
              <div className="mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
              </div>
              
              {/* 特性内容 */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 统计数据 */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">99%</div>
              <div className="text-gray-600">修复成功率</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">10k+</div>
              <div className="text-gray-600">照片已修复</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">30s</div>
              <div className="text-gray-600">平均处理时间</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">4.9</div>
              <div className="text-gray-600">用户评分</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;