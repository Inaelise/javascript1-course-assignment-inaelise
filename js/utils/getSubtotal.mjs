export function getSubtotal() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const totalCost = cart.reduce((cartTotal, currentItem) => {
    cartTotal += currentItem.price * currentItem.quantity;
    return cartTotal;
  }, 0);
  return totalCost.toFixed(2);
}
