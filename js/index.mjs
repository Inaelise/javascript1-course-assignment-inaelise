/* import { showProductDetail } from "./showProductDetail.mjs"; */
import { API_URL } from "./utils/api.mjs";
import { upDateAmount } from "./utils/iconCartAmount.mjs";
import { fetchProducts } from "./utils/fetchProducts.mjs";

function renderProductHtml(item) {
  const productItem = document.createElement("a");
  productItem.href = "/product.html?id=" + item.id;
  productItem.title = "Click to view details";
  productItem.classList.add("product-item");

  const itemImage = document.createElement("img");
  itemImage.src = item.image.url;

  const itemTitle = document.createElement("h2");
  itemTitle.textContent = item.title;

  const itemPrice = document.createElement("h3");
  itemPrice.textContent = `NOK ${item.price}`;

  productItem.append(itemImage, itemTitle, itemPrice);

  return productItem;
}

function displayProductList(items) {
  const displayContainer = document.getElementById("display-container");
  items.forEach((item) => {
    const productHtml = renderProductHtml(item);
    displayContainer.appendChild(productHtml);
  });
}

async function main() {
  try {
    const { data: items } = await fetchProducts(API_URL);
    // Updates cart amount on checkout icon
    upDateAmount();
    displayProductList(items);
    console.log(items); // Remember to remove.
  } catch (error) {
    console.log("Error", error);
  }
}

main();

/* import { showProductDetails } from "./showProductDetail.mjs";

async function main() {
  try {
    const { data: items } = await fetchProducts();
    showProductDetails(items);
    displayProductList(items);
    console.log(items);
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}

main();

async function fetchProducts() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

function displayProductList(items) {
  const displayContainer = document.getElementById("display-container");

  items.forEach((item) => {
    const productItem = document.createElement("a");
    productItem.href = `/product.html?id=${item.id}`;
    productItem.title = "Click to view details";
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <img src="${item.image.url}">
      <h2>${item.title}</h2>
      <h3 class="product-price">NOK ${item.price}</h3>
    `;
    if (displayContainer) {
      displayContainer.appendChild(productItem);
    }
  });
}
 */
