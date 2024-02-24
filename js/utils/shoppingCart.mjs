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
  const productId = items.id;

  const itemIndex = cart.findIndex(function (currentItem) {
    if (
      productId === currentItem.id &&
      currentItem.size === chosenSize &&
      currentItem.color === chosenColor
    ) {
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
    cart[itemIndex].quantity += chosenQuantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function incrementQuantity(items) {
  const cart = JSON.parse(localStorage.getItem("cart"));

  const productId = items.id;
  const itemIndex = cart.findIndex(function (currentItem) {
    if (
      productId === currentItem.id &&
      currentItem.size === items.size &&
      currentItem.color === items.color
    ) {
      return true;
    }
    return false;
  });
  if (itemIndex === -1) {
    cart.push({
      ...items,
      quantity: 1,
    });
  } else {
    cart[itemIndex].quantity += 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function decrementQuantity(items) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const productId = items.id;
  const itemIndex = cart.findIndex(function (currentItem) {
    if (currentItem.id === productId) {
      return true;
    }
    return false;
  });

  if (cart[itemIndex].quantity > 1) {
    cart[itemIndex].quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    const updatedCart = cart.filter((_, index) => {
      if (itemIndex === index) {
        return false;
      }
      return true;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
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
}

// Add to purchase button
export function clearCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
}
