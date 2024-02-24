import { API_URL } from "./utils/api.mjs";
import { fetchProducts } from "./utils/fetchProducts.mjs";
import { createCart } from "./utils/shoppingCart.mjs";
import { updateIcon } from "./utils/iconCartAmount.mjs";

const allBtn = document.getElementById("all");
const femaleBtn = document.getElementById("female");
const maleBtn = document.getElementById("male");

let chosenFilter = "";

allBtn.addEventListener("click", () => {
  chosenFilter = "";
  renderPage();
});
femaleBtn.addEventListener("click", () => {
  chosenFilter = "Female";
  renderPage();
});
maleBtn.addEventListener("click", () => {
  chosenFilter = "Male";
  renderPage();
});

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
  displayContainer.textContent = "";

  items
    .filter((item) => {
      if (item.gender === chosenFilter || chosenFilter === "") {
        return true;
      }
    })
    .forEach((item) => {
      const productHtml = renderProductHtml(item);
      displayContainer.appendChild(productHtml);
    });
}

async function renderPage() {
  try {
    const { data: items } = await fetchProducts(API_URL);
    // Updates cart amount on checkout icon
    updateIcon();
    displayProductList(items);
    console.log(items); // Remember to remove.
  } catch (error) {
    alert("Error fetching products", error);
  }
}

async function main() {
  createCart();
  await renderPage();
}

main();
