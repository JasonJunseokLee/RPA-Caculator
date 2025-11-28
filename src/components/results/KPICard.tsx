import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Info } from 'lucide-react';
import { formatKoreanCurrency } from '../../utils/formatters';
import { FormulaPopup } from '../FormulaPopup';

interface KPICardProps {
  title: string;
  value: string | number;
  subtext: string;
  type?: 'roi' | 'payback' | 'profit' | 'neutral' | 'danger';
  suffix?: string;
  prefix?: string;
  formulas?: string[];
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtext,
  type = 'neutral',
  suffix = '',
  prefix = '',
  formulas
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const numericValue = typeof value === 'number' ? value : parseFloat(value as string);

  useEffect(() => {
    // Simple count up animation
    const duration = 1000;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= numericValue) || (increment < 0 && current <= numericValue)) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [numericValue]);

  // Format value based on type
  let formattedValue: string;
  if (type === 'profit' && prefix === '₩') {
    // For profit cards with currency, use Korean formatting
    formattedValue = formatKoreanCurrency(displayValue * 1000000); // Convert back from millions
  } else if (typeof value === 'number') {
    formattedValue = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(displayValue);
  } else {
    formattedValue = value;
  }

  const getGradient = () => {
    switch (type) {
      case 'roi': return 'from-blue-500 to-blue-600';
      case 'payback': return 'from-emerald-500 to-emerald-600';
      case 'profit': return 'from-violet-500 to-violet-600';
      case 'danger': return 'from-red-500 to-red-600';
      default: return 'from-slate-700 to-slate-800';
    }
  };

  return (
    <>
      <div className={clsx(
        "relative overflow-hidden rounded-2xl p-6 text-white shadow-lg transition-transform hover:scale-[1.02]",
        `bg-gradient-to-br ${getGradient()}`
      )}>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-medium text-white/80">{title}</h3>
            {formulas && formulas.length > 0 && (
              <button
                onClick={() => setIsFormulaOpen(true)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors group"
                aria-label="계산식 보기"
              >
                <Info className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
              </button>
            )}
          </div>
          <div className="text-4xl font-bold mb-2 tracking-tight">
            {type === 'profit' && prefix === '₩' ? formattedValue : `${prefix}${formattedValue}${suffix}`}
          </div>
          <p className="text-xs text-white/60">{subtext}</p>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-black/10 rounded-full blur-xl"></div>
      </div>

      {/* Formula Popup */}
      {formulas && formulas.length > 0 && (
        <FormulaPopup
          isOpen={isFormulaOpen}
          onClose={() => setIsFormulaOpen(false)}
          title={`${title} 계산식`}
          formulas={formulas}
        />
      )}
    </>
  );
};
