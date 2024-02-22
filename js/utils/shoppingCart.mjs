export function createCart() {
  const cart = localStorage.getItem("cart");
  if (!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
}

export function addToCart(items) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  // Get values and insert to cart item it applies.
  // If values are the same, increase item quantity.
  // If not the same, add new item to cart with those values.
  const sizeElement = document.getElementById("size-selector");
  const colorElement = document.getElementById("color-selector");
  const quantityInput = document.getElementById("quantity-input");

  const chosenSize = sizeElement.value;
  const chosenColor = colorElement.value;
  const chosenQuantity = parseInt(quantityInput.value);

  const itemIndex = cart.findIndex(function (currentItem) {
    if (items.id === currentItem.id) {
      return true;
    }
    return false;
  });
  if (itemIndex === -1) {
    cart.push({
      ...items,
      size: chosenSize,
      color: chosenColor,
      quantity: chosenQuantity,
    });
  } else {
    cart[itemIndex].quantity += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(items) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const itemIndex = cart.findIndex(function (currentItem) {
    if (items.id === currentItem.id) {
      return true;
    }
    return false;
  });
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  location.reload();
}

// Add to purchase button
export function clearCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
}
