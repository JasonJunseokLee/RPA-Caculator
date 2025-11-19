import React from 'react';
import { useCalculatorStore } from '../store/useCalculatorStore';
import { ScenarioType } from '../types';
import { clsx } from 'clsx';

export const ScenarioToggle: React.FC = () => {
  const { activeScenario, setScenario } = useCalculatorStore();

  const scenarios: { id: ScenarioType; label: string; color: string }[] = [
    { id: 'conservative', label: '보수적 시나리오', color: 'bg-slate-500' },
    { id: 'standard', label: '표준 시나리오', color: 'bg-primary' },
    { id: 'optimistic', label: '낙관적 시나리오', color: 'bg-secondary' },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-slate-100 p-1 rounded-xl inline-flex">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => setScenario(s.id)}
            className={clsx(
              "px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              activeScenario === s.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};
