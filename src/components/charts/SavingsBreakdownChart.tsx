import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { formatKoreanCurrency } from '../../utils/formatters';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const SavingsBreakdownChart: React.FC = () => {
  const { results } = useCalculatorStore();

  const data = useMemo(() => ({
    labels: ['인건비 절감', '오류 감소 절감'],
    datasets: [
      {
        data: [
          results.annualLaborSavings / 1000000,
          results.annualErrorSavings / 1000000,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.9)',
          'rgba(139, 92, 246, 0.9)',
        ],
        borderColor: [
          'rgb(37, 99, 235)',
          'rgb(124, 58, 237)',
        ],
        borderWidth: 3,
        hoverOffset: 8,
        hoverBorderWidth: 4,
        hoverBorderColor: 'white',
      },
    ],
  }), [results]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw.toFixed(1);
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${label}: ₩${value}백만 (${percentage}%)`;
          },
        },
      },
    },
  }), []);

  const laborPercent = ((results.annualLaborSavings / results.totalAnnualSavings) * 100).toFixed(0);
  const errorPercent = ((results.annualErrorSavings / results.totalAnnualSavings) * 100).toFixed(0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-smooth border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">연간 절감액 구성</h3>
      <p className="text-xs text-slate-500 mb-3">
        인건비 절감 = 현재 인건비 × 자동화율 | 오류 절감 = 감소 오류 수 × (재작업비 + 손실액)
      </p>
      <div className="h-[240px]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
        <p className="text-xs font-semibold text-slate-700 mb-2">💰 절감 효과 분석</p>
        <ul className="text-xs text-slate-600 space-y-1">
          <li className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <span>연간 총 절감액: <strong>{formatKoreanCurrency(results.totalAnnualSavings)}</strong></span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <span>인건비 절감: <strong>{formatKoreanCurrency(results.annualLaborSavings)}</strong> ({laborPercent}%)</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-violet-600 font-bold mt-0.5">•</span>
            <span>오류 감소 절감: <strong>{formatKoreanCurrency(results.annualErrorSavings)}</strong> ({errorPercent}%)</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-emerald-600 font-bold mt-0.5">•</span>
            <span>{results.annualLaborSavings > results.annualErrorSavings ? '인건비 절감이 주요 효과 (인력 재배치 핵심)' : '오류 감소가 주요 효과 (품질 향상 핵심)'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
