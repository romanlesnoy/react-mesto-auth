export const BASE_URL = "https://auth.nomoreparties.co";

const response = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

export const register = (email, password) => {
    console.log(email, password);
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "password": password,
            "email": email,
        }),
    }).then(response);
};

export const authorize = (email, password) => {
    console.log(email, password)
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "password": password, "email": email }),
    }).then(response);
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(response);
};
