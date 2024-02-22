import { fetchProducts } from "./utils/fetchProducts.mjs";
import { API_URL } from "./utils/api.mjs";
import { addToCart, createCart } from "./utils/shoppingCart.mjs";

function renderProductDetailHtml(items) {
  const productContent = document.createElement("div");

  const productImageContainer = document.createElement("div");
  productImageContainer.classList.add = "product-image";

  const productImage = document.createElement("img");
  productImage.src = items.image.url;
  productImage.alt = `Product image`;

  const productInfoContainer = document.createElement("div");
  productInfoContainer.classList.add = "product-info";

  const productTitle = document.createElement("h1");
  productTitle.classList.add = "product-title";
  productTitle.textContent = items.title;

  const productPrice = document.createElement("h2");
  productPrice.classList.add = "product-price";
  productPrice.textContent = `NOK ${items.price}`;

  const productDescription = document.createElement("p");
  productDescription.classList.add = "product-description";
  productDescription.textContent = items.description;

  const productSize = document.createElement("select");
  productSize.id = "size-selector";
  productSize.classList.add = "selector";
  productSize.title = "Click to select size";
  productSize.ariaLabel = "Select button";
  productSize.innerHTML = `
  <option>Size:</option>
  ${items.sizes.map((size) => `<option value="${size}">${size}</option>`)}
  `;

  const productColor = document.createElement("select");
  productColor.id = "color-selector";
  productColor.classList.add = "selector";
  productColor.title = "Click to select color";
  productColor.ariaLabel = "Select button";

  const colorOptionTitle = document.createElement("option");
  colorOptionTitle.textContent = "Color:";

  const colorOptions = document.createElement("option");
  colorOptions.value = items.baseColor;
  colorOptions.textContent = items.baseColor;

  const productQuantity = document.createElement("input");
  productQuantity.type = "number";
  productQuantity.id = "quantity-input";
  productQuantity.value = 1;

  const productButton = document.createElement("button");
  productButton.classList.add = "add-to-cart-btn";
  productButton.textContent = "Add to cart";
  productButton.addEventListener("click", () => {
    addToCart(items);
  });

  productColor.append(colorOptionTitle, colorOptions);
  productInfoContainer.append(
    productPrice,
    productDescription,
    productSize,
    productColor,
    productQuantity,
    productButton
  );
  productImageContainer.append(productImage);
  productContent.append(
    productTitle,
    productImageContainer,
    productInfoContainer
  );

  return productContent;
}

function displayProductDetail(items) {
  const productDetail = document.getElementById("product-detail");

  const productDetailHtml = renderProductDetailHtml(items);
  productDetail.appendChild(productDetailHtml);
}

async function main() {
  const productId = new URLSearchParams(window.location.search).get("id");
  createCart();
  try {
    const { data: items } = await fetchProducts(`${API_URL}/${productId}`);
    displayProductDetail(items);
    console.log(items, productId); // Remember to remove.
  } catch (error) {
    console.log("Error", error);
  }
}

main();
