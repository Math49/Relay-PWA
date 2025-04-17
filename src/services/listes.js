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

export async function getSpecificList(ID_store, ID_list) {
    try {
        const res = await fetchData(`/list/${ID_store}/${ID_list}`, {
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
        products: products,
    };

    try {
        const res = await fetchData(`/list`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function updateList(ID_list, list) {
    try {

        list = Object.fromEntries(
            Object.entries(list).filter(([_, qty]) => qty > 0 && qty !== "N/A")
        );

        const payload = Object.entries(list).map(([id, qty]) => ({
                ID_product: parseInt(id),
                Quantity: qty,
              }));


        const data = {
            ID_list: ID_list,
            products: payload,
        };

        const res = await fetchData(`/list`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
        
        return await res;
    } catch (error) {
        return null;
    }
}

export async function deleteList(ID_list) {
    try {
        const res = await fetchData(`/list`, {
            method: "DELETE",
            body: JSON.stringify({ ID_list: ID_list }),
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}