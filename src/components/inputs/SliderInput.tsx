import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { clsx } from 'clsx';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  description?: string;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  description
}) => {
  return (
    <div className="space-y-3 p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-16 text-right text-sm font-semibold text-primary outline-none"
          />
          <span className="text-xs text-slate-400">{unit}</span>
        </div>
      </div>
      
      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[value]}
        max={max}
        min={min}
        step={step}
        onValueChange={(vals) => onChange(vals[0])}
      >
        <SliderPrimitive.Track className="bg-slate-200 relative grow rounded-full h-[3px]">
          <SliderPrimitive.Range className="absolute bg-primary rounded-full h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block w-5 h-5 bg-white border-2 border-primary shadow-md rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-transform"
          aria-label={label}
        />
      </SliderPrimitive.Root>

      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
};
