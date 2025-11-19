import React, { useState } from 'react';
import { clsx } from 'clsx';

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value,
  onChange,
  description
}) => {
  const [useMillions, setUseMillions] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-digit and non-decimal characters
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    const numValue = parseFloat(rawValue) || 0;
    
    if (useMillions) {
      onChange(numValue * 1000000);
    } else {
      onChange(numValue);
    }
  };

  const formatValue = (val: number) => {
    if (useMillions) {
      const millions = val / 1000000;
      return millions.toLocaleString('ko-KR', { maximumFractionDigits: 2 });
    } else {
      return val.toLocaleString('ko-KR');
    }
  };

  const displayValue = formatValue(value);

  return (
    <div className="space-y-2 p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <button
          onClick={() => setUseMillions(!useMillions)}
          className="text-xs px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors"
        >
          {useMillions ? '백만원' : '원'}
        </button>
      </div>
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          className="w-full pl-8 pr-16 py-2 text-right font-mono text-sm font-semibold text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 pointer-events-none">
          ₩
        </span>
        <span className={clsx(
          "absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium pointer-events-none transition-colors",
          useMillions ? "text-primary" : "text-slate-400"
        )}>
          {useMillions ? '백만' : 'KRW'}
        </span>
      </div>
      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
};
