// API 配置
export const API_CONFIG = {
  // 开发环境后端 URL
  BASE_URL: 'http://localhost:4000',
  
  // API 路径
  ENDPOINTS: {
    HEALTH: '/health',
    RESTORE: '/restore',
    RESTORE_BASE64: '/restore/base64',
    TASK_STATUS: '/restore/status'
  },
  
  // 请求配置
  REQUEST: {
    TIMEOUT: 30000, // 30秒超时
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp']
  }
};

export default API_CONFIG;