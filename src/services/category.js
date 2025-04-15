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

export async function updateCategoriesPositions(ID_store, categories) {
    try {

        for (const cat of categories) {
            await fetchData(`/categoryEnable/${ID_store}/${cat.ID_category}`, {
                method: "PUT",
                body: JSON.stringify({
                    Category_position: categories.indexOf(cat),
                }),
            });
        }
    
        return true;
    } catch (error) {
        return null;
    }
}

export async function deleteCategory(ID_store, ID_category) {
    try {
        const res = await fetchData(`/categoryEnable`, {
            method: "DELETE",
            body: JSON.stringify({ ID_category: ID_category, ID_store }),
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}