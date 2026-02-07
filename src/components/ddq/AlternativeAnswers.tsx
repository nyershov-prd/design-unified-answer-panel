import React, { useState } from 'react';
import { Search, Copy, Check, Sparkles, BookOpen, ChevronRight, ChevronLeft, Trash2, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';

interface AlternativeAnswer {
  id: string;
  source: string;
  text: string;
  tags?: string[];
  date?: string;
}

interface AlternativeAnswersProps {
  onSelect: (text: string) => void;
  onOpenSearch: () => void;
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => void;
}

const MOCK_ALTERNATIVES: AlternativeAnswer[] = [
  {
    id: '1',
    source: 'Atlassian Palantir BLACKROCK',
    text: 'Examples of companies in our investment focus include Atlassian, Palantir, and BlackRock',
    tags: ['Suggested Language'],
  },
  {
    id: '2',
    source: 'Previous DDQ (2024)',
    text: 'Our firm has historically focused on technology-driven companies with high growth potential, such as key industry leaders in the software sector.',
    date: 'Oct 2024'
  },
  {
    id: '3',
    source: 'Marketing Deck v2',
    text: 'We target market-disrupting organizations. Notable portfolio inclusions are Atlassian and Palantir, demonstrating our commitment to innovation.',
    date: 'Jan 2025'
  }
];

export const AlternativeAnswers: React.FC<AlternativeAnswersProps> = ({ onSelect, onOpenSearch, isOpen, onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState('');

  if (!isOpen) return null;

  const handleGenerate = () => {
    onGenerate(prompt);
    setPrompt('');
  };

  return (
    <div className="w-96 border-l border-gray-200 bg-white flex flex-col h-full animate-in slide-in-from-right duration-300 absolute right-0 top-0 bottom-0 z-20 shadow-xl">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-gray-900 font-semibold">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h3>Suggested Language</h3>
        </div>
        <div className="flex items-center gap-1">
            <div className="flex items-center border border-gray-200 rounded px-2 py-0.5 text-xs text-gray-500 bg-gray-50">
                <span>1</span>
                <span className="mx-2 text-gray-300">|</span>
                <span>2</span>
            </div>
            <button className="p-1.5 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full">
                <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
            <button onClick={onClose} className="ml-2 p-1.5 hover:bg-gray-100 rounded-full">
                <X className="w-4 h-4 text-gray-500" />
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
         {/* Search Bar / Trigger */}
         <div className="relative">
            <button 
                onClick={onOpenSearch}
                className="w-full text-left px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-purple-300 hover:ring-1 hover:ring-purple-100 transition-all flex items-center justify-between group"
            >
                <span className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Search Answer Bank...
                </span>
                <span className="text-xs bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-400 group-hover:text-purple-500">⌘K</span>
            </button>
         </div>

         {/* List of alternatives */}
         <div className="space-y-4">
            {MOCK_ALTERNATIVES.map((alt) => (
                <div key={alt.id} className="group border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-sm transition-all bg-white relative">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide line-through decoration-gray-300 decoration-1 text-opacity-50 group-hover:no-underline group-hover:text-purple-600 transition-colors">
                            {alt.source}
                        </span>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                                <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 text-sm mb-2 leading-snug">
                       {alt.text.length > 60 ? alt.text.substring(0, 60) + "..." : alt.text}
                    </h4>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {alt.text}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                        <div className="flex gap-2">
                            {alt.tags && alt.tags.map(tag => (
                                <Badge key={tag} variant="purple" className="text-[10px] px-1.5 py-0.5 h-5">
                                    <Sparkles className="w-2.5 h-2.5 mr-1" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <button 
                            onClick={() => onSelect(alt.text)}
                            className="text-xs font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded transition-colors"
                        >
                            Apply <Check className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            ))}
         </div>
      </div>
      
      {/* Bot Generation Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                <Sparkles className="w-3 h-3 text-purple-500" />
                <span>AI Generator</span>
            </div>
            <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                placeholder="(Optional) Describe changes to improve this suggestion"
                className="w-full text-sm resize-none focus:outline-none text-gray-700 placeholder:text-gray-400 h-16"
            />
            <div className="flex justify-end mt-2">
                <button 
                  onClick={handleGenerate}
                  className="bg-white border border-gray-200 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-md hover:bg-purple-50 border-purple-100 flex items-center gap-1.5 shadow-sm transition-all"
                >
                    <Sparkles className="w-3 h-3" />
                    Generate
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
