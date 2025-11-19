import React from 'react';
import { Download } from 'lucide-react';

export const ExportButton: React.FC = () => {
  const handleExport = () => {
    // PDF export functionality will be implemented
    window.print();
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:from-blue-700 hover:to-violet-700 transition-all shadow-md hover:shadow-lg"
    >
      <Download className="w-4 h-4" />
      <span className="text-sm font-medium">PDF 내보내기</span>
    </button>
  );
};
