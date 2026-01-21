'use client'

import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function SupabaseFileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus(null);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setUploadStatus({ type: 'error', message: '파일을 선택해주세요.' });
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus({ type: 'success', message: '파일이 성공적으로 업로드되었습니다!' });
        setUploadedUrl(data.url);
        setFile(null);
      } else {
        setUploadStatus({ type: 'error', message: data.error || '업로드 중 오류가 발생했습니다.' });
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: '업로드 중 오류가 발생했습니다.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-3 rounded-lg">
            <Upload className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">파일 업로드</h1>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <FileText className="mx-auto mb-2 text-gray-400" size={48} />
              <p className="text-sm text-gray-600 mb-1">
                클릭하여 파일 선택
              </p>
              <p className="text-xs text-gray-400">
                모든 파일 형식 지원
              </p>
            </label>
          </div>

          {file && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700">선택된 파일:</p>
              <p className="text-sm text-gray-600 truncate">{file.name}</p>
              <p className="text-xs text-gray-400 mt-1">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <button
            onClick={uploadFile}
            disabled={!file || uploading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? '업로드 중...' : '업로드'}
          </button>

          {uploadStatus && (
            <div
              className={`p-4 rounded-lg flex items-start gap-3 ${
                uploadStatus.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {uploadStatus.type === 'success' ? (
                <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{uploadStatus.message}</p>
                {uploadedUrl && (
                  <a
                    href={uploadedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline mt-1 block"
                  >
                    파일 보기
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">설정 필요:</h2>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>? .env.local 파일 생성</li>
            <li>? NEXT_PUBLIC_SUPABASE_URL 설정</li>
            <li>? NEXT_PUBLIC_SUPABASE_ANON_KEY 설정</li>
            <li>? pages/api/upload.js 파일 생성</li>
          </ul>
        </div>
      </div>
    </div>
  );
}