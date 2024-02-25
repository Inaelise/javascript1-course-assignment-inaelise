import { clearCart } from "./utils/shoppingCart.mjs";
import { getSubtotal } from "./utils/getSubtotal.mjs";

function renderSummaryHtml(items) {
  const summaryContent = document.createElement("div");
  summaryContent.id = "summary-content";

  const productImageContainer = document.createElement("div");
  productImageContainer.id = "summary-img-container";

  const productImage = document.createElement("img");
  productImage.id = "summary-image";
  productImage.src = items.image.url;
  productImage.alt = `Product image`;

  const productTitle = document.createElement("h3");
  productTitle.textContent = `${items.title}`;

  const productInfoContainer = document.createElement("div");
  productInfoContainer.id = "summary-info";

  const selectedContainerSize = document.createElement("div");
  selectedContainerSize.id = "selected-container-size";

  const selectedSizeTitle = document.createElement("p");
  selectedSizeTitle.id = "selected-size-title";
  selectedSizeTitle.textContent = "Size:";

  const selectedSize = document.createElement("p");
  selectedSize.textContent = items.size;

  const selectedContainerColor = document.createElement("div");
  selectedContainerColor.id = "selected-container-color";

  const selectedColorTitle = document.createElement("p");
  selectedColorTitle.id = "selected-color-title";
  selectedColorTitle.textContent = "Color:";

  const selectedColor = document.createElement("p");
  selectedColor.textContent = items.color;

  const selectedQntyContainer = document.createElement("div");
  selectedQntyContainer.id = "selected-qnty-container";

  const selectedQntyTitle = document.createElement("p");
  selectedQntyTitle.id = "selected-qnty-title";
  selectedQntyTitle.textContent = "Quantity:";

  const quantity = document.createElement("p");
  quantity.id = "quantity-item";
  quantity.textContent = items.quantity;

  const itemPrice = document.createElement("div");
  itemPrice.id = "price-item-container";
  itemPrice.innerHTML = `
  <p id="price-item">Price per item:</p>
  <p>NOK ${items.price}</p>
  `;

  const totalItemPrice = document.createElement("div");
  totalItemPrice.id = "total-price-container";
  const totalPrice = items.price * items.quantity;
  totalItemPrice.innerHTML = `
  <p id="total-price-title">Total:</p>
  <p>NOK ${totalPrice.toFixed(2)}</p>
  `;

  productImageContainer.append(productImage);
  selectedContainerColor.append(selectedColorTitle, selectedColor);
  selectedContainerSize.append(selectedSizeTitle, selectedSize);
  selectedQntyContainer.append(selectedQntyTitle, quantity);
  productInfoContainer.append(
    selectedContainerColor,
    selectedContainerSize,
    selectedQntyContainer,
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
  totalCost.id = "subtotal-container";
  totalCost.innerHTML = `
    <h4>Subtotal:</h4>
    <p>NOK ${getSubtotal()}</p>
    `;

  const amountPayed = document.createElement("div");
  amountPayed.id = "amount-payed";
  amountPayed.innerHTML = `
      <h4>Amount payed:</h4>
      <p>NOK ${getSubtotal()}</p>
    `;

  const continueBrowsing = document.createElement("button");
  continueBrowsing.id = "browse-btn";
  continueBrowsing.textContent = "Continue browsing";
  continueBrowsing.addEventListener("click", () => {
    clearCart();
    window.location.href = "/index.html";
  });
  purchaseSummary.append(totalCost, amountPayed, continueBrowsing);
}

async function main() {
  try {
    displayConfirmation();
  } catch (error) {
    alert("Error: Error displaying purchase confirmation", error);
  }
}

main();
