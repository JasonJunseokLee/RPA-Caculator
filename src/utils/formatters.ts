// Format currency in Korean units (백만, 천만, 억)
export const formatKoreanCurrency = (amount: number): string => {
  const million = 1000000;
  const tenMillion = 10000000;
  const hundredMillion = 100000000;

  if (amount >= hundredMillion) {
    const value = amount / hundredMillion;
    return `${value.toFixed(1)}억원`;
  } else if (amount >= tenMillion) {
    const value = amount / tenMillion;
    return `${value.toFixed(1)}천만원`;
  } else if (amount >= million) {
    const value = amount / million;
    return `${value.toFixed(1)}백만원`;
  } else {
    return `${amount.toLocaleString()}원`;
  }
};

// Format currency in detailed Korean format (e.g., "1억 4천 9백만원")
export const formatDetailedKoreanCurrency = (amount: number): string => {
  // Handle negative values
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  const eok = Math.floor(absAmount / 100000000);
  const remainder1 = absAmount % 100000000;
  const cheonman = Math.floor(remainder1 / 10000000);
  const remainder2 = remainder1 % 10000000;
  const baekman = Math.floor(remainder2 / 1000000);
  const remainder3 = remainder2 % 1000000;
  const man = Math.floor(remainder3 / 10000);

  const parts = [];
  if (eok > 0) parts.push(`${eok}억`);
  if (cheonman > 0) parts.push(`${cheonman}천`);
  if (baekman > 0) parts.push(`${baekman}백`);
  if (man > 0 || parts.length === 0) parts.push(`${man}만원`);
  
  // If only 억 and no smaller units, add "원"
  if (parts.length === 1 && eok > 0 && cheonman === 0 && baekman === 0 && man === 0) {
    return `${isNegative ? '-' : ''}${eok}억원`;
  }
  
  // Join parts and handle the "원" suffix
  let result = parts.join(' ');
  if (!result.endsWith('원')) {
    result += '원';
  }
  
  return isNegative ? `-${result}` : result;
};

// Format number with Korean number system
export const formatKoreanNumber = (num: number): string => {
  return num.toLocaleString('ko-KR');
};
