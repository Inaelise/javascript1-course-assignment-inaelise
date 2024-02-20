export async function fetchProducts(url) {
  try {
    const productData = await fetch(url);
    if (!productData.ok) {
      throw new Error("Error: failed to fetch products");
    }
    return await productData.json();
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
}
