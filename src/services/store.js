const { fetchData } = require("./api");

export async function getStore(ID_store) {
    try {
        const res = await fetchData(`/store/${ID_store}`, {
        method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}
