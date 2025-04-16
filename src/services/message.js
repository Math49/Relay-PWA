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
function formatDateToMySQL(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }
  

  export async function createMessage(ID_store, message, DateEnd) {
    try {
      const now = new Date();
  
      const res = await fetchData(`/message`, {
        method: "POST",
        body: JSON.stringify({
          ID_store: ID_store,
          Message: message,
          Creation_date: formatDateToMySQL(now),
          Deletion_date: formatDateToMySQL(DateEnd),
        }),
      });
  
      return await res;
    } catch (error) {
      return null;
    }
  }
  

export async function deleteMessage(ID_message) {
    try {
        const res = await fetchData(`/message`, {
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