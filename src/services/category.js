const { fetchData } = require("./api");

export async function getCategories() {
    try {
        const res = await fetchData(`/categories`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}