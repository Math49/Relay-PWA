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