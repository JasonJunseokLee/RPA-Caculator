import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { formatKoreanCurrency, formatDetailedKoreanCurrency } from '../../utils/formatters';

export const CostTimelineChart: React.FC = () => {
  const { results } = useCalculatorStore();

  const data = useMemo(() => ({
    labels: Array.from({ length: 60 }, (_, i) => `${i + 1}개월`),
    datasets: [
      {
        label: '누적 비용',
        data: results.monthlyCashFlow.map(d => d.cumulativeCost / 1000000),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(239, 68, 68)',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
        borderWidth: 2.5,
      },
      {
        label: '누적 절감액',
        data: results.monthlyCashFlow.map(d => d.cumulativeSavings / 1000000),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(16, 185, 129)',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
        borderWidth: 2.5,
      },
    ],
  }), [results]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (context: any) => {
            const value = context.raw * 1000000;
            return `${context.dataset.label}: ${formatDetailedKoreanCurrency(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          callback: (value: any) => `₩${value}백만`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 12,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  }), []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-smooth border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">비용 타임라인 (5년)</h3>
      <p className="text-xs text-slate-500 mb-3">
        누적 비용 = 초기 투자 + 월별 운영비 누적 | 누적 절감액 = 월별 인건비·오류 절감액 누적
      </p>
      <div className="h-[280px]">
        <Line data={data} options={options} />
      </div>
      <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
        <p className="text-xs font-semibold text-slate-700 mb-2">💵 5년 투자 전망</p>
        <ul className="text-xs text-slate-600 space-y-1">
          <li className="flex items-start gap-1.5">
            <span className="text-red-600 font-bold mt-0.5">•</span>
            <span>총 투자 비용: <strong>{formatKoreanCurrency(results.total5YearCost)}</strong></span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-emerald-600 font-bold mt-0.5">•</span>
            <span>총 절감액: <strong>{formatKoreanCurrency(results.total5YearSavings)}</strong></span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-violet-600 font-bold mt-0.5">•</span>
            <span>5년 후 순이익: <strong>{formatKoreanCurrency(results.total5YearProfit)}</strong></span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <span>지속적인 운영비에도 불구하고 절감액 누적으로 높은 수익성 보장</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
