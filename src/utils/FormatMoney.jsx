const formatMoney = (amount) => {
  const num = Number(amount);

  if (isNaN(num)) return "0.00";

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
  }

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  }

  if (num >= 1_000) {
    return (num / 1_000).toFixed(2).replace(/\.00$/, "") + "K";
  }

  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default formatMoney;
