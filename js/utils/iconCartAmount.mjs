function getTotalCartAmount() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const totalAmount = cart.reduce((total, item) => {
    total += item.quantity;
    return total;
  }, 0);
  return totalAmount;
}

export function updateIcon() {
  const countCart = document.getElementById("cart-amount");
  const totalNumbers = getTotalCartAmount();

  if (totalNumbers < 1) {
    countCart.style.display = "none";
  } else {
    countCart.textContent = totalNumbers;
  }
}
