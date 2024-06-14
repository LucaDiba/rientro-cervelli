const EURFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(price: number) {
  return EURFormatter.format(price);
}

export function formatPercentage(price: number) {
  return price.toLocaleString("it-IT", {
    style: "percent",
    minimumFractionDigits: 2,
  });
}
