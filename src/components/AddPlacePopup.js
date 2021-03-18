import React, { useRef, useState, useEffect, useCallback } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        setName("");
        setLink("");
    }, [onClose]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleAddPlaceSubmit(event) {
        event.preventDefault();
        onAddPlace({
            name, link
        });
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            submitButtonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
        >
            <input
                id="card-name"
                className="popup__input-field popup__input-card-name"
                type="text"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                autoComplete="off"
                value={name || ""}
                onChange={handleNameChange}
            />
            <span id="card-name-error" className="popup__input-error"></span>
            <input
                id="image-link"
                className="popup__input-field popup__input-image-link"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                required
                autoComplete="off"
                value={link || ""}
                onChange={handleLinkChange}
            />
            <span id="image-link-error" className="popup__input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
