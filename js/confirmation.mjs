import { clearCart } from "./utils/shoppingCart.mjs";
import { getSubtotal } from "./utils/getSubtotal.mjs";

function renderSummaryHtml(items) {
  const summaryContent = document.createElement("div");

  const productImageContainer = document.createElement("div");
  productImageContainer.classList.add = "product-image";

  const productImage = document.createElement("img");
  productImage.classList.add = "summary-image";
  productImage.src = items.image.url;
  productImage.alt = `Product image`;

  const productTitle = document.createElement("h3");
  productTitle.textContent = `${items.title}`;

  const productInfoContainer = document.createElement("div");
  productInfoContainer.classList.add = "summary-info";

  const selectedSize = document.createElement("p");
  selectedSize.textContent = `Size: ${items.size}`;

  const selectedColor = document.createElement("p");
  selectedColor.textContent = `Color: ${items.color}`;

  const quantity = document.createElement("p");
  quantity.id = "quantity";
  quantity.textContent = `Quantity: ${items.quantity}`;

  const itemPrice = document.createElement("div");
  itemPrice.innerHTML = `
  <p>Price per item:</p>
  <p>NOK ${items.price}</p>
  `;

  const totalItemPrice = document.createElement("div");
  const totalPrice = items.price * items.quantity;
  totalItemPrice.innerHTML = `
  <p>Total:</p>
  <p>NOK ${totalPrice.toFixed(2)}</p>
  `;

  productImageContainer.append(productImage);
  productInfoContainer.append(
    selectedSize,
    selectedColor,
    quantity,
    itemPrice,
    totalItemPrice
  );
  summaryContent.append(
    productImageContainer,
    productTitle,
    productInfoContainer
  );
  return summaryContent;
}

function displayConfirmation() {
  const purchaseSummary = document.getElementById("purchase-summary");
  const cart = JSON.parse(localStorage.getItem("cart"));
  purchaseSummary.textContent = "";

  cart.forEach((items) => {
    const purchaseSummaryHtml = renderSummaryHtml(items);
    purchaseSummary.appendChild(purchaseSummaryHtml);
  });

  const totalCost = document.createElement("div");
  totalCost.innerHTML = `
    <h4>Subtotal:</h4>
    <p>NOK ${getSubtotal()}</p>
    `;

  const continueBrowsing = document.createElement("button");
  continueBrowsing.textContent = "Continue browsing";
  continueBrowsing.addEventListener("click", () => {
    clearCart();
    window.location.href = "/index.html";
  });
  purchaseSummary.append(totalCost, continueBrowsing);
}

async function main() {
  try {
    displayConfirmation();
  } catch (error) {
    alert("Error: Error displaying purchase confirmation", error);
  }
}

main();
