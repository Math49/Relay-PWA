const { fetchData } = require("./api");

export async function login(name, password) {
    return fetchData("/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
    });
}