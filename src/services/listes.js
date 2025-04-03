const { fetchData } = require("./api");

export async function getListes(ID_store) {
    try {
        const res = await fetchData(`/list/${ID_store}`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function createList(ID_store, list) {

    list = Object.fromEntries(
        Object.entries(list).filter(([_, details]) => details.items > 0 && details.items !== "N/A")
    );
    const products = Object.entries(list).map(([id, details]) => ({
        ID_product: parseInt(id),
        Quantity: details.items,
    }));

    const data = {
        ID_store: ID_store,
        Creation_date: new Date().toISOString(),
        products: products,
    };

    try {
        console.log("Creating list with data:", data);
        const res = await fetchData(`/list`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    
        return await res;
    } catch (error) {
        console.log("Error creating list:", error);
        return null;
    }
}