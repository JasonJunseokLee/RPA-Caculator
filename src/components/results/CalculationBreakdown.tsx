import React from 'react';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { Calculator } from 'lucide-react';

export const CalculationBreakdown: React.FC = () => {
  const { inputs, results } = useCalculatorStore();

  const formatCurrency = (value: number) => {
    return `₩${(value / 1000000).toFixed(2)}백만`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-800">ROI 계산 상세</h3>
          <p className="text-sm text-slate-500">1년차 투자수익률 계산 과정</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Step 1: Operating Cost */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-bold">1</span>
            연간 운영비
          </h4>
          <div className="space-y-2 text-sm ml-8">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">연간 라이선스비</span>
              <span className="font-mono text-slate-800">
                {formatCurrency(inputs.monthlyLicensePerBot)} × {inputs.numBots}대 × 12개월 = <span className="font-bold text-primary">{formatCurrency(results.annualOperatingCost)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Step 2: Initial Investment */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-bold">2</span>
            초기 투자
          </h4>
          <div className="space-y-2 text-sm ml-8">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">개발비 + 컨설팅비</span>
              <span className="font-mono text-slate-800">
                {formatCurrency(inputs.developmentCost)} + {formatCurrency(inputs.consultingCost)} = <span className="font-bold text-secondary">{formatCurrency(results.initialInvestment)}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 italic">※ 일회성 비용만 포함 (라이선스는 운영비)</p>
          </div>
        </div>

        {/* Step 3: Annual Savings */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-bold">3</span>
            연간 총 절감액
          </h4>
          <div className="space-y-2 text-sm ml-8">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">현재 인건비</span>
              <span className="font-mono text-slate-800">{formatCurrency(results.currentAnnualLaborCost)}</span>
            </div>
            <div className="text-xs text-slate-500 mb-2 pl-2 border-l-2 border-slate-200">
              ※ 인건비 = 투입인원 × 활용률 × 평균연봉 × 1.12 (퇴직금)
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="text-slate-600">인건비 절감</span>
              <span className="font-mono text-slate-800">
                <span className="font-bold text-blue-600">{formatCurrency(results.annualLaborSavings)}</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">오류 절감</span>
              <span className="font-mono text-slate-800">{formatCurrency(results.annualErrorSavings)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="text-slate-600">연간 총 절감액</span>
              <span className="font-mono text-slate-800">
                {formatCurrency(results.annualLaborSavings)} + {formatCurrency(results.annualErrorSavings)} = <span className="font-bold text-green-600">{formatCurrency(results.totalAnnualSavings)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Step 4: Year 1 Total Cost */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-bold">4</span>
            1년차 총 비용
          </h4>
          <div className="space-y-2 text-sm ml-8">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">초기 투자 + 연간 운영비</span>
              <span className="font-mono text-slate-800">
                {formatCurrency(results.initialInvestment)} + {formatCurrency(results.annualOperatingCost)} = <span className="font-bold text-red-500">{formatCurrency(results.initialInvestment + results.annualOperatingCost)}</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 italic">※ 구축비 + 컨설팅비 + 연간 운영비 포함</p>
          </div>
        </div>

        {/* Step 5: ROI Calculation */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-xl border-2 border-primary/20">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full text-sm font-bold">5</span>
            ROI (1년차)
          </h4>
          <div className="space-y-3 text-sm ml-8">
            <div className="bg-white/80 p-3 rounded-lg">
              <div className="text-slate-600 mb-2">공식:</div>
              <div className="font-mono text-slate-800 text-center py-2 bg-slate-50 rounded border border-slate-200">
                ROI = ((연간총절감액 - 1년차총비용) / 1년차총비용) × 100
              </div>
            </div>
            <div className="bg-white/80 p-3 rounded-lg">
              <div className="text-slate-600 mb-2">계산:</div>
              <div className="font-mono text-slate-800 text-center py-2 bg-slate-50 rounded border border-slate-200">
                (({formatCurrency(results.totalAnnualSavings)} - {formatCurrency(results.initialInvestment + results.annualOperatingCost)}) / {formatCurrency(results.initialInvestment + results.annualOperatingCost)}) × 100
              </div>
            </div>
            <div className={`bg-gradient-to-r ${results.year1ROI < 0 ? 'from-red-500 to-red-600' : 'from-primary to-secondary'} p-4 rounded-lg text-center`}>
              <div className="text-white/80 text-xs mb-1">1년차 ROI</div>
              <div className="text-white text-3xl font-bold">
                {results.year1ROI.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        {/* Resource Analysis */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-slate-200 text-slate-600 rounded-full text-sm font-bold">i</span>
            인력 운영 분석
          </h4>
          <div className="space-y-3 text-sm ml-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="text-slate-500 text-xs mb-1">현재 투입 인력 (Input FTE)</div>
                <div className="font-bold text-slate-800 text-lg">
                  {results.inputFTE?.toFixed(1)}명
                </div>
                <div className="text-xs text-slate-400">인원수 × 활용률</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="text-slate-500 text-xs mb-1">업무량 기반 필요 인력 (Required FTE)</div>
                <div className="font-bold text-slate-800 text-lg">
                  {results.requiredFTE?.toFixed(1)}명
                </div>
                <div className="text-xs text-slate-400">연간업무량 × 시간</div>
              </div>
            </div>
            
            {Math.abs((results.inputFTE || 0) - (results.requiredFTE || 0)) > 0.1 && (
              <div className="text-xs bg-yellow-50 text-yellow-800 p-3 rounded-lg border border-yellow-100 flex items-start gap-2">
                <span className="text-lg">💡</span>
                <div>
                  <strong>인력 불일치 감지:</strong><br/>
                  현재 설정된 인력({results.inputFTE?.toFixed(1)}명)과 업무량 처리에 필요한 인력({results.requiredFTE?.toFixed(1)}명)이 다릅니다.
                  {(results.inputFTE || 0) < (results.requiredFTE || 0)
                    ? " 업무량이 많아 추가 인력이 필요할 수 있습니다." 
                    : " 현재 인력이 업무량 대비 여유가 있습니다."}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
