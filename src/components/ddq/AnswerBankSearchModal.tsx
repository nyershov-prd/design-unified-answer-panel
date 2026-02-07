import React, { useState } from 'react';
import { Search, X, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, FileText, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';

interface AnswerBankResult {
  id: string;
  question: string;
  answerPreview: string;
  fullAnswer: string;
  source: string;
  tags: string[];
  lastUsed: string;
  matchScore: number;
}

interface AnswerBankSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (answerText: string) => void;
}

const MOCK_RESULTS: AnswerBankResult[] = [
  { 
    id: '1', 
    question: 'Please provide a brief history of the firm.', 
    answerPreview: 'Founded in 2018, Pinetree Financial Group is a private equity firm that has strategically focused on...', 
    fullAnswer: 'Founded in 2018, Pinetree Financial Group is a private equity firm that has strategically focused on lower- and mid-market opportunities throughout our operating history. Our development has been marked by a consistent adherence to our core principles while adapting to market demands.',
    source: 'DDQ 2024 Q4', 
    tags: ['History', 'Firm Overview'], 
    lastUsed: '2/1/2026',
    matchScore: 98
  },
  { 
    id: '2', 
    question: 'Describe your investment philosophy.', 
    answerPreview: 'Our core investment philosophy centers on value-oriented buyouts with a focus on operational efficiency...', 
    fullAnswer: 'Our core investment philosophy centers on value-oriented buyouts with a focus on operational efficiency. We believe in partnering with management teams to drive sustainable growth.',
    source: 'RFP - State Pension', 
    tags: ['Investment', 'Philosophy'], 
    lastUsed: '1/15/2026',
    matchScore: 85
  },
  { 
    id: '3', 
    question: 'How has the firm evolved since inception?', 
    answerPreview: 'Since 2018, we have expanded our sector focus and introduced new risk management frameworks...', 
    fullAnswer: 'Since 2018, we have expanded our sector focus and introduced new risk management frameworks. This evolution reflects our commitment to continuous improvement and delivering value to our investors.',
    source: 'DDQ 2023', 
    tags: ['History', 'Evolution'], 
    lastUsed: '11/20/2025',
    matchScore: 82
  },
  { 
    id: '4', 
    question: 'List key milestones in the firm\'s history.', 
    answerPreview: '2018: Founded. 2020: First Fund Closed. 2022: Sector Rotation Framework introduced.', 
    fullAnswer: '2018: Founded. 2020: First Fund Closed ($500M). 2022: Sector Rotation Framework introduced. 2024: Expanded into European markets.',
    source: 'Marketing Deck', 
    tags: ['Milestones'], 
    lastUsed: '10/05/2025',
    matchScore: 75
  },
];

export const AnswerBankSearchModal: React.FC<AnswerBankSearchModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleApply = () => {
    if (selectedId) {
      const selected = MOCK_RESULTS.find(r => r.id === selectedId);
      if (selected) {
        onSelect(selected.fullAnswer);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
              <h2 className="text-xl font-semibold text-gray-900">Search Answer Bank</h2>
              <p className="text-sm text-gray-500 mt-1">Select a past answer to add as a new candidate.</p>
          </div>
          <div className="flex items-center gap-3 w-full max-w-md mx-4">
             <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search questions or answers..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  autoFocus
                />
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-white border-gray-200 hover:border-purple-300 cursor-pointer">Source: DDQ</Badge>
                  <Badge variant="secondary" className="bg-white border-gray-200 hover:border-purple-300 cursor-pointer">Year: 2024+</Badge>
              </div>
          </div>
          <span className="text-xs text-gray-500 font-medium">{MOCK_RESULTS.length} results found</span>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-auto bg-gray-50/30">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10 text-xs uppercase text-gray-500 font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-3 w-12 border-b border-gray-100"></th>
                <th className="px-6 py-3 border-b border-gray-100 w-1/3">Question</th>
                <th className="px-6 py-3 border-b border-gray-100">Answer Preview</th>
                <th className="px-6 py-3 border-b border-gray-100 w-32">Source</th>
                <th className="px-6 py-3 border-b border-gray-100 text-right w-32">Last Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {MOCK_RESULTS.map((item) => (
                <tr 
                  key={item.id} 
                  className={cn(
                    "hover:bg-purple-50/30 transition-colors cursor-pointer group",
                    selectedId === item.id && "bg-purple-50/60"
                  )}
                  onClick={() => setSelectedId(item.id)}
                >
                  <td className="px-6 py-4">
                    <div className={cn(
                      "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                      selectedId === item.id 
                        ? "border-purple-600 bg-purple-600 ring-2 ring-purple-100" 
                        : "border-gray-300 bg-white group-hover:border-purple-400"
                    )}>
                      {selectedId === item.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="font-medium text-gray-900 line-clamp-2 mb-1">{item.question}</div>
                    <div className="flex gap-1 flex-wrap">
                        {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">
                        {item.answerPreview}
                    </p>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-center gap-1.5 text-gray-700">
                        <FileText className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate max-w-[100px]" title={item.source}>{item.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right align-top text-gray-500 tabular-nums">
                    {item.lastUsed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4 text-sm text-gray-500">
             <span className="text-sm text-gray-500">Page 1 of 1</span>
          </div>
          
          <div className="flex items-center gap-3">
             <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
               Cancel
             </button>
             <button 
                onClick={handleApply}
                disabled={!selectedId}
                className="px-4 py-2 bg-purple-600 rounded-lg text-sm font-medium text-white hover:bg-purple-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
               Add Answer <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
