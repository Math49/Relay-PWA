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

export async function createStock(stocks) {
  try {
    const res = await fetchData(`/stocks`, {
      method: "POST",
      body: JSON.stringify({
        stocks: stocks,
      }),
    });

    return await res;
  } catch (error) {
    return null;
  }
}

export async function addStock(ID_store, addStockList) {
  try {
    const existingStocks = await getStocks(ID_store);
    const existingByProduct = {};

    // 🗃️ Création d'une map des stocks existants pour accès rapide
    existingStocks.forEach((stock) => {
      existingByProduct[stock.ID_product] = stock;
    });

    const toUpdate = [];
    const toCreate = [];

    addStockList.forEach((item) => {
      const quantity = parseInt(item.Quantity) * item.Box_quantity;
      const existing = existingByProduct[item.ID_product];

      if (existing) {
        if (item.Packing === 0) {
          toUpdate.push({
            ID_product: item.ID_product,
            Quantity: existing.Quantity + quantity,
            Nmb_boxes: existing.Nmb_boxes + parseInt(item.Quantity),
            Nmb_on_shelves: existing.Nmb_on_shelves,
          });
        } else {
          toUpdate.push({
            ID_product: item.ID_product,
            Quantity: existing.Quantity,
            Nmb_boxes: existing.Nmb_boxes + parseInt(item.Quantity),
            Nmb_on_shelves: existing.Nmb_on_shelves,
          });
        }
      } else {
        if (item.Packing === 0) {
          toCreate.push({
            ID_product: item.ID_product,
            ID_store: ID_store,
            Quantity: quantity,
            Nmb_boxes: parseInt(item.Quantity),
            Nmb_on_shelves: 0,
          });
        } else {
          toCreate.push({
            ID_product: item.ID_product,
            ID_store: ID_store,
            Quantity: 0,
            Nmb_boxes: parseInt(item.Quantity),
            Nmb_on_shelves: 0,
          });
        }
      }
    });

    if (toUpdate.length > 0) {
      await putStocks(ID_store, toUpdate);
    }

    if (toCreate.length > 0) {
      await createStock(toCreate);
    }

    return await getStocks(ID_store);
  } catch (error) {
    console.error("Erreur lors de l'ajout au stock :", error);
    return null;
  }
}
