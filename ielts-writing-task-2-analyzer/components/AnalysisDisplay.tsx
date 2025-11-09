
import React from 'react';
import type { Analysis } from '../types';

interface AnalysisDisplayProps {
  analysis: Analysis;
}

const InfoCard: React.FC<{ title: string; subtitle: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1">{title}</h3>
        <p className="text-md text-slate-500 dark:text-slate-400 mb-3">{subtitle}</p>
        <div className="prose prose-slate dark:prose-invert max-w-none">
            {children}
        </div>
    </div>
);

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Analysis Result</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-2">Kết quả phân tích</p>
        <div className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
          <strong>Question Type (Dạng câu hỏi):</strong> {analysis.questionType}
        </div>
      </div>

      <InfoCard title="Essay Structure" subtitle="Cấu trúc bài luận">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300">Introduction (Mở bài)</h4>
            <p>{analysis.essayStructure.introduction}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300">Body Paragraph 1 (Thân bài 1)</h4>
            <p>{analysis.essayStructure.bodyParagraph1}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300">Body Paragraph 2 (Thân bài 2)</h4>
            <p>{analysis.essayStructure.bodyParagraph2}</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300">Conclusion (Kết bài)</h4>
            <p>{analysis.essayStructure.conclusion}</p>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="Suggested Vocabulary" subtitle="Từ vựng gợi ý">
        <div className="flex flex-wrap gap-2">
          {analysis.suggestedVocabulary.map((word, index) => (
            <span key={index} className="bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1 rounded-full dark:bg-slate-700 dark:text-slate-200">
              {word}
            </span>
          ))}
        </div>
      </InfoCard>
    </div>
  );
};

export default AnalysisDisplay;
