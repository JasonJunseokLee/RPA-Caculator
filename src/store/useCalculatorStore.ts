import { create } from 'zustand';
import { CalculatorInputs, CalculationResults, ScenarioType, SCENARIO_PRESETS } from '../types';
import { calculateROI } from '../utils/calculator';

interface CalculatorState {
  inputs: CalculatorInputs;
  results: CalculationResults;
  activeScenario: ScenarioType;
  
  setInputValue: (key: keyof CalculatorInputs, value: number) => void;
  setScenario: (scenario: ScenarioType) => void;
  calculate: () => void;
}

const INITIAL_INPUTS: CalculatorInputs = {
  numEmployees: 1,
  avgSalary: 40000000,
  annualWorkload: 6000, // 500 monthly × 12
  utilizationRate: 100,
  errorRate: 1,
  avgErrorCost: 10000,
  processingTime: 10 / 60, // 10 minutes converted to hours
  
  monthlyLicensePerBot: 400000,
  numBots: 3,
  developmentCost: 3000000,
  consultingCost: 0,
  automationRate: 100,
  errorReductionRate: 95,
};

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  inputs: INITIAL_INPUTS,
  results: calculateROI(INITIAL_INPUTS),
  activeScenario: 'standard',

  setInputValue: (key, value) => {
    const currentInputs = get().inputs;
    const newInputs = { ...currentInputs, [key]: value };

    set({
      inputs: newInputs,
    });
  },

  setScenario: (scenario) => {
    const currentInputs = get().inputs;
    const scenarioPreset = SCENARIO_PRESETS[scenario];
    const newInputs = { ...currentInputs, ...scenarioPreset };

    set({
      activeScenario: scenario,
      inputs: newInputs,
    });
  },

  calculate: () => {
    const currentInputs = get().inputs;
    set({
      results: calculateROI(currentInputs),
    });
  },
}));
