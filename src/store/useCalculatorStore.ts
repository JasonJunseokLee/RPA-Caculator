import { create } from 'zustand';
import { CalculatorInputs, CalculationResults, ScenarioType, ScaleType, SCENARIO_PRESETS, SCALE_PRESETS } from '../types';
import { calculateROI } from '../utils/calculator';

interface CalculatorState {
  inputs: CalculatorInputs;
  results: CalculationResults;
  activeScenario: ScenarioType;
  
  setInputValue: (key: keyof CalculatorInputs, value: number | ScaleType) => void;
  setScenario: (scenario: ScenarioType) => void;
  setScale: (scale: ScaleType) => void;
}

const INITIAL_INPUTS: CalculatorInputs = {
  numEmployees: 5,
  avgSalary: 50000000,
  annualWorkload: 5000,
  utilizationRate: 60,
  errorRate: 8,
  avgErrorCost: 10000,
  processingTime: 0.5,
  
  scale: 'medium',
  monthlyLicensePerBot: 1400000,
  numBots: 3,
  developmentCost: 24000000,
  consultingCost: 10000000,
  automationRate: 50,
  errorReductionRate: 80,
};

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  inputs: INITIAL_INPUTS,
  results: calculateROI(INITIAL_INPUTS),
  activeScenario: 'standard',

  setInputValue: (key, value) => {
    const currentInputs = get().inputs;
    const newInputs = { ...currentInputs, [key]: value };
    
    // If scale changes, update related fields
    if (key === 'scale') {
      const scalePreset = SCALE_PRESETS[value as ScaleType];
      Object.assign(newInputs, scalePreset);
    }

    set({
      inputs: newInputs,
      results: calculateROI(newInputs),
    });
  },

  setScenario: (scenario) => {
    const currentInputs = get().inputs;
    const scenarioPreset = SCENARIO_PRESETS[scenario];
    const newInputs = { ...currentInputs, ...scenarioPreset };

    set({
      activeScenario: scenario,
      inputs: newInputs,
      results: calculateROI(newInputs),
    });
  },

  setScale: (scale) => {
    get().setInputValue('scale', scale);
  },
}));
