import React, { useState } from 'react';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { Users, Clock, Coins, TrendingUp, TrendingDown, AlertCircle, AlertTriangle, Zap, Info } from 'lucide-react';
import { formatKoreanCurrency } from '../../utils/formatters';
import { FormulaPopup } from '../FormulaPopup';

export const WorkloadAnalysisCard: React.FC = () => {
  const { results, inputs } = useCalculatorStore();
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);

  const HOURS_PER_YEAR_PER_FTE = 1920;
  const requiredFTE = results.fteEquivalent;
  const currentFTE = inputs.numEmployees * (inputs.utilizationRate / 100);
  const utilizationGap = ((requiredFTE - currentFTE) / requiredFTE) * 100;
  
  const monthlyWorkload = Math.round(inputs.annualWorkload / 12);
  const processingTimeMinutes = Math.round(inputs.processingTime * 60);
  const annualErrorCount = Math.round(inputs.annualWorkload * inputs.errorRate / 100);
  const monthlyErrorCount = Math.round(annualErrorCount / 12);
  const totalErrorCost = annualErrorCount * inputs.avgErrorCost;
  const avgDailyWorkload = Math.round(monthlyWorkload / 22); // Assuming 22 working days
  
  // Determine status
  let status: 'overworked' | 'balanced' | 'underutilized';
  let statusColor: string;
  let statusIcon: React.ReactNode;
  let statusText: string;
  
  if (utilizationGap > 20) {
    status = 'overworked';
    statusColor = 'text-red-600 bg-red-50 border-red-200';
    statusIcon = <AlertCircle className="w-5 h-5" />;
    statusText = '업무 과중';
  } else if (utilizationGap < -20) {
    status = 'underutilized';
    statusColor = 'text-amber-600 bg-amber-50 border-amber-200';
    statusIcon = <TrendingDown className="w-5 h-5" />;
    statusText = '인력 여유';
  } else {
    status = 'balanced';
    statusColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
    statusIcon = <TrendingUp className="w-5 h-5" />;
    statusText = '적정 배치';
  }

  const metrics = [
    {
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      label: '연간 총 업무 시간',
      value: results.totalAnnualWorkHours.toLocaleString(),
      unit: '시간',
      color: 'bg-blue-50 border-blue-100',
      detail: `1인당 ${HOURS_PER_YEAR_PER_FTE.toLocaleString()}시간 기준`,
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      label: '필요 인력 (FTE)',
      value: requiredFTE.toFixed(1),
      unit: '명',
      color: 'bg-emerald-50 border-emerald-100',
      detail: `현재: ${currentFTE.toFixed(1)}명 투입`,
    },
    {
      icon: <Coins className="w-5 h-5 text-violet-600" />,
      label: '현재 연간 인건비',
      value: `₩${(results.currentAnnualLaborCost / 1000000).toFixed(0)}`,
      unit: '백만',
      color: 'bg-violet-50 border-violet-100',
      detail: '퇴직금 포함 (×1.12)',
    },
  ];

  const formulas = [
    `연간 총 업무 시간 = 연간업무량 × 건당처리시간

계산 과정:
- 연간업무량: 월간업무량 × 12개월
- 건당처리시간: 업무 1건 처리에 걸리는 시간 (시간 단위)
- 연간 총 업무 시간 = 연간업무량 × 건당처리시간`,
    
    `필요 인력 (FTE) = 연간총업무시간 / 1,920시간

계산 과정:
- FTE (Full-Time Equivalent): 정규직 환산 인력
- 1인당 연간 근무시간: 1,920시간 (주 40시간 × 48주)
- 필요 인력 = 연간총업무시간 / 1,920시간

현재 투입 인력:
- 현재 FTE = 인력수 × 활용률
- 활용률: 해당 업무에 할애하는 시간 비중`,
    
    `현재 연간 인건비 = 평균연봉 × 1.12 × 인력수 × 활용률

계산 과정:
- 평균연봉: 직원 1인당 연간 급여
- 1.12: 퇴직금 및 복리후생 계수
- 인력수: 해당 업무에 투입된 직원 수
- 활용률: 해당 업무에 할애하는 시간 비중 (%)

예시:
- 연봉 5천만원, 5명, 활용률 60%
- 인건비 = 50,000,000 × 1.12 × 5 × 0.6 = 168,000,000원`
  ];

  return (
    <React.Fragment>
      <div className="bg-white p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-smooth border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">업무량 분석</h3>
            <button
              onClick={() => setIsFormulaOpen(true)}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors group"
              aria-label="계산식 보기"
            >
              <Info className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </button>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${statusColor}`}>
            {statusIcon}
            <span className="text-sm font-semibold">{statusText}</span>
          </div>
        </div>
      
      {/* Key Insights - Bullet Points */}
      <div className="mb-4 p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200">
        <div className="flex items-start gap-2 mb-2">
          <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-2 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">📊 핵심 인사이트</p>
            <ul className="space-y-1.5 text-xs leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>월간 <strong>{monthlyWorkload.toLocaleString()}건</strong> (일평균 약 {avgDailyWorkload}건) 처리, 건당 <strong>{processingTimeMinutes}분</strong> 소요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold mt-0.5">•</span>
                <span>오류율 <strong>{inputs.errorRate}%</strong>로 월 {monthlyErrorCount}건, 연간 {annualErrorCount.toLocaleString()}건 오류 발생</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <span>오류 1건당 평균 <strong>{formatKoreanCurrency(inputs.avgErrorCost)}</strong> 손실 → 연간 총 <strong>{formatKoreanCurrency(totalErrorCost)}</strong> 손실</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">•</span>
                <span>현재 <strong>{currentFTE.toFixed(1)}명</strong> 투입 중 (인력 {inputs.numEmployees}명 × 활용률 {inputs.utilizationRate}%), 실제 필요 인력 <strong>{requiredFTE.toFixed(1)}명</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${metric.color} transition-all hover:shadow-md`}
          >
            <div className="flex items-center gap-2 mb-2">
              {metric.icon}
              <span className="text-xs font-medium text-slate-600">{metric.label}</span>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
              <span className="text-sm text-slate-500">{metric.unit}</span>
            </div>
            <p className="text-xs text-slate-500">{metric.detail}</p>
          </div>
        ))}
      </div>

      {/* Status Insight */}
      <div className={`p-4 rounded-xl border ${statusColor}`}>
        <div className="flex items-start gap-2">
          {status === 'overworked' && <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
          {status === 'underutilized' && <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5" />}
          {status === 'balanced' && <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5" />}
          <div>
            <p className="text-sm font-semibold mb-1">
              {status === 'overworked' && '⚠️ 업무 과중 경고'}
              {status === 'underutilized' && '💡 인력 최적화 기회'}
              {status === 'balanced' && '✅ 적정 인력 운영'}
            </p>
            <p className="text-xs leading-relaxed">
              {status === 'overworked' && (
                <>
                  필요 인력 대비 <strong className="text-red-700">{Math.abs(utilizationGap).toFixed(0)}% 부족</strong>한 상태입니다. 
                  직원들이 과중한 업무를 수행 중이며, RPA 도입으로 업무 부담을 크게 줄일 수 있습니다.
                </>
              )}
              {status === 'underutilized' && (
                <>
                  필요 인력 대비 <strong className="text-amber-700">{Math.abs(utilizationGap).toFixed(0)}% 여유</strong>가 있습니다. 
                  인건비 최적화 또는 추가 업무 배정을 고려할 수 있습니다.
                </>
              )}
              {status === 'balanced' && (
                <>
                  필요 인력과 투입 인력이 균형을 이루고 있습니다. 
                  RPA 도입 시 절감된 인력을 고부가가치 업무에 재배치할 수 있습니다.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      </div>

      <FormulaPopup
        isOpen={isFormulaOpen}
        onClose={() => setIsFormulaOpen(false)}
        title="업무량 분석 계산식"
        formulas={formulas}
      />
    </React.Fragment>
  );
};
