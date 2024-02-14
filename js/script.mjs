import { API_URL } from "./utils/api.mjs";
import { fetchProducts } from "./utils/fetchProducts.mjs";

async function main() {
    try {
        const products = await fetchProducts(API_URL);
        console.log(products); // Remember to remove.
    } catch (error) {
        console.log("Error", error);
    }
}

main();