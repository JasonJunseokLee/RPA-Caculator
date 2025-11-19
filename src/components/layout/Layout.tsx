import React from 'react';
import { Calculator } from 'lucide-react';
import { ExportButton } from '../ExportButton';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg shadow-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  INVAIZ RPA Calculator
                </h1>
                <p className="text-sm text-slate-500">투자 수익률 분석 도구</p>
              </div>
            </div>
            <ExportButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-500">
            <p className="font-semibold text-slate-700">© 2025 INVAIZ. All rights reserved.</p>
            <p className="mt-1">RPA 솔루션 및 자동화 컨설팅 문의: RPA@invaiz.com</p>
            <p className="mt-1 text-xs">본 계산기는 예상 수치를 제공하며, 실제 결과는 상황에 따라 다를 수 있습니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
