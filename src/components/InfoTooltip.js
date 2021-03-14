import React from "react";

function InfoToolTip({ massage = "что то пошло не так", isOpen, onClose }) {
    return (
        <section
            className={`popup popup__infotooltip ${
                true ? "popup_opened" : " "
            }`}
        >
            <div className="popup__container">
                <button
                    className="popup__close-btn"
                    type="button"
                    onClick={onClose}
                ></button>
                <div
                    className="popup__info-img popup__info-img_fail"
                />
                <p className="popup__text">{massage}</p>
            </div>
        </section>
    );
}

export default InfoToolTip;
