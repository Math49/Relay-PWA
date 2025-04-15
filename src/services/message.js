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

export async function createMessage(ID_store, message, DateEnd) {
    try {
        const res = await fetchData(`/messages`, {
            method: "POST",
            body: JSON.stringify({
                ID_store: ID_store,
                Message: message,
                Creation_date: new Date().toISOString(),
                Deletion_date: DateEnd.toISOString(),
            }),
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function deleteMessage(ID_message) {
    try {
        const res = await fetchData(`/messages`, {
            method: "DELETE",
            body: JSON.stringify({
                ID_message: ID_message,
            }),
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}