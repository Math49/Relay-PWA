const { fetchData } = require("./api");

export async function getStocks(ID_store) {
    try {
        const res = await fetchData(`/stock/${ID_store}`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function putStocks(ID_store, stocks) {
    try {
        const res = await fetchData(`/stocks/${ID_store}`, {
            method: "PUT",
            body: JSON.stringify({
                stocks: stocks,
            }),
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}