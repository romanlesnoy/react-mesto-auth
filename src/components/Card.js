import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const { link, likes, name } = card;

    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = `elements__remove-btn ${
        !isOwn ? "elements__remove-btn_hidden" : " "
    }`;

    const isLiked = card.likes.some((i) => i === currentUser._id);
    const cardLikeButtonClassName = `elements__like-btn ${
        isLiked ? "elements__like-btn_active" : " "
    }`;

    function handleClick() {
        onCardClick({ name, link });
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="elements__figure">
            <img
                className="elements__image"
                src={link}
                alt={name}
                onClick={handleClick}
            />
            <button
                className={cardDeleteButtonClassName}
                type="button"
                aria-label="Delete"
                onClick={handleDeleteClick}
            ></button>
            <div className="elements__caption-container">
                <h2 className="elements__caption">{name}</h2>
                <div className="elements__likes-container">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="Like"
                        onClick={handleLikeClick}
                    ></button>
                    <p className="elements__like-counter">{likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;
