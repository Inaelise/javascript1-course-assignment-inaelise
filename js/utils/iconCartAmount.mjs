export function upDateAmount() {
  const countCart = document.querySelector(".cart-amount");
  const cart = JSON.parse(localStorage.getItem("cart"));

  const quantity = cart.map((item) => item.quantity);
  const totalAmount = quantity.reduce((a, b) => a + b, 0);

  if (totalAmount < 1) {
    countCart.style.display = "none";
  } else {
    countCart.textContent = totalAmount;
  }
}
