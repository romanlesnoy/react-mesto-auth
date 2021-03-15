import React from "react";

function InfoToolTip({ isOpen, onClose, isSuccses }) {
    console.log(isOpen)
    return (
        <section
            className={`popup popup__infotooltip ${
                isOpen ? "popup_opened" : " "
            }`}
        >
            <div className="popup__container">
                <button
                    className="popup__close-btn"
                    type="button"
                    onClick={onClose}
                ></button>
                <div
                    className={`popup__info-img ${isSuccses ? " " : "popup__info-img_fail"}`}
                />
                <p className="popup__text">{isSuccses ? "Вы успешно зарегистрировались!" : "Что то пошло не так! Попробуйте ещё раз"}</p>
            </div>
        </section>
    );
}

export default InfoToolTip;
