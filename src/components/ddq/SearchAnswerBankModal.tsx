"use client";

import React, { useState } from 'react';
import { X, Search, Filter } from 'lucide-react';

interface SearchAnswerBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (answerId: string) => void;
}

const MOCK_ANSWERS = [
  {
    id: '1',
    question: 'Please provide a brief history of the firm.',
    answer: 'Founded in 2018, Pinetree Financial Group is a private equity firm that has strategically focused on...',
    tags: ['History', 'Firm Overview'],
    source: 'DDQ 2024 Q4',
    lastUsed: '2/1/2026'
  },
  {
    id: '2',
    question: 'Describe your investment philosophy.',
    answer: 'Our core investment philosophy centers on value-oriented buyouts with a focus on operational efficiency...',
    tags: ['Investment', 'Philosophy'],
    source: 'RFP - State P...',
    lastUsed: '1/15/2026'
  },
  {
    id: '3',
    question: 'How has the firm evolved since inception?',
    answer: 'Since 2018, we have expanded our sector focus and introduced new risk management frameworks...',
    tags: ['History', 'Evolution'],
    source: 'DDQ 2023',
    lastUsed: '11/20/2025'
  },
  {
    id: '4',
    question: "List key milestones in the firm's history.",
    answer: '2018: Founded. 2020: First Fund Closed. 2022: Sector Rotation Framework introduced.',
    tags: ['Milestones'],
    source: 'Marketing De...',
    lastUsed: '10/05/2025'
  }
];

export const SearchAnswerBankModal: React.FC<SearchAnswerBankModalProps> = ({
  isOpen,
  onClose,
  onSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const filteredAnswers = MOCK_ANSWERS.filter(answer =>
    answer.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    answer.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleAddAnswer = () => {
    if (selectedIds.length > 0) {
      onSelect(selectedIds[0]); // For demo, just use the first selected
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Overlay */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col mx-4">
        {/* Header */}
        <div className="px-8 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Search Answer Bank</h2>
              <p className="text-sm text-gray-500 mt-1">Select a past answer to add as a new candidate.</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          {/* Search Bar - Centered and Prominent */}
          <div className="relative max-w-2xl mx-auto mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or answers..."
              className="w-full pl-12 pr-4 py-3 border-2 border-purple-400 rounded-lg focus:outline-none focus:border-purple-500 text-sm shadow-sm"
            />
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
            <div className="px-3 py-1.5 text-xs bg-white text-gray-600 border border-gray-200 rounded-md">
              Source: DDQ
            </div>
            <div className="px-3 py-1.5 text-xs bg-white text-gray-600 border border-gray-200 rounded-md">
              Year: 2024+
            </div>
            <div className="ml-auto text-xs text-gray-500">{filteredAnswers.length} results found</div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-8">
          <table className="w-full">
            <thead className="bg-gray-50 border-y border-gray-200 sticky top-0">
              <tr>
                <th className="w-8 px-4 py-3"></th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Question</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Answer Preview</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Last Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredAnswers.map((answer) => (
                <tr 
                  key={answer.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleSelect(answer.id)}
                >
                  <td className="px-4 py-4">
                    <input
                      type="radio"
                      checked={selectedIds.includes(answer.id)}
                      onChange={() => handleSelect(answer.id)}
                      className="w-4 h-4 accent-purple-600"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900 mb-2">{answer.question}</div>
                    <div className="flex gap-1.5">
                      {answer.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 max-w-md">
                    <div className="line-clamp-2">{answer.answer}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span className="inline-block w-3 h-3 bg-gray-300 rounded"></span>
                      {answer.source}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{answer.lastUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
          <div className="text-xs text-gray-400">Page 1 of 1</div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAnswer}
              disabled={selectedIds.length === 0}
              className="px-5 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Add Answer
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
