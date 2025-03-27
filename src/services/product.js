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