import { CalculatorInputs, CalculationResults } from '../types';

export const calculateROI = (inputs: CalculatorInputs): CalculationResults => {
  // Constants
  const RETIREMENT_BENEFIT_RATE = 1.12;
  const MONTHS_PER_YEAR = 12;
  const HOURS_PER_MONTH = 160;


  // 1. Current State - Labor Cost Calculation
  const monthlySalaryWithRetirement = (inputs.avgSalary * RETIREMENT_BENEFIT_RATE) / MONTHS_PER_YEAR;
  const hourlyWage = monthlySalaryWithRetirement / HOURS_PER_MONTH;
  
  const monthlyWorkload = inputs.annualWorkload / MONTHS_PER_YEAR;

  // 2. RPA Investment Costs
  const annualLicenseCost = inputs.monthlyLicensePerBot * inputs.numBots * 12;
  // Initial investment = one-time costs only (development + consulting)
  // License cost is an annual operating expense, not initial investment
  const initialInvestment = inputs.developmentCost + inputs.consultingCost;
  // Annual operating cost = annual license cost only (no maintenance)
  const annualOperatingCost = annualLicenseCost;

  // 3. Automation Effects - Labor Savings
  // Labor savings = current labor cost - automation operating cost
  
  // Reverted to User Request: Use Headcount * Utilization for Labor Cost
  // Input FTE = Headcount * Utilization
  const inputFTE = inputs.numEmployees * (inputs.utilizationRate / 100);
  
  // Current annual labor cost = avgSalary × 1.12 (retirement) × Input FTE
  const currentAnnualLaborCost = inputs.avgSalary * RETIREMENT_BENEFIT_RATE * inputFTE;
  
  // Annual labor savings = what we save by replacing human labor with automation
  // Savings = current labor cost (Gross)
  // We will subtract operating cost later in the Net Benefit calculation
  const annualLaborSavings = currentAnnualLaborCost;

  // 4. Automation Effects - Error Reduction Savings
  // monthlyWorkload is already calculated above
  const monthlyErrorCount = monthlyWorkload * (inputs.errorRate / 100);
  
  // Errors reduced = current errors × error reduction rate × automation rate
  const reducedErrorCount = monthlyErrorCount * (inputs.errorReductionRate / 100) * (inputs.automationRate / 100);
  
  // Cost per error = rework labor cost + direct financial loss
  // LINKING PROCESSING TIME HERE: Use processing time as the rework time for errors
  // If processing time increases, the cost of fixing an error (rework) increases
  const reworkHours = inputs.processingTime; // Use processing time (hours) as rework time
  const errorCostPerOccurrence = (reworkHours * hourlyWage) + inputs.avgErrorCost;
  
  const monthlyErrorSavings = reducedErrorCount * errorCostPerOccurrence;
  const annualErrorSavings = monthlyErrorSavings * 12;

  const totalAnnualSavings = annualLaborSavings + annualErrorSavings;

  // 5. ROI Calculation (Year 1)
  // Year 1 Total Cost = Initial Investment + Annual Operating Cost
  const year1TotalCost = initialInvestment + annualOperatingCost;
  
  // Year 1 Net Profit = Total Annual Savings - Year 1 Total Cost
  const year1NetBenefit = totalAnnualSavings - annualOperatingCost; 
  
  // ROI (1년차) = ((연간총절감액 - 1년차총비용) / 1년차총비용) × 100
  const year1ROI = ((totalAnnualSavings - year1TotalCost) / year1TotalCost) * 100;

  // 6. Payback Period
  const monthlyNetBenefit = year1NetBenefit / 12;
  let paybackPeriodMonths = 0;
  if (monthlyNetBenefit > 0) {
    paybackPeriodMonths = initialInvestment / monthlyNetBenefit;
  } else {
    paybackPeriodMonths = -1; // Infinite/Never
  }

  // 7. 3 Year Cumulative
  const total3YearCost = initialInvestment + (annualOperatingCost * 3);
  const total3YearSavings = totalAnnualSavings * 3;
  const total3YearProfit = total3YearSavings - total3YearCost;
  const year3ROI = (total3YearProfit / total3YearCost) * 100;

  // 8. 5 Year Cumulative
  const total5YearCost = initialInvestment + (annualOperatingCost * 5);
  const total5YearSavings = totalAnnualSavings * 5;
  const total5YearProfit = total5YearSavings - total5YearCost;
  const year5ROI = (total5YearProfit / total5YearCost) * 100;

  // 9. Workload Analysis
  // Calculate Required FTE based on Workload
  const totalAnnualWorkHours = inputs.annualWorkload * inputs.processingTime;
  const requiredFTE = totalAnnualWorkHours / 1920; // 1920 hours per year per FTE
  const fteEquivalent = requiredFTE; // Alias for backward compatibility if needed

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
    total5YearCost,
    total5YearSavings,
    total5YearProfit,
    monthlyCashFlow,
    requiredFTE,
    inputFTE
  };
};
