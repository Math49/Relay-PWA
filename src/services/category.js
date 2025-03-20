const { fetchData } = require("./api");

export async function getCategories(ID_store) {
    try {
        const res = await fetchData(`/categoryEnable/${ID_store}`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}