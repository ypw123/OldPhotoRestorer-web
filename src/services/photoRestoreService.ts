// API 响应接口定义
export interface RestoreResponse {
  success: boolean;
  filename?: string;
  mimetype?: string;
  size?: number;
  taskId?: string;
  imageUrl?: string;
  originalPrompt?: string;
  actualPrompt?: string;
  error?: string;
}

export interface TaskStatusResponse {
  taskId: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'CANCELED' | 'UNKNOWN';
  imageUrl?: string;
  originalPrompt?: string;
  actualPrompt?: string;
  error?: string;
}

import { API_CONFIG } from '../config/api';

// 服务配置
const API_BASE_URL = API_CONFIG.BASE_URL;

class PhotoRestoreService {
  /**
   * 将文件转换为 base64 格式
   */
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * 使用 base64 方式上传并修复图片
   */
  async restorePhotoBase64(file: File): Promise<RestoreResponse> {
    try {
      const base64Image = await this.fileToBase64(file);
      
      const response = await fetch(`${API_BASE_URL}/restore/base64`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const result: RestoreResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Base64 restore failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '上传失败，请重试'
      };
    }
  }

  /**
   * 使用 multipart 方式上传并修复图片
   */
  async restorePhotoMultipart(file: File): Promise<RestoreResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/restore`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const result: RestoreResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Multipart restore failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '上传失败，请重试'
      };
    }
  }

  /**
   * 查询任务状态
   */
  async getTaskStatus(taskId: string): Promise<TaskStatusResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/restore/status/${taskId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const result: TaskStatusResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Get task status failed:', error);
      return {
        taskId,
        status: 'UNKNOWN',
        error: error instanceof Error ? error.message : '查询状态失败'
      };
    }
  }

  /**
   * 轮询等待任务完成
   */
  async waitForTaskCompletion(
    taskId: string, 
    onProgress?: (status: TaskStatusResponse) => void,
    maxWaitTime: number = 300000, // 5分钟
    pollInterval: number = 3000 // 3秒
  ): Promise<TaskStatusResponse> {
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitTime) {
      const status = await this.getTaskStatus(taskId);
      
      // 通知进度回调
      if (onProgress) {
        onProgress(status);
      }

      // 如果任务完成或失败，直接返回
      if (status.status === 'SUCCEEDED' || status.status === 'FAILED') {
        return status;
      }

      // 等待下次轮询
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    // 超时
    return {
      taskId,
      status: 'FAILED',
      error: '处理超时，请重试'
    };
  }

  /**
   * 一站式修复服务（推荐使用）
   * 使用qwen-image-edit同步处理
   */
  async restorePhoto(
    file: File,
    onProgress?: (status: string, progress?: number) => void,
    useBase64: boolean = true
  ): Promise<{
    success: boolean;
    imageUrl?: string;
    originalPrompt?: string;
    error?: string;
  }> {
    try {
      // 通知开始上传
      if (onProgress) {
        onProgress('正在上传图片...', 20);
      }

      // 通知开始AI处理
      if (onProgress) {
        onProgress('AI正在修复中...', 50);
      }

      // 选择上传方式并直接获取结果（qwen-image-edit是同步的）
      const result = useBase64 
        ? await this.restorePhotoBase64(file)
        : await this.restorePhotoMultipart(file);

      if (result.success && result.imageUrl) {
        if (onProgress) {
          onProgress('修复完成！', 100);
        }
        return {
          success: true,
          imageUrl: result.imageUrl,
          originalPrompt: result.originalPrompt
        };
      } else {
        return {
          success: false,
          error: result.error || '修复失败，请重试'
        };
      }

    } catch (error) {
      console.error('Photo restoration failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '修复过程出错，请重试'
      };
    }
  }

  /**
   * 检查服务健康状态
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// 导出服务实例
export const photoRestoreService = new PhotoRestoreService();
export default photoRestoreService;