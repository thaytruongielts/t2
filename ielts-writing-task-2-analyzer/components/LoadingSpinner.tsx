
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin border-t-transparent"></div>
      <p className="mt-4 text-lg text-slate-500">AI is analyzing your prompt...</p>
      <p className="text-md text-slate-400">AI đang phân tích đề bài của bạn...</p>
    </div>
  );
};

export default LoadingSpinner;
