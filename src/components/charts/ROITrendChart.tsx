import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { formatKoreanCurrency, formatDetailedKoreanCurrency } from '../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const ROITrendChart: React.FC = () => {
  const { results } = useCalculatorStore();

  const data = useMemo(() => ({
    labels: Array.from({ length: 36 }, (_, i) => `${i + 1}개월`),
    datasets: [
      {
        label: '누적 순현금흐름',
        data: results.monthlyCashFlow.map(d => d.netCashFlow / 1000000),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 350);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
          gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgb(59, 130, 246)',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 3,
        borderWidth: 3,
      },
    ],
  }), [results]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (context: any) => {
            const value = context.raw * 1000000; // Convert back to original value
            return `순흐름: ${formatDetailedKoreanCurrency(value)}`;
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

  const year1CashFlow = results.monthlyCashFlow[11].netCashFlow;
  const year3CashFlow = results.monthlyCashFlow[35].netCashFlow;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-smooth border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">3년 누적 현금 흐름 (Cumulative Cash Flow)</h3>
      <p className="text-xs text-slate-500 mb-3">
        순현금흐름 = 누적 절감액 - 누적 비용 (양수 전환 시점 = 손익분기점)
      </p>
      <div className="h-[280px]">
        <Line data={data} options={options} />
      </div>
      <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
        <p className="text-xs font-semibold text-slate-700 mb-2">📈 투자 회수 타임라인</p>
        <ul className="text-xs text-slate-600 space-y-1">
          <li className="flex items-start gap-1.5">
            <span className="text-slate-400 font-bold mt-0.5">0개월</span>
            <span>초기 투자 <strong>{formatKoreanCurrency(results.initialInvestment)}</strong> 집행</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-emerald-600 font-bold mt-0.5">{results.paybackPeriodMonths.toFixed(1)}개월</span>
            <span><strong>손익분기점 달성</strong> (누적 순이익 ₩0 돌파)</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold mt-0.5">12개월</span>
            <span>1년 차 누적 순이익 <strong>{formatKoreanCurrency(year1CashFlow)}</strong></span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-violet-600 font-bold mt-0.5">36개월</span>
            <span>3년 차 누적 순이익 <strong>{formatKoreanCurrency(year3CashFlow)}</strong></span>
          </li>
        </ul>
      </div>
    </div>
  );
};
