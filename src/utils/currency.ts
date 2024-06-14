const EURFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(price: number) {
  return EURFormatter.format(price);
}
