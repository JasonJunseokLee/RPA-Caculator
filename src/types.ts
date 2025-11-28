export type ScenarioType = 'conservative' | 'standard' | 'optimistic';

export interface CalculatorInputs {
  // Current State
  numEmployees: number;
  avgSalary: number; // Annual, in KRW
  annualWorkload: number; // Number of tasks
  utilizationRate: number; // Percentage (0-100)
  errorRate: number; // Percentage (0-100)
  avgErrorCost: number; // Direct financial loss per error
  processingTime: number; // Hours per task

  // RPA Investment
  monthlyLicensePerBot: number; // Monthly cost per bot
  numBots: number;
  developmentCost: number; // One-time
  consultingCost: number; // One-time
  automationRate: number; // Percentage (0-100)
  errorReductionRate: number; // Percentage (0-100)
}

export interface CalculationResults {
  // Financials
  initialInvestment: number;
  annualOperatingCost: number;
  
  // Savings
  annualLaborSavings: number;
  annualErrorSavings: number;
  totalAnnualSavings: number;
  
  // Workload Analysis
  totalAnnualWorkHours: number;
  fteEquivalent: number;
  currentAnnualLaborCost: number;
  
  // ROI Metrics
  year1NetBenefit: number;
  year1ROI: number;
  year3ROI: number;
  year5ROI: number;
  paybackPeriodMonths: number;
  
  // 3 Year Projection
  total3YearCost: number;
  total3YearSavings: number;
  total3YearProfit: number;
  
  // 5 Year Projection
  total5YearCost: number;
  total5YearSavings: number;
  total5YearProfit: number;
  
  requiredFTE: number;
  inputFTE: number;
  
  // Monthly Cashflow for Chart
  monthlyCashFlow: {
    month: number;
    cumulativeCost: number;
    cumulativeSavings: number;
    netCashFlow: number;
  }[];
}

export const SCENARIO_PRESETS: Record<ScenarioType, Partial<CalculatorInputs>> = {
  conservative: {
    automationRate: 30,
    errorReductionRate: 60,
  },
  standard: {
    automationRate: 50,
    errorReductionRate: 80,
  },
  optimistic: {
    automationRate: 70,
    errorReductionRate: 90,
  },
};

