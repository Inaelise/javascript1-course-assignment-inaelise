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
  productTitle.textContent = `${items.quantity} x ${items.title}`;

  const productPrice = document.createElement("h3");
  productPrice.classList.add = "product-price";
  productPrice.textContent = `NOK ${items.price * items.quantity}`;

  const deleteItem = document.createElement("button");
  deleteItem.classList.add = "delete-button";
  deleteItem.innerHTML = `
  <i class="fa-solid fa-trash"></i>
  `;
  deleteItem.addEventListener("click", () => {
    removeFromCart(items);
  });

  productInfoContainer.append(productTitle, productPrice, deleteItem);
  productImageContainer.append(productImage);
  productContent.append(productImageContainer, productInfoContainer);
  return productContent;
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
