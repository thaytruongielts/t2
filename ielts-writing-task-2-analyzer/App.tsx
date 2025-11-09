
import React, { useState, useCallback } from 'react';
import PromptInput from './components/PromptInput';
import AnalysisDisplay from './components/AnalysisDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import SparklesIcon from './components/icons/SparklesIcon';
import { analyzeIeltsPrompt } from './services/geminiService';
import type { Analysis } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const resultJson = await analyzeIeltsPrompt(prompt);
      const parsedResult: Analysis = JSON.parse(resultJson);
      setAnalysis(parsedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-3">
            <SparklesIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              IELTS Writing Task 2 Analyzer
            </h1>
          </div>
           <p className="mt-1 text-xl text-slate-600 dark:text-slate-300">Phân tích đề bài IELTS Writing Task 2</p>
          <p className="mt-2 text-md text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get instant AI-powered feedback on your IELTS essay prompts. Understand the question type, structure, and key vocabulary.
            <br />
            <span className="text-sm">Nhận phân tích tức thì cho đề bài của bạn với sự hỗ trợ từ AI. Hiểu rõ dạng câu hỏi, cấu trúc bài viết và các từ vựng quan trọng.</span>
          </p>
        </header>

        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <PromptInput 
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleAnalyze}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-8">
          {isLoading && <LoadingSpinner />}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">Error (Lỗi): </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {analysis && <AnalysisDisplay analysis={analysis} />}
          {!isLoading && !analysis && !error && (
            <div className="text-center p-8 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-medium text-slate-700 dark:text-slate-300">Ready to begin? (Sẵn sàng bắt đầu?)</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Enter an IELTS Writing Task 2 prompt above and click "Analyze Prompt" to see the magic happen.
                <br />
                 <span className="text-sm">Nhập đề bài IELTS Writing Task 2 ở trên và nhấn "Phân tích đề bài" để xem điều kỳ diệu xảy ra.</span>
              </p>
            </div>
          )}
        </div>
      </main>
        <footer className="w-full max-w-3xl mx-auto text-center py-6 mt-8">
            <p className="text-sm text-slate-500 dark:text-slate-400">Powered by Google Gemini (Được hỗ trợ bởi Google Gemini)</p>
        </footer>
    </div>
  );
};

export default App;
