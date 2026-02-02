export const USD_TO_RUB = 100;

export function usdToRub(usd: number): number {
  return Math.round(usd * USD_TO_RUB);
}

export function formatRubles(
  usd: number,
  options: { decimals?: number; convert?: boolean } = {}
): string {
  const { decimals = 0, convert = true } = options;
  const value = convert ? usdToRub(usd) : usd;
  return (
    new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value) + " ₽"
  );
}
