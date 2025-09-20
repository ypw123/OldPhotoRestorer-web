import { useState, useCallback } from 'react';
import { photoRestoreService } from '../services/photoRestoreService';

interface UsePhotoRestorationReturn {
  originalImage: string | null;
  restoredImage: string | null;
  isProcessing: boolean;
  progress: number;
  progressText: string;
  error: string | null;
  processPhoto: (file: File) => Promise<void>;
  reprocessPhoto: () => Promise<void>;
  reset: () => void;
  clearError: () => void;
}

export const usePhotoRestoration = (): UsePhotoRestorationReturn => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const processPhoto = useCallback(async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      setProgress(0);
      setProgressText('准备上传...');
      
      // 保存原始文件和创建原图URL用于预览
      setOriginalFile(file);
      const originalUrl = URL.createObjectURL(file);
      setOriginalImage(originalUrl);
      setRestoredImage(null);
      
      // 调用AI修复服务
      const result = await photoRestoreService.restorePhoto(
        file,
        (status: string, progressValue?: number) => {
          setProgressText(status);
          if (progressValue !== undefined) {
            setProgress(progressValue);
          }
        }
      );

      if (result.success && result.imageUrl) {
        setRestoredImage(result.imageUrl);
        setProgress(100);
        setProgressText('修复完成！');
      } else {
        throw new Error(result.error || '修复失败');
      }
      
    } catch (error) {
      console.error('照片处理失败:', error);
      setError(error instanceof Error ? error.message : '照片处理失败，请重试');
      setProgress(0);
      setProgressText('');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reprocessPhoto = useCallback(async () => {
    if (!originalFile) {
      setError('没有原始文件，无法重新处理');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(0);
      setProgressText('重新处理中...');
      setRestoredImage(null);
      
      // 调用AI修复服务
      const result = await photoRestoreService.restorePhoto(
        originalFile,
        (status: string, progressValue?: number) => {
          setProgressText(status);
          if (progressValue !== undefined) {
            setProgress(progressValue);
          }
        }
      );

      if (result.success && result.imageUrl) {
        setRestoredImage(result.imageUrl);
        setProgress(100);
        setProgressText('重新修复完成！');
      } else {
        throw new Error(result.error || '重新修复失败');
      }
      
    } catch (error) {
      console.error('重新处理失败:', error);
      setError(error instanceof Error ? error.message : '重新处理失败，请重试');
      setProgress(0);
      setProgressText('');
    } finally {
      setIsProcessing(false);
    }
  }, [originalFile]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    if (originalImage) {
      URL.revokeObjectURL(originalImage);
    }
    // 注意：不要释放 restoredImage URL，因为它是从服务器返回的
    setOriginalImage(null);
    setRestoredImage(null);
    setOriginalFile(null);
    setIsProcessing(false);
    setProgress(0);
    setProgressText('');
    setError(null);
  }, [originalImage]);

  return {
    originalImage,
    restoredImage,
    isProcessing,
    progress,
    progressText,
    error,
    processPhoto,
    reprocessPhoto,
    reset,
    clearError
  };
};