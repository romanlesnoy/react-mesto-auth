import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
    const currentUser = useContext(CurrentUserContext);
    return (
            <main className='main'>
                <section className="profile">
                    <div className="profile__container">
                        <div className="profile__avatar-container">
                            <img
                                className="profile__avatar"
                                src={currentUser.avatar}
                                alt="Аватар пользователя"
                            />
                            <button
                                className="profile__change-avatar-btn"
                                aria-label="Edit"
                                onClick={onEditAvatar}
                            ></button>
                        </div>
                        <div className="profile__info">
                            <h1 className="profile__name">
                                {currentUser.name}
                            </h1>
                            <button
                                className="profile__edit-btn"
                                type="button"
                                aria-label="Edit"
                                onClick={onEditProfile}
                            ></button>
                            <p className="profile__about-me">
                                {currentUser.about}
                            </p>
                        </div>
                    </div>
                    <button
                        className="profile__add-btn"
                        type="button"
                        aria-label="Add Card"
                        onClick={onAddPlace}
                    ></button>
                </section>

                <section className="elements">
                    {cards.map(card => (
                        <Card 
                            key={card._id} 
                            card={card} 
                            onCardClick={onCardClick} 
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </section>
            </main>
    );
}

export default Main;
