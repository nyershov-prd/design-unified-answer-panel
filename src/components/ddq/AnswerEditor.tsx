"use client";

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { 
    Check, 
    Pencil, 
    BookOpen, 
    Sparkles, 
    FileText, 
    Building2, 
    Info, 
    ChevronDown, 
    Copy, 
    Maximize2, 
    Wand2,
    AlignLeft,
    Minimize2,
    X,
    ChevronLeft,
    ChevronRight,
    Search
} from 'lucide-react';

interface AnswerEditorProps {
  value: string;
  onChange: (value: string) => void;
  isApplied: boolean;
  onApply: () => void;
  
  // Navigation props
  currentCount?: number;
  totalCount?: number;
  onNext?: () => void;
  onPrev?: () => void;
  
  // Action props
  onSearchClick?: () => void;
  onAIClick?: () => void;
}

export const AnswerEditor: React.FC<AnswerEditorProps> = ({ 
    value, 
    onChange, 
    isApplied, 
    onApply,
    currentCount = 1,
    totalCount = 3,
    onNext,
    onPrev,
    onSearchClick,
    onAIClick
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Mock AI actions
  const handleAIAction = (action: 'concise' | 'expand' | 'formal') => {
      if (action === 'concise') onChange(value.split(' ').slice(0, value.split(' ').length - 5).join(' ') + "...");
      if (action === 'expand') onChange(value + " Additionally, we have consistently demonstrated strong performance in this sector.");
      if (action === 'formal') onChange(value.replace("We've", "We have").replace("it's", "it is"));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Header Bar matching screenshot */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
             {/* Left side empty or status indicator if needed, sticking to design which pushed 'Answers X of Y' to the left? 
                Wait, the screenshot shows "Answers 1 of 3 < > | [copy] [search] [sparkles]" aligned to the RIGHT or maybe that WAS the whole header?
                Actually looking at the crop, it looks like a toolbar. Let's put it on the right side if the left has "Answer".
                But the user crop just shows that section. I'll replace the right side controls with this exact layout.
             */}
             <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Check className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-gray-900">Answer</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
            {/* Navigation Section */}
            <div className="flex items-center gap-3">
                <span className="text-gray-500 font-medium">Answers {currentCount} of {totalCount}</span>
                <div className="flex items-center gap-1">
                    <button 
                        onClick={onPrev}
                        className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-700 transition-colors"
                        title="Previous answer"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={onNext}
                        className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-700 transition-colors"
                        title="Next answer"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="h-5 w-px bg-gray-200 mx-1"></div>

            {/* Actions Section */}
            <div className="flex items-center gap-1">
                <button 
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy to clipboard"
                    onClick={() => navigator.clipboard.writeText(value)}
                >
                    <Copy className="w-4 h-4" />
                </button>
                <button 
                    onClick={onSearchClick}
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                    title="Search Answer Bank"
                >
                    <Search className="w-4 h-4" />
                </button>
                <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Star button clicked, onAIClick:', onAIClick);
                      if (onAIClick) {
                        onAIClick();
                      } else {
                        console.warn('onAIClick is not defined!');
                      }
                    }}
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-purple-600 transition-colors group cursor-pointer"
                    title="AI Assistance"
                    style={{ pointerEvents: 'auto' }}
                >
                    <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                </button>
            </div>
        </div>
      </div>

      <div className="p-6 relative group">
        
        <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-gray-500">
                Edited by <span className="font-medium text-gray-900">Will Berg</span> • November 17, 2025, 1:37 PM
            </div>
            
            {/* Action Button */}
            <div>
                 {isApplied ? (
                    <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-md text-sm font-medium border border-gray-200">
                        <Check className="w-4 h-4" />
                        Answer applied
                    </div>
                 ) : (
                    <button 
                        onClick={onApply}
                        className="bg-[#2400FF] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Apply answer
                    </button>
                 )}
            </div>
        </div>

        {/* Text Area */}
        <div className="relative">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full min-h-[180px] text-base leading-relaxed text-gray-800 resize-none focus:outline-none bg-transparent"
                placeholder="Type your answer here..."
            />
            
            {/* AI Floating Toolbar - Visible when focused or hovered */}
            <div className={cn(
                "absolute top-2 right-2 flex gap-1 bg-white shadow-lg border border-gray-100 rounded-lg p-1 transition-opacity duration-200",
                isFocused ? "opacity-100" : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
            )}>
                <button onClick={() => handleAIAction('concise')} className="p-1.5 hover:bg-gray-50 rounded text-gray-500 hover:text-purple-600 text-xs flex items-center gap-1" title="Make concise">
                    <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleAIAction('expand')} className="p-1.5 hover:bg-gray-50 rounded text-gray-500 hover:text-purple-600 text-xs flex items-center gap-1" title="Expand">
                    <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleAIAction('formal')} className="p-1.5 hover:bg-gray-50 rounded text-gray-500 hover:text-purple-600 text-xs flex items-center gap-1" title="Fix formatting">
                    <Wand2 className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>

        {/* Evidence / Metadata Chips */}
        <div className="flex flex-wrap gap-2 mt-4">
            <div className="group relative inline-flex">
                <Badge variant="outline" className="text-gray-600 pr-5" icon={<BookOpen className="w-3 h-3" />}>
                    Answer Bank
                </Badge>
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-2.5 h-2.5" />
                </button>
            </div>
            
            <div className="group relative inline-flex">
                <Badge variant="outline" className="text-gray-600 pr-5" icon={<Sparkles className="w-3 h-3" />}>
                    AI generated
                </Badge>
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-2.5 h-2.5" />
                </button>
            </div>

            <div className="group relative inline-flex">
                <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-100 pr-6" icon={<FileText className="w-3 h-3 text-purple-600" />}>
                    DDQ_Past 1.docx <span className="ml-1 bg-purple-200 text-purple-800 px-1 rounded text-[10px]">2</span>
                </Badge>
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-purple-400 hover:bg-purple-100 hover:text-purple-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-2.5 h-2.5" />
                </button>
            </div>
        </div>

        {/* Entity Chips */}
        <div className="flex flex-wrap gap-2 mt-3">
             {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded px-2 py-1 text-xs text-gray-600">
                    <Building2 className="w-3 h-3 text-gray-400" />
                    Entity (TBD)
                 </div>
             ))}
        </div>

      </div>
    </div>
  );
};
