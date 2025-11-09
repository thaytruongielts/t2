
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  return (
    <div className="w-full">
      <label htmlFor="ielts-prompt" className="block text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">
        Enter your IELTS Writing Task 2 Prompt
      </label>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Nhập đề bài IELTS Writing Task 2 của bạn</p>
      <textarea
        id="ielts-prompt"
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., Some people believe that unpaid community service should be a compulsory part of high school programmes..."
        className="w-full p-4 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out dark:bg-slate-800 dark:border-slate-600 dark:placeholder-slate-500"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt.trim()}
        className="mt-4 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Analyzing... (Đang phân tích...)</span>
          </>
        ) : (
          <>
            <SparklesIcon className="mr-2 -ml-1 h-5 w-5" />
            <span>Analyze Prompt (Phân tích đề bài)</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PromptInput;
