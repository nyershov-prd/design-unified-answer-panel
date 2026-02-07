import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] p-4 md:p-8 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};
