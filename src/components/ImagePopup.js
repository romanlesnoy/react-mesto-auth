import React from "react";

function ImagePopup({ card, onClose }) {
    return (
        <section
            className={`popup popup__image-preview ${
                card ? "popup_opened" : " "
            }`}
        >
            <figure className="popup__image-container">
                <button
                    className="popup__close-btn"
                    type="button"
                    aria-label="Close"
                    onClick={onClose}
                ></button>
                <img className="popup__image" src={card.link} alt={card.name} />
                <figcaption className="popup__image-caption">
                    {card.name}
                </figcaption>
            </figure>
        </section>
    );
}

export default ImagePopup;
