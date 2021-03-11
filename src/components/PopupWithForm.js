import React from "react";

function PopupWithForm({
    name,
    title,
    submitButtonText,
    isOpen,
    onClose,
    children,
    onSubmit
}) {
    return (
        <section
            className={`popup popup__${name} ${isOpen ? "popup_opened" : " "}`}
        >
            <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
                <button
                    className="popup__close-btn"
                    type="button"
                    onClick={onClose}
                ></button>
                <h3 className="popup__title">{title}</h3>
                {children}
                <button className="popup__save-btn" type="submit">
                    {submitButtonText}
                </button>
            </form>
        </section>
    );
}

export default PopupWithForm;
