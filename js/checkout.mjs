import { updateIcon } from "./utils/iconCartAmount.mjs";
import { getSubtotal } from "./utils/getSubtotal.mjs";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "./utils/shoppingCart.mjs";

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

  const productPrice = document.createElement("div");
  productPrice.classList.add = "product-price";
  productPrice.innerHTML = `
  <h3>NOK ${items.price}</h3>
  <p>(Price per item)</p>
  `;

  const productPriceTotal = document.createElement("div");
  const totalPrice = items.price * items.quantity;
  productPriceTotal.classList.add = "total-product-price";
  productPriceTotal.innerHTML = `
  <p>Total:</p>
  <p>NOK ${totalPrice.toFixed(2)}</p>
  `;

  const sizeContainer = document.createElement("div");
  sizeContainer.classList.add = "size-container";

  const sizeTitle = document.createElement("p");
  sizeTitle.textContent = "Size:";

  const selectedSize = document.createElement("p");
  selectedSize.textContent = items.size;

  const colorContainer = document.createElement("div");
  colorContainer.classList.add = "color-container";

  const colorTitle = document.createElement("p");
  colorTitle.textContent = "Color:";

  const selectedColor = document.createElement("p");
  selectedColor.textContent = items.color;

  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add = "quantity-container";

  const increaseQnty = document.createElement("button");
  increaseQnty.classList.add = "plus";
  increaseQnty.innerHTML = `<i class="fa-solid fa-plus"></i>`;
  increaseQnty.addEventListener("click", () => {
    incrementQuantity(items);
    renderPage();
  });

  const quantity = document.createElement("p");
  quantity.id = "quantity";
  quantity.textContent = `${items.quantity}`;

  const decreaseQnty = document.createElement("button");
  decreaseQnty.classList.add = "minus";
  decreaseQnty.innerHTML = `<i class="fa-solid fa-minus"></i>`;
  decreaseQnty.addEventListener("click", () => {
    decrementQuantity(items);
    renderPage();
  });

  const deleteItem = document.createElement("button");
  deleteItem.classList.add = "delete-button";
  deleteItem.innerHTML = `
  <i class="fa-solid fa-trash"></i>
  `;
  deleteItem.addEventListener("click", () => {
    removeFromCart(items);
    renderPage();
  });

  sizeContainer.append(sizeTitle, selectedSize);
  colorContainer.append(colorTitle, selectedColor);
  quantityContainer.append(decreaseQnty, quantity, increaseQnty);
  productInfoContainer.append(
    productTitle,
    productPrice,
    sizeContainer,
    colorContainer,
    quantityContainer,
    productPriceTotal,
    deleteItem
  );
  productImageContainer.append(productImage);
  productContent.append(productImageContainer, productInfoContainer);
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
    totalCost.innerHTML = `
    <h4>Subtotal:</h4>
    <p>NOK ${getSubtotal()}</p>
    `;

    const purchaseButton = document.createElement("button");
    purchaseButton.classList.add = "purchase-btn";
    purchaseButton.textContent = "Confirm purchase";
    purchaseButton.addEventListener("click", () => {
      /* clearCart(); */
      window.location.href = "/purchase-confirmation.html";
      /* renderPage(); */
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

function renderPage() {
  updateIcon();
  displayCart();
}

function main() {
  renderPage();
}

main();
