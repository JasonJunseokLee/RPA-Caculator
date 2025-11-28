import { Layout } from './components/layout/Layout';
import { InputSection } from './components/inputs/InputSection';
import { KPIGrid } from './components/results/KPIGrid';
import { CalculationBreakdown } from './components/results/CalculationBreakdown';
import { ROITrendChart } from './components/charts/ROITrendChart';
import { MultiYearROIChart } from './components/charts/MultiYearROIChart';
import { CostTimelineChart } from './components/charts/CostTimelineChart';
import { SavingsBreakdownChart } from './components/charts/SavingsBreakdownChart';
import { WorkloadAnalysisCard } from './components/charts/WorkloadAnalysisCard';
import { SectionHeader } from './components/SectionHeader';
import { TrendingUp, PieChart, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, chartAnimation, staggerContainer } from './utils/animations';

function App() {
  return (
    <Layout>
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Panel: Inputs - Fixed Height with Scroll */}
        <motion.div 
          className="lg:col-span-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div 
            className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 overflow-y-auto sticky top-6"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            <InputSection />
          </div>
        </motion.div>

        {/* Right Panel: Results & Charts - Full Flow */}
        <div className="lg:col-span-8 space-y-12">
          {/* Section 1: Investment Overview */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionHeader 
              icon={TrendingUp}
              title="투자 개요"
              subtitle="핵심 성과 지표 및 투자 수익률"
            />
            <motion.div className="space-y-6" variants={staggerContainer}>
              <motion.div variants={chartAnimation}>
                <KPIGrid />
              </motion.div>
              <motion.div variants={chartAnimation}>
                <CalculationBreakdown />
              </motion.div>
              <motion.div variants={chartAnimation}>
                <WorkloadAnalysisCard />
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Section 2: Savings Analysis */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionHeader 
              icon={PieChart}
              title="절감 효과 분석"
              subtitle="인건비 및 오류 감소 절감액 상세 분석"
            />
            <motion.div className="grid md:grid-cols-2 gap-6" variants={staggerContainer}>
              <motion.div variants={chartAnimation}>
                <MultiYearROIChart />
              </motion.div>
              <motion.div variants={chartAnimation}>
                <SavingsBreakdownChart />
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Section 3: Long-term Forecast */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <SectionHeader 
              icon={Calendar}
              title="장기 투자 전망"
              subtitle="3년 및 5년 누적 현금 흐름 예측"
            />
            <motion.div className="space-y-6" variants={staggerContainer}>
              <motion.div variants={chartAnimation}>
                <ROITrendChart />
              </motion.div>
              <motion.div variants={chartAnimation}>
                <CostTimelineChart />
              </motion.div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}

export default App;
