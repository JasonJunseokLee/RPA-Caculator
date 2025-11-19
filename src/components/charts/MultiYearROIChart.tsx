import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { formatKoreanCurrency } from '../../utils/formatters';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const MultiYearROIChart: React.FC = () => {
  const { results } = useCalculatorStore();

  const data = useMemo(() => ({
    labels: ['1년차', '3년차', '5년차'],
    datasets: [
      {
        label: 'ROI (%)',
        data: [results.year1ROI, results.year3ROI, results.year5ROI],
        backgroundColor: [
          'rgba(59, 130, 246, 0.9)',
          'rgba(16, 185, 129, 0.9)',
          'rgba(139, 92, 246, 0.9)',
        ],
        borderColor: [
          'rgb(37, 99, 235)',
          'rgb(5, 150, 105)',
          'rgb(124, 58, 237)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(139, 92, 246, 1)',
        ],
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
        callbacks: {
          label: (context: any) => `ROI: ${context.raw.toFixed(1)}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          callback: (value: any) => `${value}%`,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }), []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-smooth border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">연도별 ROI 비교</h3>
      <p className="text-xs text-slate-500 mb-3">
        ROI = (누적 순이익 / 누적 비용) × 100
      </p>
      <div className="h-[240px]">
        <Bar data={data} options={options} />
      </div>
      <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
        <p className="text-xs font-semibold text-slate-700 mb-2">💡 투자 성과 요약</p>
        <ul className="text-xs text-slate-600 space-y-1">
          <li className="flex items-start gap-1.5">
            <span className="text-blue-600 font-bold mt-0.5">•</span>
            <span>초기 투자: <strong>{formatKoreanCurrency(results.initialInvestment)}</strong></span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-emerald-600 font-bold mt-0.5">•</span>
            <span>1년 후 ROI <strong>{results.year1ROI.toFixed(0)}%</strong> → 3년 후 <strong>{results.year3ROI.toFixed(0)}%</strong> → 5년 후 <strong>{results.year5ROI.toFixed(0)}%</strong></span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-violet-600 font-bold mt-0.5">•</span>
            <span>장기 투자 시 수익률이 {results.year5ROI > results.year1ROI ? '지속 상승하여' : '안정화되어'} 높은 투자 가치 제공</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

