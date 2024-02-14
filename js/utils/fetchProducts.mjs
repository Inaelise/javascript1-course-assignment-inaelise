export async function fetchProducts(url) {
    try {
        const productData = await fetch(url);
        const json = await productData.json();
        return json;
    } catch (error) {
        console.log("Error", error);
    }
}