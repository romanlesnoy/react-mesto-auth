import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";
import { register, authorize, getContent } from "../utils/Auth";

function App() {
    //стейты состояния
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);// попап редактировния аватара профиля
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);// попап редактирования информации пользователя
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);//попап добавления карточки
    const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);//попапа с информацией о регистрации пользователя
    const [selectedCard, setSelectedCard] = useState(false);//попап карточки

    const [loggedIn, setLoggedIn] = useState(false);// авторизация
    const [regSuccsesStatusInfo, setRegSuccsesStatusInfo] = useState(false);//статус информации о регистрации, которая отобразится в попапе 
    const [userEmail, setUserEmail] = useState(" ");//имейл пользователя в хедере

    const [currentUser, setCurrentUser] = useState({});//стейт пользователя
    const [cards, setCards] = useState([]);//массив карточек 

    const history = useHistory();

    const handleRegister = (email, password) => { // регистрация пользователя
        register(email, password)
            .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setRegSuccsesStatusInfo(true);
                    setIsInfoToolTipPopupOpen(true);
                    history.push("/sign-in");
                }
            })
            .catch((err) => {
                setRegSuccsesStatusInfo(false);
                setIsInfoToolTipPopupOpen(true);
                if (err === 400)
                    return console.log("некорректно заполнено одно из полей");
            });
    };

    const handleLogin = (email, password) => {//вход пользователя
        authorize(email, password)
            .then((res) => {
                console.log(res);
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    setLoggedIn(true);
                    setUserEmail(email);
                    history.push("/");
                }
            })
            .catch((err) => {
                setRegSuccsesStatusInfo(false);
                setIsInfoToolTipPopupOpen(true);
                if (err === 400) return console.log("Не передано одно из поле");
                if (err === 401)
                    return console.log("Пользователь с email не найден");
            });
    };

    const handleLogOut = () => { // выход
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        history.push("/sign-in");
    };

    const tokenCheck = () => {// проверка токена
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            getContent(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setUserEmail(res.data.email);
                        history.push("/");
                    }
                })
                .catch((err) => {
                    if (err === 400)
                        return console.log("Токен не передан или передан не в том формате");
                    if (err === 401)
                        return console.log("Переданный токен некорректен ");
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        api.getCards()
            .then((cardsData) => {
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        api.getUserInformation()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) =>
                    c._id === card._id ? newCard : c
                );
                setCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.removeCard(card._id)
            .then(() => {
                setCards(cards.filter((item) => item._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser(userData) {
        api.editUserInfo(userData)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAavatar({ avatar }) {
        api.editUserAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlace(placeData) {
        api.addNewCard(placeData)
            .then((data) => {
                setCards([data, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
        setIsInfoToolTipPopupOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header userEmail={userEmail} onSignOut={handleLogOut} />

                <Switch>
                    <Route path="/sign-up">
                        <Register onRegister={handleRegister} />
                    </Route>

                    <Route path="/sign-in">
                        <Login onLogin={handleLogin} />
                    </Route>

                    <ProtectedRoute
                        exact
                        path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                    />

                    <Route>
                        {loggedIn ? (
                            <Redirect to="/" />
                        ) : (
                            <Redirect to="/sign-in" />
                        )}
                    </Route>
                </Switch>

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAavatar}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlace}
                />

                <PopupWithForm
                    name="popup__remove-card"
                    title="Вы уверены?"
                    submitButtonText="Да"
                >
                </PopupWithForm>

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <InfoToolTip
                    isOpen={isInfoToolTipPopupOpen}
                    onClose={closeAllPopups}
                    isSuccses={regSuccsesStatusInfo}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
