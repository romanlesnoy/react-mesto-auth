import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
        avatarRef.current.value = "";
    }

    return (
        <PopupWithForm
            name="avatar-update"
            title="Обновить аватар"
            submitButtonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            noValidate
        >
            <input
                id="avatar-link"
                className="popup__input-field popup__input-avatar-link"
                type="url"
                name="avatarlink"
                placeholder="Ссылка на картинку"
                required
                autoComplete="off"
                ref={avatarRef}
            />
            <span id="avatar-link-error" className="popup__input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
