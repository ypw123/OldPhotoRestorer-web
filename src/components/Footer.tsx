import { Github, Mail, Camera } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 品牌信息 */}
          <div>
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl mr-3">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">老照片修复</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              专注于利用先进AI技术修复珍贵的历史照片，
              让每一段美好回忆都能重现光彩。
            </p>
          </div>

          {/* 服务特色 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">服务特色</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                AI智能修复
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                快速处理
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                安全可靠
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                免费使用
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">联系我们</h4>
            <div className="space-y-3">
              <a href="mailto:support@oldphoto.ai" 
                 className="flex items-center text-gray-300 hover:text-orange-400 transition-colors">
                <Mail className="h-4 w-4 mr-3" />
                support@oldphoto.ai
              </a>
              <a href="https://github.com/oldphoto-restorer" 
                 className="flex items-center text-gray-300 hover:text-orange-400 transition-colors"
                 target="_blank" 
                 rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-3" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {currentYear} 老照片修复工具. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;