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
import { register, authorize, getContent } from "../utils/auth";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false);
    const [regSuccsesStatusInfo, setRegSuccsesStatusInfo] = useState(false);
    const [userEmail, setUserEmail] = useState(" ");

    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if(!token) {
            return
        } else {
            api.setHeadersToken(token);

            Promise.all([api.getCards(), api.getUserInformation()])
                .then(([cardsData, userData]) => {
                    setCards(cardsData);
                    setCurrentUser(userData);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loggedIn]);

    const handleRegister = (email, password) => {
        register(email, password)
            .then((res) => {
                if (res) {
                    console.log(res);
                    setLoggedIn(true);
                    setRegSuccsesStatusInfo(true);
                    setIsInfoToolTipPopupOpen(true);
                    history.push("/sign-in");
                }
            })
            .catch((err) => {
                setRegSuccsesStatusInfo(false);
                setIsInfoToolTipPopupOpen(true);
                if (err === "Error 400") {
                    return console.log("Не верно заполнено одно из поле");
                }
                if (err === "Error 409") {
                    return console.log("Такой пользователь уже существует");
                }
                console.log(err)
            });
    };

    const handleLogin = (email, password) => {
        authorize(email, password)
            .then((res) => {
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
                if (err === "Error 400") {
                    return console.log("Не верно заполнено одно из поле");
                }
                if (err === "Error 401") {
                    return console.log("Неправильные почта или пароль");
                }
                console.log(err);
            });
    };

    const handleLogOut = () => {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        history.push("/sign-in");
    };

    const tokenCheck = () => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            getContent(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setUserEmail(res.email);
                        history.push("/");
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    };

    useEffect(() => {
        tokenCheck();
    }, [loggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i === currentUser._id);
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
                ></PopupWithForm>

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
