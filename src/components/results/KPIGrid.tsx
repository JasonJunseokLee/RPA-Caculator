import React from 'react';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { KPICard } from './KPICard';

export const KPIGrid: React.FC = () => {
  const { results } = useCalculatorStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <KPICard
        title="ROI (1년차)"
        value={results.year1ROI}
        suffix="%"
        subtext="투자 대비 수익률"
        type="roi"
      />
      <KPICard
        title="투자 회수 기간"
        value={results.paybackPeriodMonths}
        suffix="개월"
        subtext="손익분기점 도달 소요"
        type="payback"
      />
      <KPICard
        title="순이익 (1년차)"
        value={results.year1NetBenefit / 1000000}
        prefix="₩"
        suffix="백만"
        subtext="운영 비용 제외 후"
        type="profit"
      />
      <KPICard
        title="연간 총 절감액"
        value={results.totalAnnualSavings / 1000000}
        prefix="₩"
        suffix="백만"
        subtext="인건비 + 오류 절감"
        type="profit"
      />
    </div>
  );
};
