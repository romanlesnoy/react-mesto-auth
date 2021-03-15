
import React, { useState } from "react";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");

    const handleSubmit = (e) => {
        e.preventDefault();

        onLogin(email, password);
    };
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
                    onChange={(evt) => setEmail(evt.target.value)}
                />
                <input
                    id="password"
                    className="form__input"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    required
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
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
