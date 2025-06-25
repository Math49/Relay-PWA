const { fetchData } = require("./api");

export async function getProducts() {
    try {
        const res = await fetchData("/products", {
            method: "GET",
            
        });


        return await res;
    } catch (error) {
        return null;
    }
}

export async function createProduct(data) {
    try {
        const res = await fetchData("/product", {
            method: "POST",
            body: JSON.stringify(data),
        });

        return await res;
    } catch (error) {
        return null;
    }
}