import { updateIcon } from "./utils/iconCartAmount.mjs";
import { getSubtotal } from "./utils/getSubtotal.mjs";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "./utils/shoppingCart.mjs";

function renderCheckoutHtml(items) {
  const productContent = document.createElement("div");
  productContent.id = "content-container";

  const productImageContainer = document.createElement("div");
  productImageContainer.id = "image-container";

  const productImage = document.createElement("img");
  productImage.src = items.image.url;
  productImage.alt = `Product image`;

  const productInfoContainer = document.createElement("div");
  productInfoContainer.classList.add = "product-info";

  const productTitle = document.createElement("h2");
  productTitle.textContent = `${items.title}`;

  const productPrice = document.createElement("div");
  productPrice.id = "product-price";
  productPrice.innerHTML = `
  <h3>NOK ${items.price}</h3>
  <p>(price per item)</p>
  `;

  const productPriceTotal = document.createElement("div");
  const totalPrice = items.price * items.quantity;
  productPriceTotal.id = "total-product-price";
  productPriceTotal.innerHTML = `
  <p id="total-title">Total:</p>
  <p>NOK ${totalPrice.toFixed(2)}</p>
  `;

  const sizeContainer = document.createElement("div");
  sizeContainer.id = "size-container";

  const sizeTitle = document.createElement("p");
  sizeTitle.id = "size-title";
  sizeTitle.textContent = "Size:";

  const selectedSize = document.createElement("p");
  selectedSize.textContent = items.size;

  const colorContainer = document.createElement("div");
  colorContainer.id = "color-container";

  const colorTitle = document.createElement("p");
  colorTitle.id = "color-title";
  colorTitle.textContent = "Color:";

  const selectedColor = document.createElement("p");
  selectedColor.textContent = items.color;

  const quantityContainer = document.createElement("div");
  quantityContainer.id = "quantity-container";

  const quantityTitle = document.createElement("p");
  quantityTitle.id = "quantity-title";
  quantityTitle.textContent = "Quantity:";

  const increaseQnty = document.createElement("button");
  increaseQnty.id = "plus";
  increaseQnty.title = "Click to increase quantity";
  increaseQnty.innerHTML = `<i class="fa-solid fa-plus"></i>`;
  increaseQnty.addEventListener("click", () => {
    incrementQuantity(items);
    renderPage();
  });

  const quantity = document.createElement("p");
  quantity.id = "quantity";
  quantity.textContent = `${items.quantity}`;

  const decreaseQnty = document.createElement("button");
  decreaseQnty.id = "minus";
  decreaseQnty.title = "Click to decrease quantity";
  decreaseQnty.innerHTML = `<i class="fa-solid fa-minus"></i>`;
  decreaseQnty.addEventListener("click", () => {
    decrementQuantity(items);
    renderPage();
  });

  const deleteItem = document.createElement("button");
  deleteItem.id = "delete-button";
  deleteItem.title = "Click to delete product";
  deleteItem.innerHTML = `
  <i class="fa-solid fa-trash"></i>
  `;
  deleteItem.addEventListener("click", () => {
    removeFromCart(items);
    renderPage();
  });

  sizeContainer.append(sizeTitle, selectedSize);
  colorContainer.append(colorTitle, selectedColor);
  quantityContainer.append(quantityTitle, decreaseQnty, quantity, increaseQnty);
  productInfoContainer.append(
    productTitle,
    productPrice,
    sizeContainer,
    colorContainer,
    quantityContainer,
    productPriceTotal
  );
  productImageContainer.append(productImage);
  productContent.append(
    deleteItem,
    productImageContainer,
    productInfoContainer
  );
  return productContent;
}

function displayCart() {
  const checkoutContainer = document.getElementById("checkout");
  const cart = JSON.parse(localStorage.getItem("cart"));
  checkoutContainer.textContent = "";

  if (cart.length > 0) {
    cart.forEach((currentItem) => {
      const checkoutHtml = renderCheckoutHtml(currentItem);
      checkoutContainer.appendChild(checkoutHtml);
    });

    const totalCost = document.createElement("div");
    totalCost.id = "total-cost";
    totalCost.innerHTML = `
    <h4>Subtotal:</h4>
    <p id="subtotal">NOK ${getSubtotal()}</p>
    `;

    const purchaseButton = document.createElement("button");
    purchaseButton.id = "purchase-btn";
    purchaseButton.textContent = "Purchase";
    purchaseButton.addEventListener("click", () => {
      window.location.href = "/purchase-confirmation.html";
    });

    checkoutContainer.append(totalCost, purchaseButton);
  } else {
    checkoutContainer.innerHTML = `<p class="no-products">Oops, there are no products in your cart.</p>`;

    const startShoppingBtn = document.createElement("a");
    startShoppingBtn.id = "start-shopping-btn";
    startShoppingBtn.textContent = "Start shopping";
    startShoppingBtn.href = "/index.html";

    checkoutContainer.append(startShoppingBtn);
  }
}

function renderPage() {
  updateIcon();
  displayCart();
}

function main() {
  renderPage();
}

main();
