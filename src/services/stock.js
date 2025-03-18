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