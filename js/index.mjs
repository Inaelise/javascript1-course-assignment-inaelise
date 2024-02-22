import { API_URL } from "./utils/api.mjs";
/* import { updateAmount } from "./utils/iconCartAmount.mjs"; */
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
    /* updateAmount(); */
    displayProductList(items);
    console.log(items); // Remember to remove.
  } catch (error) {
    console.log("Error", error);
  }
}

main();
