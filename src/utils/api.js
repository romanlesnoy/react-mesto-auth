export class Api {
    constructor({ token, url }) {
        this._token = token;
        this._url = url;
    }

    _response(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject("Произошла ошибка");
    }

    getUserInformation() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._token,
            },
        }).then(this._response);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._token,
            },
        }).then(this._response);
    }

    editUserInfo({name, about}) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(this._response);
    }

    addNewCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                link,
            }),
        }).then(this._response);
    }

    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
            },
        }).then(this._response);
    }

    changeLikeCardStatus(cardId, isLiked) {
        if(isLiked) {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: "PUT",
                headers: {
                    authorization: this._token,
                },
            }).then(this._response);
        } else {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: "DELETE",
                headers: {
                    authorization: this._token,
                },
            }).then(this._response);
        }
    }

    editUserAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar `, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar,
            }),
        }).then(this._response);
    }
}

const api = new Api({
    token: "f15df90b-c5d7-4a51-ba9b-c09d4fecf6eb",
    url: "https://mesto.nomoreparties.co/v1/cohort-18",
});

export default api;
