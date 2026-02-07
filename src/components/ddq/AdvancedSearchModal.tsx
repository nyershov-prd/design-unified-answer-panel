import React, { useState } from 'react';
import { Search, X, Filter, FileText, CheckCircle, Circle, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchResult {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'msg' | 'xls';
  submission: string;
  submissionStatus: 'approved' | 'pending';
  uploadedBy: string;
  uploadedEmail: string;
  uploadedOn: string;
}

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedIds: string[]) => void;
}

const MOCK_RESULTS: SearchResult[] = [
  { id: '1', name: '25.10.08 Valstone Materials vS.pdf', type: 'pdf', submission: 'VGO Drawdown - Q4 2025 Q Letter Draft_v...', submissionStatus: 'approved', uploadedBy: 'George Fang', uploadedEmail: 'gfang@norm.ai', uploadedOn: '2/1/2026' },
  { id: '2', name: 'RE_ Request for Review - Q4\'25 Quarterly L... .msg', type: 'msg', submission: 'VGO Drawdown - Q4 2025 Q Letter Draft_v...', submissionStatus: 'approved', uploadedBy: 'George Fang', uploadedEmail: 'gfang@norm.ai', uploadedOn: '2/1/2026' },
  { id: '3', name: 'Pinetree Portfolio Spotlight.pdf', type: 'pdf', submission: 'Pinetree Demo Deck 2', submissionStatus: 'pending', uploadedBy: 'George Fang', uploadedEmail: 'gfang@norm.ai', uploadedOn: '2/1/2026' },
  { id: '4', name: 'PineTree_Investment_Partners_Memo.pdf', type: 'pdf', submission: 'Pinetree Demo Deck 2', submissionStatus: 'pending', uploadedBy: 'George Fang', uploadedEmail: 'gfang@norm.ai', uploadedOn: '2/1/2026' },
  { id: '5', name: 'document (5).xlsx', type: 'xls', submission: '4Q2025 Q-letter distribution - email langua...', submissionStatus: 'pending', uploadedBy: 'Ethan Lavin', uploadedEmail: 'ethan.lavin@norm.ai', uploadedOn: '1/29/2026' },
  { id: '6', name: 'Acuren Announces Company Rebrand to ...e....com', type: 'msg', submission: 'VGO Drawdown - Q4 2025 Q Letter Draft_v...', submissionStatus: 'pending', uploadedBy: 'Ethan Lavin', uploadedEmail: 'ethan.lavin@norm.ai', uploadedOn: '1/22/2026' },
  { id: '7', name: '12_11_2025 Viking On-site Recap (1).pdf', type: 'pdf', submission: 'VGO Drawdown - Q4 2025 Q Letter Draft_v...', submissionStatus: 'pending', uploadedBy: 'Ethan Lavin', uploadedEmail: 'ethan.lavin@norm.ai', uploadedOn: '1/21/2026' },
];

export const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'doc': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'xls': return <FileText className="w-5 h-5 text-green-500" />;
      case 'msg': return <FileText className="w-5 h-5 text-indigo-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Advanced Search</h2>
          <div className="flex items-center gap-3 w-full max-w-md mx-4">
             <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for supporting materials..." 
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
             </div>
             <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <SlidersHorizontal className="w-4 h-4 text-gray-600" />
             </button>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-gray-50/50">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Display
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 sticky top-0 z-10 text-xs uppercase text-gray-500 font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-3 w-12">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded sm:rounded-sm"></div>
                </th>
                <th className="px-6 py-3">Document</th>
                <th className="px-6 py-3">Submissions</th>
                <th className="px-6 py-3">Uploaded By</th>
                <th className="px-6 py-3 text-right">Uploaded On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_RESULTS.map((item) => (
                <tr 
                  key={item.id} 
                  className={cn(
                    "hover:bg-gray-50 transition-colors cursor-pointer",
                    selected.has(item.id) && "bg-purple-50/50"
                  )}
                  onClick={() => toggleSelection(item.id)}
                >
                  <td className="px-6 py-4">
                    <div className={cn(
                      "w-4 h-4 border rounded flex items-center justify-center transition-colors",
                      selected.has(item.id) ? "bg-purple-600 border-purple-600" : "border-gray-300 bg-white"
                    )}>
                      {selected.has(item.id) && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getIconForType(item.type)}
                      <span className="font-medium text-gray-900 truncate max-w-[240px]" title={item.name}>{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.submissionStatus === 'approved' ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      )}
                      <span className="text-gray-600 truncate max-w-[200px]" title={item.submission}>{item.submission}</span>
                      {item.submission.length > 20 && (
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">+1</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                        item.uploadedBy.includes('George') ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"
                      )}>
                        {item.uploadedBy.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{item.uploadedBy}</span>
                        <span className="text-gray-500 text-xs">{item.uploadedEmail}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-500 tabular-nums">
                    {item.uploadedOn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4 text-sm text-gray-500">
             <div className="flex items-center gap-2">
                <span>Entries per page:</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500">
                  <option>25</option>
                  <option>50</option>
                </select>
             </div>
             <span>452 total results</span>
          </div>
          
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500">Page 1 of 19</span>
             <div className="flex items-center gap-1">
               <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">
                 <ChevronLeft className="w-4 h-4 text-gray-600" />
               </button>
               <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50">
                 <ChevronRight className="w-4 h-4 text-gray-600" />
               </button>
             </div>
          </div>
        </div>

        {/* Selection Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50">
           <span className="text-sm text-gray-600 font-medium">
             {selected.size} item(s) selected
           </span>
           <div className="flex items-center gap-3">
             <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
               Cancel
             </button>
             <button 
                onClick={() => onSelect(Array.from(selected))}
                className="px-4 py-2 bg-gray-900 rounded-lg text-sm font-medium text-white hover:bg-gray-800 shadow-sm transition-colors"
              >
               Select ({selected.size})
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
