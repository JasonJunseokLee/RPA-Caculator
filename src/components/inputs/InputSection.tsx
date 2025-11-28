import React, { useState } from 'react';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { SliderInput } from './SliderInput';
import { CurrencyInput } from './CurrencyInput';
import { Users, Clock, TrendingUp, Wallet, ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import { clsx } from 'clsx';

interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  summary?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon, isOpen, onToggle, children, summary }) => {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-200">
      <button
        onClick={onToggle}
        className={clsx(
          "w-full flex items-center justify-between p-4 text-left transition-colors",
          isOpen ? "bg-slate-50 text-slate-900" : "bg-white text-slate-600 hover:bg-slate-50"
        )}
      >
        <div className="flex items-center gap-3 font-semibold">
          {icon}
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {!isOpen && summary && (
            <span className="text-xs text-slate-400 font-normal hidden sm:inline-block">{summary}</span>
          )}
          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>
      
      <div
        className={clsx(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 space-y-4 border-t border-slate-100 bg-slate-50/30">
          {children}
        </div>
      </div>
    </div>
  );
};

export const InputSection: React.FC = () => {
  const { inputs, setInputValue, calculate } = useCalculatorStore();
  
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hr: true,
    process: false,
    investment: false,
    effect: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper calculations for insights
  const totalAnnualHours = inputs.annualWorkload * inputs.processingTime;
  const fteEquivalent = (totalAnnualHours / 1920).toFixed(1); // Assuming 1920 hours/year per FTE

  return (
    <div className="space-y-4">
      {/* Group 1: HR Info */}
      <AccordionItem
        title="인력 정보"
        icon={<Users className="w-5 h-5 text-primary" />}
        isOpen={openSections.hr}
        onToggle={() => toggleSection('hr')}
        summary={`${inputs.numEmployees}명 / 평균 ₩${(inputs.avgSalary/1000000).toFixed(0)}백만`}
      >
        <SliderInput
          label="투입 인력"
          value={inputs.numEmployees}
          onChange={(v) => setInputValue('numEmployees', v)}
          min={1}
          max={50}
          unit="명"
          description="해당 프로세스에 투입되는 직원 수"
        />
        <CurrencyInput
          label="평균 연봉"
          value={inputs.avgSalary}
          onChange={(v) => setInputValue('avgSalary', v)}
          description="퇴직금 및 복리후생 포함 (x1.12)"
        />
        <SliderInput
          label="인력 활용률"
          value={inputs.utilizationRate}
          onChange={(v) => setInputValue('utilizationRate', v)}
          min={30}
          max={100}
          step={5}
          unit="%"
          description="해당 업무에 할애하는 시간 비중"
        />
      </AccordionItem>

      {/* Group 2: Process Info */}
      <AccordionItem
        title="프로세스 정보"
        icon={<Clock className="w-5 h-5 text-primary" />}
        isOpen={openSections.process}
        onToggle={() => toggleSection('process')}
        summary={`연간 ${totalAnnualHours.toLocaleString()}시간 (약 ${fteEquivalent}명 분)`}
      >
        <SliderInput
          label="월간 업무량"
          value={Math.round(inputs.annualWorkload / 12)}
          onChange={(v) => setInputValue('annualWorkload', v * 12)}
          min={100}
          max={10000}
          step={50}
          unit="건"
          description="월간 처리하는 평균 업무 건수"
        />
        <SliderInput
          label="건당 처리시간"
          value={Math.round(inputs.processingTime * 60)}
          onChange={(v) => setInputValue('processingTime', v / 60)}
          min={1}
          max={120}
          step={1}
          unit="분"
          description="업무 1건 처리에 걸리는 시간 (분)"
        />
        <SliderInput
          label="현재 오류율"
          value={inputs.errorRate}
          onChange={(v) => setInputValue('errorRate', v)}
          min={0}
          max={30}
          unit="%"
          description="수작업 시 발생하는 평균 오류율"
        />
        <CurrencyInput
          label="건당 오류 손실액"
          value={inputs.avgErrorCost}
          onChange={(v) => setInputValue('avgErrorCost', v)}
          description="오류 1건당 발생하는 평균 금전적 손실"
        />
      </AccordionItem>

      {/* Group 3: Investment Cost */}
      <AccordionItem
        title="투자 비용"
        icon={<Wallet className="w-5 h-5 text-secondary" />}
        isOpen={openSections.investment}
        onToggle={() => toggleSection('investment')}
        summary={`봇 ${inputs.numBots}대 / 월 ₩${(inputs.monthlyLicensePerBot/10000).toFixed(0)}만`}
      >

        <CurrencyInput
          label="봇 1대당 월 라이선스"
          value={inputs.monthlyLicensePerBot}
          onChange={(v) => setInputValue('monthlyLicensePerBot', v)}
          description="봇 1대를 운영하는데 드는 월간 라이선스 비용"
        />
        <SliderInput
          label="운영 봇 개수"
          value={inputs.numBots}
          onChange={(v) => setInputValue('numBots', v)}
          min={1}
          max={10}
          unit="대"
        />
        <div className="grid grid-cols-2 gap-3">
          <CurrencyInput
            label="초기 개발비"
            value={inputs.developmentCost}
            onChange={(v) => setInputValue('developmentCost', v)}
          />
          <CurrencyInput
            label="컨설팅 비용"
            value={inputs.consultingCost}
            onChange={(v) => setInputValue('consultingCost', v)}
          />
        </div>
      </AccordionItem>

      {/* Group 4: Expected Effect */}
      <AccordionItem
        title="기대 효과"
        icon={<TrendingUp className="w-5 h-5 text-secondary" />}
        isOpen={openSections.effect}
        onToggle={() => toggleSection('effect')}
        summary={`자동화율 ${inputs.automationRate}%`}
      >
        <SliderInput
          label="예상 자동화율"
          value={inputs.automationRate}
          onChange={(v) => setInputValue('automationRate', v)}
          min={0}
          max={100}
          step={5}
          unit="%"
          description="RPA로 대체 가능한 업무 비율"
        />
        <SliderInput
          label="오류 감소율"
          value={inputs.errorReductionRate}
          onChange={(v) => setInputValue('errorReductionRate', v)}
          min={0}
          max={100}
          step={5}
          unit="%"
          description="도입 후 기대되는 오류 감소 효과"
        />
      </AccordionItem>

      {/* Calculate Button */}
      <button
        onClick={calculate}
        className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
      >
        <Calculator className="w-6 h-6" />
        <span>계산하기</span>
      </button>
    </div>
  );
};
