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
        type={results.year1ROI < 0 ? 'danger' : 'roi'}
        formulas={[
          `ROI (1년차) = ((순이익 - 초기투자) / 초기투자) × 100

계산 과정:
1. 순이익 = 연간총절감액 - 연간운영비
2. 초기투자 = 개발비 + 컨설팅비 (일회성 비용만)
3. ROI = ((순이익 - 초기투자) / 초기투자) × 100

상세:
- 연간라이선스비 = 월라이선스 × 봇개수 × 12개월
- 연간운영비 = 연간라이선스비
- 연간총절감액 = 인건비절감 + 오류절감

참고:
- 1년차 총 비용 = 초기투자 + 연간운영비`
        ]}
      />
      <KPICard
        title="투자 회수 기간"
        value={results.paybackPeriodMonths < 0 ? "회수 불가" : results.paybackPeriodMonths}
        suffix={results.paybackPeriodMonths < 0 ? "" : "개월"}
        subtext={results.paybackPeriodMonths < 0 ? "투자 비용 회수 불가능" : "손익분기점 도달 소요"}
        type={results.paybackPeriodMonths < 0 ? 'danger' : 'payback'}
        formulas={[
          `투자 회수 기간 = 초기투자 / 월간순이익

계산 과정:
1. 월간순이익 = 연간순이익 / 12개월
2. 연간순이익 = 연간총절감액 - 연간운영비
3. 투자 회수 기간 = 초기투자 / 월간순이익

의미:
- 초기 투자금을 회수하는데 걸리는 시간
- 짧을수록 투자 효율이 높음
- 음수일 경우 회수 불가능 (적자)`
        ]}
      />
      <KPICard
        title="순이익 (1년차)"
        value={results.year1NetBenefit / 1000000}
        prefix="₩"
        suffix="백만"
        subtext="운영 비용 제외 후"
        type="profit"
        formulas={[
          `순이익 (1년차) = 연간총절감액 - 연간운영비

계산 과정:
1. 연간총절감액 = 인건비절감 + 오류절감
2. 연간운영비 = 연간라이선스비 + (연간라이선스비 × 20%)
3. 순이익 = 연간총절감액 - 연간운영비

참고:
- 초기투자(개발비, 컨설팅비)는 제외
- 실제 운영 중 발생하는 순수 이익
- 연간라이선스비 = 월라이선스 × 봇개수 × 12개월`
        ]}
      />
      <KPICard
        title="연간 총 절감액"
        value={results.totalAnnualSavings / 1000000}
        prefix="₩"
        suffix="백만"
        subtext="인건비 + 오류 절감"
        type="profit"
        formulas={[
          `연간 총 절감액 = 인건비절감 + 오류절감

인건비 절감:
- 현재연간인건비 = 평균연봉 × 1.12 × 인력수 × 활용률
  (활용률: 해당 업무에 할애하는 시간 비중)
- 인건비절감 = 현재연간인건비 × 자동화율
  (활용률이 적용된 인건비에서 자동화율만큼 절감)

오류 절감:
- 월간오류수 = (연간업무량/12) × 오류율
- 감소오류수 = 월간오류수 × 오류감소율 × 자동화율
- 오류당비용 = (재작업시간 × 시간당임금) + 건당손실액
- 오류절감 = 감소오류수 × 오류당비용 × 12개월`
        ]}
      />
    </div>
  );
};
