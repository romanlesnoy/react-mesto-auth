
import React, { useState } from "react";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailInput = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(email, password);
    }

    return (
        <section className="login">
            <form onSubmit={handleSubmit} className="form">
                <h1 className="form__title">Вход</h1>
                <input
                    id="email"
                    className="form__input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleEmailInput}
                />
                <input
                    id="password"
                    className="form__input"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    required
                    value={password}
                    minLength="8"
                    onChange={handlePasswordInput}
                />
                <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="form__submit"
                >
                    Войти
                </button>
            </form>
        </section>
    );
};

export default Login;
