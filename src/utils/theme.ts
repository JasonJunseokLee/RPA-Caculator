// Theme configuration for consistent styling
export const theme = {
  colors: {
    // Semantic colors for data visualization
    cost: {
      light: 'rgb(239, 68, 68)',
      main: 'rgb(220, 38, 38)',
      dark: 'rgb(185, 28, 28)',
      gradient: 'from-red-400 to-red-600',
    },
    savings: {
      light: 'rgb(52, 211, 153)',
      main: 'rgb(16, 185, 129)',
      dark: 'rgb(5, 150, 105)',
      gradient: 'from-emerald-400 to-emerald-600',
    },
    roi: {
      light: 'rgb(96, 165, 250)',
      main: 'rgb(59, 130, 246)',
      dark: 'rgb(37, 99, 235)',
      gradient: 'from-blue-400 to-blue-600',
    },
    profit: {
      light: 'rgb(167, 139, 250)',
      main: 'rgb(139, 92, 246)',
      dark: 'rgb(124, 58, 237)',
      gradient: 'from-violet-400 to-violet-600',
    },
    neutral: {
      light: 'rgb(148, 163, 184)',
      main: 'rgb(100, 116, 139)',
      dark: 'rgb(71, 85, 105)',
      gradient: 'from-slate-400 to-slate-600',
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    card: '0 4px 20px -2px rgb(0 0 0 / 0.08)',
    cardHover: '0 8px 30px -4px rgb(0 0 0 / 0.12)',
  },
  
  spacing: {
    sectionGap: '3rem', // 48px
    cardGap: '1.5rem', // 24px
    contentPadding: '1.5rem', // 24px
  },
  
  borderRadius: {
    card: '1rem', // 16px
    button: '0.5rem', // 8px
    input: '0.75rem', // 12px
  },
};

// Chart color configurations
export const chartColors = {
  cost: {
    border: theme.colors.cost.main,
    background: 'rgba(239, 68, 68, 0.1)',
    fill: 'rgba(239, 68, 68, 0.2)',
  },
  savings: {
    border: theme.colors.savings.main,
    background: 'rgba(16, 185, 129, 0.1)',
    fill: 'rgba(16, 185, 129, 0.2)',
  },
  roi: {
    border: theme.colors.roi.main,
    background: 'rgba(59, 130, 246, 0.1)',
    fill: 'rgba(59, 130, 246, 0.2)',
  },
  profit: {
    border: theme.colors.profit.main,
    background: 'rgba(139, 92, 246, 0.1)',
    fill: 'rgba(139, 92, 246, 0.2)',
  },
};

export default theme;
