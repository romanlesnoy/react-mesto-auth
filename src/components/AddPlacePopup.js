import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
    const placeNameRef = useRef();
    const placeLinkRef = useRef();

    function handleAddPlaceSubmit (event) {
        event.preventDefault();
        onAddPlace({
            name: placeNameRef.current.value,
            link: placeLinkRef.current.value,
        });
        placeNameRef.current.value = ' ';
        placeLinkRef.current.value = ' ';
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
                ref={placeNameRef}
            />
            <span
                id="card-name-error"
                className="popup__input-error"
            ></span>
            <input
                id="image-link"
                className="popup__input-field popup__input-image-link"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                required
                autoComplete="off"
                ref={placeLinkRef}
            />
            <span
                id="image-link-error"
                className="popup__input-error"
            ></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;