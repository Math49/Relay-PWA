const { fetchData } = require("./api");

export async function getMessages(ID_store) {
    try {
        const res = await fetchData(`/messages/${ID_store}`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}