import { CalculatorInputs, CalculationResults } from '../types';

export const calculateROI = (inputs: CalculatorInputs): CalculationResults => {
  // Constants
  const RETIREMENT_BENEFIT_RATE = 1.12;
  const MONTHS_PER_YEAR = 12;
  const HOURS_PER_MONTH = 160;
  const ERROR_REWORK_HOURS = 0.5;
  const ANNUAL_MAINTENANCE_PERCENT = 0.20;

  // 1. Current State - Labor Cost Calculation
  const monthlySalaryWithRetirement = (inputs.avgSalary * RETIREMENT_BENEFIT_RATE) / MONTHS_PER_YEAR;
  const hourlyWage = monthlySalaryWithRetirement / HOURS_PER_MONTH;
  
  const monthlyWorkload = inputs.annualWorkload / MONTHS_PER_YEAR;

  // 2. RPA Investment Costs
  const annualLicenseCost = inputs.monthlyLicensePerBot * inputs.numBots * 12;
  const initialInvestment = annualLicenseCost + inputs.developmentCost + inputs.consultingCost;
  const annualOperatingCost = annualLicenseCost * ANNUAL_MAINTENANCE_PERCENT;

  // 3. Automation Effects - Labor Savings
  // Current annual labor cost on this task = avgSalary × numEmployees × utilizationRate%
  const currentAnnualLaborCost = inputs.avgSalary * RETIREMENT_BENEFIT_RATE * inputs.numEmployees * (inputs.utilizationRate / 100);
  
  // When we automate X% of the workload, we can reduce X% of the labor cost
  const annualLaborSavings = currentAnnualLaborCost * (inputs.automationRate / 100);

  // 4. Automation Effects - Error Reduction Savings
  const monthlyErrorCount = monthlyWorkload * (inputs.errorRate / 100);
  
  // Errors reduced = current errors × error reduction rate × automation rate
  // (we only reduce errors on the automated portion)
  const reducedErrorCount = monthlyErrorCount * (inputs.errorReductionRate / 100) * (inputs.automationRate / 100);
  
  // Cost per error = rework labor cost + direct financial loss
  const errorCostPerOccurrence = (ERROR_REWORK_HOURS * hourlyWage) + inputs.avgErrorCost;
  const monthlyErrorSavings = reducedErrorCount * errorCostPerOccurrence;
  const annualErrorSavings = monthlyErrorSavings * 12;

  const totalAnnualSavings = annualLaborSavings + annualErrorSavings;

  // 5. ROI Calculation (Year 1)
  const year1NetBenefit = totalAnnualSavings - annualOperatingCost;
  const year1ROI = ((year1NetBenefit - initialInvestment) / initialInvestment) * 100;

  // 6. Payback Period
  const monthlyNetBenefit = year1NetBenefit / 12;
  let paybackPeriodMonths = 0;
  if (monthlyNetBenefit > 0) {
    paybackPeriodMonths = initialInvestment / monthlyNetBenefit;
  } else {
    paybackPeriodMonths = 999; // Infinite/Never
  }

  // 7. 3 Year Cumulative
  const total3YearCost = initialInvestment + (annualOperatingCost * 3);
  const total3YearSavings = totalAnnualSavings * 3;
  const total3YearProfit = total3YearSavings - total3YearCost;
  const roi3Year = (total3YearProfit / total3YearCost) * 100;
  const year3ROI = ((total3YearProfit - total3YearCost) / total3YearCost) * 100;

  // 8. 5 Year Cumulative
  const total5YearCost = initialInvestment + (annualOperatingCost * 5);
  const total5YearSavings = totalAnnualSavings * 5;
  const total5YearProfit = total5YearSavings - total5YearCost;
  const roi5Year = (total5YearProfit / total5YearCost) * 100;
  const year5ROI = ((total5YearProfit - total5YearCost) / total5YearCost) * 100;

  // 9. Workload Analysis
  const totalAnnualWorkHours = inputs.annualWorkload * inputs.processingTime;
  const fteEquivalent = totalAnnualWorkHours / 1920; // 1920 hours per year per FTE

  // 10. Monthly Cash Flow for Chart (60 months for 5-year view)
  const monthlyCashFlow = [];
  let cumulativeCost = initialInvestment;
  let cumulativeSavings = 0;

  for (let m = 1; m <= 60; m++) {
    cumulativeCost += (annualOperatingCost / 12);
    cumulativeSavings += (totalAnnualSavings / 12);
    
    monthlyCashFlow.push({
      month: m,
      cumulativeCost,
      cumulativeSavings,
      netCashFlow: cumulativeSavings - cumulativeCost
    });
  }

  return {
    initialInvestment,
    annualOperatingCost,
    annualLaborSavings,
    annualErrorSavings,
    totalAnnualSavings,
    totalAnnualWorkHours,
    fteEquivalent,
    currentAnnualLaborCost,
    year1NetBenefit,
    year1ROI,
    year3ROI,
    year5ROI,
    paybackPeriodMonths,
    total3YearCost,
    total3YearSavings,
    total3YearProfit,
    roi3Year,
    total5YearCost,
    total5YearSavings,
    total5YearProfit,
    roi5Year,
    monthlyCashFlow
  };
};
