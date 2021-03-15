import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({userEmail, onSignOut}) {
    return (
        <header className="header">
            <img
                className="header__logo"
                src={logo}
                alt="Логотип проект Место"
            />
            <Route path="/sign-up">
                <Link to="sign-in" className="header__login-link">
                    Войти
                </Link>
            </Route>
            <Route path="/sign-in">
                <Link to="sign-up" className="header__login-link">
                    Регистрация
                </Link>
            </Route>
            <Route exact path="/">
                <p className="header__email">
                    {userEmail} &nbsp;
                    <Link to="sign-in" className="header__login-link" onClick={onSignOut}>
                        Выйти
                    </Link>
                </p>
            </Route>
        </header>
    );
}

export default Header;
