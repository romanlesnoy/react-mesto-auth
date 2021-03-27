export class Api {
    constructor(config) {
        this._headers = config.headers;
        this._url = config.url;
    }

    setHeadersToken (token) {
        this._headers = {
            ...this._headers,
            authorization: `Bearer ${token}`,
        }
    }

    _response(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject("Произошла ошибка");
    }

    getUserInformation() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        }).then(this._response);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        }).then(this._response);
    }

    editUserInfo({ name, about }) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(this._response);
    }

    addNewCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(this._response);
    }

    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._response);
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: this._headers,
            }).then(this._response);
        } else {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: this._headers,
            }).then(this._response);
        }
    }

    editUserAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar `, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar,
            }),
        }).then(this._response);
    }
}

// const api = new Api({
//     // token: "f15df90b-c5d7-4a51-ba9b-c09d4fecf6eb",
//     // url: "https://mesto.nomoreparties.co/v1/cohort-18",
//     url: "http://localhost:3000",
// });

const api = new Api({
    url: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
