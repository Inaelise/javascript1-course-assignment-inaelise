import { removeFromCart, clearCart } from "./utils/shoppingCart.mjs";

function renderCheckoutHtml(items) {
  const productContent = document.createElement("div");

  const productImageContainer = document.createElement("div");
  productImageContainer.classList.add = "product-image";

  const productImage = document.createElement("img");
  productImage.src = items.image.url;
  productImage.alt = `Product image`;

  const productInfoContainer = document.createElement("div");
  productInfoContainer.classList.add = "product-info";

  const productTitle = document.createElement("h2");
  productTitle.classList.add = "product-title";
  productTitle.textContent = `${items.title}`;

  const productPrice = document.createElement("h3");
  productPrice.classList.add = "product-price";
  productPrice.textContent = `NOK ${items.price * items.quantity}`;

  const selectedSize = document.createElement("p");
  selectedSize.textContent = `Size: ${items.size}`;

  const selectedColor = document.createElement("p");
  selectedColor.textContent = `Color: ${items.color}`;

  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add = "quantity-container";

  const increaseQnty = document.createElement("button");
  increaseQnty.classList.add = "plus";
  increaseQnty.innerHTML = `<i class="fa-solid fa-plus"></i>`;
  increaseQnty.addEventListener("click", () => {
    addQuantity();
  });

  const quantity = document.createElement("p");
  quantity.id = "quantity";
  quantity.textContent = items.quantity;

  const decreaseQnty = document.createElement("button");
  decreaseQnty.classList.add = "minus";
  decreaseQnty.innerHTML = `<i class="fa-solid fa-minus"></i>`;
  decreaseQnty.addEventListener("click", () => {
    subtractQuantity();
  });

  const deleteItem = document.createElement("button");
  deleteItem.classList.add = "delete-button";
  deleteItem.innerHTML = `
  <i class="fa-solid fa-trash"></i>
  `;
  deleteItem.addEventListener("click", () => {
    removeFromCart(items);
  });

  quantityContainer.append(decreaseQnty, quantity, increaseQnty);
  productInfoContainer.append(
    productTitle,
    productPrice,
    selectedSize,
    selectedColor,
    quantityContainer,
    deleteItem
  );
  productImageContainer.append(productImage);
  productContent.append(productImageContainer, productInfoContainer);
  return productContent;
}

function subtractQuantity() {
  //
}

function addQuantity() {
  //
}

function displayCart() {
  const checkoutContainer = document.getElementById("checkout");
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart.length > 0) {
    cart.forEach((currentItem) => {
      const checkoutHtml = renderCheckoutHtml(currentItem);
      checkoutContainer.appendChild(checkoutHtml);
    });

    function getTotal() {
      const totalCost = cart.reduce((cartTotal, currentItem) => {
        cartTotal += currentItem.price * currentItem.quantity;
        return cartTotal;
      }, 0);
      return totalCost.toFixed(2);
    }

    const totalCost = document.createElement("h4");
    totalCost.textContent = `Total: NOK ${getTotal()}`;

    const purchaseButton = document.createElement("button");
    purchaseButton.classList.add = "purchase-btn";
    purchaseButton.textContent = "Confirm purchase";
    purchaseButton.addEventListener("click", () => {
      clearCart();
      location.reload();
    });

    checkoutContainer.append(totalCost, purchaseButton);
  } else {
    checkoutContainer.innerHTML = `<p>There are no products in your cart.</p>`;

    const startShoppingBtn = document.createElement("a");
    startShoppingBtn.classList.add = "start-shopping-btn";
    startShoppingBtn.textContent = "Start shopping";
    startShoppingBtn.href = "/index.html";

    checkoutContainer.append(startShoppingBtn);
  }
}

function main() {
  displayCart();
}

main();
