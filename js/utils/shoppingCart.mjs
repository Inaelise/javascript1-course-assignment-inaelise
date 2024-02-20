export function createCart() {
  const cart = localStorage.getItem("cart");
  if (!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
}

export function addToCart(items) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const itemIndex = cart.findIndex(function (currentItem) {
    if (items.id === currentItem.id) {
      return true;
    }
    return false;
  });
  if (itemIndex === -1) {
    cart.push({ ...items, quantity: 1 });
  } else {
    cart[itemIndex].quantity += 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
