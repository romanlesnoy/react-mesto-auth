import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="profile-edit"
            title="Редактировать профиль"
            submitButtonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="user-name"
                className="popup__input-field popup__input-name"
                type="text"
                value={name || " "}
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                autoComplete="off"
                onChange={handleNameChange}
            />
            <span id="user-name-error" className="popup__input-error"></span>
            <input
                id="about"
                className="popup__input-field popup__input-about-me"
                type="text"
                value={description || " "}
                name="about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                autoComplete="off"
                onChange={handleDescriptionChange}
            />
            <span id="about-error" className="popup__input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
