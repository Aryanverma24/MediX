// src/utils/format.js
export const formatNumber = (num) => {
  if (!num && num !== 0) return '0';
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatPercentage = (num) => {
  if (!num && num !== 0) return '0%';
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num / 100);
};