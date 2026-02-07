"use client";

import React, { useState, useEffect } from 'react';
import { 
    ChevronDown, 
    MoreHorizontal, 
    Pencil, 
    User,
    Info,
    MessageSquare,
    Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnswerEditor } from './AnswerEditor';
import { SuggestedLanguageSection } from './SuggestedLanguageSection';
import { AnswerBankSearchModal } from './AnswerBankSearchModal';

const INITIAL_ANSWER = `Founded in 2018, Pinetree Financial Group is a private equity firm that has strategically focused on lower- and mid-market opportunities throughout our operating history. Our development has been marked by.

Throughout our development, we have maintained a disciplined value-oriented buyout approach as our core investment philosophy. While staying true to these fundamental principles, we have made strategic refinements to our investment process, including the introduction of sector rotation frameworks in 2022 to enhance our portfolio management capabilities.`;

const ANSWER_CANDIDATES = [
    {
        id: '1',
        text: INITIAL_ANSWER,
        source: 'Current Draft'
    },
    {
        id: '2',
        text: `Pinetree Financial Group, established in 2018, specializes in lower- and mid-market private equity. We adhere to a value-oriented buyout strategy while adapting our processes, notably adding sector rotation frameworks in 2022 to boost portfolio management.`,
        source: 'AI Concise'
    },
    {
        id: '3',
        text: `Since our inception in 2018, Pinetree Financial Group has been dedicated to uncovering opportunities within the lower- and mid-market sectors. Our journey is defined by a steadfast commitment to a value-oriented buyout philosophy. Over the years, we have evolved our investment strategies to remain agile, most significantly with the implementation of sector rotation frameworks in 2022, which has substantially strengthened our portfolio management infrastructure.`,
        source: 'Marketing V2'
    }
];

export const DDQAnswerPanel: React.FC = () => {
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [answer, setAnswer] = useState(ANSWER_CANDIDATES[0].text);
  const [isSuggestedLanguageOpen, setIsSuggestedLanguageOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // Debug: Log state changes
  useEffect(() => {
    console.log('🔵 isSuggestedLanguageOpen changed to:', isSuggestedLanguageOpen);
  }, [isSuggestedLanguageOpen]);

  // When cycling through answers, we update the editor content
  const handlePrevAnswer = () => {
    const newIndex = currentAnswerIndex > 0 ? currentAnswerIndex - 1 : ANSWER_CANDIDATES.length - 1;
    setCurrentAnswerIndex(newIndex);
    setAnswer(ANSWER_CANDIDATES[newIndex].text);
    setIsApplied(false);
  };

  const handleNextAnswer = () => {
    const newIndex = currentAnswerIndex < ANSWER_CANDIDATES.length - 1 ? currentAnswerIndex + 1 : 0;
    setCurrentAnswerIndex(newIndex);
    setAnswer(ANSWER_CANDIDATES[newIndex].text);
    setIsApplied(false);
  };


  return (
    <div className="flex flex-col h-full relative min-h-[600px]">
      {/* Question Header */}
      <div className="p-6 pb-2">
        <div className="flex items-start gap-3">
            <div className="mt-1">
                <input type="checkbox" className="w-5 h-5 border-gray-300 rounded focus:ring-purple-500 text-purple-600 accent-purple-600" />
            </div>
            <div className="flex-1">
                <h1 className="text-xl font-medium text-gray-900 leading-snug">
                    1.1 Please provide a brief history of the firm.
                </h1>
                <div className="flex items-center gap-2 mt-3">
                    <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded border border-green-200 font-medium">Answered</span>
                    <span className="bg-gray-50 text-gray-600 text-xs px-2 py-0.5 rounded border border-gray-200">Page 3</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1 bg-white shadow-sm">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-sm text-gray-700 font-medium">Will Berg</span>
                </div>
                <div className="flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1 bg-white shadow-sm">
                    <span className="text-sm text-gray-700 font-medium">V3/3</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
                    <Pencil className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-6 pb-8 space-y-4 relative">
        
        {/* Answer Section */}
        <div className="relative">
             <AnswerEditor 
                value={answer} 
                onChange={setAnswer}
                isApplied={isApplied}
                onApply={() => setIsApplied(true)}
                currentCount={currentAnswerIndex + 1}
                totalCount={ANSWER_CANDIDATES.length}
                onNext={handleNextAnswer}
                onPrev={handlePrevAnswer}
                onSearchClick={() => setIsSearchOpen(true)}
                onAIClick={() => {
                  console.log('AI icon clicked, opening section');
                  setIsSuggestedLanguageOpen(!isSuggestedLanguageOpen);
                }}
             />
        </div>

        {/* Collapsible Sections */}
        <SuggestedLanguageSection 
          isOpen={isSuggestedLanguageOpen}
          onToggle={() => setIsSuggestedLanguageOpen(!isSuggestedLanguageOpen)}
          onGenerate={(prompt) => {
            const newAnswer = `[AI Generated based on "${prompt}"]: ${answer} (Refined)`;
            setAnswer(newAnswer);
            setIsApplied(false);
          }}
        />
        <CollapsibleSection icon={<Info className="w-4 h-4" />} title="Explanation" />
        <CollapsibleSection icon={<MessageSquare className="w-4 h-4" />} title="Replies" />

      </div>

      <AnswerBankSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={(answerText) => {
          console.log('Selected answer:', answerText);
          setAnswer(answerText);
          setIsSearchOpen(false);
        }}
      />
    </div>
  );
};

const CollapsibleSection: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                    {icon}
                    <span>{title}</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
            </button>
            {isOpen && (
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 text-sm text-gray-600">
                    Content for {title} goes here...
                </div>
            )}
        </div>
    );
};
